import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { SpotifyService } from 'app/services/spotify.service';
import { Session } from 'app/services/session.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthorizationService {
  loginDialog: LoginDialog;
  isAuthenticationCompleted: boolean;
  authenticationDialog: Window;
  storageChangedBehavior: any;
  popup_url;

  constructor(private http: HttpClient, private session: Session) {
    this.loginDialog = new LoginDialog();
    this.isAuthenticationCompleted = false;
    this.http
      .get(environment.sf_server_address + '/spotify/auth/url')
      .subscribe(url => {
        this.popup_url = url;
      });
  }

  logout() {
    this.session.clearSession();
  }

  login() {
    const loginPromise = new Promise((resolve, reject) => {
      this.authenticationDialog = this.openAuthenticationDialog(reject);
      this.storageChangedBehavior = this.getStorageChangedFunction(resolve);
      window.addEventListener('storage', this.storageChangedBehavior, false);
    });
    return Observable.fromPromise(loginPromise).catch(this.handleError);
  }

  private getStorageChangedFunction(resolve) {
    return event => {
      if (event.key === Session.STORAGE_CODE_KEY) {
        if (this.authenticationDialog) {
          this.authenticationDialog.close();
        }
        this.isAuthenticationCompleted = true;
        window.removeEventListener('storage', this.storageChangedBehavior, false);
        this.session.code = event.newValue;
        this.getToken();
        return resolve(event.newValue);
      }
    };
  }

  private openAuthenticationDialog(reject) {
    const win = window.open(
      this.popup_url.url,
      this.loginDialog.name,
      this.loginDialog.options
    );
    const interval = window.setInterval(() => {
      try {
        if (!win || win.closed) {
          window.clearInterval(interval);
          this.loginDialog.callReject(reject, this.isAuthenticationCompleted);
        }
      } catch (e) {}
    }, 1000000);
    return win;
  }

  private getToken(): Promise<void> {
    setTimeout(this.getToken(), 3000000);
    return this.http
      .post(environment.sf_server_address + '/spotify/auth/token', this.session)
      .toPromise()
      .then(session => {
        this.session.initTokens(session);
      });
  }

  public refreshToken(): Promise<void> {
    return this.http
      .put(environment.sf_server_address + '/spotify/auth/token', this.session)
      .toPromise()
      .then(session => {
        this.session.initTokens(session);
      });
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json() || 'Server error');
  }
}

class LoginDialog {
  w = 400;
  h = 500;
  left = screen.width / 2 - 200; // Dialog widht is 400
  top = screen.height / 2 - 250; // Dialog height is 500

  name = 'Spotify';
  options = 'menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,width=' +
    this.w +
    ',height=' +
    this.h +
    ',top=' +
    this.top +
    ',left=' +
    this.left;

  callReject(reject, authCompleted) {
    if (!authCompleted) {
      return reject('Login rejected error');
    }
  }
}
