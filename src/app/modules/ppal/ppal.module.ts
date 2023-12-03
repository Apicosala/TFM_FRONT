import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrincipalComponent } from './components/ppal.component';
import { EspecialidadesCardComponent } from 'src/app/shared/components/especialidades-card/especialidades-card.component';
import { PpalRoutingModule } from './ppal-routing.module';



@NgModule({
  declarations: [
    PrincipalComponent,
    EspecialidadesCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PpalRoutingModule
  ]
})
export class PpalModule { }
