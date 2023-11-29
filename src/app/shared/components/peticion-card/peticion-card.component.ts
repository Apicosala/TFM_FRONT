import { Component, Input } from '@angular/core';
import { SolicitudClase } from 'src/app/core/models/peticion.interface';


@Component({
  selector: 'app-peticion-card',
  templateUrl: './peticion-card.component.html',
  styleUrls: ['./peticion-card.component.css']
})
export class PeticionCardComponent {

  @Input() miUsuario!: SolicitudClase;


}
