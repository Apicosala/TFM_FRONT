import { Component, OnInit, WritableSignal, signal } from '@angular/core';
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
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-foro-usuario',
  templateUrl: './foro-usuario.component.html',
  styleUrls: ['./foro-usuario.component.css'],
})
export class ForoUsuarioComponent implements OnInit {
  foroUsuariosServices = inject(ForoUsuarioService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  private userService = inject(UsersService);
  userId: number | any;
  alumnoId: number | any;
  foro: string | any;
  nuevoComentario: string | any;
  socket = io('http://localhost:3000');
  usuario: IUser | any;
  formulario: FormGroup;
  perfilService = inject(perfilUsersService);
  chatMensajes: WritableSignal<any[]> = signal([]);
  username: WritableSignal<any[]> = signal([]);
  numUsuarios: WritableSignal<number> = signal(0);
  public chatuserId!: number;

  constructor() {
    this.formulario = new FormGroup({
      username: new FormControl(),
      mensaje: new FormControl(),
    });
  }

  async ngOnInit() {
    let token = this.userService.token;
    if (token) {
      let decodedToken = jwtDecode<PayLoad>(token);
      this.userId = decodedToken.user_id;
    }
    this.socket.on('mensaje_chat', (data) => {
      this.chatMensajes.mutate((value) => value.push(data));
    });
    this.socket.on('usuarios_conectados', (data) => {
      this.numUsuarios.set(data);
    });
    try {
      try {
          this.activatedRoute.params.subscribe(async (params: any) => {
            const parametros = params['parametros'];
            const param = parametros.split('&');
            this.alumnoId = parseInt(param[1]);
            this.userId = parseInt(param[0]);
            const response = await this.foroUsuariosServices.getMensajes(
              this.userId,
              this.alumnoId
            );
            this.foro = response;
          });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async enviarComentario() {
    try {
      let response = await this.foroUsuariosServices.insert(
        this.userId,
        this.alumnoId,
        this.nuevoComentario
      );
      response = await this.foroUsuariosServices.getMensajes(
        this.userId,
        this.alumnoId
      );
      this.foro = response;
      this.nuevoComentario = ''
    } catch (error) {
      console.log(error);
    }
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
