import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProfesoresComponent } from './components/lista-profesores.component';

const routes: Routes = [
    
  { path: ':especialidadId/profesores', component: ListaProfesoresComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaProfesoresRoutingModule { }