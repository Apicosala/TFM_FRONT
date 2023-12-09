import { NgModule } from '@angular/core';
import { ClasesAlumnoComponent } from './components/clases-alumno.component';
import { CommonModule } from '@angular/common';
import { ClasesAlumnosRoutingModule } from './clasesAlumnos-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClasesCardComponent } from 'src/app/shared/components/clases-card/clases-card.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
   ClasesAlumnoComponent,
   ClasesCardComponent
  ],
  imports: [
    CommonModule,
    ClasesAlumnosRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class clasesAlumnosModule { }