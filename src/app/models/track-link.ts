import { ExternalUrl } from "app/models/external-url";
import { Serializable } from "app/models/serializable";

export class TrackLink implements Serializable<TrackLink> {
  external_urls: ExternalUrl;
  href: string;
  id: string;
  type: string;
  uri: string;

  deserialize(input) {
    this.external_urls = new ExternalUrl().deserialize(input.external_urls);
    this.href = input.href;
    this.id = input.id;
    this.type = input.type;
    this.uri = input.uri;
    return this;
  }
}
