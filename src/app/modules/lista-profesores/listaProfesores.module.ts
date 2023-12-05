import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaProfesoresComponent } from './components/lista-profesores.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListaProfesoresRoutingModule } from './listaProfesores-routing.module';



@NgModule({
  declarations: [
    ListaProfesoresComponent
  ],
  imports: [
    SharedModule,    
    CommonModule,
    ListaProfesoresRoutingModule
  ]
})
export class ListaProfesoresModule {}