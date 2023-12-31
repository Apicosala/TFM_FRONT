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
  private especialidadesUrl: string = "http://localhost:3000/api/especialidades/"
  

  httpClient = inject(HttpClient);

  constructor() { }

  // GET

  // recupera los alumnos de un profesor
  getAlumnosByProfesorId(profesorId: number): Promise<SolicitudClase[]> {
    return lastValueFrom(this.httpClient.get<SolicitudClase[]>(`${this.baseUrl}${profesorId}/alumnos`));
  }

  // recupera las especialidades de un profesor
  getEspecialidadesByProfesorId(profesorId: number): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}especialidades/${profesorId}`);
  }

  // recupera los datos de un usuario segun su Id
  getById(usuarioId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}${usuarioId}`);
  }

  getLocation(): Promise<any>{
    return lastValueFrom(this.httpClient.get<any>(`${this.locationUrl}`));
  }

  // PUT

  // Actualiza los datos de un usuario desde perfil de Admin
  update(usuario: IUser) : Promise<any> {
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}${usuario.id}`, usuario)); 
  } 

  // Actualiza los datos de un usuario desde el formulario
  updateForm(usuario: IUser) : Promise<any> {
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}form/${usuario.id}`, usuario)); 
  }

  sendRequest(user:any): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}${user.id}`, user));
  }

  // Crea especialidades para un profesor
  createEspecialidad(usuarioId: number, especialidadId: number) : Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(`${this.especialidadesUrl}${usuarioId}&${especialidadId}`, '')); 
  }

  // Elimina especialidades para un profesor
  deleteEspecialidad(usuarioId: number, especialidadId: number) : Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}especialidades/${usuarioId}&${especialidadId}`)); 
  }

}