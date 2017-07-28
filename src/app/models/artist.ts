import { TrackLink } from "app/models/track-link";
import { Serializable } from "app/models/serializable";

export class Artist implements Serializable<Artist> {
  external_urls: string;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;

  deserialize(input) {
    if (input) {
      this.external_urls = input.external_urls;
      this.href = input.href;
      this.id = input.id;
      this.name = input.name;
      this.type = input.type;
      this.uri = input.uri;
    }
    return this;
  }
}
