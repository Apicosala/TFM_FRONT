import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  
  private baseUrl: string = "http://localhost:3000/api/usuarios/";
  
  httpClient = inject(HttpClient);

  constructor() { }

//GET
        // Metodo para recuperar las especialidades
        getEspecialidadesByProfesorId(profesorId: number): Observable<any>{
            return this.httpClient.get<any>(`${this.baseUrl}/especialidades/${profesorId}`);
        }

        //Obtenemos datos de las clases del usuario.
    obtenerDatosClases(alumnoId: number): Observable<any> {
      return this.httpClient.get<any>(`${this.baseUrl}/clases/${alumnoId}`)
      }

//PUT      

          // Metodo para aceptar la conexion profesor-alumno
    aceptarSolicitud(profesorId: number, alumnoId: number, especialidadId: number): Promise<any> {

      return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}clases/${profesorId}&${alumnoId}&${especialidadId}`, {} ))
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

      return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/conexion/${profesorId}&${alumnoId}&${especialidadId}`)
      )};
  
      // Método para cancelar la clase con un profesor.
      terminarClases (profesorId: number,alumnoId:number, especialidadId:number): Promise<any> {
          return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/conexion/${profesorId}&${alumnoId}&${especialidadId}`)
          )};
}