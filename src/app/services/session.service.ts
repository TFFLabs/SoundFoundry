import { Injectable } from '@angular/core';

/** this shall not use any HTTP method, directy or indirectly, this is
 * this way so that we can use it in the error handler, this service is
 * pretty much a session handler*/
@Injectable()
export class Session {
  static STORAGE_CODE_KEY = 'foundry-spotify-code';
  static STORAGE_ACCESS_KEY = 'foundry-spotify-access';
  static STORAGE_REFRESH_KEY = 'foundry-spotify-refresh';

  code: string;
  access_token: string;
  refresh_token: string;

  constructor() { }

  public initFromStorage() {
    this.code = localStorage.getItem(Session.STORAGE_CODE_KEY);
    this.access_token = localStorage.getItem(Session.STORAGE_ACCESS_KEY);
    this.refresh_token = localStorage.getItem(Session.STORAGE_REFRESH_KEY);
  }

  public initTokens(token: any) {
    this.access_token = token.access_token ? token.access_token : this.access_token;
    this.refresh_token = token.refresh_token ? token.refresh_token : this.refresh_token;

    localStorage.setItem(Session.STORAGE_CODE_KEY, this.code);
    localStorage.setItem(Session.STORAGE_ACCESS_KEY, this.access_token);
    localStorage.setItem(Session.STORAGE_REFRESH_KEY, this.refresh_token);
  }

  public clearSession() {
    this.code = null;
    this.access_token = null;
    this.refresh_token = null;

    localStorage.setItem(Session.STORAGE_CODE_KEY, null);
    localStorage.setItem(Session.STORAGE_ACCESS_KEY, null);
    localStorage.setItem(Session.STORAGE_REFRESH_KEY, null);
  }
}
