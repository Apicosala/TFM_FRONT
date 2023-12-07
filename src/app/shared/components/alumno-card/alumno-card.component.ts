import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEspecialidad } from 'src/app/core/models/Especialidad.interface';
import { SolicitudClase } from 'src/app/core/models/peticion.interface';
import { ClasesService } from 'src/app/core/services/clases.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-alumno-card',
  templateUrl: './alumno-card.component.html',
  styleUrls: ['./alumno-card.component.css']
})
export class AlumnoCardComponent {

  @Input() miUsuario!: SolicitudClase;

  especialidades: IEspecialidad[] | any = [];
  totalClases: number = 0;
  fechaInput: string = "";


  activatedRoute = inject(ActivatedRoute);
  clasesServices = inject(ClasesService);


  ngOnInit() {
    
    //recuperamos las especialidades del profesor
    this.activatedRoute.params.subscribe((params: any) => {
      let id = params.usuarioId;
      if (id) {
        this.clasesServices.getEspecialidadesByProfesorId(id).then(data => {
          this.especialidades = data;

          this.mostrarNombreEspecialidad();
        })
      }
    });

    //recuperamos las clases del usuario
    this.activatedRoute.params.subscribe(async (params: any) => {

      let profesorId = this.miUsuario.profesor_id;
      let alumnoId = this.miUsuario.alumno_id;
      let especialidadId = this.miUsuario.especialidades_id;

      try {
 
        const data = await this.clasesServices.getFechaByClases(profesorId, alumnoId,especialidadId);

        // Filtramos las clases del alumno por especialidad.
        const clasesAlumno = data.filter(clase => clase.alumno_id === alumnoId && clase.especialidades_id === especialidadId);


        // Obtenemos el total de clases del alumno.
        this.totalClases = clasesAlumno.length;

      } catch (error) {
        console.log(error);
      }

    })


  }
  // Método para obtener el nombre de la especialidad por su ID.
  obtenerNombreEspecialidad(especialidadId: number): string {
    const especialidad = this.especialidades.find((especialidad: IEspecialidad) => especialidad.id === especialidadId);

    return especialidad ? especialidad.especialidad : 'Especialidad no encontrada';
  }

  // Método para mostrar el nombre de la especialidad al acceder a la página
  mostrarNombreEspecialidad() {
    const especialidadId = this.miUsuario.especialidades_id;
    const nombreEspecialidad = this.obtenerNombreEspecialidad(especialidadId);

    return nombreEspecialidad;

  }

  // Método para insertar la fecha de las clases
  anadirFechaClases() {
    const profesorId = this.miUsuario.profesor_id;
    const alumnoId = this.miUsuario.alumno_id;
    const especialidadId = this.miUsuario.especialidades_id;


    if (!this.fechaInput) {
      Swal.fire("Debes de introducir una fecha");
      return
    }

    this.clasesServices.insertarFechaClases(profesorId, alumnoId, this.fechaInput, especialidadId)
    .then(response => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Fehca añadida correctamente",
        showConfirmButton: false,
        timer: 1500
      });

    })
    .catch(error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Formato de fecha incorrecto",
      });
    })

  }


}

