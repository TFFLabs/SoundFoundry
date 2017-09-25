import { Artist } from 'app/models/artist';
import { Album } from 'app/models/album';
import { TrackLink } from 'app/models/track-link';
import { Serializable } from 'app/models/serializable';
import { User } from 'app/models/user';
import { Track } from 'app/models/track';

export class Room implements Serializable<Room> {
  name: string;
  description: string;
  isPlaying: boolean;
  currently_playing: Track;
  queueSize = 10;
  users: User[] = [];

  deserialize(input) {
    if (input) {
      this.name = input.name;
      this.description = input.description;
      this.isPlaying = input.isPlaying;
      this.queueSize = input.queueSize;
      if (input.currently_playing) {
        this.currently_playing = new Track().deserialize(input.currently_playing);
      }
      if (input.users) {
        this.users = input.users.map(value =>
          new User().deserialize(value)
        );
      }
    }
    return this;
  }
}
