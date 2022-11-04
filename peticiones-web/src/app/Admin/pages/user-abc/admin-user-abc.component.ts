import { Component, OnInit } from '@angular/core';
import { Item } from '../../services/type';
import { user, response } from '../../services/type';
import { request_table } from 'src/app/components/services/request-table';

@Component({
  selector: 'app-admin-user-abc',
  templateUrl: './admin-user-abc.component.html',
  styleUrls: ['./admin-user-abc.component.css']
})
export class AdminUserAbcComponent implements OnInit {

    id_usuario?: string = '';
    id_empleado: string = '';
    id_rol: string = '';
    usuario: string = '';
    password: string = '';
    estatus: string = '';

    response: response | any; 
    isChecked = true;    
    dataUserShow: user | any; 
    enableid : boolean = false; 
    butonAddUpdate : string = ''; 

    arrayUser: user[] = [];
    itemsTable : request_table[]=[]; 

    namecolum: string[] = ['ID','Usuario','Estatus','Botones'];
    ItemSend: String = "";



  itemsArray: Item[] = [
    {_id: "55000", option: 'Opcion 1'}
  ];

  constructor() { }

  ngOnInit(): void {
    
  }

}
