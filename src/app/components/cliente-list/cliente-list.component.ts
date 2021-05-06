import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/others/interfaces';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
  providers: [ClienteService]
})
export class ClienteListComponent implements OnInit {

  public resultListClientes: Array<Cliente>;
  constructor(
    private _ClientesService: ClienteService
  ) { }

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

}
