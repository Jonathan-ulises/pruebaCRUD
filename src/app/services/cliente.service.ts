import { Injectable } from '@angular/core';
import { Cliente } from '../others/interfaces';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commons } from '../others/Commons';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private _http: HttpClient
  ) { }

  /**
   * Realiza la consulta de Clientes en la base de datos
   * @returns la consulta HTTP GET
   */
  getClientesApiRest(): Observable<Array<Cliente>> {
    return this._http.get<Array<Cliente>>(Commons.BASE_URL + "api/clientes/getAll");
  }

  /**
   * Realiza el registro de un cliente en la base de datos
   * @param cl Objceto Cliente
   * @returns La consulta HTTP POST
   */
  addClienteApiRest(cl: Cliente): Observable<any> {
    /*
    Cabecera que configura el formato de los datos que seran enviados
    */
    const cabeceras = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    /**
     * Cuerpo de la consulta (los parametros que seran enviados)
     */
    const body = new URLSearchParams();
    body.set('nombre', cl.nombre);
    body.set('a_paterno', cl.a_paterno);
    body.set('a_materno', cl.a_materno);
    body.set('telefono', cl.telefono);
    body.set('rfc', cl.rfc);
    body.set('longitud', cl.longitud.toString());
    body.set('latitud', cl.latitud.toString());

    return this._http.post(Commons.BASE_URL + "api/clientes/insert", body.toString(), {headers: cabeceras});
  }
}
