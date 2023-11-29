import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormUsuariosComponent } from './components/form-usuarios/form-usuarios.component';



@NgModule({
  declarations: [
    NavBarComponent,
    FormUsuariosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class SharedModule { }
