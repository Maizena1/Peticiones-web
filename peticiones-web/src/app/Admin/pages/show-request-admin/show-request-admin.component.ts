import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import {FormBuilder } from '@angular/forms';
import {MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { DialogDetailComponent } from 'src/app/components/dialog-detail/dialog-detail.component';
import { DialogDetailRequirementsComponent } from 'src/app/components/dialog-detail-requirements/dialog-detail-requirements.component';
import { problem, estatus_problem, response, table_show, User, requeriment } from '../../services/type';




@Component({
  selector: 'app-show-request-admin',
  templateUrl: './show-request-admin.component.html',
  styleUrls: ['./show-request-admin.component.css']
})
export class ShowRequestAdminComponent implements OnInit {

//contenido de tabla generico
  ItemsTableGeneric : table_show []=[]; 
//contenido de tabla Pendientes
  ItemsTableSlopes : table_show []=[]; 
//contenido de tabla Revisar
  ItemsTableCheck : table_show []=[]; 
  dataShowProblem : problem | any;  
  //array de requisitos    
  arrayRequerimentProblem: requeriment []= [];
  //array principal 
  arrayProblems: problem [] = [] ;
  response: response | any; //subscripcion de respuesta

  //nombres de columnas de tabla General
  nameColums: string[] = ['Tipo de Problema','Sucursal','Fecha Registro', 'Estatus','Botones'];  
  
  verticalPosition: MatSnackBarVerticalPosition = 'top'; 

  constructor(public dialog: MatDialog ,private router: Router, private APIPetition: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,) { }
  
  
  idRol : number = 0;
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
    //obtener todos los problemas del servicio
    this.ReloadProblems();    
  }

  
  //metodo para la tabla delete,edit, detail
  onChangeActionTable(data: any){  
    //alert(data.id+"---"+data.action);
    if(data.action === 'delete'){
      this.ActionDelete(data.fecha);
    }else if(data.action === 'accep'){
      this.ActionAccep(data.fecha);
    }else if(data.action === 'detail'){
      this.ActionDetail(data.fecha);
    }  
  }
  
  ActionDelete(fecha: string){    
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '420px',
      height: '200px',
      data: { name: 'Eliminar', subname: '¿Estas seguro que desea Rechazar?'},
    });
    dialogRef.afterClosed().subscribe(result => {  
      if ( result == true){                    
            const idproblem = this.arrayProblems.findIndex((element) => element.fecha_solicitud == fecha);                                         

            //console.log(idproblem);
              const datasend : estatus_problem = {                      
                id_problema: this.arrayProblems[idproblem].id_problema,                
                estatus: 'RECHAZADO',                                                            
              };

              console.table(datasend);
              this.APIPetition.deleteProblem(datasend,datasend.id_problema).subscribe(response =>{           
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


  ActionAccep(fecha: string){
    //alert('Fecha para asignar: '+ fecha);        
    this.dataShowProblem = this.arrayProblems.find(element => element.fecha_solicitud == fecha);  
    this.router.navigate([      
      'admin/solverAssignament/' + fecha+'/tipoproblema/'+this.dataShowProblem.id_tipo_problema,
    ]);        
  }

  ActionDetail(fecha: string){    
    //obtener los detalles de la sucursal a mostrar
    this.dataShowProblem = this.arrayProblems.find(element => element.fecha_solicitud == fecha);  
    const dialogRef = this.dialog.open(DialogDetailComponent, {      
    data: [
      {title: 'ID:', data:  this.dataShowProblem.id_problema},      
      {title: 'Tipo problema:', data:this.dataShowProblem.tipo_problema},
      {title: 'Descripcion:', data:this.dataShowProblem.descripcion_problema},      
      {title: 'Nombre Empleado que solicita:', data:this.dataShowProblem.nombre_empleado},      
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


  onChangeActionTableRequirement(data: any){  
    //alert(data.id+"---"+data.action);
    if(data.action === 'delete'){
      this.ActionDeleteRequeriment(data.fecha);
    }else if(data.action === 'accep'){
      this.ActionAccepRequeriment(data.fecha);
    }else if(data.action === 'detail'){
      this.ActionDetail(data.fecha);
    }else if(data.action === 'detailReq'){
      this.ActionDetailRequeriment(data.fecha)
    }

    
  }

  ActionDeleteRequeriment(fecha: string){
      
  }

  ActionAccepRequeriment(fecha: string){
      
  }
    
 //obtener requisitos
  ActionDetailRequeriment(fecha: string){
    //obtener los detalles de la sucursal a mostrar
    const idproblem = this.arrayProblems.findIndex((element) => element.fecha_solicitud == fecha);                                         
    //pendiente????------
    this.APIPetition.getRequirementProblem(this.arrayProblems[idproblem].id_problema).subscribe(result =>{                 
      this.arrayRequerimentProblem = result;

      const dialogRef = this.dialog.open(DialogDetailRequirementsComponent, {      
      width:'65%',
      data: this.arrayRequerimentProblem,
      });  
    });             
  }




  ReloadProblems(){
    this.arrayProblems = [];
    this.ItemsTableGeneric = [];
    this.ItemsTableSlopes = [];
    this.ItemsTableCheck = [];
    this.APIPetition.getProblems().subscribe(result =>{        
      
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
              total: 0
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
              total: 0
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
              total: 0
            });
          }                      
        }); 
        
        this.arrayProblems.forEach((row) => {
          this.ItemsTableGeneric.push({col1: String(row.tipo_problema) , col2: String(row.nombre_sucursal) , col3: String(row.fecha_solicitud), col4: String(row.estatus), col5:'--',});          
            if(row.estatus == 'ESPERA'){
              this.ItemsTableSlopes.push({col1: String(row.tipo_problema) , col2: String(row.nombre_sucursal) , col3: String(row.fecha_solicitud), col4: String(row.estatus), col5:'--',});
            }else if(row.estatus == 'REVISION'){
              this.ItemsTableCheck.push({col1: String(row.tipo_problema) , col2: String(row.nombre_sucursal) , col3: String(row.fecha_solicitud), col4: String(row.estatus), col5:'--',});
            }
        });                  
      }      
    });
  }

}



  