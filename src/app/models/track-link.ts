import { Serializable } from "app/models/serializable";

export class TrackLink implements Serializable<TrackLink> {
  external_urls: string;
  href: string;
  id: string;
  type: string;
  uri: string;

  deserialize(input) {
    if (input) {
      this.external_urls = input.external_urls;
      this.href = input.href;
      this.id = input.id;
      this.type = input.type;
      this.uri = input.uri;
    }
    return this;
  }
}
