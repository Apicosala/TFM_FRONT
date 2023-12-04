import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IUser } from 'src/app/core/models/user.interface';




@Injectable({
  providedIn: 'root'
})
export class ClasesAlumnosService {

  private baseUrl: string = "http://localhost:3000/api/usuarios/";

  httpClient = inject(HttpClient);
  profesores: IUser[] = [];


  constructor() { }

  getClasesByUsuarioId(usuarioId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/clases/${usuarioId}`));
  }

  getProfesorById(profesorId: number): Promise<IUser>{
    return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}${profesorId}`));
  } 
}