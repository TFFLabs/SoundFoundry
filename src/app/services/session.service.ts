import { Injectable } from "@angular/core";

/** this shall not use any HTTP method, directy or indirectly, this is 
 * this way so that we can use it in the error handler, this service is
 * pretty much a session handler*/
@Injectable()
export class Session {
  token: string;
  constructor() {}
}
