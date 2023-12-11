import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClasesAlumnosService } from '../services/clasesAlumnos.service';
import { SolicitudClase } from 'src/app/core/models/peticion.interface';
import { ClasesService } from 'src/app/core/services/clases.service';
import { UsersService } from '../../auth/services/users.service';


@Component({
  selector: 'app-clases-alumno',
  templateUrl: './clases-alumno.component.html',
  styleUrls: ['./clases-alumno.component.css']
})
export class ClasesAlumnoComponent {

  arrUsuarioClases: SolicitudClase[] = [];
  arrDatosClases: any[] = [];
  arrProfesores: any[] = [];
  uniqueArrDatosClases:any[]=[]
  fechas:number = 0


  clasesService = inject(ClasesService)
  activatedRoute = inject(ActivatedRoute);
  clasesAlumnoService = inject(ClasesAlumnosService);
  userService = inject(UsersService)


  ngOnInit(){
    

    this.activatedRoute.params.subscribe(async (params: any) => {
      try {
        
        // recuperamos las clases con el Id del usuario
        let id = params.usuarioId;
        const user = await this.userService.getDataById(id)


        this.arrUsuarioClases = await this.clasesAlumnoService.getClasesByUsuarioId(id);
        console.log(this.arrUsuarioClases)
        // Recuperamos los datos de los usuarios y los guardamos en un array
        for (const clase of this.arrUsuarioClases) {
          const profesorId = clase.profesor_id;
          const alumnoId = clase.alumno_id;
          const especialidadId =clase.especialidades_id
          const clasesAlumno = this.arrUsuarioClases.filter(clase => clase.alumno_id === alumnoId && clase.especialidades_id === especialidadId);
          this.fechas = clasesAlumno.length;
          
          const result = await this.clasesAlumnoService.getProfesorById(profesorId);
          this.arrProfesores.push(result);


          // Obtenemos el nombre de la especialidad
          const especialidadResult = await this.clasesService.getEspecialidadesByProfesorId(profesorId);
          const especialidad = especialidadResult[0].especialidad;

          
          const esProfesor = user[0].rol === 'prof';


          const userId = esProfesor ? alumnoId : profesorId;
          
          const userResult = await this.userService.getDataById(userId)

          this.arrDatosClases.push({
            id: clase.id,
            alumno_id: clase.alumno_id,
            profesor_id: clase.profesor_id,
            especialidades_id: clase.especialidades_id,
            fecha: clase.fecha,
            usuario: userResult[0],
            nombre: '',
            apellidos: '',
            especialidad: especialidad,
            mail: '',
            pass: '',
            foto: '',
            rol: '',
            tel: '',
            pxh: 0,
            experiencia: 0,
            lat: 0,
            lon: 0,
            activo: true,
            fechas: this.fechas -1
          });
        }
        this.uniqueArrDatosClases = this.arrDatosClases.reduce((acc, current) => {
          // Encuentra todos los objetos con los mismos campos clave
          const matchingObjects = acc.filter(
            (obj: any) =>
              obj.alumno_id === current.alumno_id &&
              obj.profesor_id === current.profesor_id &&
              obj.especialidades_id === current.especialidades_id
          );
        
          if (matchingObjects.length === 0) {
            // Si no hay coincidencias, simplemente agrega el objeto actual
            acc.push(current);
          } else {
            // Si hay coincidencias, encuentra el objeto con el id más alto
            const maxIdObject = matchingObjects.reduce((maxObj:any, obj:any) =>
              obj.id > maxObj.id ? obj : maxObj
            );
        
            // Si el id del objeto actual es mayor, reemplázalo
            if (current.id > maxIdObject.id) {
              const index = acc.findIndex(
                (obj:any) => obj.id === maxIdObject.id
              );
              acc[index] = current;
            }
          }
        
          return acc;
        }, []);
      } catch (error) {
        alert(error);
      }
    });
  }
  isEmptyProfesores(): boolean {
    
    const isEmpty = !this.arrProfesores || this.arrProfesores.length === 0;
    return isEmpty;
  }
  
  

}
