import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaProfesoresComponent } from './components/lista-profesores.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListaProfesoresRoutingModule } from './listaProfesores-routing.module';
import { ProfesorCardComponent } from 'src/app/shared/components/profesor-card/profesor-card.component';



@NgModule({
  declarations: [
    ListaProfesoresComponent,
    ProfesorCardComponent
  ],
  imports: [
    SharedModule,    
    CommonModule,
    ListaProfesoresRoutingModule
  ]
})
export class ListaProfesoresModule {}