import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClasesAlumnosService } from '../services/clasesAlumnos.service';
import { SolicitudClase } from 'src/app/core/models/peticion.interface';
import { ClasesService } from 'src/app/core/services/clases.service';


@Component({
  selector: 'app-clases-alumno',
  templateUrl: './clases-alumno.component.html',
  styleUrls: ['./clases-alumno.component.css']
})
export class ClasesAlumnoComponent {

  arrUsuarioClases: SolicitudClase[] = [];
  arrDatosClases: any[] = [];
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

        this.arrDatosClases = [];

        // Recuperamos los datos de los usuarios y los guardamos en un array
        for (const clase of this.arrUsuarioClases) {
          let profesorId = clase.profesor_id;
          let alumnoId = clase.alumno_id;

          const result = await this.clasesAlumnoService.getProfesorById(profesorId);
          this.arrProfesores.push(result);


          // Obtenemos el nombre de la especialidad
          const especialidadResult = await this.clasesService.getEspecialidadesByProfesorId(profesorId);
          const especialidad = especialidadResult[0].especialidad;

          
          const esProfesor = params.rol === 'prof';
          const userId = esProfesor ? alumnoId : profesorId;

          const userResult = await this.clasesService.getDatosUsuarioByRol(esProfesor ? 'alumn' : 'prof', userId);

          this.arrDatosClases.push({
            id: clase.id,
            alumno_id: clase.alumno_id,
            profesor_id: clase.profesor_id,
            especialidades_id: clase.especialidades_id,
            fecha: clase.fecha,
            usuario: userResult[0],
            nombre: '',
            apellidos: '',
            especialidad: especialidad,
            mail: '',
            pass: '',
            foto: '',
            rol: esProfesor ? 'prof' : 'alumn',
            tel: '',
            pxh: 0,
            experiencia: 0,
            lat: 0,
            lon: 0,
            activo: false
          });
          console.log(this.arrDatosClases);
        }
      } catch (error) {
        alert(error);
      }
    });
  }

  isEmptyProfesores(): boolean {
    const isEmpty = !this.arrProfesores || this.arrProfesores.length === 0;
    console.log('arrProfesores:', this.arrProfesores);
    console.log('isEmptyProfesores():', isEmpty);
    return isEmpty;
  }
  
  

}
