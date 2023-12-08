import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/core/models/user.interface';
import { IValoracion } from 'src/app/core/models/valoracion.interface';
import { DetallesProfesorService } from 'src/app/modules/detalles-profesor/services/detalles-profesor.service';


@Component({
  selector: 'app-valoracion-card',
  templateUrl: './valoracion-card.component.html',
  styleUrls: ['./valoracion-card.component.css']
})
export class ValoracionCardComponent {
  @Input() miProfesor?: IUser;
  @Input() misValoraciones!: IValoracion;

  miAlumno?: IUser; 
  newDate: string = ""; 
  


  activatedRoute = inject(ActivatedRoute);
  detallesService = inject(DetallesProfesorService);

  ngOnInit(): void{  

    this.detallesService.getById(this.misValoraciones.alumno_id).subscribe(data => {
      this.miAlumno = data[0];
    })

    this.newDate = ((this.misValoraciones.fecha).toString().substring(0,10));
    
  }


}
