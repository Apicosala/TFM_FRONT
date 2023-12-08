import { NgModule } from '@angular/core';
import { ListaAlumnosComponent } from './components/lista-alumnos.component';
import { AlumnoCardComponent } from 'src/app/shared/components/alumno-card/alumno-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListaAlumnosRoutingModule } from './listaAlumnos-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListaAlumnosComponent,
    AlumnoCardComponent
  ],
  imports: [
    SharedModule,
    ListaAlumnosRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ListaAlumnosModule {}