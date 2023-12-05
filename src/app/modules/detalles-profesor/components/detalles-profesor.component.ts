import { Component, inject } from '@angular/core';
import { DetallesProfesorService } from '../services/detalles-profesor.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/core/models/user.interface';


@Component({
  selector: 'app-detalles-profesor',
  templateUrl: './detalles-profesor.component.html',
  styleUrls: ['./detalles-profesor.component.css']
})
export class DetallesProfesorComponent {

  miProfesor: IUser | any;
  miEspecialidad: string[] | any;
  miUbicacion: google.maps.LatLng | any;
  zoom: number = 14;
  circleOptions: any = {
    fillColor: '#F5F5F5',
    strokeColor: '#cfb3fc'
  }

  activatedRoute = inject(ActivatedRoute);
  userService = inject(DetallesProfesorService);


  ngOnInit() : void {

    /* Recuperacion de datos del usuario*/ 

    this.activatedRoute.params.subscribe((params: any) => {
      let id = params.usuarioId;
      this.userService.getById(id).subscribe(data => {
        this.miProfesor = data[0];
        this.miUbicacion = new google.maps.LatLng(this.miProfesor.lat,this.miProfesor.lon)
      })
      this.userService.getEspecialidades(id).subscribe(data => {
        this.miEspecialidad = data.map(function(elemento: any){
               return (elemento.especialidad)
        })       
      })       
    })
  }
}
