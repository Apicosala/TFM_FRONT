import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PpalService {
  private espUrl: string = "http://localhost:3000/api/especialidades/"
  httpClient = inject(HttpClient);

  getAllEspecialidades():Promise<any[]>{
    console.log(this.espUrl)
    return lastValueFrom(this.httpClient.get<any>(`${this.espUrl}`))
  }
}
