import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEspecialidad } from 'src/app/core/models/Especialidad.interface';
import { SolicitudClase } from 'src/app/core/models/peticion.interface';
import { PeticionClasesService } from 'src/app/core/services/peticionClases.service';

@Component({
  selector: 'app-peticion-card',
  templateUrl: './peticion-card.component.html',
  styleUrls: ['./peticion-card.component.css'],
})
export class PeticionCardComponent {
  @Input() miUsuario!: SolicitudClase;
  
  especialidades!: IEspecialidad;

  activatedRoute = inject(ActivatedRoute);
  peticionClasesServices = inject(PeticionClasesService);


  async ngOnInit(): Promise<void> {
    
    //recuperamos las especialidades del profesor
      this.activatedRoute.params.subscribe((params: any) => {
        let id = params.usuarioId;
        this.peticionClasesServices.getEspecialidadesByProfesorId(id).subscribe(data => {
          this.especialidades = data[0];
        })
      })
    

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
