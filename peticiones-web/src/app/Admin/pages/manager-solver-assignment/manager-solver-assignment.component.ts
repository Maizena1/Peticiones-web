import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { DialogDetailComponent } from 'src/app/components/dialog-detail/dialog-detail.component';
import { assignament_problem, problem, response, table_show, User, user_problem } from '../../services/type';


@Component({
  selector: 'app-manager-solver-assignment',
  templateUrl: './manager-solver-assignment.component.html',
  styleUrls: ['./manager-solver-assignment.component.css']
})

export class ManagerSolverAssignmentComponent implements OnInit {


  nameTypeProblem: string  = '';
  nameDescriptionProblem: string = '';
  namebranch:string = "";
  nameStoremanger: string = "";
  dateSolicitud:string = "";

  arrayUser: any [] = [];
  arrayUsuario: any [] = [];
  arrayProblems: problem [] = [];
  //contenido de tabla generico
  ItemsTableUser : table_show []=[]; 
  dataShowProblem : problem | any;
  idUser: string = '';
  response: response | any;
  //nombres de columnas de tabla General
  nameColums: string[] = ['Tipo de Problema','Sucursal','Fecha Registro', 'Estatus','Botones'];  
  
  verticalPosition: MatSnackBarVerticalPosition = 'top'; 
  dataFecha: string | null;
  dataidTipo: string | null;
  constructor(public dialog: MatDialog ,private router: Router, private routerAc: ActivatedRoute, private APIPetition: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,) { 
    this.dataFecha = this.routerAc.snapshot.paramMap.get('fecha');
    this.dataidTipo = this.routerAc.snapshot.paramMap.get('idtipo');
  }

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

    this.ReloadProblems();
   
    if(this.dataidTipo != null){
      this.APIPetition.getTypeUserProblem(parseInt(this.dataidTipo)).subscribe(result =>{                      
        this.arrayUser = result;                   
      });                
    }
      
    //alert('Fecha Recivida desde Peticiones admin:'+ this.dataFecha );    
  }


  getId(item: any){
    return item.id_usuario;
  }

  getLabel(item: any){
    return item.nombre_empleado;
  }

  onChangeIdUser(id: any){
    this.idUser = id;
    this.ReloadUserProblems(parseInt(this.idUser));
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
      {title: 'Nombre Empleado que solicita:', data:this.dataShowProblem.nombre_empleado},      
      {title: 'Nombre Sucursal:', data:this.dataShowProblem.nombre_sucursal},      
      {title: 'Solucionador Designado:', data:this.dataShowProblem.nombre_empleado_designado},
      {title: 'Estado:', data:this.dataShowProblem.estatus},
      {title: 'Fecha Solicitud:', data:this.dataShowProblem.fecha_solicitud},
      {title: 'Fecha de Aceptado:', data:this.dataShowProblem.fecha_aceptado},            
      {title: 'Fecha de Terminado:', data:this.dataShowProblem.fecha_terminado},
      {title: 'Fecha de Rechazado:', data:this.dataShowProblem.fecha_rechazado},      
    ],      
    });      
  }

  uploadDataProblem(){
    if(this.arrayProblems.length > 0){      
      this.dataShowProblem  = this.arrayProblems.find(element => element.fecha_solicitud == this.dataFecha);                                 
      console.table(this.dataShowProblem);    
        this.nameTypeProblem = this.dataShowProblem.tipo_problema;
        console.log(this.nameTypeProblem);
        this.nameDescriptionProblem = this.dataShowProblem.descripcion_problema;
        this.namebranch = this.dataShowProblem.nombre_sucursal;
        this.nameStoremanger=this.dataShowProblem.nombre_empleado;
        this.dateSolicitud=this.dataShowProblem.fecha_solicitud;        
    }
  }

  assignamentSolver(){
    const datasend :  assignament_problem  = {                            
      id_usuario_designado: parseInt(this.idUser),
      estatus: 'ACEPTADO',                                                            
    };

    this.APIPetition.assignamentProblem(datasend,this.dataShowProblem.id_problema).subscribe(response =>{           
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
        this.router.navigate([      
          'admin/showRequested',
        ]);        
      }                  
    });      
  }


  ReloadUserProblems(iduser: number){
    this.ItemsTableUser = [];
    this.arrayProblems.forEach((row) => {          
      if(row.id_usuario_designado == iduser){
        this.ItemsTableUser.push({col1: String(row.tipo_problema) , col2: String(row.nombre_sucursal) , col3: String(row.fecha_solicitud), col4: String(row.estatus), col5:'--',});
      }
    });                  
  }

  ReloadProblems(){
    this.arrayProblems = [];    
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
            });
          }                      
        });                 
      }      
    });    
  }
}
