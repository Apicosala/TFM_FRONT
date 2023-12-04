import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { PayLoad } from 'src/app/core/interceptors/interfaces/pay-load';
import { UsersService } from 'src/app/modules/auth/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  //TODO: Poner los routerlink en HTML una vez tengamos todos los componentes definidos + Filtrar accesos por rol
  public userId!: number;
  router = inject(Router);
  public userService = inject(UsersService);

  ngOnInit(): void {
    let token = this.userService.token;
    if (token) {
      let decodedToken = jwtDecode<PayLoad>(token);
      this.userId = decodedToken.user_id;
    }
  }
  onClickLogOut() {
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
        this.router.navigate(['auth', 'login'], {
          queryParams: {},
        });
      }
    });
  }
}
