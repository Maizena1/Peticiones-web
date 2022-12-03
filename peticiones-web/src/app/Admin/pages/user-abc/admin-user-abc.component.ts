import { Component, OnInit } from '@angular/core';
import { Item } from '../../services/type';
import { User, response } from '../../services/type';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, Validators} from '@angular/forms';
import { request_table } from 'src/app/components/services/request-table';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-admin-user-abc',
  templateUrl: './admin-user-abc.component.html',
  styleUrls: ['./admin-user-abc.component.css']
})
export class AdminUserAbcComponent implements OnInit {
  
  COLUMN_NAMES: string[] = ['ID','Usuario','Estatus','Botones'];

  formAction: "create" | "edit" = "create";

  form = {
    user: '',
    password: '',
    employeeId: '',
<<<<<<< HEAD
    roleId: 0,
    status: true
  }

  users: User [] = [];
  itemsTable : User[] = []; 
  roleSelect: Item[] = [];

  constructor(
    public dialog: MatDialog ,
    private APIpeticion: AdminService ){}
=======
    status: false
  }

  estatusUser: string ='';
  idRolSelect: number = 0;
  roles: [] = [];

  response: response | any; //subscripcion de respuesta
  isChecked = true;     //variable para el toggle  
  dataUserShow: user | any; //tipo de dato para buscar  
  enableid : boolean = false; //para poner campo en modo lectura
  button : string = 'add'; 

  value: string = '';

  arrayUser: user [] = [];
  itemsTable : request_table [] = []; 

  nameColum: string[] = ['ID','Usuario','Estatus','Botones'];

  itemsArray: Item[] = [];
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(public dialog: MatDialog ,private router: Router, private APIPeticion: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,) { }
>>>>>>> 60303218eae81f2ad8947ba5cfe6356581460db8
  
    idRol: number = 0;
    dataSesion:user|any;

  ngOnInit(): void {

<<<<<<< HEAD
    this.APIpeticion.getUsers().subscribe(result =>{   
      this.users = result;

      // this.users.forEach((row) => { 
      //   this.itemsTable.push({
      //     col1: row.id?.toString() ?? '', 
      //     col2: row.userName, 
      //     col3: row.status,
      //     col4:'-' });
      // });                                      
    }) 

    this.APIpeticion.getRol().subscribe(result => {
      this.roleSelect = result.map((rol: any) =>{
        return {
          _id: rol.id_rol,
          option: rol.nombre_rol
        }
      });
=======
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

    this.APIPeticion.getUsers().subscribe(result =>{   
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

    this.APIPeticion.getRol().subscribe(role => {
      this.roles = role;
>>>>>>> 60303218eae81f2ad8947ba5cfe6356581460db8
    })

  }
  
<<<<<<< HEAD
  onClickAction(data: any){ 
    console.log(data, 'asdasd') 
=======
  getId(item: any){
    return item.id_rol
  }

  getLabel(item: any){
    return item.nombre_rol
  }

  onChangeActionTable(data: any){  
>>>>>>> 60303218eae81f2ad8947ba5cfe6356581460db8
    if(data.action === 'delete'){
      this.ActionDelete(data.id);
    }
    else if(data.action === 'edit'){
      this.ActionEdit(data.id);
      this.formAction = "edit";

      const selectedUser = this.users.find((user) => user.id === data.id)
      if(!selectedUser){
        return
      }
      
      const {userName, password, employeeId, roleId, status} = selectedUser
      
      this.form = {
        user: userName,
        password,
        employeeId: employeeId.toString(),
        roleId,
        status


      }


    }
    else if(data.action === 'detail'){
      this.ActionDatil(data.id);
    }  
  }
  ActionDelete(id: string){

  }

  ActionEdit(id: string){
    this.clearInput();
    this.button = 'update';
    this.enableid = true;
    this.dataUserShow = this.arrayUser.find(element =>
      element.id_usuario == parseInt(id)  
    );    

  }

  ActionDatil(id: string){

  }

<<<<<<< HEAD
  createUser(){
  
  }
  
  changeRole(role: string){
    this.form.roleId = parseInt(role);
  }
=======
  clearInput(){
    this.form.user = '';
    this.form.password = '';
    this.form.employeeId = '';
    this.idRolSelect = 0;
  }


>>>>>>> 60303218eae81f2ad8947ba5cfe6356581460db8
  
}
