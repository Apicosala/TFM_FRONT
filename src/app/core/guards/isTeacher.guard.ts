import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { DecodedToken } from '../models/decodedToken.interface';

export const isTeacherGuard: CanActivateChildFn = (childRoute, state) => {
  // Obtiene el token desde el almacenamiento local
  const token = localStorage.getItem('auth_token');
  const router = inject(Router);
  if (token) {
    try {
      // Intenta decodificar el token
      const tokenDecode: DecodedToken = jwtDecode(token);

      // Verifica si el rol del usuario es 'admin'
      if (tokenDecode.user_rol === 'prof') {
        return true; // Permite el acceso
      } else {
        // Muestra un mensaje de error con SweetAlert y redirige a la página principal
        Swal.fire({
          icon: 'error',
          title: 'Acceso denegado',
          text: 'No tienes los permisos necesarios para acceder a esta sección.',
        }).then(() => {
          router.navigate(['/']);
        });
        return false; // Deniega el acceso
      }
    } catch (error) {
      // Maneja errores al decodificar el token
      console.error('Error al decodificar el token:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: 'Ha ocurrido un error al verificar tus permisos. Por favor, vuelve a iniciar sesión.',
      }).then(() => {
        router.navigate(['/auth', 'login']);
      });
      return false; // Deniega el acceso
    }
  } else {
    // Muestra un mensaje de error y redirige a la página de inicio de sesión
    Swal.fire({
      icon: 'error',
      title: 'Acceso denegado',
      text: 'Debes iniciar sesión para acceder a esta URL.',
    }).then(() => {
      router.navigate(['/auth', 'login']);
    });
    return false; // Deniega el acceso
  }
};
