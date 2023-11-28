import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { IUser } from 'src/app/core/models/user.interface';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  arrStudents: IUser[] = [];

  constructor(private adminService: AdminService) {}

  async ngOnInit() {
    try {
      const response = await lastValueFrom(
        this.adminService.getAllActiveStudents()
      );
      this.arrStudents = response;
    } catch (error) {
      console.error('Error al cargar los estudiantes', error);
    }
  }

  async deactivateStudent(student: IUser) {
    try {
      await lastValueFrom(this.adminService.deactivateStudent(student.id));

      // Actualizar la lista de estudiantes después de desactivar
      await this.loadStudents();
      //TODO: Poner alerta?
      console.log('Estudiante desactivado con éxito');
    } catch (error) {
      console.error('Error al desactivar al estudiante', error);
    }
  }

  private async loadStudents() {
    try {
      const response = await lastValueFrom(
        this.adminService.getAllActiveStudents()
      );
      this.arrStudents = response;
    } catch (error) {
      console.error('Error al cargar los estudiantes', error);
    }
  }
  // Uso la librería de Angular Material para crear un acordeón con información adicional
  // Variable para rastrear los paneles abiertos
  expandedPanels: Set<number> = new Set<number>();

  // Método para alternar la expansión de un panel
  togglePanel(studentId: number) {
    if (this.expandedPanels.has(studentId)) {
      this.expandedPanels.delete(studentId);
    } else {
      this.expandedPanels.add(studentId);
    }
  }

  // Método para verificar si un panel está expandido
  isPanelExpanded(studentId: number): boolean {
    return this.expandedPanels.has(studentId);
  }
}

