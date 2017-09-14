import { Injectable } from '@angular/core';
import { Track } from '../models/track';
import { SpotifyService } from 'app/services/spotify.service';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'app/models/user';
import { UserService } from 'app/services/user.service';
import { Room } from 'app/models/room';
import { Http } from '@angular/http';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { StompService } from 'ng2-stomp-service';
import { AuthorizationService } from 'app/services/authorization.service';
import { environment } from '../../environments/environment';
import { EventsService } from '../services/events.service';
import { PlaybackContext } from 'app/models/playback_context';

@Injectable()
export class PlaylistService {
  isPlaying: boolean;
  previewing: Track;
  room: Room = new Room();
  tracks: Track[] = [];
  private server_address = environment.sf_server_address;
  private time_difference_tolerance_ms = 2000;

  constructor(
    private authorizationService: AuthorizationService,
    private spotifyService: SpotifyService,
    private userService: UserService,
    private http: Http,
    private socketListener: StompService,
    private eventsService: EventsService
  ) {
    // This shall come from the routing call in a future
    const roomName = 'myroom';
    this.previewing = new Track();

    // get the user
    this.userService.loadUser();

    // get initial room values
    this.http
      .get(this.server_address + '/room/' + roomName, {})
      .toPromise()
      .then(response => {
        this.room.deserialize(response.json());

        // Get initial track list
        this.http
          .get(this.server_address + '/room/' + roomName + '/track', {})
          .toPromise()
          .then(trakcResponse => {
            this.tracks = trakcResponse
              ? trakcResponse.json().map(value => new Track().deserialize(value))
              : [];
          });

        // Once we have the initial values, proceed with socket configuration
        socketListener.configure({
          host: this.server_address + '/soundfoundry-socket',
          debug: false,
          queue: { init: false }
        });

        // start socket connection
        socketListener.startConnect().then(() => {
          socketListener.done('init');
          // subscribe socket to the specific room topic feed
          socketListener.subscribe(
            '/topic/room/' + this.room.name,
            this.process_room_feed,
            {
              user: {
                id: this.userService.user.display_name,
                name: this.userService.user.display_name,
                img_url: this.userService.user.thumbnail_small
              }
            }
          );

          // subscribe socket to the specific room tracks list feed
          socketListener.subscribe(
            '/topic/room/' + this.room.name + '/tracks',
            this.process_tracks_feed
          );
        });
      });
  }

  private process_room_feed = data => {
    if (this.room.name) {
      const aux = new Room().deserialize(data);
      const send_play_signal =
        this.room.currently_playing && aux.currently_playing
          ? this.room.currently_playing.id !== aux.currently_playing.id
          : true;
      this.room.currently_playing = aux.currently_playing;
      if (send_play_signal) {
        this.playCurrentSong();
        this.authorizationService.refreshToken();
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
        const newtrack = new Track().deserialize(track);
        const artist = newtrack.artists[0] ? newtrack.artists[0].name : '';
        this.eventsService.sendAddTrackEvent(this.userService.user.id, newtrack.name, artist);
        newtrack.voters.push(this.userService.user);
        this.http
          .post(
          this.server_address + '/room/' + this.room.name + '/track/',
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
      this.spotifyService
        .playTracks(this.room.currently_playing.id, this.tracks.map(value => value.id).slice(1, 5))
        .subscribe(() => {
          this.spotifyService.getCurrentlyPlayingTrack().subscribe(playback_context => {
            const pb_context = new PlaybackContext().deserialize(playback_context);
            // if the progress difference is more than X seconds, seek current progress
            const progress_diference = Math.abs(pb_context.progress_ms - this.room.currently_playing.progress);
            if (progress_diference > this.time_difference_tolerance_ms) {
              this.spotifyService
                .updatePlay(this.room.currently_playing.progress)
                .subscribe();
            }
          }
          );
          this.isPlaying = true;
        }
        )
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
      this.server_address +
      '/room/' +
      this.room.name +
      '/track/' +
      track.id +
      '/voter',
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
      this.server_address +
      '/room/' +
      this.room.name +
      '/track/' +
      track.id +
      '/voter/' +
      this.userService.user.id,
      {}
      )
      .toPromise();
  }
}
