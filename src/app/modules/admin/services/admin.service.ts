import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from 'src/app/core/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl: string = 'http://localhost:3000/api/usuarios';

  constructor(private httpClient: HttpClient) {}

  getAllActiveStudents(): Observable<IUser[]> {
    return this.httpClient
      .get<IUser[]>(`${this.baseUrl}/todos`)
      .pipe(
        map((users) =>
          users.filter((user) => user.activo === true && user.rol === 'alumn')
        )
      );
  }

  deactivateStudent(id: number): Observable<IUser> {
    const url = `${this.baseUrl}/${id}`;
    const deactivateStudent = { activo: false };

    return this.httpClient.put<IUser>(url, deactivateStudent);
  }
}
