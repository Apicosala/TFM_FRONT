import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListaProfesoresService {

  private baseUrl: string = "http://localhost:3000/api/especialidades";

  httpClient = inject(HttpClient);

  constructor() {}

  getProfesoresByEspecialidadId(especialidadId: number): Promise<any[]> {
    return lastValueFrom(this.httpClient.get<any[]> (`${this.baseUrl}/${especialidadId}/profesores`));
  }

  getNombreEspecialidad(): Promise<any[]> {
    return lastValueFrom(this.httpClient.get<any[]> (`${this.baseUrl}`));
  }
}