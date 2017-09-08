import { Injectable } from '@angular/core';

/** this shall not use any HTTP method, directy or indirectly, this is
 * this way so that we can use it in the error handler, this service is
 * pretty much a session handler*/
@Injectable()
export class Session {
  code: string;
  access_token: string;
  refresh_token: string;
  redirect_uri = 'http://localhost:4200/auth_callback';

  constructor() { }

  public initTokens(token: any) {
    this.access_token = token.access_token ? token.access_token : this.access_token;
    this.refresh_token = token.refresh_token ? token.refresh_token : this.refresh_token;
  }
}
