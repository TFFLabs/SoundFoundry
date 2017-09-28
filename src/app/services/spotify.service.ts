import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Session } from 'app/services/session.service';

@Injectable()
export class SpotifyService {
  baseUrl = 'https://api.spotify.com/';
  constructor(private http: HttpClient, private session: Session) {}

  private getAuthorizationHeader() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.session.access_token
      })
    };
  }

  public getUser(): Promise<Object> {
    return this.http
      .get(this.baseUrl + 'v1/me', this.getAuthorizationHeader())
      .toPromise();
  }

  public getUserDevices(): Promise<Object> {
    return this.http
      .get(this.baseUrl + 'v1/me/player/devices', this.getAuthorizationHeader())
      .toPromise();
  }

  public getCurrentPlaybackStatus(): Promise<Object> {
    return this.http
      .get(this.baseUrl + 'v1/me/player', this.getAuthorizationHeader())
      .toPromise();
  }

  public getCurrentlyPlayingTrack(): Promise<Object> {
    return this.http
      .get(
        this.baseUrl + 'v1/me/player/currently-playing',
        this.getAuthorizationHeader()
      )
      .toPromise();
  }

  public getTrack(trackId: String): Promise<Object> {
    return this.http
      .get(this.baseUrl + 'v1/tracks/' + trackId, this.getAuthorizationHeader())
      .toPromise();
  }

  public playTracks(track: string, upcomingTracks: string[]): Promise<Object> {
    const tracks_to_play = upcomingTracks.map(
      value => 'spotify:track:' + value
    );
    tracks_to_play.unshift('spotify:track:' + track);
    return this.http
      .put(
        this.baseUrl + 'v1/me/player/play',
        { uris: tracks_to_play },
        this.getAuthorizationHeader()
      )
      .toPromise();
  }

  public updatePlay(progress: number): Promise<Object> {
    return this.http
      .put(
        this.baseUrl + 'v1/me/player/seek?position_ms=' + progress,
        {},
        this.getAuthorizationHeader()
      )
      .toPromise();
  }

  public pauseTrack(): Promise<Object> {
    return this.http
      .put(
        this.baseUrl + 'v1/me/player/pause',
        {},
        this.getAuthorizationHeader()
      )
      .toPromise();
  }
}
