import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEspecialidad } from 'src/app/core/models/Especialidad.interface';
import { SolicitudClase } from 'src/app/core/models/peticion.interface';
import { ClasesService } from 'src/app/core/services/clases.service';

@Component({
  selector: 'app-peticion-card',
  templateUrl: './peticion-card.component.html',
  styleUrls: ['./peticion-card.component.css'],
})
export class PeticionCardComponent {
  @Input() miUsuario!: SolicitudClase;

  especialidades: IEspecialidad[] | any = [];

  activatedRoute = inject(ActivatedRoute);
  peticionClasesServices = inject(ClasesService);


  async ngOnInit(): Promise<void> {

    //recuperamos las especialidades del profesor
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = params.usuarioId;
      if(id){
        await this.peticionClasesServices.getEspecialidadesByProfesorId(id).then(data => {
          this.especialidades = data;
          this.mostrarNombreEspecialidad();
        })
      }
    });

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




  //aceptar la conexion profesor-alumno
  aceptarSolicitud() {
    const profesorId = this.miUsuario.profesor_id;
    const usuarioId = this.miUsuario.alumno_id;
    const especialidadId = this.miUsuario.especialidades_id;

    this.peticionClasesServices
      .aceptarSolicitud(profesorId, usuarioId, especialidadId)
      .then((response) => {
        console.log('conexion aceptada', response);
      })
      .catch((error) => {
        console.log('error al aceptar', error);
      });
  }

  // Denegar la conexion profesor-alumno
  async cancelarSolicitud() {
    try {
      const profesorId = this.miUsuario.profesor_id;
      const usuarioId = this.miUsuario.alumno_id;
      const especialidadId = this.miUsuario.especialidades_id;

      const response = await this.peticionClasesServices.cancelarSolicitud(
        profesorId, usuarioId, especialidadId);

      console.log('conexion cancelada', response);

    } catch (error) {
      console.log('error al cancelar', error);
    }
  }



}
