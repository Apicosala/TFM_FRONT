import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaProfesoresRoutingModule } from './lista-profesores-routing.module';
import { ListaProfesoresComponent } from './components/component/lista-profesores/lista-profesores.component';


@NgModule({
  declarations: [
    ListaProfesoresComponent
  ],
  imports: [
    CommonModule,
    ListaProfesoresRoutingModule
  ]
})
export class ListaProfesoresModule { }
