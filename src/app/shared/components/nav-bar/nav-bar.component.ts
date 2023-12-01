import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/modules/auth/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  //TODO: Poner los routerlink en HTML una vez tengamos todos los componentes definidos + Filtrar accesos por rol
  router = inject(Router);
  public usersService = inject(UsersService);

  onClickLogOut() {
    // Utilizamos SweetAlert2 para mostrar un aviso
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres desconectarte?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, desconectar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario ha confirmado la desconexión
        localStorage.removeItem('auth_token');
        this.router.navigate(['auth', 'login']);
      }
    });
  }
}
