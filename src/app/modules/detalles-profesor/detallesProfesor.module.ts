import { NgModule } from '@angular/core';
import { DetallesProfesorComponent } from './components/detalles-profesor.component';
import { ValoracionCardComponent } from 'src/app/shared/components/valoracion-card/valoracion-card.component';
import { CommonModule } from '@angular/common';
import { DetallesProfesorRoutingModule } from './detallesProfesor-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GoogleMapsModule } from '@angular/google-maps';




@NgModule({
  declarations: [
   DetallesProfesorComponent,
   ValoracionCardComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    DetallesProfesorRoutingModule,
    GoogleMapsModule
  ]
})
export class DetallesProfesorModule { }