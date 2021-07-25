import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { AuthService } from '../core/auth/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.getToken()) {
      req = this.addToken(req, this.authService.getToken());
    }
    return next.handle(req).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        this.authService.logOut();
        return EMPTY;
      }
      else {
        return throwError(error)
      }

    }));

  }

  private addToken(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        'a-token': token,
        'Access-Control-Allow-Origin': '*'
      },
    })
  }

}
