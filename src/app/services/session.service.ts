import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

/** this shall not use any HTTP method, directy or indirectly, this is
 * this way so that we can use it in the error handler, this service is
 * pretty much a session handler*/
@Injectable()
export class Session {
  static STORAGE_CODE_KEY = 'sf_spotify_code';
  static COOKIE_NAME = 'sf_session';

  code: string;
  access_token: string;
  refresh_token: string;

  constructor(private cookieService: CookieService) { }

  public initTokens(token: any) {
    this.access_token = token.access_token ? token.access_token : this.access_token;
    this.refresh_token = token.refresh_token ? token.refresh_token : this.refresh_token;
    this.cookieService.set(Session.COOKIE_NAME, this.getCookieValue());
  }

  public hasActiveSession() {
    return this.cookieService.get(Session.COOKIE_NAME);
  }

  public clearSession() {
    this.cookieService.delete(Session.COOKIE_NAME);
  }

  public initFromCookieValue() {
    if (this.hasActiveSession()) {
      const sessionValues = this.cookieService.get(Session.COOKIE_NAME).split('|');
      this.code = sessionValues[0];
      this.access_token = sessionValues[1];
      this.refresh_token = sessionValues[2];
    }
  }

  private getCookieValue() {
    return  this.code + '|' + this.access_token + '|' + this.refresh_token;
  }
}
