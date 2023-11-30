import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/core/models/user.interface';


@Component({
  selector: 'app-clases-card',
  templateUrl: './clases-card.component.html',
  styleUrls: ['./clases-card.component.css']
})
export class ClasesCardComponent {

  @Input() infoProfesor: IUser | any;

}
