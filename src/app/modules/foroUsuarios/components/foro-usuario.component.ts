import { Component, OnInit } from '@angular/core';
import { ForoUsuarioService } from '../services/foroUsuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IForo } from 'src/app/core/models/foro.interface';
import { UsersService } from '../../auth/services/users.service';
import { jwtDecode } from 'jwt-decode';
import { PayLoad } from 'src/app/core/interceptors/interfaces/pay-load';
import { inject } from '@angular/core';

@Component({
  selector: 'app-foro-usuario',
  templateUrl: './foro-usuario.component.html',
  styleUrls: ['./foro-usuario.component.css'],
})
export class ForoUsuarioComponent implements OnInit {
  mensajes: IForo[] = [];
  foroUsuariosServices = inject(ForoUsuarioService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  private userService = inject(UsersService);
  userId: number|any;
  alumnoId:number|any
  foro:string|any
  nuevoComentario:string|any

  constructor() {
    
  }

  async ngOnInit(){
    let token = this.userService.token;
    if (token) {
      let decodedToken = jwtDecode<PayLoad>(token);
      this.userId = decodedToken.user_id;
    }
    try {
      try {
        const response = await this.userService.isTeacherOrStudent()
        //si es alumno, es false
        if (response ==true){
          this.activatedRoute.params.subscribe(async (params: any) => {
            const parametros = params['parametros'];
            const param=parametros.split('&')
            this.alumnoId=parseInt(param[1])
            this.userId=parseInt(param[0])
            const response = await this.foroUsuariosServices.getMensajes(this.userId, this.alumnoId)
            this.foro = response
            console.log("alumno:",this.alumnoId)
            console.log("profesor:",this.userId)
          })
        }else{
          this.activatedRoute.params.subscribe(async (params: any) => {
            const parametros = params['parametros'];
            const param=parametros.split('&')
            this.alumnoId=parseInt(param[0])
            this.userId=parseInt(param[1])
            const response = await this.foroUsuariosServices.getMensajes(this.userId, this.alumnoId)
            this.foro = response
            console.log("alumno:",this.alumnoId)
            console.log("profesor:",this.userId)
          })
        }
        console.log("miresponse:",response)
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }
  enviarComentario() {
    try {
      console.log(this.alumnoId)
      console.log(this.userId)
      console.log(this.nuevoComentario)
      const response = this.foroUsuariosServices.insert(this.userId,this.alumnoId,this.nuevoComentario)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
    
  }
}
