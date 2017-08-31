import { Artist } from "app/models/artist";
import { Album } from "app/models/album";
import { TrackLink } from "app/models/track-link";
import { Serializable } from "app/models/serializable";
import { User } from "app/models/user";
import { Track } from "app/models/track";

export class Room implements Serializable<Room> {
  name: string;
  isPlaying: boolean;
  currently_playing:Track;
  queueSize: number = 10;

  deserialize(input) {
    if (input) {
      this.name = input.name;
      this.isPlaying = input.isPlaying;
      this.queueSize = input.queueSize;
      if(input.currently_playing){
        this.currently_playing = new Track().deserialize(input.currently_playing);
      }
    }
    return this;
  }
}
