import { Component, inject } from '@angular/core';
import { DetallesProfesorService } from '../services/detalles-profesor.service';
import { UsersService } from 'src/app/modules/auth/services/users.service';
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
  misEspecialidades: any[] = []
  miUbicacion: google.maps.LatLng | any;
  zoom: number = 14;
  circleOptions: any = {
    fillColor: '#F5F5F5',
    strokeColor: '#cfb3fc'
  }

  activatedRoute = inject(ActivatedRoute);
  detallesService = inject(DetallesProfesorService);
  userService = inject(UsersService);

  private token: string | null = null;
  public userId!: number;


  ngOnInit() : void {
    
    /* Recuperacion de datos del profesor*/ 

    this.activatedRoute.params.subscribe((params: any) => {
      let id = params.usuarioId;
      this.detallesService.getById(id).subscribe(data => {
        this.miProfesor = data[0];
        this.miUbicacion = new google.maps.LatLng(this.miProfesor.lat,this.miProfesor.lon)
      })
      this.detallesService.getEspecialidades(id).subscribe(data => {
        this.misEspecialidades = data;
        this.miEspecialidad = data.map(function(elemento: any){
               return (elemento.especialidad)
        })       
      })       
    })
  }

  /* Creación de una solicitud de clase*/ 

  solicitarClase(especialidadStr: string) : void {
    let especialidadId: number | any;
    let alumnoId: number = this.userService.getDecodedToken()!.user_id
    this.misEspecialidades.forEach(esp=> {
        if (esp.especialidad == especialidadStr){
          especialidadId = esp.id;
        }
    });
    
    this.detallesService.createClase(this.miProfesor.id,alumnoId,especialidadId)
  }

}
