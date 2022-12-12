import { Component, OnInit } from '@angular/core';
import { Item } from '../../services/type';
import { User, response } from '../../services/type';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, } from '@angular/forms';
import { request_table } from 'src/app/components/services/request-table';
import { MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogDetailComponent } from 'src/app/components/dialog-detail/dialog-detail.component';



@Component({
  selector: 'app-admin-user-abc',
  templateUrl: './admin-user-abc.component.html',
  styleUrls: ['./admin-user-abc.component.css']
})
export class AdminUserAbcComponent implements OnInit {
  
  COLUMN_NAMES: string[] = ['ID','Usuario','Estatus','Botones'];


  form = {
    userId: '',
    userName: '',
    password: '',
    employeeId:'',
    roleId: '',
    status: false,
  }

  toggle: string = '';

  estatusUser: string ='';
  idRolSelect: number = 0;
  roles: any [] = [];

  response: response | any; //subscripcion de respuesta
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
          this.router.navigate(["login"]);              
      }
    }        

    this.updateTable()
    

    this.adminService.getRol().subscribe(role => {
      this.roles = role;
    })


  }

  SnackBarError(mensaje: string, icon: string){
    this._snackBar.open(mensaje, icon, {
      verticalPosition: this.verticalPosition,
      panelClass: ['red-snackbar'],
      duration: 3000,
    });
  }

  SnackBarSuccessful(mensaje: string, icon: string){
    this._snackBar.open(mensaje, icon, {
      verticalPosition: this.verticalPosition,
      panelClass: ['green-snackbar'],
      duration: 3000,
    });
  }

  ReloadUsers(){
    this.arrayUser = [];
    this.adminService.getUsers().subscribe(result => {
      this.arrayUser = result;
    });
  }

  ClearInput(){
    this.form = {
      userId: ' ',
      userName: ' ',
      password: ' ',
      employeeId:' ',
      roleId: ' ',
      status: false,
    }
  }
  
  getId(item: any){
    return item.id_rol.toString()
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

  
  CreateUser(){
    console.log(this.form)
    const { userName, password, employeeId, roleId } = this.form

    const estatus = this.form.status ? 'A' : 'B';

    this.adminService.createUser({id_empleado: parseInt(employeeId),password, estatus, usuario: userName, id_rol: parseInt(roleId)}).subscribe(response => {
      this.response = response;

      if(this.response.Estatus == 'Error'){
        this.SnackBarError(this.response.Mensaje, 'X')
      }else{
        this.SnackBarSuccessful(this.response.Mensaje, 'X')
        this.ReloadUsers();
      }
    })

  }
  
  ActionDelete(id: string){
  
  }

  ActionEdit(id: string){

    this.button = 'update';
    
    this.dataUserShow = this.arrayUser.find(element =>
      element.id_usuario == parseInt(id)
    );

    this.form.userId = id;
    this.form.userName = this.dataUserShow.usuario;
    this.form.password = this.dataUserShow.password;
    this.form.employeeId = this.dataUserShow.id_empleado;
    this.form.roleId = String(this.dataUserShow.id_rol);
    
    if(this.dataUserShow.estatus == 'A'){
      this.form.status = true;
    }else{
      this.form.status = false;
    }
  }


  UpdateUser(){
    if(this.form.status){
      this.toggle = 'A';
    }else{
      this.toggle = 'B'
    }

    if((this.form.userName == '') || (this.form.password == '') || (this.form.employeeId == '') || (this.form.roleId == '')){
      this.SnackBarError('Error faltan datos', 'X')
    }else{

      

      if(this.form.roleId == '1'){
        this.SnackBarError('Error no puede desabilitar al administrador', 'X')
      }else{
        const updateUser: User = {
          id_rol: parseInt(this.form.roleId),
          usuario: this.form.userName,
          password: this.form.password,
          estatus: this.toggle,
        };
        console.table(updateUser)
        const actualizar = this.form.userId;
  
        this.adminService.updateUser(updateUser, parseInt(actualizar)).subscribe(response =>{
          this.response = response;
          this.form.userId = actualizar;
          console.log(this.form.userId )
          this.form.userName = updateUser.usuario;
          this.form.password = updateUser.password;
          this.form.roleId = String(updateUser.id_rol);
  
          if(this.response.Estatus === 'Error'){
            this.SnackBarError(this.response.Mensaje, 'X');
          }else{
            this.SnackBarSuccessful(this.response.Mensaje, 'X');
  
            this.updateTable();
            this.ClearInput();
            this.updateTable();
  
          }
        });
        
        this.button = 'add';
      }          
    }
  }

  employee: string = '';

  ActionDatil(id: string){

    this.dataUserShow = this.arrayUser.find(element => element.id_usuario == parseInt(id));

    this.adminService.getEmployee(parseInt(this.dataUserShow.id_empleado)).subscribe(result => {
      this.employee = result[0].nombre_empleado;

      const currentIndex = this.roles.findIndex((element: any) => element.id_rol == String(this.dataUserShow.id_rol));
    
      console.log(this.dataUserShow)


      const dialogRef = this.dialog.open(DialogDetailComponent, {
        width: '300px',
        data: [{title: 'ID:', data: id},
        {title: 'Usuario:', data: this.dataUserShow.usuario},
        {title: 'Contraseña:', data: this.dataUserShow.password},
        {title: 'Rol:', data: this.roles[currentIndex].nombre_rol},
        {title: 'Empleado:', data: this.employee},
        ]
      })
    })

    

    
  
  }


  updateTable(){
    this.itemsTable = [];
    this.arrayUser = [];

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
          col2: row.usuario, 
          col3: this.estatusUser,
          col4: '-' 
        });
      });                                      
    }) 
  }

  
}
