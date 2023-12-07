import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  RequiredValidator,
  ValidatorFn,
} from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

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
        lat: new FormControl('', [this.requiredForProfValidator]),
        lon: new FormControl(''),
        pass: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,}/),
        ]),
        repeatpassword: new FormControl(''),
        foto: new FormControl('', [Validators.pattern(/^(http|https):\/\/\S+\.(png|jpg|jpeg|gif|bmp)$/), this.requiredForProfValidator]),
        tel: new FormControl('', [Validators.minLength(9), Validators.maxLength(20), 
          Validators.pattern(/^(\+34|0034|34)?[6789]\d{8}$/), this.requiredForProfValidator],
        ),
        pxh: new FormControl(0, [this.pxhvalidator, this.requiredForProfValidator]),
        experiencia: new FormControl(0, [this.experienciaValidator, this.requiredForProfValidator]),
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


  requiredForProfValidator = (control: AbstractControl): ValidationErrors | null => {
    const isProf = control.parent?.get('rol')?.value === 'prof';
    const value = control.value;
  
    if (isProf && !value) {
      return { 'requiredForProfValidator': 'Este campo es requerido' };
    } else {
      return null;
    }
  };

  captureLocationValidator(control: AbstractControl): ValidationErrors | null {
    const isChecked = control.value;
  
    if (!isChecked) {
      return { 'captureLocation': 'Debes aceptar la captura de ubicación' };
    } else {
      return null;
    }
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

  pxhvalidator(controlName: AbstractControl): any {
    const pxh: number = parseInt(controlName.value);
    if (isNaN(pxh)) {
      return { 'pxhvalidator': 'El valor introducido no es un número' }
    } else if (pxh < 0) {
      return { 'pxhvalidator': 'El precio por hora no puede ser un número negativo' }
    }
    return null
  }

  experienciaValidator(control: AbstractControl): any {
    const experiencia: number = parseInt(control.value);
    if (isNaN(experiencia)) {
      return { 'experiencia': 'El valor introducido no es un número' }
    } else if (experiencia < 0) {
      return { 'experiencia': 'Tu experiencia no puede ser un número negativo' }
    } else if (experiencia > 100) {
      return { 'experiencia': 'Tu experiencia no puede ser superior a 100 años' }
    }
    return null
  }

  async onSubmit() {
    try {
      await this.captureUserLocation();
      const response = await this.usersService.register(
        this.formRegister.value
      );
      let timerInterval: any;
  Swal.fire({
  icon: 'success',
  title: "¡Registro correcto! ¡Bienvenido a TeacherApp!",
  html: "Para activar tu cuenta, tienes que autentificarte por primera vez",
  timer: 5000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
      const timer = Swal.getPopup()?.querySelector("b");
      if (timer) {
       timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  }},
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  if (result.dismiss === Swal.DismissReason.timer) {
  }
});
      this.router.navigate(['/auth', 'login']);
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa todos los campos correctamente antes de enviar el formulario',
      });
      this.errorMessage = error.fatal;
    }
  };
};
