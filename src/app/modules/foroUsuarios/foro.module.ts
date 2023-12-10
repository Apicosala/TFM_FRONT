import { NgModule } from '@angular/core';


import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForoUsuarioComponent } from './components/foro-usuario.component';
import { ForoRoutingModule } from './foro-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ForoUsuarioComponent
  ],
  imports: [
    CommonModule,
    ForoRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ForoModule { }