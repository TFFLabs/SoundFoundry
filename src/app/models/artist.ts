import { ExternalUrl } from "app/models/external-url";
import { TrackLink } from "app/models/track-link";

export class Artist {
  external_urls: ExternalUrl;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
