import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormUsuariosComponent } from './components/form-usuarios/form-usuarios.component';
import { ClasesCardComponent } from './components/clases-card/clases-card.component';
import { PeticionCardComponent } from './components/peticion-card/peticion-card.component';




@NgModule({
  declarations: [
    NavBarComponent,
    FormUsuariosComponent,
    ClasesCardComponent,
    PeticionCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    
  ],
  exports: [
    NavBarComponent,
    FormUsuariosComponent,
    ClasesCardComponent,
    PeticionCardComponent

  ]
})
export class SharedModule { }
