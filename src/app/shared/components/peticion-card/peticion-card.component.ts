import { Component, Input, inject } from '@angular/core';
import { SolicitudClase } from 'src/app/core/models/peticion.interface';
import { PeticionClasesService } from 'src/app/core/services/peticionClases.service';


@Component({
  selector: 'app-peticion-card',
  templateUrl: './peticion-card.component.html',
  styleUrls: ['./peticion-card.component.css']
})
export class PeticionCardComponent {

  @Input() miUsuario!: SolicitudClase;

  peticionClasesServices = inject(PeticionClasesService);

  aceptarSolicitud() {

  };

  async cancelarSolicitud() {
    try {
      const response = await this.peticionClasesServices.cancelarSolicitud(this.miUsuario.id);
      console.log('conexion cancelada', response)
    } catch (error) {
      console.log('error al cancelar', error);
      
    }
  }


}
