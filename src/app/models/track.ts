import { Artist } from "app/models/artist";
import { Album } from "app/models/album";
import { TrackLink } from "app/models/track-link";
import { Serializable } from "app/models/serializable";

export class Track implements Serializable<Track> {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: string;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: TrackLink;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;

  deserialize(input) {
    if (input) {
      this.album = new Album().deserialize(input.album)
      this.artists = input.artists.map(function(value) {
        return new Artist().deserialize(value);
      });
      this.available_markets = input.available_markets;
      this.disc_number = input.disc_number;
      this.duration_ms = input.duration_ms;
      this.explicit = input.explicit;
      this.external_urls = input.external_urls;
      this.href = input.href;
      this.id = input.id;
      this.is_playable = input.is_playable;
      this.linked_from = new TrackLink().deserialize(input.linked_from);
      this.name = input.name;
      this.preview_url = input.preview_url;
      this.track_number = input.track_number;
      this.type = input.type;
      this.uri = input.uri;
    }
    return this;
  }
}
