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

  profesores: IUser[] | any = []

  ngOnInit() {

 /* //recuperamos los datos del profesor
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = params.especialidadId;
      if (id) {
        this.listaProfesoresService.getProfesoresByEspecialidadId(id).then(data => {
          this.profesores = data;
        })
      }
    });*/ 
  }
}
