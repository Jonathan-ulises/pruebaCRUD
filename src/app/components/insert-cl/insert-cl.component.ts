import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/others/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';

/**
 * Implementacion de SweerAlert2
 * estas alertas es especifican son Swal.fire
 * ademas de varios parametros como el icon, title y text
 */
 import Swal from 'sweetalert2'

declare var H: any;

@Component({
  selector: 'app-insert-cl',
  templateUrl: './insert-cl.component.html',
  styleUrls: ['./insert-cl.component.css']
})
export class InsertClComponent implements OnInit {

  private cliente: Cliente;
  private platform: any;
  private defaultLayers: any;
  public longitud: number;
  public latitude: number;


  constructor(
    private _clietneService: ClienteService,
    private router: Router
  ) {
    this.cliente = new Cliente();
    this.platform = new H.service.Platform({
      "apikey": "1Prt9d6wk9LDyDioP_84FtbI1yWzrdOitKcv-Cq3qCE"
    });
  }

  ngOnInit(): void {

    this.getLocationUser();
  }

  /**
   * Envia los datos del formulario al servidor para registrarlos
   */
  registrar(): void {
    const nombre = (document.getElementById("nombreCliente") as HTMLInputElement).value;
    const a_paterno = (document.getElementById("a_paternoCliente") as HTMLInputElement).value;
    const a_materno = (document.getElementById("a_maternoCliente") as HTMLInputElement).value;
    const telefono = (document.getElementById("telefonoCliente") as HTMLInputElement).value;
    const rfc = (document.getElementById("rfcCliente") as HTMLInputElement).value;
    const longitud = (document.getElementById("longitudUC") as HTMLInputElement).value;
    const latitud = (document.getElementById("latitudUC") as HTMLInputElement).value

    this.cliente.nombre = nombre.toString().toUpperCase();
    this.cliente.a_paterno = a_paterno.toString().toUpperCase();
    this.cliente.a_materno = a_materno.toString().toUpperCase();
    this.cliente.telefono = telefono;
    this.cliente.rfc = rfc.toString().toUpperCase();
    this.cliente.longitud = parseFloat(longitud);
    this.cliente.latitud = parseFloat(latitud);

    console.log(this.cliente)

    this._clietneService.addClienteApiRest(this.cliente).subscribe(
      result => {
        console.log(result)

        Swal.fire({
          icon: 'success',
          title: '¡Registro Exitoso!'
        });

        this.router.navigate(['home']);
      }
      ,
      error => {
        console.log(<any>error);

        Swal.fire({
          icon: 'error',
          title: '¡A ocurrido un error Interno!'
        });
      }
    );


  }

  /**
   * Obtiene la localizacion del usuario
   */
  getLocationUser(): void {

    const config = {
      enableHighAccuracy: true,
      maximumAge: Infinity,
      timeout: Infinity
    };

    //Verifica si el navegador es compatible con la geolocalizacion
    if ('geolocation' in navigator) {
      
      /*
      Se obtiene la posicion del usuario, el metodo .getCurrentPosition()
      resibe como parametros, un succes callback para obtener las cordenadas,
      un error callback en caso de ocurrir algun error con la localizacion.
      */
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position)
          this.longitud = position.coords.longitude;
          this.latitude = position.coords.latitude;
          this.drawerMap(this.latitude, this.longitud);
        }, () => {
          Swal.fire({
            icon: 'error',
            title: '¡A ocurrido un error Interno!',
            text: 'No hay permisos para obtener tu ubicacion'
          });

          
        }, config)
    }
  }

  /**
   * Dibuja el mapa utilizando latitud y longitud
   * @param lat Latitud de la ubicacion
   * @param lng longitud de la ubicacion
   */
  drawerMap(lat: number, lng: number): void {
    this.defaultLayers = this.platform.createDefaultLayers();
    const map = new H.Map(
      document.getElementById("map-container"),
      this.defaultLayers.vector.normal.map,
      {
        zoom: 15,
        center: { lat: lat, lng: lng }
      }
    );
  }
}
