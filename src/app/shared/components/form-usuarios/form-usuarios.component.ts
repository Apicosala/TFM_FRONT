import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/core/models/user.interface';
import { perfilUsersService } from 'src/app/modules/usuario/services/perfilUsers.service';



@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.css']
})
export class FormUsuariosComponent {

  usuario: IUser | any;
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  usersServices = inject(perfilUsersService);

  formUsuario: FormGroup;
 

  constructor() {
    this.formUsuario = new FormGroup({
      nombre: new FormControl('', [
        Validators.minLength(3),
      ]),
      apellidos: new FormControl('', [
        Validators.minLength(3),
      ]),
      mail: new FormControl('', [
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
      foto: new FormControl('', []),
      tel: new FormControl('', [
        Validators.pattern(/^(\+34|0034|34)?[6789]\d{8}$/),
      ]),
      precio: new FormControl('', []),

      experiencia: new FormControl('', []),
      
      pass: new FormControl('', [
        Validators.pattern(/^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,}/),
      ]),
      repetirPass: new FormControl('', []),
    }, [this.controlPass]);

  }

  controlPass(formValue: AbstractControl) {
    const pass: string = formValue.get('pass')?.value;
    const repetirPass: string = formValue.get('repetirPass')?.value;

    if(pass !== repetirPass) {
      return { 'controlpass': true }
    } else {
      return null
    }
  }
 

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      let id = params.usuarioId;

      this.usersServices.getById(id).subscribe(data => {
          this.usuario = data[0];

          

        this.formUsuario = new FormGroup({

          id: new FormControl(data.id, []),
  
          nombre: new FormControl(data[0].nombre, [
            Validators.minLength(3),
          ]),
          apellidos: new FormControl(data[0].apellidos, [
            Validators.minLength(3),
          ]),
          mail: new FormControl(data[0].mail, [
            Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
          ]),
          foto: new FormControl(data[0].foto, []),

          tel: new FormControl(data[0].tel, [
            Validators.pattern(/^(\+34|0034|34)?[6789]\d{8}$/),
          ]),
          precio: new FormControl(data[0].pxh, []),
    
          experiencia: new FormControl(data.experiencia, []),
          
          pass: new FormControl(data[0].pass, [
            Validators.pattern(/^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,}/),
          ]),
          repetirPass: new FormControl('', []),
        }, [this.controlPass]);
      })
    })

  }

  async getDataForm() { 

    try{
      const response = await  this.usersServices.update(this.formUsuario.value);
      
      if(response){
      this.router.navigate(['/home']);
      
    } 
    
  }catch (error) {
    console.log(error);
  }
  
  
  }

  checkControl(formControlName: string ): boolean | undefined {
    return this.formUsuario.get(formControlName)?.touched && this.formUsuario.get(formControlName)?.invalid;

  }

}
