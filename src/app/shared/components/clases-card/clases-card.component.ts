import { Component, Input, inject } from '@angular/core';
import { IClases } from 'src/app/core/models/datosClases.interface';
import { IUser } from 'src/app/core/models/user.interface';
import { CancelacionClasesService } from 'src/app/core/services/cancelarClases.service';


@Component({
  selector: 'app-clases-card',
  templateUrl: './clases-card.component.html',
  styleUrls: ['./clases-card.component.css']
})
export class ClasesCardComponent {

  @Input() infoProfesor!: IUser;
  @Input() iclases!: IClases;

  arrDatosClases: IClases[] = [];

  terminarClasesServices = inject(CancelacionClasesService);

  constructor() { };


  ngOnInit(): void {
    this.obtenerDatosClases();
  }


  obtenerDatosClases() {

    const profesorId = this.infoProfesor.id;
    const alumnoId = 3;
  

    this.terminarClasesServices.obtenerDatosClases(profesorId)
      .subscribe((response: any) => {
        this.arrDatosClases = response;
      })
  };




  terminarClases() {

    const profesorId = this.infoProfesor.id;
    const alumnoId = 3;
    const fecha = "01/10/2023";


    this.terminarClasesServices.terminarClases(profesorId, alumnoId, fecha)
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        console.log(error);
      });

  };

}
