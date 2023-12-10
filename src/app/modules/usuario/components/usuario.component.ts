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

  ngOnInit() : void {

    /* Recuperacion de datos del usuario*/ 

    this.activatedRoute.params.subscribe((params: any) => {
      let id = params.usuarioId;
      this.userService.getById(id).subscribe(data => {
        this.miUsuario = data[0];
      })
    })
  }
  async darDeBaja(){
    try {
      const response = await this.userService.sendRequest(this.miUsuario)
      
      if(response){
        Swal.fire({
          icon: 'success',
          title: 'Petición de baja enviada',
          text: 'Cuando te den de baja, recibirás un correo de confirmación',
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
