import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, firstValueFrom } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from 'src/app/core/models/decodedToken.interface';

type FormLoginValue = { email: string; password: string };
type FormLoginResponse = { success: string; token: string; fatal: string };
type FormRegisterValue = {
  nombre: string;
  apellidos: string;
  mail: string;
  pass: string;
  rol: string;
};
type FormRegisterResponse = { success: string; token: string; fatal: string };

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = 'http://localhost:3000/api/usuarios';
  private httpClient = inject(HttpClient);
  token: string | null;
  userId: number | null;
  tokenChange = new Subject<string | null>();

  constructor() {
    this.token = localStorage.getItem('auth_token');
    this.userId = localStorage.getItem('userId')
      ? Number(localStorage.getItem('userId'))
      : null;
  }

  login(values: FormLoginValue): Promise<FormLoginResponse> {
    return firstValueFrom(
      this.httpClient.post<FormLoginResponse>(`${this.baseUrl}/login`, values)
    ).then((response) => {
      this.token = response.token;
      this.tokenChange.next(this.token);
      return response;
    });
  }

  register(values: FormRegisterValue) {
    return firstValueFrom(
      this.httpClient.post<FormRegisterResponse>(
        `${this.baseUrl}/register`,
        values
      )
    ).then((response) => {
      this.token = response.token;
      this.tokenChange.next(this.token);
      return response;
    });
  }

  isAdmin(): boolean {
    let token = localStorage.getItem('auth_token');
    let decodedToken: DecodedToken = jwtDecode(token!);
  
    return decodedToken.user_rol === 'admin';
  }

  
  isTeacher(): boolean {
    let token = localStorage.getItem('auth_token');
    let decodedToken: DecodedToken = jwtDecode(token!);
  
    return decodedToken.user_rol === 'prof';

  }
  
  isLogged(): boolean {
    return localStorage.getItem('auth_token') ? true : false;
  }

  logOut() {
    this.token = null;
    this.tokenChange.next(null);
    localStorage.removeItem('auth_token');
  }

  clearUserId() {
    this.userId = null;
    localStorage.removeItem('userId');
  }
}
