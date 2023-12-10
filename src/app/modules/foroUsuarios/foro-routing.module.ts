import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForoUsuarioComponent } from './components/foro-usuario.component';


const routes: Routes = [
  
  { path: ':parametros', component: ForoUsuarioComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForoRoutingModule { }