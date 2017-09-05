import { Injectable } from "@angular/core";
import { Track } from "../models/track";
import { SpotifyService } from "app/services/spotify.service";
import { DomSanitizer } from "@angular/platform-browser";
import { User } from "app/models/user";
import { UserService } from "app/services/user.service";
import { Room } from "app/models/room";
import { Http } from "@angular/http";

import * as Stomp from "stompjs";
import * as SockJS from "sockjs-client";
import { StompService } from "ng2-stomp-service";

@Injectable()
export class PlaylistService {
  isPlaying: boolean;
  previewing: Track;
  room: Room = new Room();
  tracks: Track[] = [];

  constructor(
    private spotifyService: SpotifyService,
    private userService: UserService,
    private http: Http,
    private socketListener: StompService
  ) {
    //This shall come from the routing call in a future
    let roomName = "myroom";
    this.previewing = new Track();
    let serverAddress = "https://soundfoundryserver.herokuapp.com"

    //get initial room values
    this.http
      .get("https://soundfoundryserver.herokuapp.com/room/" + roomName, {})
      .toPromise()
      .then(response => {
        this.room.deserialize(response.json());

        //Get initial track list
        this.http
          .get("https://soundfoundryserver.herokuapp.com/room/" + roomName + "/track", {})
          .toPromise()
          .then(response => {
            this.tracks = response
              ? response.json().map(value => new Track().deserialize(value))
              : [];
          });

        //Once we have the initial values, proceed with socket configuration
        socketListener.configure({
          host: "https://soundfoundryserver.herokuapp.com/soundfoundry-socket",
          debug: false,
          queue: { init: false }
        });

        //start socket connection
        socketListener.startConnect().then(() => {
          socketListener.done("init");

          //subscribe socket to the specific room topic feed
          socketListener.subscribe(
            "/topic/room/" + this.room.name,
            this.process_room_feed
          );

          //subscribe socket to the specific room tracks list feed
          socketListener.subscribe(
            "/topic/room/" + this.room.name + "/tracks",
            this.process_tracks_feed
          );
        });
      });
  }

  private process_room_feed = data => {
    if (this.room.name) {
      let aux = new Room().deserialize(data);
      let send_play_signal = this.room.currently_playing && aux.currently_playing?
        this.room.currently_playing.id !== aux.currently_playing.id : true;
      this.room.currently_playing = aux.currently_playing;
      if (send_play_signal) {
        this.playCurrentSong();
      }
    } else {
      this.room = new Room().deserialize(data);
    }
  };

  private process_tracks_feed = data => {
    if (this.room.name) {
      this.tracks = data
        ? data.map(value => new Track().deserialize(value))
        : [];
    } else {
      this.room = new Room().deserialize(data);
    }
  };

  /**
   * Adds a new track to the list and upvote it
   * @param trackId 
   */
  addTrackToTrackList(trackId: String) {
    Promise.resolve(
      this.spotifyService.getTrack(trackId).subscribe(track => {
        var newtrack = new Track().deserialize(track);
        newtrack.voters.push(this.userService.user);
        this.http
          .post(
            "https://soundfoundryserver.herokuapp.com/room/" + this.room.name + "/track/",
            newtrack
          )
          .toPromise();
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


  private playCurrentSong() {
    if (this.room.currently_playing && this.isPlaying) {
      Promise.resolve(
        this.spotifyService
          .playTrack(this.room.currently_playing.id)
          .subscribe()
      ).then(() => {
        this.spotifyService
          .updatePlay(this.room.currently_playing.progress)
          .subscribe();
      });
    }
  }

  /**
   * Sends the play signal to the spotify client.
   */
  playSong() {
    this.isPlaying = true;
    this.playCurrentSong();
  }

  /**
   * Pause the song reproduction in the client, this will not stop progress!.
   */
  pauseSong() {
    Promise.resolve(this.spotifyService.pauseTrack().subscribe()).then(
      () => (this.isPlaying = false)
    );
  }

  /**
   * Adds the user vote from the specified track.
   * @param track 
   */
  upVote(track: Track) {
    this.http
      .post(
        "https://soundfoundryserver.herokuapp.com/room/" +
          this.room.name +
          "/track/" +
          track.id +
          "/voter",
        this.userService.user
      )
      .toPromise();
  }

  /**
   * Removes user vote from the specified track.
   * @param track 
   */
  downVote(track: Track) {
    this.http
      .delete(
        "https://soundfoundryserver.herokuapp.com/room/" +
          this.room.name +
          "/track/" +
          track.id +
          "/voter/" +
          this.userService.user.id,
        {}
      )
      .toPromise();
  }
}
