import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { PayLoad } from './interfaces/pay-load';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('auth_token');

    if (token) {
      const tokenWithBearer = `Bearer ${token}`;
      request = request.clone({
        setHeaders: {
          authorization: tokenWithBearer,
        },
      });
    }

    return next.handle(request);
  }
}
