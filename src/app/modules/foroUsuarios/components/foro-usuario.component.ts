import { Component, OnInit, WritableSignal, signal } from '@angular/core';
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
  socket = io('http://localhost:3000');
  formForo: FormGroup;
  foro_mensajes: IForo[] = [];
  foroUsuariosServices = inject(ForoUsuarioService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  usuario: IUser | any;
  formulario: FormGroup;
  userService = inject(UsersService);
  perfilService = inject(perfilUsersService);
  mensajes: WritableSignal<any[]> = signal([]);
  username: WritableSignal<any[]> = signal([]);
  numUsuarios: WritableSignal<number> = signal(0);

  public userId!: number;
  constructor() {
    this.formForo = new FormGroup({
      titulo: new FormControl('', []),
      contenido: new FormControl('', [Validators.required]),
      userId: new FormControl('', []),
    });
    this.formulario = new FormGroup({
      username: new FormControl(),
      mensaje: new FormControl(),
    });
  }

  ngOnInit(): void {
    let token = this.userService.token;
    if (token) {
      let decodedToken = jwtDecode<PayLoad>(token);
      this.userId = decodedToken.user_id;
    }
    this.socket.on('mensaje_chat', (data) => {
      console.log(data);
      this.mensajes.mutate((value) => value.push(data));
    });
    this.socket.on('usuarios_conectados', (data) => {
      console.log(data);
      this.numUsuarios.set(data);
    });
  }
  enviarMensaje() {
    const mensaje = this.formForo.value;
    mensaje.userId = this.userId;
    this.foroUsuariosServices.insert(mensaje).then(
      (response: IForo) => {
        this.foro_mensajes.push(response);
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
        this.foro_mensajes = mensajes;
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
