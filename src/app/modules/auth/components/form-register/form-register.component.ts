import { Component, inject} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css'],
})
export class FormRegisterComponent {
  formRegister: FormGroup;
  errorMessage: string = '';

  usersService = inject(UsersService);
  router = inject(Router);

  constructor() {
    this.formRegister = new FormGroup(
      {
        rol: new FormControl('', [Validators.required]),
        nombre: new FormControl('', [Validators.required]),
        apellidos: new FormControl('', [Validators.required]),
        mail: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
        ]),
        pass: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        repeatpassword: new FormControl('', []),
      },
      [this.checkPassword]
    );
  }

  checkPassword(formValue: AbstractControl) {
    const passwordControl = formValue.get('pass');
    const repeatPasswordControl = formValue.get('repeatpassword');

    if (passwordControl && repeatPasswordControl) {
      const password: string = passwordControl.value;
      const repeatPassword: string = repeatPasswordControl.value;

      if (password !== repeatPassword) {
        return { checkpassword: true };
      } else {
        //TODO: Trabajar el caso negativo
        return null;
      }
    }
    return null;
  }

  checkControl(
    formcontrolName: string,
    validator: string
  ): boolean | undefined {
    return (
      this.formRegister.get(formcontrolName)?.hasError(validator) &&
      this.formRegister.get(formcontrolName)?.touched
    );
  }

  async onSubmit() {
    const response = await this.usersService.register(this.formRegister.value);
    if (response.fatal) {
      //Error en el register
      this.errorMessage = response.fatal;
    } else {
      //Register correcto
      localStorage.setItem('auth_token', response.token);
      //Navego a la ruta principal
      //TODO: Llevar al login? Autentificar automáticamente?
      this.router.navigate(['/usuario', ':usuarioId']);
    }
  }
}
