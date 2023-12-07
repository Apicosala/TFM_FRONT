import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { PayLoad } from 'src/app/core/interceptors/interfaces/pay-load';
import { IUser } from 'src/app/core/models/user.interface';
import { UsersService } from 'src/app/modules/auth/services/users.service';
import { perfilUsersService } from 'src/app/modules/usuario/services/perfilUsers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.css'],
})
export class FormUsuariosComponent {
  usuario: IUser | any;
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  perfilServices = inject(perfilUsersService);
  userService = inject(UsersService);
  formUsuario: FormGroup;

  constructor() {
    this.formUsuario = new FormGroup(
      {
        nombre: new FormControl('',
         [Validators.minLength(3)]),

        apellidos: new FormControl('',
         [Validators.minLength(3)]),

        mail: new FormControl('', [
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ]),
        foto: new FormControl('', []),

        tel: new FormControl('', [
          Validators.pattern(/^(\+34|0034|34)?[6789]\d{8}$/),
        ]),
        precio: new FormControl('', []),

        experiencia: new FormControl('', []),

        pass: new FormControl('', [
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,}/
          ),
        ]),
        repetirPass: new FormControl('', []),

        activo: new FormControl('', []),
      },
      [this.controlPass]
    );
  }

  controlPass(formValue: AbstractControl) {
    const pass: string = formValue.get('pass')?.value;
    const repetirPass: string = formValue.get('repetirPass')?.value;

    if (pass !== repetirPass) {
      return { controlpass: true };
    } else {
      return null;
    }
  }

  ngOnInit(): void {
    
    let token = this.userService.token;

    if (token) {
      let decodedToken = jwtDecode<PayLoad>(token);
      let id = decodedToken.user_id;
      this.perfilServices.getById(id).subscribe((data) => {

        this.usuario = data[0];

        this.formUsuario = new FormGroup({

            id: new FormControl(this.usuario.id, []),

            nombre: new FormControl(data[0].nombre, 
              [Validators.minLength(3)]),

            apellidos: new FormControl(data[0].apellidos, 
              [Validators.minLength(3),]),

            mail: new FormControl(data[0].mail, 
              [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
            ]),

            foto: new FormControl(data[0].foto, []),

            tel: new FormControl(data[0].tel, 
              [Validators.pattern(/^(\+34|0034|34)?[6789]\d{8}$/),]),

            precio: new FormControl(data[0].pxh, []),

            experiencia: new FormControl(data.experiencia, []),

            pass: new FormControl('', [
              Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,}/
              ),]),

            repetirPass: new FormControl('', []),

            activo: new FormControl(this.usuario.activo, []),

            ubicacion: new FormControl(data[0].lat)

          },
          [this.controlPass]
        );
      });
    }
  }

  async getDataForm() {
    try {
      const response = await this.perfilServices.update(this.formUsuario.value);

      if (response.id) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Datos actualizados correctamente",
          showConfirmButton: false,
          timer: 1500
          
        });
        console.log(response)
        this.router.navigate(['/home']);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ha ocurrido un error al actualizar el usuario",
      });
    }
  }

  async getLocation() {
      try {
      const response = await this.perfilServices.getLocation();
      console.log(response.latitude, response.longitude)

      if (response.id) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Datos actualizados correctamente",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/home']);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ha ocurrido un error al actualizar el usuario",
      });
    } 
  }

  checkControl(formControlName: string): boolean | undefined {
    return (
      this.formUsuario.get(formControlName)?.touched &&
      this.formUsuario.get(formControlName)?.invalid
    );
  }
}
