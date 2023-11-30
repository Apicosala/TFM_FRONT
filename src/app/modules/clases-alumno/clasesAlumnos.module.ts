import { NgModule } from '@angular/core';
import { ClasesAlumnoComponent } from './components/clases-alumno.component';
import { CommonModule } from '@angular/common';
import { ClasesAlumnosRoutingModule } from './clasesAlumnos-routing.module';



@NgModule({
  declarations: [
   ClasesAlumnoComponent
  ],
  imports: [
    CommonModule,
    ClasesAlumnosRoutingModule
  ]
})
export class clasesAlumnosModule { }