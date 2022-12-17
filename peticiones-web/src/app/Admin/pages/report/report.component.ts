import { Component, OnInit } from '@angular/core';
import { problem, response, table_show, User } from '../../services/type';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { AdminService } from '../../services/admin.service';
import {FormBuilder } from '@angular/forms';
import {MatDialog } from '@angular/material/dialog';
import { DialogDetailComponent } from 'src/app/components/dialog-detail/dialog-detail.component';




@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  
  //arreglo par acontener los usuarios  
  arrayUserSolvers: any [] = [];
  //arreglo para lamacenar las sucursales
  arrayBranches: any []=[];
  arrayProblems: problem [] = [];
  
  //contenido de tabla de problemas por usuario
  ItemsTableUser : table_show []=[]; 
  //contenido de problemas tabla por sucursal
  ItemsTableBranch: table_show []=[]; 

  //suma de total de problemas usuario
  gastoProlbemaUsuario: number = 0;  
  //suma de total de problemas sucursal
  gastoProblemaSucursal: number = 0;


  dataShowProblem : problem | any;
  idUser: string = '0';
  idBranch: string = '0';
  response: response | any;
  //nombres de columnas de tabla General
  nameColums: string[] = ['Tipo de Problema','Sucursal','Fecha Registro', 'Estatus','Botones'];  
  
  verticalPosition: MatSnackBarVerticalPosition = 'top';   
  idRol : number = 0;
  dataSesion: User|any;  

  constructor(public dialog: MatDialog ,private router: Router, private APIPetition: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,) { }    

  ngOnInit(): void {
    if (localStorage){    
      if(localStorage.getItem('dataSesion') !== undefined && localStorage.getItem('dataSesion')){        
        const userJson = localStorage.getItem('dataSesion');
        this.dataSesion = userJson !== null ? JSON.parse(userJson) : console.log('Estoy devolviendo nulo');                                
        this.idRol = this.dataSesion.id_rol;        
        if(this.idRol != 1){          
          this._snackBar.open('Error no tiene permisos o no inicio sesión', 'X', {      
            verticalPosition: this.verticalPosition,   
            duration: 1000,   
            panelClass: ['red-snackbar'],
          });
          this.router.navigate(["login"]);              
        }
      }else{        
          //alert("DataSesion no existe en localStorage!!"); 
          this.router.navigate(["login"]);              
      }
    }  
    
    this.ReloadProblems();       

    this.APIPetition.getUsersSolevers().subscribe(result =>{                      
      this.arrayUserSolvers = result;                   
    });  
    
    this.APIPetition.getBranches().subscribe(branches => { 
      this.arrayBranches = branches;
    });
        
  }

  //select de empleado
  getId(item: any){
    return item.id_usuario;
  }

  getLabel(item: any){
    return item.nombre_empleado;
  }

  //select de sucursal
  getIdSucursal(item: any){
    return item.id_sucursal;
  }

  getLabelSucursal(item: any){
    return item.nombre_sucursal;
  }

  onChangeIdBranch(data: string){
    this.idBranch = data;
    this.ItemsTableBranch = [];
    this.gastoProblemaSucursal = 0;
    this.ReloadTableBranch(this.idBranch);
  }

  //sucursal
  ReloadTableBranch(id: string){
    this.arrayProblems.forEach((row) => {                
      if(row.id_sucursal == parseInt(id)){
        this.ItemsTableBranch.push({col1: String(row.tipo_problema) , col2: String(row.nombre_sucursal) , col3: String(row.fecha_solicitud), col4: String(row.estatus), col5:'--',});
        this.gastoProblemaSucursal = this.gastoProblemaSucursal + row.total;
      }
    });    
    if(this.ItemsTableBranch.length == 0){      
      this.ItemsTableBranch = [];
    }
  }

//usuario
  aux : any =0;
  onChangeIdUser(id: any){    
    this.idUser = id;    
    this.ItemsTableUser = [];    
    this.gastoProlbemaUsuario = 0;                  
    this.ReloadTableUser(this.idUser);    
  }

  ReloadTableUser(id: string){
    this.arrayProblems.forEach((row) => {                
      if(row.id_usuario_designado == parseInt(id)){
        this.ItemsTableUser.push({col1: String(row.tipo_problema) , col2: String(row.nombre_sucursal) , col3: String(row.fecha_solicitud), col4: String(row.estatus), col5:'--',});
        this.gastoProlbemaUsuario = this.gastoProlbemaUsuario + row.total;
      }
    });
    
    if(this.ItemsTableUser.length == 0){    
      this.ItemsTableUser=[];
    }
  }

  //meotodo para la obtención de  id usuario
 onChangeActionTable(data: any){  
  //alert(data.id+"---"+data.action);
 if(data.action === 'detail'){
    this.ActionDetail(data.fecha);
  }  
}


ActionDetail(fecha: string){
  this.dataShowProblem = this.arrayProblems.find(element => element.fecha_solicitud == fecha);  
  const dialogRef = this.dialog.open(DialogDetailComponent, {      
  data: [
    {title: 'ID:', data:  this.dataShowProblem.id_problema},      
    {title: 'Tipo problema:', data:this.dataShowProblem.tipo_problema},
    {title: 'Descripcion:', data:this.dataShowProblem.descripcion_problema},      
    {title: 'Nombre Encargada que solicita:', data:this.dataShowProblem.nombre_empleado},      
    {title: 'Nombre Sucursal:', data:this.dataShowProblem.nombre_sucursal},      
    {title: 'Solucionador Designado:', data:this.dataShowProblem.nombre_empleado_designado},
    {title: 'Estado:', data:this.dataShowProblem.estatus},
    {title: 'Fecha Solicitud:', data:this.dataShowProblem.fecha_solicitud},
    {title: 'Fecha de Aceptado:', data:this.dataShowProblem.fecha_aceptado},            
    {title: 'Fecha de Terminado:', data:this.dataShowProblem.fecha_terminado},
    {title: 'Fecha de Rechazado:', data:this.dataShowProblem.fecha_rechazado},   
    {title: 'Gasto De Mantenimiento:', data:this.dataShowProblem.total},   
    
  ],      
  });      
}

ReloadProblems(){
  this.arrayProblems = [];    
  this.APIPetition.getProblemsOrder().subscribe(result =>{              
    if(result.Estatus){
      this._snackBar.open(result.Mensaje, 'X', {      
        verticalPosition: this.verticalPosition,   
        duration: 3000,   
        panelClass: ['red-snackbar'],
      });
    }else{
      result.forEach((row:any) => {                           
          //console.table(result);                                               
        if(row.estatus == 'ESPERA'){
          this.arrayProblems.push({
            id_tipo_problema: row.id_tipo_problema,
            tipo_problema: row.tipo_problema,
            descripcion_problema: row.descripcion_problema,
            id_usuario: row.id_usuario,
            nombre_empleado: row.nombre_empleado,
            id_sucursal: row.id_sucursal,
            nombre_sucursal: row.nombre_sucursal,
            id_usuario_designado: 0 ,
            nombre_empleado_designado: "Sin solucionador asignado",
            estatus: row.estatus, 
            fecha_solicitud: row.fecha_solicitud,
            fecha_aceptado: '--', 
            fecha_revision:'--', 
            fecha_enproceso:'--',
            fecha_terminado:'--',
            fecha_rechazado:'--',
            id_problema:row.id_problema,  
            total: row.total
          });                      

        }else if(row.estatus == 'ACEPTADO'){
          this.arrayProblems.push({
            id_tipo_problema: row.id_tipo_problema ,
            tipo_problema: row.tipo_problema,
            descripcion_problema: row.descripcion_problema,
            id_usuario: row.id_usuario,
            nombre_empleado: row.nombre_empleado,
            id_sucursal: row.id_sucursal,
            nombre_sucursal: row.nombre_sucursal,
            id_usuario_designado: row.id_usuario_designado ,
            nombre_empleado_designado: row.nombre_empleado_designado,
            estatus: row.estatus, 
            fecha_solicitud: row.fecha_solicitud,
            fecha_aceptado: row.fecha_aceptado, 
            fecha_revision:'--', 
            fecha_enproceso:'--',
            fecha_terminado:'--',
            fecha_rechazado:'--',
            id_problema:row.id_problema,  
            total: row.total
          });
        }else if(row.estatus == 'REVISION'){
          this.arrayProblems.push({
            id_tipo_problema: row.id_tipo_problema ,
            tipo_problema: row.tipo_problema,
            descripcion_problema: row.descripcion_problema,
            id_usuario: row.id_usuario,
            nombre_empleado: row.nombre_empleado,
            id_sucursal: row.id_sucursal,
            nombre_sucursal: row.nombre_sucursal,
            id_usuario_designado: row.id_usuario_designado ,
            nombre_empleado_designado: row.nombre_empleado_designado,
            estatus: row.estatus, 
            fecha_solicitud: row.fecha_solicitud,
            fecha_aceptado: row.fecha_aceptado, 
            fecha_revision: row.fecha_revision, 
            fecha_enproceso:'--',
            fecha_terminado:'--',
            fecha_rechazado:'--',
            id_problema:row.id_problema,  
            total: row.total
          });
        }else if(row.estatus == 'PROCESO'){
          this.arrayProblems.push({
            id_tipo_problema: row.id_tipo_problema ,
            tipo_problema: row.tipo_problema,
            descripcion_problema: row.descripcion_problema,
            id_usuario: row.id_usuario,
            nombre_empleado: row.nombre_empleado,
            id_sucursal: row.id_sucursal,
            nombre_sucursal: row.nombre_sucursal,
            id_usuario_designado: row.id_usuario_designado ,
            nombre_empleado_designado: row.nombre_empleado_designado,
            estatus: row.estatus, 
            fecha_solicitud: row.fecha_solicitud,
            fecha_aceptado: row.fecha_aceptado, 
            fecha_revision: row.fecha_revision, 
            fecha_enproceso: row.fecha_enproceso,
            fecha_terminado:'--',
            fecha_rechazado:'--',
            id_problema:row.id_problema,  
            total:row.total
          });
        }else if(row.estatus == 'TERMINADO'){
          this.arrayProblems.push({
            id_tipo_problema: row.id_tipo_problema ,
            tipo_problema: row.tipo_problema,
            descripcion_problema: row.descripcion_problema,
            id_usuario: row.id_usuario,
            nombre_empleado: row.nombre_empleado,
            id_sucursal: row.id_sucursal,
            nombre_sucursal: row.nombre_sucursal,
            id_usuario_designado: row.id_usuario_designado ,
            nombre_empleado_designado: row.nombre_empleado_designado,
            estatus: row.estatus, 
            fecha_solicitud: row.fecha_solicitud,
            fecha_aceptado: row.fecha_aceptado, 
            fecha_revision: row.fecha_revision, 
            fecha_enproceso: row.fecha_enproceso,
            fecha_terminado: row.fecha_terminado,
            fecha_rechazado:'--',
            id_problema:row.id_problema,  
            total:row.total
          });

        }else if(row.estatus == 'RECHAZADO'){
          this.arrayProblems.push({
            id_tipo_problema: row.id_tipo_problema ,
            tipo_problema: row.tipo_problema,
            descripcion_problema: row.descripcion_problema,
            id_usuario: row.id_usuario,
            nombre_empleado: row.nombre_empleado,
            id_sucursal: row.id_sucursal,
            nombre_sucursal: row.nombre_sucursal,
            id_usuario_designado: 0 ,
            nombre_empleado_designado: "Sin solucionador asignado",
            estatus: row.estatus, 
            fecha_solicitud: row.fecha_solicitud,
            fecha_aceptado: row.fecha_aceptado, 
            fecha_revision: row.fecha_revision, 
            fecha_enproceso: row.fecha_enproceso,
            fecha_terminado: row.fecha_terminado,
            fecha_rechazado:row.fecha_rechazado,
            id_problema:row.id_problema,  
            total: row.total
          });
        }                      
      });                 
    }      
  });    
}
  
}
