import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

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
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(8),
      ]),
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
      this.errorMessage = response.fatal;
    } else {
      //Login correcto
      localStorage.setItem('auth_token', response.token);
      //Navego a la ruta principal
      this.router.navigate(['/']);
    }
  }
}
