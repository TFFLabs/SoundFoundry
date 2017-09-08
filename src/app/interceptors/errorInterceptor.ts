import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import { Router } from "@angular/router";
import { Session } from "app/services/session.service";
import { MdSnackBar } from "@angular/material";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private session: Session,
    public snackBar: MdSnackBar
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).do(
      event => {},
      err => {
        if (err instanceof HttpErrorResponse && err.status == 401) {
          let snackBarRef = this.snackBar.open("Session expired, redirecting to login...", "",{
            duration: 1500
          });
          snackBarRef.afterDismissed().subscribe(() => {
            this.session.access_token = null;
            this.router.navigate(['/landing']);
          });
        }
      }
    );
  }
}
