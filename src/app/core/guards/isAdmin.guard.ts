import { CanActivateChild, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '../models/user.interface';

// Importa SweetAlert
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class isAdminGuard implements CanActivateChild {
  constructor(private router: Router) {}

  canActivateChild(
    childRoute: import('@angular/router').ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const tokenDecode: IUser = jwtDecode(token);

      if (tokenDecode.rol == "admin") {
        return true;
      } else {
        console.log(tokenDecode);
        Swal.fire({
          icon: 'error',
          title: 'Acceso denegado',
          text: 'No tienes los permisos necesarios para acceder a esta sección',
        }).then(() => {
          this.router.navigate(['/']);
        });
        return false;
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Debes iniciar sesión para acceder a esta URL',
      }).then(() => {
        this.router.navigate(['/auth', 'login']);
      });
      return false;
    }
  }
}
