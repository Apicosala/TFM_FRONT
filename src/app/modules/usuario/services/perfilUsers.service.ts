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
  private espUrl: string = "http://localhost:3000/api/especialidades/"

  httpClient = inject(HttpClient);

  constructor() { }

  getAlumnosByProfesorId(profesorId: number): Promise<SolicitudClase[]> {
    return lastValueFrom(this.httpClient.get<SolicitudClase[]>(`${this.baseUrl}${profesorId}/alumnos`));
  }

  getById(usuarioId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}${usuarioId}`);
  }

  update(usuario: IUser) : Promise<IUser> {
    console.log(usuario)
    return lastValueFrom(this.httpClient.put<IUser>(`${this.baseUrl}${usuario.id}`, usuario)); 
  }

  getAllEspecialidades():Promise<any[]>{
    console.log(this.espUrl)
    return lastValueFrom(this.httpClient.get<any>(`${this.espUrl}`))
  }

}
