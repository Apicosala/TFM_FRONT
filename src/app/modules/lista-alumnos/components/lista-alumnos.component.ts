import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolicitudClase } from 'src/app/core/models/peticion.interface';
import { ListaAlumnosService } from '../services/listAlumnos.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css'],
})
export class ListaAlumnosComponent {
  arrUsuario: SolicitudClase[] = [];

  activatedRoute = inject(ActivatedRoute);
  listaAlumnosService = inject(ListaAlumnosService);

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(async (params: any) => {
      try {
        let id = params.usuarioId;
<<<<<<< HEAD
        this.arrUsuario = await this.listaAlumnosService.getAlumnosByProfesorId(
          id
        );
        console.log(this.arrUsuario);
      } catch (error) {
        console.log(error);
      }
    });
=======
        this.arrUsuario = await this.listaAlumnosService.getAlumnosByProfesorId(id);
      } catch (error) {
        //TODO: mostrar error al usuario
        console.log(error)
        
      } 
    })
>>>>>>> c313377acb3eddeda0fc5b93893b0af9c7920b46
  }
}
