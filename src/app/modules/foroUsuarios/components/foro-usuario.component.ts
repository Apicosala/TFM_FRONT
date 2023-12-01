import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForoUsuarioService } from '../services/foroUsuario.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-foro-usuario',
  templateUrl: './foro-usuario.component.html',
  styleUrls: ['./foro-usuario.component.css']
})
export class ForoUsuarioComponent {

  formForo: FormGroup;
  foroUsuariosServices = inject(ForoUsuarioService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);



  constructor() { 

    this.formForo = new FormGroup({
      titulo: new FormControl('', []),
      contenido: new FormControl('', [
        Validators.required
      ]),

      
    }), [];
    }

    async getDataForm() {
      try {
        const mensaje = this.formForo.value;
        const response = await this.foroUsuariosServices.insert(this.formForo.value);
        console.log(mensaje);
        

      } catch (error) {
        //TODO: Mostrar un mensaje de error al usuario
        console.error(error);
      }
      
    };
  }
  

