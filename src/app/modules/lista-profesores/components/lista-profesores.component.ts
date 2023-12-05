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
  public id: number | any;
  nombreEspecialidad: string | any;
  coordenadas: any[] | any;

  activatedRoute = inject(ActivatedRoute);
  listaProfesoresService = inject(ListaProfesoresService);

  async ngOnInit(): Promise<void> {

    this.activatedRoute.params.subscribe(async (params: any) => {

      try {
      this.id = params.especialidadId;
        if (this.id) {
        this.listaProfesoresService.getProfesoresByEspecialidadId(this.id).then(data => {
          this.arrProfesores = data;
          this.arrProfesores.forEach(profesor => {
            
            console.log(profesor.lat)
            console.log(profesor.lon)
          });
          //let ubicaciones = this.arrProfesores
        })
        this.listaProfesoresService.getNombreEspecialidad().then(nombre => {
          let especialidad = nombre.find((esp)=> esp.id == this.id);
          this.nombreEspecialidad =  (especialidad.especialidad).toUpperCase();
        })
      
      }
      } catch (error) {
        alert(error)
      }
    });
  }

}
