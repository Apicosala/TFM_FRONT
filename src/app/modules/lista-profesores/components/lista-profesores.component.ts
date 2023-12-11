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

  filtros = ["Puntuacion1","Puntuacion2","Puntuacion3","Puntuacion4","Puntuacion5", "Precio1", "Precio2", "Precio3", "Precio4", "Experiencia1","Experiencia2","Experiencia3"];
  filtroSeleccionado: string = "";
  arrProfesoresFiltrado: any[] = [];

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
          this.arrProfesoresFiltrado = data;
          
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
    alert(error)
  } 
  }


  // Limitar la elección de 1 filtro
  selectFiltro(click: string){

    this.filtros.forEach(filt => {
      if(`button${filt}` !== click ){
      const checkbox = document.getElementById(`button${filt}`) as HTMLInputElement | null;
      checkbox!.checked = false
      }   
    });
  }

  // Obtener el filtro seleccionado
  getFilters() {
    this.filtroSeleccionado = "";

    this.filtros.forEach(filt => {
      const checkbox = document.getElementById(`button${filt}`) as HTMLInputElement | null;
      if(checkbox!.checked == true){
        this.filtroSeleccionado = filt;
      }        
    }); 

    this.setFilters()
  }

  //Establecer que se va a filtrar
  setFilters(){
    if(this.filtroSeleccionado.charAt(1)=="u"){
      this.filtrar("puntuacion",this.filtroSeleccionado.charAt(this.filtroSeleccionado.length - 1))
    }else if(this.filtroSeleccionado.charAt(1)=="r"){
      this.filtrar("pxh",this.filtroSeleccionado.charAt(this.filtroSeleccionado.length - 1))
    }else if(this.filtroSeleccionado.charAt(1)=="x") {
      this.filtrar("experiencia",this.filtroSeleccionado.charAt(this.filtroSeleccionado.length - 1))
    }else if (this.filtroSeleccionado == ""){
      this.arrProfesoresFiltrado = this.arrProfesores;
    }

  }

  filtrar(clave: string, valor: string){
    this.arrProfesoresFiltrado = [];
    this.marcadores = [];
    
    this.arrProfesores.forEach(profesor => {
      if(profesor.activo == 1){
      if(clave == "puntuacion"){
        if (profesor.puntuacion>valor) {
          this.arrProfesoresFiltrado.push(profesor)
          this.marcadores.push({id: profesor.id, coordenadas: new google.maps.LatLng(profesor.lat,profesor.lon), centroMarcador: new google.maps.LatLng(profesor.lat+0.01,profesor.lon+0.01), label: {text: profesor.nombre, color: "#cfb3fc"}});
          
        }     

      }else if (clave == "pxh"){
        const precio = parseInt(valor)*10
        if (valor == "4"){
          if (profesor.pxh>31) {
            this.arrProfesoresFiltrado.push(profesor)
            this.marcadores.push({id: profesor.id, coordenadas: new google.maps.LatLng(profesor.lat,profesor.lon), centroMarcador: new google.maps.LatLng(profesor.lat+0.01,profesor.lon+0.01), label: {text: profesor.nombre, color: "#cfb3fc"}});
            } 
        }else {          
          if (profesor.pxh<precio) {
            this.arrProfesoresFiltrado.push(profesor)
            this.marcadores.push({id: profesor.id, coordenadas: new google.maps.LatLng(profesor.lat,profesor.lon), centroMarcador: new google.maps.LatLng(profesor.lat+0.01,profesor.lon+0.01), label: {text: profesor.nombre, color: "#cfb3fc"}});
          }     
        }      

      }else if (clave == "experiencia"){
        if (valor == "1"){
          if (profesor.experiencia<2) {
            this.arrProfesoresFiltrado.push(profesor)
            this.marcadores.push({id: profesor.id, coordenadas: new google.maps.LatLng(profesor.lat,profesor.lon), centroMarcador: new google.maps.LatLng(profesor.lat+0.01,profesor.lon+0.01), label: {text: profesor.nombre, color: "#cfb3fc"}});
          } 
        }else if (valor == "2") {          
          if (profesor.experiencia>=2 && profesor.experiencia<10 ) {
            this.arrProfesoresFiltrado.push(profesor)
            this.marcadores.push({id: profesor.id, coordenadas: new google.maps.LatLng(profesor.lat,profesor.lon), centroMarcador: new google.maps.LatLng(profesor.lat+0.01,profesor.lon+0.01), label: {text: profesor.nombre, color: "#cfb3fc"}});
          }
        }else {
          if (profesor.experiencia>=10) {
            this.arrProfesoresFiltrado.push(profesor)
            this.marcadores.push({id: profesor.id, coordenadas: new google.maps.LatLng(profesor.lat,profesor.lon), centroMarcador: new google.maps.LatLng(profesor.lat+0.01,profesor.lon+0.01), label: {text: profesor.nombre, color: "#cfb3fc"}});
          }
        }     

      }
    }
    });
  }



verDetallesProfesor(profesorId:number, especialidad:number){
  this.router.navigate(['/detalles/', profesorId], { queryParams: { esp: especialidad } });
}
}
