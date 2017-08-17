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
  loginDialog : LoginDialog;
  isAuthenticationCompleted : boolean;
  authenticatinDialog : Window;
  storageChangedBehavior;

  constructor(@Inject("AuthorizationToken") private authToken: AuthorizationToken, private session: Session, private spotifyService: SpotifyService) { 
    this.loginDialog  = new LoginDialog();
    this.isAuthenticationCompleted = false;
  }

  login(){
    const loginPromise = new Promise((resolve, reject) => {
      this.authenticatinDialog = this.openAuthenticationDialog(reject);
      this.storageChangedBehavior = this.getStorageChangedFunction(resolve);
      window.addEventListener('storage', this.storageChangedBehavior, false);
    });
    return Observable.fromPromise(loginPromise).catch(this.handleError);
  }

  private getStorageChangedFunction(resolve) {
    return (event) => {
      if (event.key === 'foundry-spotify-token') {
        if (this.authenticatinDialog) {
          this.authenticatinDialog.close();
        }
        this.isAuthenticationCompleted = true;
        this.authToken.value = event.newValue;
        window.removeEventListener('storage', this.storageChangedBehavior, false);
        this.session.token = event.newValue;
        return resolve(event.newValue);
      }
    };
  }

  private paramsListToQueryString(paramsList: Object): string {
    var pathParams = [];
    for (let key in paramsList) {
      if (paramsList.hasOwnProperty(key)) {
        pathParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(paramsList[key]));
      }
    };
    return pathParams.join('&');
  };

  private openAuthenticationDialog(reject) {
    var win = window.open(this.loginDialog.url + this.paramsListToQueryString(this.loginDialog.params), this.loginDialog.name, this.loginDialog.options);
    var interval = window.setInterval(() => {
      try {
        if (!win || win.closed) {
          window.clearInterval(interval);
          this.loginDialog.callReject(reject, this.isAuthenticationCompleted);
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
 
class LoginDialog {
  w = 400;
  h = 500;
  left = (screen.width / 2) - (200); //Dialog widht is 400
  top = (screen.height / 2) - (250); //Dialog height is 500

  params = {
    client_id: 'd871ff65e9d94a08b33dd064cc879637',
    redirect_uri: 'http://soundfoundry.herokuapp.com/auth_callback',
    scope: 'user-read-playback-state user-follow-modify user-follow-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify user-read-private user-modify-playback-state',
    response_type: 'token'
  };

  url = 'https://accounts.spotify.com/authorize?';
  name = 'Spotify';
  options = 'menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,width=' + this.w + ',height=' + this.h + ',top=' + this.top + ',left=' + this.left;
  
  callReject(reject, authCompleted) {
    if (!authCompleted){
      return reject('Login rejected error');
    }
  }
}
