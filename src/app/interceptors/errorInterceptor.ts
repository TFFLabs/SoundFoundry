import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { Session } from 'app/services/session.service';
import { MdSnackBar } from '@angular/material';
import { AuthorizationService } from 'app/services/authorization.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private authService: AuthorizationService;

  constructor(
    private router: Router,
    private session: Session,
    private injector: Injector,
    public snackBar: MdSnackBar
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).do(
      event => {},
      err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          const snackBarRef = this.snackBar.open(
            'Session expired, redirecting to login...',
            '',
            {
              duration: 2000
            }
          );
          snackBarRef.afterDismissed().subscribe(() => {
            this.session.clearSession();
            this.router.navigate(['']);
          });
        }
      }
    );
  }
}
