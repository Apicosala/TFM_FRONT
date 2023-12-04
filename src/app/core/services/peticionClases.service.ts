import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { IEspecialidad } from '../models/Especialidad.interface';


@Injectable({
    providedIn: 'root'
})
export class PeticionClasesService {

    private baseUrl: string = "http://localhost:3000/api/usuarios/";
    private baseUrlEspecialidades: string = "http://localhost:3000/api/especialidades/";

    httpClient = inject(HttpClient);

    constructor() { }

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


    // Metodo para cancelar la conexion profesor-alumno
    cancelarSolicitud(profesorId: number, alumnoId: number, especialidadId: number): Promise<any> {

        return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/conexion/${profesorId}&${alumnoId}&${especialidadId}`)
        )};


        // Metodo para recuperar las especialidades
        getEspecialidadesByProfesorId(profesorId: number): Observable<any>{
            return this.httpClient.get<any>(`${this.baseUrl}/especialidades/${profesorId}`);
        }
    }
