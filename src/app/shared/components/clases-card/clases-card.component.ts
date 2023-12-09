import { Component, Input, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IClases } from 'src/app/core/models/datosClases.interface';
import { IUser } from 'src/app/core/models/user.interface';
import { ClasesService } from 'src/app/core/services/clases.service';


@Component({
  selector: 'app-clases-card',
  templateUrl: './clases-card.component.html',
  styleUrls: ['./clases-card.component.css']
})
export class ClasesCardComponent {

  @Input() infoUser!: IUser;

  comentario:FormGroup|any
  arrDatosClases: IClases[] = [];
  alumnoId: number | any
  especialidad: string | any
  especialidadId: number | any
  profesorId: number | any
  rol: string | any
  usuario: IUser[] | any = []
  fecha: string | any
  fechas: string[] | any
  foto: string | any
  esAlumno: boolean = false
  router = inject(Router)
  clasesService = inject(ClasesService);
  activateRoute = inject(ActivatedRoute)
  rating: number = 0

  constructor() {
  };


  async ngOnInit(): Promise<void> {
    this.activateRoute.params.subscribe(async (params: any) => {
      try {
        const id = params.usuarioId
        let result = await this.clasesService.getDatosUsuario(parseInt(id))
        this.rol = result[0].rol
        if (this.rol == "alumn"){
          this.esAlumno = true
        }
        //tengo el id del profe
        this.profesorId = this.infoUser.id
        this.arrDatosClases = await this.clasesService.getDatosProfesor(this.profesorId)
        //tengo el id del alumno
        this.alumnoId = this.arrDatosClases[0].alumno_id
        //tengo la especialidad
        this.especialidadId = this.arrDatosClases[0].especialidades_id
        result = await this.clasesService.getEspecialidadesByProfesorId(this.profesorId)
        this.especialidad = result[0].especialidad
        //tengo los datos del usuario para llenar los campos. Si el rol es alumno, tengo que traer al profesor.
        result = await this.clasesService.getDatosUsuario(this.rol=="alumn" ? this.profesorId : this.alumnoId)
        this.usuario = result[0]
        //tengo las fechas
        result = await this.clasesService.getFechaByClases(this.profesorId, this.alumnoId, this.especialidadId)
        this.fecha = result[result.length - 1].fecha
        this.fechas = result.length
      } catch (error) {
        console.log(error)
      }
    })
  }

  setRating(value: number): void {
    this.rating = value;
  }
  resetRating(): void {
    if (this.rating === 0) {
      return; 
    }
    this.rating = 0;
  }
  submitRating(value: number): void {
    this.rating = value;
  }
  enviarPuntuacion(): void {
    //TODO:ACA GUARDO EL COMENTARIO Y EL RATING EN LA TABLA PUNTUACIONES. LA PUNTUACION ES this.rating QUE YA ESTÁ HECHA ESA PARTE FUNCIONANDO. FALTA AGREGAR UN INPUT PARA GUARDAR EL COMENTARIO EN this.comentario.
    console.log(`Puntuación final: ${this.rating}`);
    console.log(`Comentario: ${this.comentario}`);
  }
  routeAlForo() {
    this.router.navigate([`/foro/${this.alumnoId}`])
  }
  obtenerDatosClases() {
    const profesorId = this.infoUser.id;
    this.clasesService.getDatosProfesor(profesorId)
      .then((response: any) => {
        this.arrDatosClases = response;
      })
      .catch((error: any) => {
        console.log(error)
      })
  };

  terminarClases() {
    console.log(this.profesorId, this.alumnoId, this.especialidadId)
    this.clasesService.terminarClases(this.profesorId, this.alumnoId, this.especialidadId)
      .then((response: any) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
