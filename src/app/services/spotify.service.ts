import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class SpotifyService {

  constructor(private http: Http) { }

  playTrack(trackId){
    return this.http.put('https://api.spotify.com/v1/me/player', {uris: `spotify:track:${trackId}`});
  }
}
