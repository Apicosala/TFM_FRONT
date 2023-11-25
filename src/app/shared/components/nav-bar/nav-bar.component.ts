import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/modules/auth/services/users.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
//TODO: Poner los routerlink en HTML una vez tengamos todos los componentes definidos + Filtrar accesos por rol
  router = inject(Router);
  public usersService = inject(UsersService);

  onClickLogOut() {
    //TODO: Poner aviso previo de si quiere desconectarse
    localStorage.removeItem('auth_token');
    this.router.navigate(['auth', 'login']);
  }

}
