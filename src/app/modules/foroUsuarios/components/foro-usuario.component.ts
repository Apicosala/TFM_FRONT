import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForoUsuarioService } from '../services/foroUsuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IForo } from 'src/app/core/models/foro.interface';
import { UsersService } from '../../auth/services/users.service';
import { jwtDecode } from 'jwt-decode';
import { PayLoad } from 'src/app/core/interceptors/interfaces/pay-load';
import { inject } from '@angular/core';
import { io } from 'socket.io-client';
import { IUser } from 'src/app/core/models/user.interface';
import { perfilUsersService } from '../../usuario/services/perfilUsers.service';

@Component({
  selector: 'app-foro-usuario',
  templateUrl: './foro-usuario.component.html',
  styleUrls: ['./foro-usuario.component.css'],
})
export class ForoUsuarioComponent implements OnInit {
  formForo: FormGroup;
  mensajes: IForo[] = [];
  foroUsuariosServices = inject(ForoUsuarioService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  public userService = inject(UsersService);
  public userId!: number;
  constructor() {
    this.formForo = new FormGroup({
      titulo: new FormControl('', []),
      contenido: new FormControl('', [Validators.required]),
      userId: new FormControl('', []),
    });
  }

  ngOnInit(){
    let token = this.userService.token;
    if (token) {
      let decodedToken = jwtDecode<PayLoad>(token);
      this.userId = decodedToken.user_id;
    }
  }
  enviarMensaje() {
    const mensaje = this.formForo.value;
    mensaje.userId = this.userId;
    this.foroUsuariosServices.insert(mensaje).then(
      (response: IForo) => {
        this.mensajes.push(response);
        this.formForo.reset();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerMensajes() {
    this.foroUsuariosServices.getMensajes().then(
      (mensajes: IForo[]) => {
        this.mensajes = mensajes;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  onSubmit() {
    let token = this.userService.token;

    if (token) {
      let decodedToken = jwtDecode<PayLoad>(token);
      let userId = decodedToken.user_id;
      this.perfilService.getById(userId).subscribe((data) => {
        this.usuario = data[0];
      });
      this.socket.emit('mensaje_chat', this.formulario.value, {
        user_id: decodedToken.user_id,
        user_rol: decodedToken.user_rol,
      });
    }
  }
}
