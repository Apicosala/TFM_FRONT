import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css'],
})
export class FormRegisterComponent {
  formRegister: FormGroup;
  errorMessage: string = '';
  

  public usersService = inject(UsersService);
  router = inject(Router);
  http = inject(HttpClient);

  constructor() {
    this.formRegister = new FormGroup(
      {
        rol: new FormControl('', [Validators.required]),
        nombre: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        apellidos: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        mail: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ]),
        captureLocation: new FormControl(false),
        lat: new FormControl(''),
        lon: new FormControl(''),
        pass: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,}/),
        ]),
        repeatpassword: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,}/),
        ]),
        foto: new FormControl(''),
        tel: new FormControl(''),
        pxh: new FormControl(0),
        experiencia: new FormControl(0),
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

  isTeacher() {
    return this.formRegister.get('rol')?.value === 'prof';
  }

  async captureUserLocation() {
    if (this.formRegister.get('captureLocation')?.value) {
      const apiUrl = 'https://ipapi.co/json/';

      try {
        const locationData: any = await firstValueFrom(this.http.get(apiUrl));
        const latitude = locationData.latitude;
        const longitude = locationData.longitude;

        this.formRegister.patchValue({
          lat: latitude,
          lon: longitude,
        });
      } catch (error) {
        console.error('Error al obtener la ubicación:', error);
      }
    }
  }

  async onSubmit() {
    try {
      await this.captureUserLocation();
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
