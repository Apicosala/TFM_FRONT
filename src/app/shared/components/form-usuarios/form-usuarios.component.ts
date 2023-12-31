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
import { PpalService } from 'src/app/modules/ppal/services/ppal.service';
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
  ppalService = inject(PpalService);
  formUsuario: FormGroup;
  errorMessage: string = '';
  allEspecialidades: any[] = [];
  especialidades: any[] = [];
  especialidadesUsuarioId: any[] =[];
  arrEspecialidadesId: any[] = []
  especialidadesUsuario: any[] = [];

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

        repetirPass: new FormControl('', []),

        newPass: new FormControl('', [
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,}/
          ),]),

        activo: new FormControl('', []),

        latitud: new FormControl('',[]),

        longitud: new FormControl('',[]),

      },
      [this.controlPass]);
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

            pxh: new FormControl(data[0].pxh, []),

            experiencia: new FormControl(data[0].experiencia, []),

            pass: new FormControl("", [
              Validators.required,
              Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,}/
              ),]),

            repetirPass: new FormControl('', [
              Validators.required,
              Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,}/
          ),]),

            newPass: new FormControl('', [
            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,}/
            ),]),

            activo: new FormControl(this.usuario.activo, []),

            lat: new FormControl(data[0].lat),

            lon: new FormControl(data[0].lon),
          },
          [this.controlPass]);
      });

      this.perfilServices.getEspecialidadesByProfesorId(id).subscribe(data => {
        this.especialidadesUsuario = data;
        this.especialidadesUsuarioId = data;
        this.especialidadesUsuarioId = this.especialidadesUsuarioId.map((element)=>element.id)
      })
      
    }

    this.getAllEspecialidades()    

  }  

  async checkItems(){
  this.especialidadesUsuario.forEach(esp => {
    const checkbox = document.getElementById(`button${esp.especialidad}`) as HTMLInputElement | null;
    checkbox!.checked = true;
    
  });
}

  async getAllEspecialidades() {
    try {
      const arrEspecialidades = await this.ppalService.getAllEspecialidades();
      this.allEspecialidades = arrEspecialidades;
      this.especialidades = arrEspecialidades.map((element)=>element.especialidad)      
        
    } catch (error) {
      alert(`Error al obtener las especialidades:${error}`);
    }
  } 

  async getDataFormPersonal() {
    if (this.usuario && this.usuario.id) {
      
      //update de datos
      const response = await this.perfilServices.updateForm(this.formUsuario.value)    

      if(response.fatal) {
        this.errorMessage = response.fatal;
      }else{
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Datos personales actualizados correctamente",
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => { 
          this.router.navigate(['/home']);
        }, 2000) 
      }   
    } else {

    }
  }

  async getDataFormProfesional() {
    if (this.usuario && this.usuario.id) {
      
      //update de datos
      const response = await this.perfilServices.updateForm(this.formUsuario.value) 

      //update de las especialidades comparando con las especialidades que tenia el usuario inicialmente
          this.allEspecialidades.forEach(esp => {
            const checkbox = document.getElementById(`button${esp.especialidad}`) as HTMLInputElement | null;
            if(checkbox!.checked == false){
              if(this.especialidadesUsuarioId.includes(esp.id) == true){
                this.deleteEspecialidades(this.usuario.id,esp.id)
              }                 
            } else {
              if(this.especialidadesUsuarioId.includes(esp.id) == false){
                this.updateEspecialidades(this.usuario.id,esp.id)
              } 
            }        
      });        

      if(response.fatal) {
        this.errorMessage = response.fatal;
      }else{
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Datos profesionales actualizados correctamente",
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => { 
          this.router.navigate(['/home']);
        }, 2000) 
      }   
    } else {

    }
  }

  async deleteEspecialidades(usuarioId:number, especialidadId:number){
    try {
      await this.perfilServices.deleteEspecialidad(usuarioId, especialidadId)
    } catch (error) {
      alert(`Error al eliminar especialidad:${error}`);
    }
    
  }

  async updateEspecialidades(usuarioId:number, especialidadId:number){
    try {
      await this.perfilServices.createEspecialidad(usuarioId, especialidadId)
    } catch (error) {
      alert(`Error al añadir especialidad:${error}`);
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
      alert(`Error al obtener la ubicación:${error}`);
    }

    } 


  checkControl(formControlName: string): boolean | undefined {
    return (
      this.formUsuario.get(formControlName)?.touched &&
      this.formUsuario.get(formControlName)?.invalid
    );
  }
}
