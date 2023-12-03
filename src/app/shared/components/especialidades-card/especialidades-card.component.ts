import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-especialidades-card',
  templateUrl: './especialidades-card.component.html',
  styleUrls: ['./especialidades-card.component.css']
})
export class EspecialidadesCardComponent {
  @Input() oneEspecialidad: any
}
