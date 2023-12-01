import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IForo } from 'src/app/core/models/foro.interface';

@Injectable({
  providedIn: 'root'
})
export class ForoUsuarioService {

  private baseUrl: string = "http://localhost:3000/api/usuarios/";

  httpClient = inject(HttpClient);

  constructor() { }

  insert(mensaje: IForo): Promise<IForo> {

       return lastValueFrom(this.httpClient.post<IForo>(`${this.baseUrl}${mensaje.profesor_id}/foro/${mensaje.alumno_id}`, mensaje));
       
  }


}
