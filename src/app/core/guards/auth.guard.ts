import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import Swal from 'sweetalert2';



export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  //Verifica que el token sea correcto
  if (localStorage.getItem('auth_token')) {
    return true;
  }
  Swal.fire({
    icon: 'error',
    title: 'Acceso denegado',
    text: 'Tienes que estar autentificado para acceder a esta sección.',
  }).then(() => {
    router.navigate(['/auth', 'login']);
  });
  return false; // Deniega el acceso
};
