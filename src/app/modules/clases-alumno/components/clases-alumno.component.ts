import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClasesAlumnosService } from '../services/clasesAlumnos.service';
import { SolicitudClase } from 'src/app/core/models/peticion.interface';
import { ClasesService } from 'src/app/core/services/clases.service';
import { IUser } from 'src/app/core/models/user.interface';


@Component({
  selector: 'app-clases-alumno',
  templateUrl: './clases-alumno.component.html',
  styleUrls: ['./clases-alumno.component.css']
})
export class ClasesAlumnoComponent {

  arrUsuarioClases: SolicitudClase[] = [];
  arrProfesores: any[] = [];
  clasesService = inject(ClasesService)
  activatedRoute = inject(ActivatedRoute);
  clasesAlumnoService = inject(ClasesAlumnosService);


  ngOnInit(){

    this.activatedRoute.params.subscribe(async (params: any) => {

      try {
        // recuperamos las clases con el Id del usuario
        let id = params.usuarioId;
        this.arrUsuarioClases = await this.clasesAlumnoService.getClasesByUsuarioId(id);

        // traemos los ids de los profesores 
        const profesorIds = this.arrUsuarioClases.map((clase: SolicitudClase) => clase.profesor_id);

        // traemos todos los datos de los profesores
        const allDataProfesor = profesorIds.map((profesorId: number) => this.clasesAlumnoService.getProfesorById(profesorId));
        this.arrProfesores = await Promise.all(allDataProfesor);

      } catch (error) {
        alert(error)
      }
    });
  }
}
