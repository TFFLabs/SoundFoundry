import { ExternalUrl } from "app/models/external-url";
import { Artist } from "app/models/artist";
import { Image } from "app/models/image";
import { Serializable } from "app/models/serializable";

export class Album implements Serializable<Album> {
  albumt_type: string;
  artist: Artist;
  available_markets: string[];
  external_urls: ExternalUrl;
  href: string;
  id: string;
  images: Image[];
  name: string;
  type: string;
  uri: string;

  deserialize(input) {
    this.albumt_type = input.albumt_type;
    this.artist = input.artist;
    this.available_markets = input.available_markets;
    this.external_urls = new ExternalUrl().deserialize(input.external_urls);
    this.href = input.href;
    this.id = input.id;
    this.images = input.map(function(value) {
      return new Image().deserialize(input.images);
    });
    this.name = input.name;
    this.type = input.type;
    this.uri = input.uri;
    return this;
  }
}
