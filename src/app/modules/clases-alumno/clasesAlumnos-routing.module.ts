import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasesAlumnoComponent } from './components/clases-alumno.component';




const routes: Routes = [
    
  { path: ":usuarioId/clases", component: ClasesAlumnoComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }