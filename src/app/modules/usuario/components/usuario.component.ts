import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { perfilUsersService } from '../services/perfilUsers.service';
import { IUser } from 'src/app/core/models/user.interface';

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
        //aca agrego un popup diciendo: Nuestros admins están evaluando tu solicitud. Cuando te den de baja, te llegará un mail de confirmación.
      }
    } catch (error) {
      alert("No se pudo enviar tu petición para darte de baja")
    }
    
  }
}
