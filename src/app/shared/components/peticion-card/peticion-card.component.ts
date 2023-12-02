import { Component, Input, inject } from '@angular/core';
import { SolicitudClase } from 'src/app/core/models/peticion.interface';
import { PeticionClasesService } from 'src/app/core/services/peticionClases.service';

@Component({
  selector: 'app-peticion-card',
  templateUrl: './peticion-card.component.html',
  styleUrls: ['./peticion-card.component.css'],
})
export class PeticionCardComponent {
  @Input() miUsuario!: SolicitudClase;

  peticionClasesServices = inject(PeticionClasesService);

  aceptarSolicitud() {
    const profesorId = this.miUsuario.profesor_id;
    const usuarioId = this.miUsuario.alumno_id;

    this.peticionClasesServices
      .aceptarSolicitud(profesorId, usuarioId)
      .then((response) => {
        console.log('conexion aceptada', response);
      })
      .catch((error) => {
        console.log('error al aceptar', error);
      });
  }

  async cancelarSolicitud() {
    try {
      const profesorId = this.miUsuario.profesor_id;
      const usuarioId = this.miUsuario.alumno_id;

      const response = await this.peticionClasesServices.cancelarSolicitud(
        profesorId, usuarioId);

      console.log('conexion cancelada', response);

    } catch (error) {
      console.log('error al cancelar', error);
    }
  }
}
