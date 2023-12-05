import { NgModule } from '@angular/core';
import { DetallesProfesorComponent } from './components/detalles-profesor.component';
import { CommonModule } from '@angular/common';
import { DetallesProfesorRoutingModule } from './detallesProfesor-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GoogleMapsModule } from '@angular/google-maps';




@NgModule({
  declarations: [
   DetallesProfesorComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    DetallesProfesorRoutingModule,
    GoogleMapsModule
  ]
})
export class DetallesProfesorModule { }