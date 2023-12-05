import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/core/models/user.interface';
import { ListaProfesoresService } from 'src/app/modules/lista-profesores/services/listaProfesores.service';

@Component({
  selector: 'app-profesor-card',
  templateUrl: './profesor-card.component.html',
  styleUrls: ['./profesor-card.component.css']
})
export class ProfesorCardComponent {

  @Input() miProfesor?: IUser;

  activatedRoute = inject(ActivatedRoute);
  listaProfesoresService = inject(ListaProfesoresService);

  puntuacion: string | any;

  ngOnInit() {

    this.listaProfesoresService.getPuntuacionesByProfesorId(this.miProfesor!.id).then(data => {
      let puntuacionMedia = 0;
      data.forEach(puntuacion => {
        puntuacionMedia = puntuacion.puntuacion + puntuacionMedia
      });
      
      this.puntuacion = (puntuacionMedia/data.length).toFixed(1);
    })
    

  }
}
