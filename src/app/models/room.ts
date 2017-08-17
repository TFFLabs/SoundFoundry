import { Artist } from "app/models/artist";
import { Album } from "app/models/album";
import { TrackLink } from "app/models/track-link";
import { Serializable } from "app/models/serializable";
import { User } from "app/models/user";
import { Track } from "app/models/track";

export class Room implements Serializable<Room> {
  name: string;
  isPlaying: boolean;
  tracks: Track[] = [];
  queueSize: number = 10;

  deserialize(input) {
    if (input) {
      this.name = input.name;
      this.isPlaying = input.isPlaying;
      this.tracks = input.tracks?input.tracks.map(value => new Track().deserialize(value)):this.tracks = [];
      this.queueSize = input.queueSize;
    }
    return this;
  }
}
