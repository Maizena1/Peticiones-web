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

  nameColum: string[] = ['ID','Usuario','Estatus','Botones'];

  itemsArray: Item[] = [
    {_id: "55000", option: 'Opcion 1'}
  ];

  constructor(public dialog: MatDialog ,private router: Router, private APIpeticion: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, ) { }
  

  ngOnInit(): void {
   
  }

}
