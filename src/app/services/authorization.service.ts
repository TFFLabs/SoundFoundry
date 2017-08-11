import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { SpotifyService } from "app/services/spotify.service";
import { Session } from "app/services/session.service";

export interface AuthorizationToken {
  value?: string,
}

@Injectable()
export class AuthorizationService {

  constructor(@Inject("AuthorizationToken") private authToken: AuthorizationToken, private session: Session, private spotifyService: SpotifyService) { }

  login(){
    const promise = new Promise((resolve, reject) => {
      var w = 400,
        h = 500,
        left = (screen.width / 2) - (w / 2),
        top = (screen.height / 2) - (h / 2);

      var params = {
        client_id: 'd871ff65e9d94a08b33dd064cc879637',
        redirect_uri: 'http://localhost:4200/auth_callback',
        scope: 'user-read-playback-state user-follow-modify user-follow-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify user-read-private',
        response_type: 'token'
      };
      var authCompleted = false;
      var authWindow = this.openDialog(
        'https://accounts.spotify.com/authorize?' + this.toQueryString(params),
        'Spotify',
        'menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,width=' + w + ',height=' + h + ',top=' + top + ',left=' + left,
        () => {
          console.log('AUTH: ' + authCompleted);
          if (!authCompleted) {
            return reject('Login rejected error');
          }
        }
      );

      var storageChanged = (e) => {
        if (e.key === 'foundry-spotify-token') {
          if (authWindow) {
            authWindow.close();
          }
          authCompleted = true;
          this.authToken.value = e.newValue;
          window.removeEventListener('storage', storageChanged, false);
          this.session.token = e.newValue;
          return resolve(e.newValue);
        }
      };
      window.addEventListener('storage', storageChanged, false);
    });

    return Observable.fromPromise(promise).catch(this.handleError);
  }

  private toQueryString(obj: Object): string {
    var parts = [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
    };
    return parts.join('&');
  };

  private openDialog(uri, name, options, cb) {
    console.log(uri);
    var win = window.open(uri, name, options);
    var interval = window.setInterval(() => {
      try {
        if (!win || win.closed) {
          window.clearInterval(interval);
          cb(win);
        }
      } catch (e) { }
    }, 1000000);
    return win;
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json() || 'Server error');
  }


}
