import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { IClases } from '../models/datosClases.interface';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  private baseUrl: string = "http://localhost:3000/api/usuarios/";

  httpClient = inject(HttpClient);

  constructor() { }

  //GET
  // Metodo para recuperar las especialidades
  getEspecialidadesByProfesorId(profesorId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}especialidades/${profesorId}`));
  }

  // Metodo para recuperar los datos del profesor
  getDatosProfesor(profesorId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}conexion/${profesorId}`))
  }

  // Metodo para recuperar los datos del alumno
  getDatosUsuario(usuarioId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}${usuarioId}`))
  }

  //Obtenemos datos de las clases del usuario.
  obtenerDatosClases(alumnoId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/clases/${alumnoId}`)
  }

  // Metodo para recuperar las clases del alumno
  obtenerClasesProfesorIdAlumnoId(profesorId: number, alumnoId: number, especialidadId: number): Observable<IClases[]> {
    return this.httpClient.get<IClases[]>(`${this.baseUrl}/clases/${profesorId}&${alumnoId}`)
  }


  getFechaByClases(profesorId: number, alumnoId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}clases/${profesorId}&${alumnoId}`))
  }


  //PUT      

  // Metodo para aceptar la conexion profesor-alumno
  aceptarSolicitud(profesorId: number, alumnoId: number, especialidadId: number): Promise<any> {

    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}clases/${profesorId}&${alumnoId}&${especialidadId}`, {}))
      .then(response => {
        if (response.succes) {
          response.activo = true;
        }
        return response;
      })
  }

  //DELETE

  // Metodo para cancelar la conexion profesor-alumno
  cancelarSolicitud(profesorId: number, alumnoId: number, especialidadId: number): Promise<any> {

    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}conexion/${profesorId}&${alumnoId}&${especialidadId}`)
    )
  };

  // Método para cancelar la clase con un profesor.
  terminarClases(profesorId: number, alumnoId: number, especialidadId: number): Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}conexion/${profesorId}&${alumnoId}&${especialidadId}`)
    )
  };
}
