import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaProfesoresService } from '../services/listaProfesores.service';


@Component({
  selector: 'app-lista-profesores',
  templateUrl: './lista-profesores.component.html',
  styleUrls: ['./lista-profesores.component.css'] 
})
export class ListaProfesoresComponent {

  arrProfesores: any[] = [];

  activatedRoute = inject(ActivatedRoute);
  listaProfesoresService = inject(ListaProfesoresService);

  async ngOnInit(): Promise<void> {

    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = params.especialidadId;
      if (id) {
        this.listaProfesoresService.getProfesoresByEspecialidadId(id).then(data => {
          this.arrProfesores = data;
        })
      }
    });
  }

}
