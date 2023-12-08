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
        pxh: new FormControl('', []),

        experiencia: new FormControl('', []),

       pass: new FormControl('', [
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,}/
          ),
        ]),
        newPass: new FormControl('', [
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,}/
          ),]),

        repetirPass: new FormControl('', []),

        activo: new FormControl('', []),

        latitud: new FormControl('',[]),

        longitud: new FormControl('',[])
      },
      [this.controlPass]);
  }

  controlPass(formValue: AbstractControl) {
    
    const pass: string = formValue.get('newPass')?.value;
    const repetirPass: string = formValue.get('repetirPass')?.value;

    if (pass !== repetirPass) {
      return { controlpass: true };
    } else {
      // Verificar si es necesario actualizar el valor (evitamos buvle infinito)
      if(formValue.get('pass')?.value !== pass) {

        // actualizamos el valor del campo pass
        formValue.get('pass')?.setValue(pass, { emitEvent: false });
      }
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

            pxh: new FormControl(data[0].pxh, []),

            experiencia: new FormControl(data[0].experiencia, []),

            pass: new FormControl(data[0].pass, [
              Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,}/
              ),]),

            newPass: new FormControl('', [
              Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,}/
              ),]),

            repetirPass: new FormControl('', [
              Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,}/
          ),]),

            activo: new FormControl(this.usuario.activo, []),

            lat: new FormControl(data[0].lat),

            lon: new FormControl(data[0].lon)

          },
          [this.controlPass]
          );
      });
    }
  }

  getDataForm() {
    if (this.usuario && this.usuario.id) {
      
      // Verificamos si la nueva contraseña se ha ingresado
    const nuevaContraseña = this.formUsuario.get('newPass')?.value;
    const contraseñaActual = this.formUsuario.get('pass')?.value;

    // Si la nueva contraseña se ha ingresado, la actualizamos
    if (nuevaContraseña !== undefined && nuevaContraseña !== '' && nuevaContraseña !==  contraseñaActual) {
      this.formUsuario.get('pass')?.setValue(nuevaContraseña, { emitEvent: false });
    }

      this.perfilServices.update(this.formUsuario.value)      
      .then((response: any) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Datos actualizados correctamente",
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => { 
          this.router.navigate(['/home']);
        }, 2000)
        
      })
      .catch((error: any) => {
        console.error('aqui el error', error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ha ocurrido un error al actualizar el usuario",
        });
      });
      console.log(this.formUsuario.value)
    } else {

    }

   }

   async getLocation() {
    try {
    const locationData:any = await this.perfilServices.getLocation();
    const latitude = locationData.latitude;
    const longitude = locationData.longitude;

    this.formUsuario.patchValue({
      lat: latitude,
      lon: longitude,
    });
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  } 


  checkControl(formControlName: string): boolean | undefined {
    return (
      this.formUsuario.get(formControlName)?.touched &&
      this.formUsuario.get(formControlName)?.invalid
    );
  }
}
