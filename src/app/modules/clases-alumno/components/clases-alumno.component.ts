import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClasesAlumnosService } from '../services/clasesAlumnos.service';
import { IUser } from 'src/app/core/models/user.interface';
import { SolicitudClase } from 'src/app/core/models/peticion.interface';


@Component({
  selector: 'app-clases-alumno',
  templateUrl: './clases-alumno.component.html',
  styleUrls: ['./clases-alumno.component.css']
})
export class ClasesAlumnoComponent {

  arrUsuarioClases: SolicitudClase[] = [];
  arrProfesores: any[] = [];

  activatedRoute = inject(ActivatedRoute);
  clasesAlumnoService = inject(ClasesAlumnosService);

  async ngOnInit(): Promise<void> {
    
    this.activatedRoute.params.subscribe( async (params:any) => {
      
      try {
        // recuperamos las clases con el Id del usuario
        let id = params.usuarioId;
        this.arrUsuarioClases = await this.clasesAlumnoService.getClasesByUsuarioId(id);

        // traemos los ids de los profesores 
        const profesorIds = this.arrUsuarioClases.map((clase: SolicitudClase) => clase.profesor_id);

        // traemos todos los datos de los profesores
        const allDataProfesor = profesorIds.map((profesorId: number) => this.clasesAlumnoService.getProfesorById(profesorId));
        this.arrProfesores = await Promise.all(allDataProfesor);

        console.log(this.arrProfesores);

      } catch (error) {
        console.log(error) 
        //TODO: mostrar un mensaje de error al usuario.
      } 
    }); 
  }

}
