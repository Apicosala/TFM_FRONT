import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListaProfesoresService {

  private baseUrlEspecialidades: string = "http://localhost:3000/api/especialidades";
  private baseUrlUsuarios: string = "http://localhost:3000/api/usuarios";

  httpClient = inject(HttpClient);

  constructor() {}

  getProfesoresByEspecialidadId(especialidadId: number): Promise<any[]> {
    return lastValueFrom(this.httpClient.get<any[]> (`${this.baseUrlEspecialidades}/${especialidadId}/profesores`));
  }

  getNombreEspecialidad(): Promise<any[]> {
    return lastValueFrom(this.httpClient.get<any[]> (`${this.baseUrlEspecialidades}`));
  }

  getPuntuacionesByProfesorId(profesorId: number): Promise<any[]> {
    return lastValueFrom(this.httpClient.get<any[]> (`${this.baseUrlUsuarios}/puntuaciones/${profesorId}`));
  }
}