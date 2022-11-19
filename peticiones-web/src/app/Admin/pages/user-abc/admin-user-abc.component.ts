import { Component, OnInit } from '@angular/core';
import { Item } from '../../services/type';
import { user, response } from '../../services/type';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, Validators} from '@angular/forms';
import { request_table } from 'src/app/components/services/request-table';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-admin-user-abc',
  templateUrl: './admin-user-abc.component.html',
  styleUrls: ['./admin-user-abc.component.css']
})
export class AdminUserAbcComponent implements OnInit {

  form = {
    user: '',
    password: '',
    employeeId: '',
    rol: '',
    status: false
  }

  roles: [] = [];

  response: response | any; //subscripcion de respuesta
  isChecked = true;     //variable para el toggle  
  dataUserShow: user | any; //tipo de dato para buscar  
  enableid : boolean = false; //para poner campo en modo lectura
  butonAddUpdate : string = ''; 

  value: string = '';

  arrayUser: user [] = [];
  itemsTable : request_table [] = []; 

  nameColum: string[] = ['ID','Usuario','Estatus','Botones'];

  itemsArray: Item[] = [];

  constructor(
    public dialog: MatDialog ,
    private APIPeticion: AdminService ) { }
  

  ngOnInit(): void {
    this.APIPeticion.getUsers().subscribe(result =>{   
      this.arrayUser = result;

      this.arrayUser.forEach((row) => { 
        this.itemsTable.push({
          col1: row.id_usuario?.toString() ?? '', 
          col2: row.usuario , 
          col3: row.estatus,
          col4: '-' });
      });                                      
    }) 

    this.APIPeticion.getRol().subscribe(role => {
      this.roles = role;
    })

  }
  
  getId(item: any){
    return item.id_rol
  }

  getLabel(item: any){
    return item.nombre_rol
  }

  onChangeActionTable(data: any){  
    if(data.action === 'delete'){
      this.ActionDelete(data.id);
    }
    else if(data.action === 'edit'){
      this.ActionEdit(data.id);
    }
    else if(data.action === 'detail'){
      this.ActionDatil(data.id);
    }  
  }
  ActionDelete(id: string){

  }

  ActionEdit(id: string){
    this.butonAddUpdate = 'a';
    this.enableid = true;
    this.dataUserShow = this.arrayUser.find(element =>
      element.id_usuario == parseInt(id)  
    );

    
  }

  ActionDatil(id: string){

  }

  clearIinput(){
    this.form.employeeId = '';
    this.form.password = '';
  }


  
}
