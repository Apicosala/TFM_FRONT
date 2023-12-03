import { Component, inject } from '@angular/core';
import { PpalService } from '../services/ppal.service';

@Component({
  selector: 'app-principal',
  templateUrl: './ppal.component.html',
  styleUrls: ['./ppal.component.css']
})
export class PrincipalComponent {
  userService = inject(PpalService)
  arrEspecialidades: any
  showOverlay: boolean = false;
  async ngOnInit():Promise<void>{
    try {
      this.arrEspecialidades = await this.userService.getAllEspecialidades()
    } catch (error) {
      alert(error)
    }
  }
}
