import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaProfesoresService } from '../services/listaProfesores.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-lista-profesores',
  templateUrl: './lista-profesores.component.html',
  styleUrls: ['./lista-profesores.component.css'] 
})
export class ListaProfesoresComponent {

  arrProfesores: any[] = [];
  public id: number | any;
  nombreEspecialidad: string | any;
  puntuacion: string = "";

  modalSwitch: boolean = false;
  toggleButtonText:string = "Ver en el mapa"
  especialidadId:number|any

  marcadores: any[] = [];
  centro: google.maps.LatLng | any;
  zoom: number = 12;
  icono: string = "."    
  router = inject(Router)
    
  circleOptions: any = {
    fillColor: '#cfb3fc',
    strokeColor: '#cfb3fc',
    clickable: true
  }

  activatedRoute = inject(ActivatedRoute);
  listaProfesoresService = inject(ListaProfesoresService);

  async ngOnInit(): Promise<void> {
    this.centro = new google.maps.LatLng(40.4,-3.5)

    this.activatedRoute.params.subscribe(async (params: any) => {

      try {
      this.id = params.especialidadId;
        if (this.id) {
          this.especialidadId=this.id
        this.listaProfesoresService.getProfesoresByEspecialidadId(this.id).then(data => {
          this.arrProfesores = data;
          
          this.arrProfesores.forEach(profesor => {

            this.listaProfesoresService.getPuntuacionesByProfesorId(profesor.id).then(data => {
              let puntuacionMedia = 0;
              data.forEach(puntuacion => {
                puntuacionMedia = puntuacion.puntuacion + puntuacionMedia
              });
              
              this.puntuacion = (puntuacionMedia/data.length).toFixed(1);
              profesor.puntuacion = this.puntuacion;
              
              this.arrProfesores.sort((a, b) => {
                if(a.puntuacion > b.puntuacion) {
                  return -1;
                }
                if(a.puntuacion < b.puntuacion) {
                  return 1;
                }
                if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
                  return -1;
                }
                if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
                  return 1;
                }
                return 0;
              })
              })
              if (profesor.activo == 1){
                this.marcadores.push({id: profesor.id, coordenadas: new google.maps.LatLng(profesor.lat,profesor.lon), centroMarcador: new google.maps.LatLng(profesor.lat+0.01,profesor.lon+0.01), label: {text: profesor.nombre, color: "#cfb3fc"}});
              }             
          });

          //Por defecto ordenamos los profesores por puntuacion 

          })
        this.listaProfesoresService.getNombreEspecialidad().then(nombre => {
          let especialidad = nombre.find((esp)=> esp.id == this.id);
          this.nombreEspecialidad =  (especialidad.especialidad).toUpperCase();
        })       
      
      }
      } catch (error) {
        alert(error)
      }
    });
  }

  toggleModal(){
    this.modalSwitch = !this.modalSwitch;
    if (this.modalSwitch == true) {
      this.onClickOpenMap();
      this.toggleButtonText = "Volver al listado"
    }else{
      this.toggleButtonText = "Ver en el mapa"
    } 
  }

  onClickOpenMap() {
    Swal.fire({
      title: '¿Nos permites conocer tu ubicación?',
      text: 'Para mostrarte los profesores más cercanos necesitamos conocer tu ubicación. No te preocupes, no los guardaremos.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, permitir',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed){
        this.getUserLocation()
        
      }
    }); 
  }

  async getUserLocation() {
    try {
    const location: any = await this.listaProfesoresService.getUserLocation();
    this.centro = new google.maps.LatLng(location.latitude, location.longitude)
    
    
  } catch (error) {
    console.log(error);
  } 
}

verDetallesProfesor(profesorId:number, especialidad:number){
  this.router.navigate(['/detalles/', profesorId], { queryParams: { esp: especialidad } });
}
}
