import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';




@Injectable({
    providedIn: 'root'
})
export class PeticionClasesService {

    private baseUrl: string = "http://localhost:3000/api/usuarios/";

    httpClient = inject(HttpClient);

    constructor() { }

    // Metodo para cancelar la conexion profesor-alumno
    cancelarSolicitud(usuarioId: number): Promise<any> {

        const profesorId = 20;

        return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${profesorId}/alumnos/${usuarioId}`));

    }
}