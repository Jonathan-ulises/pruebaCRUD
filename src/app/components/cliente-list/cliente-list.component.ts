import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/others/interfaces';
import { ClienteService } from 'src/app/services/cliente.service';

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

  constructor(
    private _ClientesService: ClienteService
  ) { 
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
  mostrarFormDiv(i: number){
    const divMap = document.getElementById('mapa-cl');
    const divForm = document.getElementById('formulario');

    //Muestra el div con el formulario y esconde el div con el mapa
    if(divMap.style.display == 'block'){
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
  mostrarMapDiv(i: number){
    const divMap = document.getElementById('mapa-cl');
    const divForm = document.getElementById('formulario');

    if(divMap.style.display == 'none'){
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
   */
  drawerMap(lat: number, lng: number, nom_container: string): void {
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
    let markerCl = new H.map.Marker({lat: lat, lng: lng});
    
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

    this.map.addObject(markerCl);

    window.addEventListener('resize', () => this.map.getViewPort().resize());
    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map))
  
    let ui = H.ui.UI.createDefault(this.map, this.defaultLayers);
  }
}
