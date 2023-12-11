import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { perfilUsersService } from '../services/perfilUsers.service';
import { IUser } from 'src/app/core/models/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  miUsuario: IUser | any;
  activatedRoute = inject(ActivatedRoute);
  userService = inject(perfilUsersService);
  esActivo:boolean = true
  arrAltaBaja:string = "Dar de Baja"
  ngOnInit() : void {

    /* Recuperacion de datos del usuario*/ 
    console.log(this.arrAltaBaja)
    this.activatedRoute.params.subscribe((params: any) => {
      let id = params.usuarioId;
      this.userService.getById(id).subscribe(data => {
        this.miUsuario = data[0];
        console.log(this.miUsuario.activo)
        if (this.miUsuario.activo === 0){
          this.esActivo = false
          this.arrAltaBaja = "Dar de Alta"
          console.log(this.arrAltaBaja)
        }
      })
    })
    
  }
  darDeBajaAlta(){
    try {
      const response = this.userService.sendRequest(this.miUsuario)
      if(this.esActivo){
        Swal.fire({
          icon: 'success',
          title: 'Petición de baja enviada',
          text: 'Cuando te den de baja, recibirás un correo de confirmación',
          showConfirmButton: false,
          timer: 3000 
        });
      }else{
        Swal.fire({
          icon: 'success',
          title: 'Petición de alta enviada',
          text: 'Cuando te den de alta, recibirás un correo de confirmación',
          showConfirmButton: false,
          timer: 3000 
        });
      }
        
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al intentar darte de baja',
        text: 'Por favor, contacta con el equipo de TeacherApp para solucionar este error',
        showConfirmButton: false,
        timer: 3000 
      })
    }
    
  }
}
