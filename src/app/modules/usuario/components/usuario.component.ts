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
      console.log(params);
      let id = params.usuarioId;
      this.userService.getById(id).subscribe(data => {
        this.miUsuario = data[0];
      })
    })
  }

}
