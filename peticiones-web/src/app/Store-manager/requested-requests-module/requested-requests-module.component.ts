
import { estatus_problem, ItemSelect, problem, response, table_show } from 'src/app/Admin/services/type';
import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/Admin/services/admin.service';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { DialogDetailComponent } from 'src/app/components/dialog-detail/dialog-detail.component';
import { User } from 'src/app/Admin/services/type';


@Component({
  selector: 'app-requested-requests-module',
  templateUrl: './requested-requests-module.component.html',
  styleUrls: ['./requested-requests-module.component.css']
})
export class RequestedRequestsModuleComponent implements OnInit {

  
  //contenido de tabla generico
  ItemsTableGeneric : table_show []=[]; 
  //contenido de tabla Pendientes
  ItemsTableSlopes : table_show []=[];   
  //contenido de la tabla en proceso para que puede dar como temrinado la tarea
  ItemsTableProcess: table_show [] = [];

  //array principal 
  arrayProblems: problem [] = [] ;
  response: response | any; //subscripcion de respuesta
  dataShowProblem : problem | any;  
  //nombres de las columas de la tabla
  nameColums: string[] = ['Tipo de Problema','Sucursal','Fecha Registro', 'Estatus','Botones'];  

  verticalPosition: MatSnackBarVerticalPosition = 'top'; 
  constructor(public dialog: MatDialog ,private router: Router, private APIPetition: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,) { }  

  idRol : number = 0;
  dataSesion: User|any;
  ngOnInit(): void {
    if (localStorage){    
      if(localStorage.getItem('dataSesion') !== undefined && localStorage.getItem('dataSesion')){        
        const userJson = localStorage.getItem('dataSesion');
        this.dataSesion = userJson !== null ? JSON.parse(userJson) : null;                                                
        this.idRol = this.dataSesion.id_rol;        
        if(this.idRol != 2){          
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
    
    //obtener todos los problemas del servicio para el general
    this.ReloadProblems();    
  }

  onChangeActionTable(data: any){  
    //alert(data.id+"---"+data.action);  
    if(data.action === 'accep'){
      this.ActionTerminateProblem(data.fecha);
    }else if(data.action === 'detail'){
      this.ActionDetail(data.fecha);
    }  
  }

  ActionTerminateProblem(fecha:string){

    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '420px',
      height: '200px',
      data: { name: 'Terminar', subname: '¿Estas seguro que desea terminar el problema?'},
    });

    dialogRef.afterClosed().subscribe(result => {

      if ( result == true){
        const idproblem = this.arrayProblems.findIndex((element) => element.fecha_solicitud == fecha);                                         
          //console.log(idproblem);
            const datasend : estatus_problem = {                      
              id_problema: this.arrayProblems[idproblem].id_problema,                
              estatus: 'TERMINADO',                                                  
            };
            console.table(datasend);
            this.APIPetition.estatusProblem(datasend,datasend.id_problema).subscribe(response =>{           
              this.response = response;                                        
              if(this.response.Estatus == 'Error'){            
                this._snackBar.open(this.response.Mensaje, 'X', {                
                  verticalPosition: this.verticalPosition,                
                  duration: 3000,
                  panelClass: ['red-snackbar'],
                });
              }else{
                this._snackBar.open(this.response.Mensaje, 'X', {                
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['green-snackbar'],                
                });                
              }                  
            });      
            this.ReloadProblems();   
      }
    });                                                                            
}


  ActionDetail(fecha: string){
    //obtener los detalles de la sucursal a mostrar
    this.dataShowProblem = this.arrayProblems.find(element => element.fecha_solicitud == fecha);  
    const dialogRef = this.dialog.open(DialogDetailComponent, {      
    data: [
      {title: 'ID:', data:  this.dataShowProblem.id_problema},      
      {title: 'Tipo problema:', data:this.dataShowProblem.tipo_problema},
      {title: 'Descripcion:', data:this.dataShowProblem.descripcion_problema},      
      {title: 'Nombre de Encargada de tienda:', data:this.dataShowProblem.nombre_empleado},      
      {title: 'Nombre de tu sucursal:', data:this.dataShowProblem.nombre_sucursal},      
      {title: 'Solucionador Designado:', data:this.dataShowProblem.nombre_empleado_designado},
      {title: 'Estado:', data:this.dataShowProblem.estatus},
      {title: 'Fecha Solicitud:', data:this.dataShowProblem.fecha_solicitud},
      {title: 'Fecha de Asignado:', data:this.dataShowProblem.fecha_aceptado},            
      {title: 'Fecha de Inicio:', data:this.dataShowProblem.fecha_enproceso},            
      {title: 'Fecha de Terminado:', data:this.dataShowProblem.fecha_terminado},
      {title: 'Fecha de Rechazado:', data:this.dataShowProblem.fecha_rechazado},   
      {title: 'Gasto De Mantenimiento:', data:this.dataShowProblem.total},      
    ],      
    });  
  }

  
  
  //variable para obtener hasta el id usuario
  usuario: string = "no";
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
              total: 0
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
              total: row.total
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
              total: row.total
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
        this.reloadArrayGeneric();
      }      
    });
  }

arraySlopesOrder: table_show [] = [];
  reloadArrayGeneric(){
    this.usuario='no';
    this.ItemsTableGeneric = [];
    this.ItemsTableSlopes = []; 
    this.ItemsTableProcess = [];      

    this.arraySlopesOrder = [];
    //pila hasta tu problema
    this.arrayProblems.forEach((row) => {          
      if(row.estatus == 'ESPERA'){              
        if(this.usuario == 'no'){
          this.ItemsTableGeneric.push({col1: String(row.tipo_problema) , col2: String(row.nombre_sucursal) , col3: String(row.fecha_solicitud), col4: String(row.estatus), col5:'--',});                        
        }                            
        if(this.dataSesion.id_usuario == row.id_usuario ){
          this.usuario = 'si';              
        }
      }
    });  

    //los problemas de tu sucursal
    this.arrayProblems.forEach((row) => {                        
        if(this.dataSesion.id_usuario == row.id_usuario ){
          this.ItemsTableSlopes.push({col1: String(row.tipo_problema) , col2: String(row.nombre_sucursal) , col3: String(row.fecha_solicitud), col4: String(row.estatus), col5:'--',});                        
        }      
    });    
    this.ItemsTableSlopes.reverse();
             
  //los problemas de para que los finalices
    this.arrayProblems.forEach((row) => {                        
      if(this.dataSesion.id_usuario == row.id_usuario && row.estatus =='PROCESO'){
        this.ItemsTableProcess.push({col1: String(row.tipo_problema) , col2: String(row.nombre_sucursal) , col3: String(row.fecha_solicitud), col4: String(row.estatus), col5:'--',});                        
      }      
  });  

  }
}
