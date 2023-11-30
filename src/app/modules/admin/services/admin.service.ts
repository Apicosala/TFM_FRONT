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
          users.filter((user) => user.activo && user.rol === 'alumn')
        )
      );
  }

  deactivateStudent(id: number, student: IUser): Observable<IUser> {
    const url = `${this.baseUrl}/${id}`;
    const updatedStudent = { ...student, activo: false };

    return this.httpClient.put<IUser>(url, updatedStudent);
  }

  getAllActiveTeachers(): Observable<IUser[]> {
    return this.httpClient
      .get<IUser[]>(`${this.baseUrl}/todos`)
      .pipe(
        map((users) =>
          users.filter((user) => user.activo && user.rol === 'prof')
        )
      );
  }
  desactivateTeacher(id: number, teacher: IUser): Observable<IUser> {
    const url = `${this.baseUrl}/${id}`;
    const updatedTeacher = { ...teacher, activo: false };

    return this.httpClient.put<IUser>(url, updatedTeacher);
  }
}
