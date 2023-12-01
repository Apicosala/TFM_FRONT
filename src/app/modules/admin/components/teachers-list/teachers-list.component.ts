import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { IUser } from 'src/app/core/models/user.interface';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css'],
})
export class TeachersListComponent {
  arrTeachers: IUser[] = [];

  constructor(private adminService: AdminService) {}

  async ngOnInit() {
    try {
      const response = await lastValueFrom(
        this.adminService.getAllUnactiveTeachers()
      );
      this.arrTeachers = response;
    } catch (error) {
      console.error('Error al cargar los profesores', error);
    }
  }
  async activateTeacher(teacher: IUser) {
    try {
      await lastValueFrom(
        this.adminService.activateTeacher(teacher.id, teacher)
      );

      // Cargar los estudiantes después de desactivar
      await this.loadTeachers();

      // TODO: Poner alerta?
      console.log('Profesor activado con éxito');
    } catch (error) {
      console.error('Error al activar al profesor', error);
    }
  }

  private async loadTeachers() {
    try {
      const response = await lastValueFrom(
        this.adminService.getAllUnactiveTeachers()
      );
      this.arrTeachers = response;
      console.log(response);
    } catch (error) {
      console.error('Error al cargar los profesores', error);
    }
  }

  // Uso la librería de Angular Material para crear un acordeón con información adicional
  // Variable para rastrear los paneles abiertos
  expandedPanels: Set<number> = new Set<number>();

  // Método para alternar la expansión de un panel
  togglePanel(teacherId: number) {
    if (this.expandedPanels.has(teacherId)) {
      this.expandedPanels.delete(teacherId);
    } else {
      this.expandedPanels.add(teacherId);
    }
  }

  // Método para verificar si un panel está expandido
  isPanelExpanded(teacherId: number): boolean {
    return this.expandedPanels.has(teacherId);
  }
}
