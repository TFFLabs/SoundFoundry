import { Artist } from "app/models/artist";
import { ExternalUrl } from "app/models/external-url";
import { TrackLink } from "app/models/track-link";

export class Track {
  artist: Artist;
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrl;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: TrackLink;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}
