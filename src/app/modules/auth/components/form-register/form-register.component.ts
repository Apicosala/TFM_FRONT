import { Component, inject} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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

  checkPassword(formValue: AbstractControl): ValidationErrors | null {
    const passwordControl = formValue.get('pass');
    const repeatPasswordControl = formValue.get('repeatpassword');

    if (passwordControl && repeatPasswordControl) {
      const password: string = passwordControl.value;
      const repeatPassword: string = repeatPasswordControl.value;

      if (password && repeatPassword && password !== repeatPassword) {
        return { checkpassword: true };
      } else {
        return null; // Sin error
      }
    }

    return null; // Si alguno de los controles no existe
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
    try {
      const response = await this.usersService.register(
        this.formRegister.value
      );
      localStorage.setItem('auth_token', response.token);
      this.router.navigate(['/usuario', ':usuarioId']);
    } catch (error: any) {
      this.errorMessage = error.fatal;
    }
  }
}
