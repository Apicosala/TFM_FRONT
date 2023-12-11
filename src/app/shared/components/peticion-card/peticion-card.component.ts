import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEspecialidad } from 'src/app/core/models/Especialidad.interface';
import { SolicitudClase } from 'src/app/core/models/peticion.interface';
import { ClasesService } from 'src/app/core/services/clases.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-peticion-card',
  templateUrl: './peticion-card.component.html',
  styleUrls: ['./peticion-card.component.css'],
})
export class PeticionCardComponent {
  @Input() miUsuario!: SolicitudClase;

  especialidades: IEspecialidad[] | any = [];

  activatedRoute = inject(ActivatedRoute);
  peticionClasesServices = inject(ClasesService);
  router = inject(Router)


  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

    
  async loadData() {
    //recuperamos las especialidades del profesor
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = params.usuarioId;
      if (id) {
        await this.peticionClasesServices.getEspecialidadesByProfesorId(id).then(data => {
          this.especialidades = data;

          this.mostrarNombreEspecialidad();
        })
      }
    });
  }


  // Método para obtener el nombre de la especialidad por su ID.
  obtenerNombreEspecialidad(especialidadId: number): string {
    const especialidad = this.especialidades.find((especialidad: IEspecialidad) => especialidad.id === especialidadId);

    return especialidad ? especialidad.especialidad : 'Especialidad no encontrada';
  }

  // Método para mostrar el nombre de la especialidad al acceder a la página
  mostrarNombreEspecialidad() {
    const especialidadId = this.miUsuario.especialidades_id;
    const nombreEspecialidad = this.obtenerNombreEspecialidad(especialidadId);

    return nombreEspecialidad;

  }

  
  //aceptar la conexion profesor-alumno
  aceptarSolicitud() {
    const profesorId = this.miUsuario.profesor_id;
    const usuarioId = this.miUsuario.alumno_id;
    const especialidadId = this.miUsuario.especialidades_id;


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Quieres ser su profesor?",
      text: "El alumno tiene muchas ganas de aprender contigo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Acepto el desafio",
      cancelButtonText: "Prefiero pensarlo",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.peticionClasesServices
          .aceptarSolicitud(profesorId, usuarioId, especialidadId)
          .then((response) => {
            // Si el profesor acepta la operación
            swalWithBootstrapButtons.fire({
              title: "Enhorabuena",
              text: "Ya tienes un alumno más",
              icon: "success"
            });
            setTimeout(() => {
              this.router.navigate([''])
            }, 2500);
          })
          this.peticionClasesServices.insertarPrimeraClase(profesorId,usuarioId,especialidadId)

          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Ha ocurrido un error al aceptar al alumno",
            });;
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si el profesor cancela la operación
        swalWithBootstrapButtons.fire({
          title: "Tómate tu tiempo",
          text: "El alumno te espera con muchas ganas",
          icon: "error"

        });
      }
    });
  }

  // Denegar la conexion profesor-alumno
  async cancelarSolicitud() {
    try {
      const profesorId = this.miUsuario.profesor_id;
      const usuarioId = this.miUsuario.alumno_id;
      const especialidadId = this.miUsuario.especialidades_id;

      const result = await Swal.fire({
        title: "¿Seguro que no admites a este alumno?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, no lo admito",
        cancelButtonText: "Cancelar",
      })
      if (!result.isConfirmed) {
        return;
      }

      const response = await this.peticionClasesServices.cancelarSolicitud(
        profesorId, usuarioId, especialidadId);
      Swal.fire({
        title: "Rechazado",
        text: "El alumno ha sido rechazado",
        icon: "success"
      });
      setTimeout(() => {
        this.router.navigate([''])
      }, 2500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ha ocurrido un erros en la cancelación de la solicitud",
      });
    }
  }
}

