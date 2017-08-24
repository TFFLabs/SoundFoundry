import { Injectable } from "@angular/core";
import { Track } from "../models/track";
import { SpotifyService } from "app/services/spotify.service";
import { DomSanitizer } from "@angular/platform-browser";
import { User } from "app/models/user";
import { UserService } from "app/services/user.service";
import { Room } from "app/models/room";
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFireDatabase,
  FirebaseObjectObservable
} from "angularfire2/database";

@Injectable()
export class PlaylistService {
  isPlaying: boolean;
  previewing: Track;
  room: Room;
  roomz: FirebaseObjectObservable<Room>;
  isProgressing: boolean;
  currentlyPlayingId: string;
  isFirstLoad: boolean; //ugly aproach potential to refactor with observables

  constructor(
    private spotifyService: SpotifyService,
    private userService: UserService,
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase
  ) {
    this.isFirstLoad = true;
    this.previewing = new Track();
    this.subscribeRoom();
  }

  private subscribeRoom() {
    this.roomz = this.af.object("/room/-Krb0j60wo1DSaS9Ww1x");
    this.roomz.subscribe(d => {
      this.room = new Room().deserialize(d);
      if (this.isFirstLoad) {
        this.isFirstLoad = false;
        this.progress();
      }
    });
  }

  /**
   * Adds a new track to the list and upvote it
   * @param trackId 
   */
  addTrackToTrackList(trackId: String) {
    Promise.resolve(
      this.spotifyService.getTrack(trackId).subscribe(track => {
        var newtrack = new Track().deserialize(track);
        this.room.tracks.push(newtrack);
        this.upVote(newtrack);

        //If there is nothing being played, then play the next song (this one).
        if (!this.currentlyPlayingId) {
          this.playNextSong();
        }
      })
    );
  }

  /**
   * Loads and reproduce the preview of a track
   * [syncs to firebase]
   * @param track 
   */
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

  /**
   * Sends the play signal to the spotify client.
   */
  playCurrentSong() {
    if (this.currentlyPlayingId) {
      Promise.resolve(
        this.spotifyService.playTrack(this.room.tracks[0].id).subscribe()
      )
        .then(() =>
          this.spotifyService
            .updatePlay(Math.round(this.room.tracks[0].progress))
            .subscribe()
        )
        .then(() => {
          this.isPlaying = true;
          if (!this.isProgressing) {
            this.progress();
          }
        });
    }
  }

  /**
   * Pause the song reproduction in the client, this will not stop progress!.
   */
  pauseCurrentSong() {
    Promise.resolve(this.spotifyService.pauseTrack().subscribe()).then(
      () => (this.isPlaying = false)
    );
  }

  /**
   * Fires the process counter for the process bar.
   * [syncs to firebase]
   */
  private progress() {
    const increaseAmount = 1000;

    if (this.room.tracks[0]) {
      if (this.room.tracks[0].progressPercentage < 100) {
        this.isProgressing = true;
        setTimeout(() => {
          this.room.tracks[0].increaseProgress(increaseAmount);
          this.roomz
            .update(this.sanitizeObject(this.room))
            .then(() => this.progress());
        }, increaseAmount);
      } else {
        this.room.tracks = this.room.tracks.slice(1);
        this.roomz.update(this.sanitizeObject(this.room));
        this.isProgressing = false;
        this.playNextSong();
      }
    } else {
      this.playNextSong();
    }
  }

  /**
   * Adds the user vote from the specified track.
   * @param track 
   */
  upVote(track: Track) {
    track.upVote(this.userService.user);
    this.sortTracks();
  }

  /**
   * Removes user vote from the specified track.
   * @param track 
   */
  downVote(track: Track) {
    track.downVote(this.userService.user);
    if (track.voters.length <= 0) {
      this.room.tracks.splice(this.room.tracks.indexOf(track), 1);
    }
    this.sortTracks();
  }

  /**
   * Sort the queue in descendant order by  votes quantity.
   * [syncs to firebase]
   */
  private sortTracks() {
    if (this.room.tracks.length > 1) {
      var sortingAux: Track[] = [];
      sortingAux.push(this.room.tracks[0]);
      this.room.tracks = sortingAux.concat(
        this.room.tracks
          .slice(1)
          .sort((previous, next) => next.voters.length - previous.voters.length)
      );
    }
    this.roomz.update(this.sanitizeObject(this.room));
  }

  /**
   * Replace undefined values with null so that they can be save in firebase.
   * @param value object to be sanitized
   */
  private sanitizeObject(value) {
    return JSON.parse(
      JSON.stringify(value, function(k, v) {
        if (v === undefined) {
          return null;
        }
        return v;
      })
    );
  }

  /**
   * Sends the play signal to the spotify client, asign the currently playing and adjust the queue.
   * [syncs tracks to firebase]
   */
  private playNextSong() {
    if (this.room.tracks.length > 0) {
      Promise.resolve(
        this.spotifyService.playTracks(this.loadNextSongs()).subscribe()
      )
        .then(() => {
          var shallSync = this.currentlyPlayingId
            ? this.currentlyPlayingId == this.room.tracks[0].id
            : !this.currentlyPlayingId;
          if (shallSync) {
            this.currentlyPlayingId =
              this.room.tracks.length > 0 ? this.room.tracks[0].id : null;
            this.roomz.update(this.sanitizeObject(this.room));
          } else {
            this.currentlyPlayingId = this.room.tracks[0].id;
          }
        })
        .then(() => {
          this.playCurrentSong();
        });
    } else {
      this.currentlyPlayingId = null;
    }
  }

  /**
   * Returns an array containing the next songs to be sent to spotify client.
   */
  private loadNextSongs(): string[] {
    let tracksList: string[] = [];
    if (this.room.tracks.length > 1) {
      tracksList = this.room.tracks
        .slice(1, this.room.queueSize)
        .reduce((prev, curr) => [...prev, curr.id], []);
    }
    return tracksList;
  }
}
