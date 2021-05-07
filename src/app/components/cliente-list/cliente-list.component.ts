import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/others/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';

/**
 * Libreria para generar archivos PDF 
 */
import { jsPDF } from 'jspdf';

/**
 * Implementacion de SweerAlert2
 * estas alertas es especifican son Swal.fire
 * ademas de varios parametros como el icon, title y text
 */
import Swal from 'sweetalert2'

import * as XLSX from 'xlsx';

declare var H: any;

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
  providers: [ClienteService]
})
export class ClienteListComponent implements OnInit {


  public resultListClientes: Array<Cliente>;
  public cl: Cliente;

  //Mapa
  private platform: any;
  private map: any;
  private defaultLayers: any;

  public longitud: number;
  public latitude: number;

  public actUbiBtn = false; //Variable para actualizar el mapa

  //DOCUMENTO PDF
  private date: Date;
  private img: any;

  private ws: XLSX.WorkSheet; //WorkSheet
  private wb: XLSX.WorkBook; //WorkBook
  
  constructor(
    private _ClientesService: ClienteService,
    private router: Router
  ) {
    this.date = new Date;
    this.platform = new H.service.Platform({
      "apikey": "1Prt9d6wk9LDyDioP_84FtbI1yWzrdOitKcv-Cq3qCE"
    });
  }

  ngOnInit(): void {

    this._ClientesService.getClientesApiRest().subscribe(
      result => {
        this.resultListClientes = result;
      }
      ,
      error => {
        console.log(<any>error);
      }
    );
  }

  /**
   * Llena el formulario al momento de seleccionar la opcion de editar en la tabla.
   * Esta opcion biene por cada fila de cliente y se representa con el boton verde.
   * @param i Indice del array de clientes
   */
  mostrarFormDiv(i: number) {
    const divMap = document.getElementById('mapa-cl');
    const divForm = document.getElementById('formulario');

    //Muestra el div con el formulario y esconde el div con el mapa
    if (divMap.style.display == 'block') {
      divMap.style.display = 'none';
      divForm.style.display = 'block';
    }

    //Se optiene el cliente seleccionado del array
    this.cl = this.resultListClientes[i];

    //Dibujado del mapa
    this.drawerMap(this.cl.latitud, this.cl.longitud, "map-container-form");

    //Obtencion de inputs del html
    const nom = (document.getElementById('nombreCliente') as HTMLInputElement);
    const a_pat = (document.getElementById('a_paternoCliente') as HTMLInputElement);
    const a_mat = (document.getElementById('a_maternoCliente') as HTMLInputElement);
    const tel = (document.getElementById('telefonoCliente') as HTMLInputElement);
    const rfc = (document.getElementById('rfcCliente') as HTMLInputElement);
    const lon = (document.getElementById('longitudUC') as HTMLInputElement);
    const lat = (document.getElementById('latitudUC') as HTMLInputElement);

    //Se asignan los valores al Input
    nom.value = this.cl.nombre;
    a_pat.value = this.cl.a_paterno;
    a_mat.value = this.cl.a_materno;
    tel.value = this.cl.telefono;
    rfc.value = this.cl.rfc;
    lon.value = this.cl.longitud.toString();
    lat.value = this.cl.latitud.toString();

  }

  /**
   * Muestra el mapa del cliente seleccionado del array de cliente, 
   * se representa con el boton azul
   * @param i Indice del array de clientes
   */
  mostrarMapDiv(i: number) {
    const divMap = document.getElementById('mapa-cl');
    const divForm = document.getElementById('formulario');

    if (divMap.style.display == 'none') {
      divMap.style.display = 'block';
      divForm.style.display = 'none';
    }

    this.cl = this.resultListClientes[i];
    //alert(this.cl.longitud + '-' + this.cl.latitud);
    //MOSTRAR MAPA AQUI
    this.drawerMap(this.cl.latitud, this.cl.longitud, "map-container-cl");

    this.longitud = this.cl.longitud;
    this.latitude = this.cl.latitud;

  }


  /**
   * Dibuja el mapa utilizando latitud y longitud
   * @param lat Latitud de la ubicacion
   * @param lng longitud de la ubicacion
   * @param nom_container Contenedor HTML para el Mapa
   */
  drawerMap(lat: number, lng: number, nom_container: string): void {

    let coords = null; //Coordenadas del click en el mapa
    let markerCl = null; //Marker del mapa

    this.defaultLayers = this.platform.createDefaultLayers();
    /**
     * Limpiar un mapa dibujado anteriormente
     */
    const divMapCl = document.getElementById(nom_container);
    /**
     * Limpiar un mapa dibujado anteriormente
     */
    divMapCl.innerHTML = "";

    /**
     * Markador con las cordenadas del cliente.
     */
    markerCl = new H.map.Marker({ lat: lat, lng: lng });

    /**
     * Creacion del mapa
     */
    this.map = new H.Map(
      divMapCl,
      this.defaultLayers.vector.normal.map,
      {
        center: { lat: lat, lng: lng },
        zoom: 15,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    //Marker inicial
    this.map.addObject(markerCl);

    /**
     * Evento para obtener las coodenadas 'clicleadas' en el mapa para modificar las
     * coordenadas y la pocicios del Marker en el mapa
     */
    this.map.addEventListener('tap', (evt) => {
      coords = this.map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
      console.log(coords);
      this.map.removeObject(markerCl);

      markerCl = new H.map.Marker({ lat: coords.lat, lng: coords.lng });
      this.map.addObject(markerCl);

      this.longitud = coords.lng;
      this.latitude = coords.lat;
    });

    window.addEventListener('resize', () => this.map.getViewPort().resize());
    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map))

    let ui = H.ui.UI.createDefault(this.map, this.defaultLayers);
  }

  /**
   * Escoande o muestra el boton para actualizar el mapo con los nuevos datos ingresados.
   * @param value Booleano para mostrar el boton
   */
  mostrarActUbiBtn(value: boolean): void {

    this.actUbiBtn = value;
  }

  /**
   * Actualiza el mapa del formulario con los nuevos datos ingresados.
   */
  actualizarMapa() {
    this.cl.longitud = this.longitud;
    this.cl.latitud = this.latitude;

    alert(this.cl.latitud + " - " + this.cl.longitud);
    this.drawerMap(this.cl.latitud, this.cl.longitud, "map-container-form")
  }

  /**
   * Modifica un cliente de la base de datos.
   */
  modificar(): void {
    const nombre = (document.getElementById("nombreCliente") as HTMLInputElement).value;
    const a_paterno = (document.getElementById("a_paternoCliente") as HTMLInputElement).value;
    const a_materno = (document.getElementById("a_maternoCliente") as HTMLInputElement).value;
    const telefono = (document.getElementById("telefonoCliente") as HTMLInputElement).value;
    const rfc = (document.getElementById("rfcCliente") as HTMLInputElement).value;
    const longitud = (document.getElementById("longitudUC") as HTMLInputElement).value;
    const latitud = (document.getElementById("latitudUC") as HTMLInputElement).value

    this.cl.nombre = nombre.toString().toUpperCase();
    this.cl.a_paterno = a_paterno.toString().toUpperCase();
    this.cl.a_materno = a_materno.toString().toUpperCase();
    this.cl.telefono = telefono;
    this.cl.rfc = rfc.toString().toUpperCase();
    this.cl.longitud = parseFloat(longitud);
    this.cl.latitud = parseFloat(latitud);


    console.log(this.cl);

    this._ClientesService.updateClienteApiRest(this.cl).subscribe(
      result => {
        console.log(result);

        Swal.fire({
          icon: 'success',
          title: '¡Modificacion Exitosa!'
        });

        this._ClientesService.getClientesApiRest().subscribe(
          result => {
            this.resultListClientes = result;
          }
          ,
          error => {
            console.log(<any>error);
          }
        );

        const divMap = document.getElementById('mapa-cl');
        const divForm = document.getElementById('formulario');

        if (divMap.style.display == 'none') {
          divMap.style.display = 'block';
          divForm.style.display = 'none';
        }
      }
      ,
      error => {
        console.log(<any>error);

        Swal.fire({
          icon: 'error',
          title: '¡A ocurrido un error Interno!'
        });
      }
    )
  }

  /**
   * Optiene la ubicacion del usuario.
   */
  tomarUbicacion(): void {
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
          this.drawerMap(this.latitude, this.longitud, "map-container-form");
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
   * Elimina un cliente de la base de datos.
   * @param i Indice del array de clientes
   */
  eliminarCliente(i: number): void {
    //Se optiene el cliente seleccionado del array
    this.cl = this.resultListClientes[i];

    this._ClientesService.deteleteClienteApiRest(this.cl).subscribe(
      result => {
        console.log(result);

        Swal.fire({
          icon: 'success',
          title: '¡Eliminacion Exitosa!'
        });


        /**
         * Se optiene la lista de cliente actualizada.
         */
        this._ClientesService.getClientesApiRest().subscribe(
          result => {
            this.resultListClientes = result;
            const divMap = document.getElementById('mapa-cl');
            const divForm = document.getElementById('formulario');

            /**
             * Cierra el formulario de modificacion de un cliente que fue
             * eliminado.
             */
            if (divMap.style.display == 'none') {
              divMap.style.display = 'block';
              divForm.style.display = 'none';
            }
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

        this.router.navigate(['home']);
      },
      error => {
        console.log(<any>error);

        Swal.fire({
          icon: 'error',
          title: '¡A ocurrido un error Interno!'
        });
      }
    )
  }

  /**
   * Busca un cliente directamente en la base de datos
   * @param txt Nombre, Apellido paterno, Apellido materno a buscar
   */
  buscarCliente(txt: string) {

    /**
     * Si el campo de texto esta vasio, realiza la consulta completa de los clientes
     */
    if (txt == "") {

      this._ClientesService.getClientesApiRest().subscribe(
        result => {
          this.resultListClientes = result;
        }
        ,
        error => {
          console.log(<any>error);
        }
      );
    } else {

      this._ClientesService.searchClienteApiRest(txt).subscribe(
        result => {
          /**
           * Si el resultado de la consulta es NOTFOUND, quiere decir que no
           * encontro el cliente en la base de datos. Se mostrara alerta de error.
           */
          if (result.result == 'NOTFOUND') {
            Swal.fire({
              icon: 'error',
              title: 'Usuario no encontrado'
            });
          } else {

            //Se actualiza la tabla con los datos del cliente consultado.
            console.log(result);
            this.resultListClientes = result;
          }
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
  }

  /**
   * Genera archivo PDF con los datos del cliente
   */
  generarPDF(): void {
    const doc = new jsPDF();
    
    const nombrePDF = this.date.toDateString() +
      '-' + this.date.getHours() +
      '-' + this.date.getMinutes() +
      '-' + this.date.getSeconds() + 
      '-' + this.date.getMilliseconds() + 
      '_' + this.cl.nombre;

    //Dibujado del PDF
    doc.setFontSize(24);
    doc.text('Datos del cliente', 10, 20); //titulo
    doc.setFontSize(14);

    doc.line(5, 25, 200, 25);

    doc.text('Nombre: ' + this.cl.nombre, 10, 35); //Nombre
    doc.text('Apellido Paterno: ' + this.cl.a_paterno, 10, 45); //Apellido Paterno
    doc.text('Apellido Materno: ' + this.cl.a_materno, 10, 55); //Apellido Materno
    doc.text('Telefono: ' + this.cl.telefono, 10, 65); //Telefono
    doc.text('RFC: ' + this.cl.rfc, 10, 75); //RFC

    doc.setFontSize(24);
    doc.text('Ubicación', 10, 95); //Ubicacion
    doc.setFontSize(14);

    doc.line(5, 101, 200, 101);

    doc.text('Longitud: ' + this.cl.longitud +
      " / Latitud: " + this.cl.latitud, 10, 111); //Coordenadas

    doc.save(nombrePDF + '.pdf');
  }

  /**
   * Genera archivo XLSX con la tabla de los clientes.
   */
  generarXLSX(): void{
    const nombreXLSX = this.date.toDateString() +
      '-' + this.date.getHours() +
      '-' + this.date.getMinutes() +
      '-' + this.date.getSeconds() + 
      '-' + this.date.getMilliseconds();


    this.ws = XLSX.utils.json_to_sheet(this.resultListClientes);
    this.wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(this.wb, this.ws, 'Clientes');
    XLSX.writeFile(this.wb, nombreXLSX + '-Tabla_Clientes.xlsx');
  }
}
