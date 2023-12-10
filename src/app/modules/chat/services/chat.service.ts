import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IForo } from 'src/app/core/models/foro.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl: string = 'http://localhost:3000/api/usuarios/';

  httpClient = inject(HttpClient); 

  constructor() { }

  insert(profesorId:number,alumnoId:number,comentarios:string): Promise<any> {
    const body = {comentarios}
    console.log(alumnoId)
      console.log(profesorId)
      console.log(comentarios)
    return lastValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}comentario/${profesorId}/foro/${alumnoId}`,body)
    );
  }
  getMensajes(profesorId: number, alumnoId: number): Promise<IForo[]> {
    return lastValueFrom(this.httpClient.get<IForo[]>(`${this.baseUrl}foro/${profesorId}&${alumnoId}`));
  }
}
