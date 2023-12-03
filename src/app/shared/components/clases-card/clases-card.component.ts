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
    const especialidadId = 1
    //1-traer de la card el id del profesor
    //2-traer el nombre de la clase (especialidad)
    //3-buscar el id de la especialidad
    //4-traer de la ruta el id del alumno

    this.terminarClasesServices.terminarClases(profesorId, alumnoId, especialidadId)
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        console.log(error);
      });

  };

}
