import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Session } from 'app/services/session.service';

@Injectable()
export class SpotifyService {
  baseUrl = 'https://api.spotify.com/';
  constructor(private http: HttpClient, private session: Session) { }

  private getAuthorizationHeader() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.session.access_token
      })
    };
  }

  public getUser(): Observable<Object> {
    return this.http.get(this.baseUrl + 'v1/me', this.getAuthorizationHeader());
  }

  public getUserDevices(): Observable<Object> {
    return this.http.get(
      this.baseUrl + 'v1/me/player/devices',
      this.getAuthorizationHeader()
    );
  }

  public getCurrentPlaybackStatus() {
    return this.http.get(
      this.baseUrl + 'v1/me/player',
      this.getAuthorizationHeader()
    );
  }

  public getCurrentlyPlayingTrack() {
    return this.http.get(
      this.baseUrl + 'v1/me/player/currently-playing',
      this.getAuthorizationHeader()
    );
  }

  public getTrack(trackId: String): Observable<Object> {
    return this.http.get(
      this.baseUrl + 'v1/tracks/' + trackId,
      this.getAuthorizationHeader()
    );
  }

  public playTracks(track: string, upcomingTracks: string[]): Observable<Object> {
    const tracks_to_play = upcomingTracks.map(value => 'spotify:track:' + value);
    tracks_to_play.unshift('spotify:track:' + track);
    return this.http.put(
      this.baseUrl + 'v1/me/player/play',
      { uris: tracks_to_play},
      this.getAuthorizationHeader()
    );
  }

  public updatePlay(progress: number): Observable<Object> {
    return this.http.put(
      this.baseUrl + 'v1/me/player/seek?position_ms=' + progress,
      {},
      this.getAuthorizationHeader()
    );
  }

  public pauseTrack(): Observable<Object> {
    return this.http.put(
      this.baseUrl + 'v1/me/player/pause',
      {},
      this.getAuthorizationHeader()
    );
  }
}
