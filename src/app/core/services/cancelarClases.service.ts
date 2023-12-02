import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class CancelacionClasesService {

    private baseUrl: string = "http://localhost:3000/api/usuarios/";

    httpClient = inject(HttpClient);

    constructor() { }

    //Obtenemos datos de las clases del usuario.
    obtenerDatosClases(alumnoId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}${alumnoId}/clases`)
    }

    // /:profesorId/alumnos

    // Método para cancelar la clase con un profesor.
    terminarClases (profesorId: number,alumnoId:number): Promise<any> {
        
        return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${profesorId}/alumnos`)
        )};
    
}