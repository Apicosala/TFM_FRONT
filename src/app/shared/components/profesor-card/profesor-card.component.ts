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

  @Input() miProfesor!: IUser;
  especialidad_Id:number|any

  puntuacionMedia: number = 0;
  
  
  rating: string = "1";

  activatedRoute = inject(ActivatedRoute);
  listaProfesoresService = inject(ListaProfesoresService);

  ngOnInit():void {

    this.listaProfesoresService.getPuntuacionesByProfesorId(this.miProfesor.id).then(data => {
      this.puntuacionMedia = 0;
      data.forEach(puntuacion => {
        this.puntuacionMedia = puntuacion.puntuacion + this.puntuacionMedia
      });
      
      this.puntuacionMedia = (this.puntuacionMedia/data.length);      
      })
    }

  obtenerEspecialidad(){
    this.activatedRoute.params.subscribe(async (params:any)=>{
      let id:string = params.especialidadId
      if(id){
        this.especialidad_Id=id
        console.log(this.especialidad_Id)
      }
    })
  }
}
