import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Session } from "app/services/session.service";

@Injectable()
export class SpotifyService {
  baseUrl: string = "https://api.spotify.com/";
  constructor(private http: HttpClient, private session: Session) { }

  private getAuthorizationHeader() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.session.access_token
      })
    };
  }

  public getUser(): Observable<Object> {
    return this.http.get(this.baseUrl + "v1/me", this.getAuthorizationHeader());
  }

  public getUserDevices(): Observable<Object> {
    return this.http.get(
      this.baseUrl + "v1/me/player/devices",
      this.getAuthorizationHeader()
    );
  }

  public getTrack(trackId: String): Observable<Object> {
    return this.http.get(
      this.baseUrl + "v1/tracks/" + trackId,
      this.getAuthorizationHeader()
    );
  }

  public playTracks(tracks: string[]): Observable<Object> {
    return this.http.put(
      this.baseUrl + "v1/me/player/play",
      { uris: tracks.map(value => (value = "spotify:track:" + value)) },
      this.getAuthorizationHeader()
    );
  }

  public playTrack(track: string): Observable<Object> {
    return this.http.put(
      this.baseUrl + "v1/me/player/play",
      { uris: ["spotify:track:" + track] },
      this.getAuthorizationHeader()
    );
  }

  public updatePlay(progress: number): Observable<Object> {
    return this.http.put(
      this.baseUrl + "v1/me/player/seek?position_ms=" + progress,
      {},
      this.getAuthorizationHeader()
    );
  }

  public pauseTrack(): Observable<Object> {
    return this.http.put(
      this.baseUrl + "v1/me/player/pause",
      {},
      this.getAuthorizationHeader()
    );
  }
}
