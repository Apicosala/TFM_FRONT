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
        if (!this.arrUsuario.length) {
          this.arrUsuario = await this.listaAlumnosService.getAlumnosByProfesorId(id);

          this.ordenarAlfabeticamente();
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
  private ordenarAlfabeticamente(): void {
    this.arrUsuario.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }


}

