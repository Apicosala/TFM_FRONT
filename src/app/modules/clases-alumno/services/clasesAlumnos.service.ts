import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class ClasesAlumnosService {

  private baseUrl: string = "http://localhost:3000/api/usuarios/";

  httpClient = inject(HttpClient);

  constructor() { }

}