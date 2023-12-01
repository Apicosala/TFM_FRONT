import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

type FormLoginValue = { email: string, password: string };
type FormLoginResponse = { success: string, token: string, fatal: string };
type FormRegisterValue = { nombre: string, apellidos: string, mail: string, pass: string, rol: string };
type FormRegisterResponse = { success: string; token: string; fatal: string };

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = 'http://localhost:3000/api/usuarios';
  private httpClient = inject(HttpClient);

  login(values: FormLoginValue): Promise<FormLoginResponse> {
    return firstValueFrom(
      this.httpClient.post<FormLoginResponse>(`${this.baseUrl}/login`, values)
    );
  }

  register(values: FormRegisterValue) {
    return firstValueFrom(
      this.httpClient.post<FormRegisterResponse>(`${this.baseUrl}/register`, values)
    );
  }

  isLogged(): boolean {
    return localStorage.getItem('auth_token') ? true : false;
  }
}
