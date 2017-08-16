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

  constructor(
    private spotifyService: SpotifyService,
    private userService: UserService,
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase
  ) {
    this.previewing = new Track();
    this.roomz = af.object("/room/-Krb0j60wo1DSaS9Ww1x");
    this.roomz.subscribe(d => {
      this.room = new Room().deserialize(d);
      if (!this.isProgressing) {
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

        if (!this.room.currentlyPlaying) {
          this.playNextSong();
        }
      })
    );
  }

  /**
   * Loads and reproduce the preview of a track
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
    Promise.resolve(
      this.spotifyService.playTrack(this.room.currentlyPlaying.id).subscribe()
    )
      .then(() =>
        this.spotifyService
          .updatePlay(Math.round(this.room.currentlyPlaying.progress))
          .subscribe()
      )
      .then(() => {
        this.isPlaying = true;
        if (!this.isProgressing) {
          this.progress();
        }
      });
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
    let syncFrequencyPercentage = 10;
    if (this.room.currentlyPlaying) {
      if (this.room.currentlyPlaying.progressPercentage < 100) {
        this.isProgressing = true;
        setTimeout(() => {
          this.room.currentlyPlaying.increaseProgress(increaseAmount);
          if (
            this.room.currentlyPlaying.progressPercentage >
            syncFrequencyPercentage
          ) {
            this.roomz
              .update(
                this.sanitizeObject({
                  currentlyPlaying: this.room.currentlyPlaying
                })
              )
              .then(() => this.progress());
            syncFrequencyPercentage += syncFrequencyPercentage;
          } else {
            this.progress();
          }
        }, increaseAmount);
      } else {
        this.isProgressing = false;
        this.room.currentlyPlaying = null;
        this.playNextSong();
      }
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
    if(track.voters.length <= 0){
      this.room.tracks.splice(this.room.tracks.indexOf(track), 1);
    }
    this.sortTracks();
  }

  /**
   * Sort the queue in descendant order by  votes quantity.
   * [syncs to firebase]
   */
  private sortTracks() {
    this.room.tracks.sort(
      (previous, next) => next.voters.length - previous.voters.length
    );
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
          if (this.room.tracks.length > 0) {
            this.room.currentlyPlaying = this.room.tracks[0];
            this.room.tracks = this.room.tracks.slice(1);
            this.roomz.update(this.sanitizeObject(this.room));
          }
        })
        .then(() => this.playCurrentSong());
    }
  }

  /**
   * Returns an array containing the next songs to be sent to spotify client.
   */
  private loadNextSongs(): string[] {
    let tracksList: string[] = [];
    if (this.room.tracks.length > 0) {
      tracksList = this.room.tracks
        .slice(0, this.room.queueSize)
        .reduce((prev, curr) => [...prev, curr.id], []);
    }
    return tracksList;
  }
}
