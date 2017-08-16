import { Artist } from "app/models/artist";
import { Album } from "app/models/album";
import { TrackLink } from "app/models/track-link";
import { Serializable } from "app/models/serializable";
import { User } from "app/models/user";

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
  isPreviewing: boolean;
  preview = new Audio();
  progress: number = 0;
  progressPercentage: number = 0;
  voters: User[] = [];

  deserialize(input) {
    if (input) {
      this.album = new Album().deserialize(input.album);
      this.artists = input.artists.map(value =>
        new Artist().deserialize(value)
      );
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
      this.isPreviewing = false;
      this.progress = input.progress? input.progress : 0;
      this.progressPercentage = input.progressPercentage? input.progressPercentage : 0;
      this.voters = input.voters? input.voters.map(voter => new User().deserialize(voter)) : [];
    }
    return this;
  }

  stopPreview() {
    this.preview.pause();
    this.isPreviewing = false;
    this.preview = new Audio();
  }

  loadPreview() {
    this.isPreviewing = true;
    this.preview = new Audio(this.preview_url);
    this.preview.load();
  }

  playPreview() {
    this.isPreviewing = true;
    this.preview.play();
  }

  pausePreview() {
    this.isPreviewing = false;
    this.preview.pause();
  }

  increaseProgress(increaseAmount: number) {
    this.progress += increaseAmount;
    this.progressPercentage = parseFloat(
      (this.progress / this.duration_ms * 100).toFixed(1)
    );
  }

  upVote(user: User) {
    this.voters.push(user);
  }

  downVote(user: User) {
    var index = this.voters.indexOf(this.voters.find(val => val.id == user.id));
    if (index > -1) {
      this.voters.splice(index, 1);
    }
  }

  isUpvoted(user: User): boolean {
    return this.voters ? this.voters.filter(val  => val.id == user.id ).length > 0: false;
  }
}
