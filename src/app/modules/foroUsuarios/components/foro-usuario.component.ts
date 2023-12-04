import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForoUsuarioService } from '../services/foroUsuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IForo } from 'src/app/core/models/foro.interface';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-foro-usuario',
  templateUrl: './foro-usuario.component.html',
  styleUrls: ['./foro-usuario.component.css'],
})
export class ForoUsuarioComponent {
  formForo: FormGroup;
  foroUsuariosServices = inject(ForoUsuarioService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  mensajes: IForo[] = [];

  constructor() {
    (this.formForo = new FormGroup({
      titulo: new FormControl('', []),
      contenido: new FormControl('', [Validators.required]),
    })),
      [];
  }

  async obtenerMensajes() {
    try {
      // Supongamos que tienes las IDs del profesor y el alumno
      const profesorId = 1; // Reemplaza con la ID del profesor
      const alumnoId = 2; // Reemplaza con la ID del alumno
      this.mensajes = await this.foroUsuariosServices.getMensajes(
        profesorId,
        alumnoId
      );
    } catch (error) {
      console.error(error);
    }
  }

  async enviarMensaje() {
    try {
      const mensaje = this.formForo.value;
      const response = await this.foroUsuariosServices.insert(mensaje);
      console.log(response);
      this.mensajes.push(response); // Agregar el nuevo mensaje a la lista de mensajes mostrados
      this.formForo.reset(); // Limpiar el formulario después de enviar el mensaje
    } catch (error) {
      console.error(error);
      // Mostrar un mensaje de error al usuario si falla el envío del mensaje
    }
  }
}
