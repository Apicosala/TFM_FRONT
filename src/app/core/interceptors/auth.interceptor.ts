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
<<<<<<< HEAD

      // Decodifica el token JWT para obtener el userId y el user_rol
      const decodedToken = jwtDecode<PayLoad>(token);
      const userId = decodedToken.user_id;
      const userRol = decodedToken.user_rol;
      // Agrega el userId y el user_rol a la cabecera de la solicitud HTTP
      request = request.clone({
        setHeaders: {
          usuarioId: userId,
          usuarioRol: userRol,
        },
      });
=======
>>>>>>> 8aab7f0a605af1bb0703171823b34c43092e9097
    }

    return next.handle(request);
  }
}
