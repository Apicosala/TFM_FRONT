import { NgModule } from '@angular/core';
import { ListaAlumnosComponent } from './components/lista-alumnos.component';
import { PeticionCardComponent } from 'src/app/shared/components/peticion-card/peticion-card.component';
import { AlumnoCardComponent } from 'src/app/shared/components/alumno-card/alumno-card.component';



@NgModule({
  declarations: [
    ListaAlumnosComponent,
    PeticionCardComponent,
    AlumnoCardComponent,

  ],
  imports: [
    
  ]
})
export class AdminModule { }