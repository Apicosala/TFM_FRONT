import { Component, inject } from '@angular/core';
import { DetallesProfesorService } from '../services/detalles-profesor.service';
import { UsersService } from 'src/app/modules/auth/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/core/models/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-profesor',
  templateUrl: './detalles-profesor.component.html',
  styleUrls: ['./detalles-profesor.component.css']
})
export class DetallesProfesorComponent {

  miProfesor: IUser | any;
  miEspecialidad: string[] | any;
  misEspecialidades: any[] = [];
  misValoraciones: any [] | any;
  alumnoId: number = 0;

  // Mapa
  miUbicacion: google.maps.LatLng | any;
  zoom: number = 14;
  circleOptions: any = {
    fillColor: '#F5F5F5',
    strokeColor: '#cfb3fc'
  }
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute);
  detallesService = inject(DetallesProfesorService);
  userService = inject(UsersService);
  


  ngOnInit() : void {
    
    this.alumnoId = this.userService.getDecodedToken()!.user_id;

    /* Recuperacion de datos del profesor*/ 

    this.activatedRoute.params.subscribe((params: any) => {
      let id = params.usuarioId;
      this.detallesService.getById(id).subscribe(data => {
        this.miProfesor = data[0];
        this.miUbicacion = new google.maps.LatLng(this.miProfesor.lat,this.miProfesor.lon)
      })
      this.detallesService.getValoraciones(id).subscribe(data => {
        this.misValoraciones = data;
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
    this.misEspecialidades.forEach(esp=> {
        if (esp.especialidad == especialidadStr){
          especialidadId = esp.id;
        }
    });
    
    this.detallesService.createClase(this.miProfesor.id,this.alumnoId,especialidadId)

    this.leavePage()
  }

  atras(especialidad:string) : void {
    let especialidadId
    this.misEspecialidades.forEach(esp=> {
      if (esp.especialidad == especialidad){
        especialidadId = esp.id;
      }
  });
  this.router.navigate([`/especialidades/${especialidadId}/profesores`])
  }

  leavePage() {
    Swal.fire({
      title: 'Se ha generado la solicitud de clase',
      text: 'Cuando el profesor acepte tu solicitud, podrás ver la clase en el apartado de Mis clases',
      icon: 'info',
      showCancelButton: false,
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true
    }).then(
      function(){},
      function(dismiss){
        if (dismiss === 'timer'){
          console.log('Closed by timer')
        }
      }
    ); 
  }

}
