import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class SpotifyService {
  token: string;
  baseUrl: string = "https://api.spotify.com/";

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem("foundry-spotify-token");
  }

  private getAuthorizationHeader() {
    return {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token })
    };
  }

  public getUser(): Observable<Object> {
    return this.http.get(
      this.baseUrl + "v1/me",
      this.getAuthorizationHeader()
    );
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
}
