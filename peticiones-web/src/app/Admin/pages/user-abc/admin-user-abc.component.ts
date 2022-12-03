import { Component, OnInit } from '@angular/core';
import { Item } from '../../services/type';
import { User, response } from '../../services/type';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, } from '@angular/forms';
import { request_table } from 'src/app/components/services/request-table';
import { MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-admin-user-abc',
  templateUrl: './admin-user-abc.component.html',
  styleUrls: ['./admin-user-abc.component.css']
})
export class AdminUserAbcComponent implements OnInit {
  
  COLUMN_NAMES: string[] = ['ID','Usuario','Estatus','Botones'];

  formAction: "create" | "edit" = "create";

  form = {
    userName: '',
    password: '',
    employeeId:'',
    roleId: '',
    status: false
  }

  estatusUser: string ='';
  idRolSelect: number = 0;
  roles: [] = [];

  response: response | any; //subscripcion de respuesta
  toggle = true;     //variable para el toggle  
  dataUserShow: User | any; //tipo de dato para buscar  
  enableid : boolean = false; //para poner campo en modo lectura
  button : string = 'add'; 

  value: string = '';

  arrayUser: User [] = [];
  itemsTable : request_table [] = []; 

  nameColum: string[] = ['ID','Usuario','Estatus','Botones'];

  itemsArray: Item[] = [];
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  users: any;

  constructor(public dialog: MatDialog ,private router: Router, private adminService: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,) { }
  
    idRol: number = 0;
    dataSesion:User|any;

  ngOnInit(): void {

    if (localStorage){    
      if(localStorage.getItem('dataSesion') !== undefined && localStorage.getItem('dataSesion')){        
        const userJson = localStorage.getItem('dataSesion');
        this.dataSesion = userJson !== null ? JSON.parse(userJson) : console.log('Estoy devolviendo nulo');                                
        this.idRol = this.dataSesion.id_rol;        
        if(this.idRol != 1){          
          this._snackBar.open('Error no tiene permisos o no inicio sesión', 'X', {      
            verticalPosition: this.verticalPosition,   
            duration: 3000,   
            panelClass: ['red-snackbar'],
          });
          this.router.navigate(["login"]);              
        }
      }else{        
          //alert("DataSesion no existe en localStorage!!"); 
          this.router.navigate(["login"]);              
      }
    }        

    this.adminService.getUsers().subscribe(result =>{   
      this.arrayUser = result;

      this.arrayUser.forEach((row) => { 
        if(row.estatus === 'A'){
          this.estatusUser = 'Activo';
        }else{
          this.estatusUser = 'Inactivo';
        }
        this.itemsTable.push({
          col1: row.id_usuario?.toString() ?? '', 
          col2: row.usuario , 
          col3: this.estatusUser,
          col4: '-' 
        });
      });                                      
    }) 

    this.adminService.getRol().subscribe(role => {
      this.roles = role;
    })

  }
  
  getId(item: any){
    return item.id_rol.toString()
  }

  getLabel(item: any){
    return item.nombre_rol
  }

  createUser(){

    const { userName, password, employeeId, roleId } = this.form

    const estatus = this.form.status ? 'A' : 'B';

    this.adminService.createUser({id_empleado: parseInt(employeeId), password, estatus, usuario: userName, id_rol: parseInt(roleId)}).subscribe()

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


  }

  ActionDatil(id: string){

  }

  clearInput(){
    this.form.userName = '';
    this.form.password = '';
    this.idRolSelect = 0;
  }


  
}
