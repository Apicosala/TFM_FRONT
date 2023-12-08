import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/core/models/user.interface';
import { IValoracion } from 'src/app/core/models/valoracion.interface';

@Component({
  selector: 'app-valoracion-card',
  templateUrl: './valoracion-card.component.html',
  styleUrls: ['./valoracion-card.component.css']
})
export class ValoracionCardComponent {
  @Input() miProfesor?: IUser;
  @Input() misValoraciones?: IValoracion;


}
