import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css'],
})
export class FormLoginComponent {
  formLogin: FormGroup;
  errorMessage: string = '';

  usersService = inject(UsersService);
  router = inject(Router);

  constructor() {
    this.formLogin = new FormGroup({
      mail: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
      pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  checkControl(
    formcontrolName: string,
    validator: string
  ): boolean | undefined {
    return (
      this.formLogin.get(formcontrolName)?.hasError(validator) &&
      this.formLogin.get(formcontrolName)?.touched
    );
  }

  async onSubmit() {
    const response = await this.usersService.login(this.formLogin.value);
    if (response.fatal) {
      //Error en el login
      Swal.fire({
        icon: 'error',
        title: 'Error al intentar iniciar sesión',
        text: 'Verifica que las credenciales sean correctas',
        showConfirmButton: false,
        timer: 2000 
      })
      this.errorMessage = response.fatal;
    } else {
      //Login correcto
      localStorage.setItem('auth_token', response.token);
      Swal.fire({
        icon: 'success',
        title: '¡Inicio de sesión exitoso!',
        text: 'Has iniciado sesión correctamente.',
        showConfirmButton: false,
        timer: 2000 
      });

      //Navego a la ruta principal
      this.router.navigate(['/']);
    }
  }
}
