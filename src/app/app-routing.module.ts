import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAdminGuard } from './core/guards/isAdmin.guard';
import { authGuard } from './core/guards/auth.guard';
import { isTeacherGuard } from './core/guards/isTeacher.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/ppal/ppal.module').then((m) => m.PpalModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivateChild: [isAdminGuard],
  },
  {
    path: 'clases',
    loadChildren: () =>
      import('./modules/clases-alumno/clasesAlumnos.module').then(
        (m) => m.clasesAlumnosModule
      ),
    canActivateChild: [authGuard],
  },
  {
    path: 'usuario',
    loadChildren: () =>
      import('./modules/usuario/usuario.module').then((m) => m.UsuarioModule),
    canActivateChild: [authGuard],
  },
  {
    path: 'alumnos',
    loadChildren: () =>
      import('./modules/lista-alumnos/listaAlumnos.module').then(
        (m) => m.ListaAlumnosModule
      ),
    canActivateChild: [isTeacherGuard],
  },
  {
    path: 'foro',
    loadChildren: () =>
      import('./modules/foroUsuarios/foro.module').then((m) => m.ForoModule),
    canActivateChild: [authGuard],
  },
  {
    path: 'especialidades',
    loadChildren: () =>
      import('./modules/lista-profesores/listaProfesores.module').then(
        (m) => m.ListaProfesoresModule
      ),
    canActivateChild: [authGuard],
  },
  {
    path: 'detalles',
    loadChildren: () =>
      import('./modules/detalles-profesor/detallesProfesor.module').then(
        (m) => m.DetallesProfesorModule
      ),
    canActivateChild: [authGuard],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
