import { Component, inject } from '@angular/core';
import { perfilUsersService } from '../usuario/services/perfilUsers.service';

@Component({
  selector: 'app-principal',
  templateUrl: './ppal.component.html',
  styleUrls: ['./ppal.component.css']
})
export class PrincipalComponent {
  userService = inject(perfilUsersService)
  arrEspecialidades: any
  async ngOnInit():Promise<void>{
    try {
      this.arrEspecialidades = await this.userService.getAllEspecialidades()
    } catch (error) {
      alert(error)
    }
  }
}
