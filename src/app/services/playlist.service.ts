import { Injectable } from "@angular/core";
import { Track } from "../models/track";
import { SpotifyService } from "app/services/spotify.service";
import { DomSanitizer } from "@angular/platform-browser";
import { User } from "app/models/user";
import { UserService } from "app/services/user.service";

@Injectable()
export class PlaylistService {
  isPlaying: boolean;
  isProgressing: boolean;
  currentlyPlaying: Track;
  tracks: Track[];
  previewing: Track;
  QUEUE_SIZE: number = 10;

  constructor(
    private spotifyService: SpotifyService,
    private userService: UserService
  ) {
    this.previewing = new Track();
    this.loadCurrentPlayList();
    this.loadNextSongs();
  }

  private getTracks() {
    return [];
  }

  loadCurrentPlayList() {
    Promise.resolve(this.tracks = this.getTracks());
  }

  addTrackToTrackList(trackId: String) {
    Promise.resolve(
      this.spotifyService.getTrack(trackId).subscribe(track => {
        var newtrack = new Track().deserialize(track);
        newtrack.upVote(this.userService.user);
        this.tracks.push(newtrack);
        if (this.currentlyPlaying) {
          this.sortTracks();
        } else {
          this.loadNextSongs();
          this.playCurrentSong();
        }
      })
    );
  }

  playStopPreview(track: Track) {
    if (!this.previewing || track.id !== this.previewing.id) {
      this.previewing.stopPreview();
      this.previewing = track;
      this.previewing.loadPreview();
    }

    if (this.previewing.preview.paused) {
      this.previewing.playPreview();
    } else {
      this.previewing.pausePreview();
    }
  }

  private loadNextSongs() {
    let tracksList: string[];
    if (this.tracks.length > 0) {
      tracksList = this.tracks
        .slice(0, this.QUEUE_SIZE)
        .reduce((prev, curr) => [...prev, curr.id], []);
      this.currentlyPlaying = this.tracks[0];
      if (this.tracks.length > 0) {
        this.tracks = this.tracks.slice(1);
      }
    }
    return tracksList;
  }

  playNextSong() {
    Promise.resolve(
      this.spotifyService.playTracks(this.loadNextSongs()).subscribe()
    ).then(value => this.playCurrentSong());
  }

  playCurrentSong() {
    Promise.resolve(
      this.spotifyService.playTrack(this.currentlyPlaying.id).subscribe()
    )
      .then(value =>
        this.spotifyService
          .updatePlay(this.currentlyPlaying.progress)
          .subscribe()
      )
      .then(value => {
        this.isPlaying = true;
        if (!this.isProgressing) {
          this.progress();
        }
      });
  }

  pauseCurrentSong() {
    Promise.resolve(this.spotifyService.pauseTrack().subscribe()).then(
      value => (this.isPlaying = false)
    );
  }

  progress() {
    const increaseAmount = 10;
    if (this.currentlyPlaying) {
      if (this.currentlyPlaying.progressPercentage < 100) {
        this.isProgressing = true;
        setTimeout(() => {
          this.currentlyPlaying.increaseProgress(increaseAmount);
          this.progress();
        }, increaseAmount);
      } else {
        this.isProgressing = false;
        this.playNextSong();
      }
    }
  }

  upVote(track: Track) {
    track.upVote(this.userService.user);
    this.sortTracks();
  }

  downVote(track: Track) {
    track.downVote(this.userService.user);
    this.sortTracks();
  }

  sortTracks() {
    this.tracks.sort(
      (previous, next) => next.voters.length - previous.voters.length
    );
  }
}
