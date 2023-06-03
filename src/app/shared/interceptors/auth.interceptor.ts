import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ) { }

  // check if the response is from the interal api
  checkInternalApi(url: string): boolean {
    return  url.includes(environment.API_ROOT)
  }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.authService.checkToken() && this.checkInternalApi(request.url as string)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
    }

    return next.handle(request).pipe(
      tap(() => { },
      (err: HttpErrorResponse) => {
          if (err.status !== 401) {
            return;
          }
          if (this.checkInternalApi(err.url as string)) {
            this.authService.logout();
          }
      }));
  }
}
