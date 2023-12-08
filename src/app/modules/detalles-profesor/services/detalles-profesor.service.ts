import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetallesProfesorService {
  
  private baseUrl: string = "http://localhost:3000/api/usuarios/";
  httpClient = inject(HttpClient);

  constructor() { }

  getById(usuarioId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}${usuarioId}`);
  }

  getEspecialidades(usuarioId: number): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}especialidades/${usuarioId}`)
  }

  getValoraciones(usuarioId: number): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}puntuaciones/${usuarioId}`)
  }

  createClase(profesorId: number,usuarioId: number, especialidadId: number,): Promise<any>{
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}solicitud/${profesorId}&${usuarioId}&${especialidadId}`, ''))    
  }

}
