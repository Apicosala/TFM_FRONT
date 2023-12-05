import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallesProfesorComponent } from './components/detalles-profesor.component';

const routes: Routes = [
    { path: ':usuarioId', component: DetallesProfesorComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class DetallesProfesorRoutingModule {}
  