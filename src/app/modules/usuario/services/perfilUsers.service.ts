import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { SolicitudClase } from 'src/app/core/models/peticion.interface';

import { IUser } from 'src/app/core/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class perfilUsersService {

  private baseUrl: string = "http://localhost:3000/api/usuarios/"
  private locationUrl: string = "https://ipapi.co/json/"
  

  httpClient = inject(HttpClient);

  constructor() { }

  // GET

  // recupera los alumnos de un profesor
  getAlumnosByProfesorId(profesorId: number): Promise<SolicitudClase[]> {
    return lastValueFrom(this.httpClient.get<SolicitudClase[]>(`${this.baseUrl}${profesorId}/alumnos`));
  }
  // recupera los datos de un usuario segun su Id
  getById(usuarioId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}${usuarioId}`);
  }

  getLocation(): Promise<any>{
    return lastValueFrom(this.httpClient.get<any>(`${this.locationUrl}`));
  }

  // PUT

  // Actualiza los datos de un usuario
  update(usuario: IUser) : Promise<any> {
    return lastValueFrom(this.httpClient.put<IUser>(`${this.baseUrl}${usuario.id}`, usuario)); 
  } 

}