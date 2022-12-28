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
  idEstatus: string = '0';

  //arreglo de estatus
  Estatus: any [] = [
    {id: 1, title: 'ESPERA'},
    {id: 2, title: 'ACEPTADO'},
    {id: 3, title: 'REVISION'},
    {id: 4, title: 'PROCESO'},
    {id: 5, title: 'TERMINADO'},
    {id: 6, title: 'RECHAZADO'}
  ];

  response: response | any;
  //nombres de columnas de tabla General
  nameColums: string[] = ['Tipo de Problema','Sucursal','Fecha Registro', 'Estatus','Prioridad','Botones'];  
  
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

    this.APIPetition.getUsersSolevers().subscribe(result =>{                      
      this.arrayUserSolvers = result;                   
    });  
    
    this.APIPetition.getBranches().subscribe(branches => { 
      this.arrayBranches = branches;
    });
        
  }

  //obtener fechas
  FecIni: string = '';
  FecEnd: string = '';

  rangeDates(ini:string, fin:string){  
    let inicio = new Date(ini);
    let final = new Date(fin);      
    //Para la fecha inicio
    this.FecIni = String(inicio.getFullYear());
    this.FecIni = this.FecIni+'-'+(inicio.getMonth() + 1);  // Los meses se cuentan desde 0, así que hay que sumar 1
    this.FecIni = this.FecIni+'-'+inicio.getDate();    
    this.FecIni = this.FecIni+' '+'00:00:00';    

    //Para la fecha inicio
    this.FecEnd = String(final.getFullYear());
    this.FecEnd = this.FecEnd+'-'+(final.getMonth() + 1);  // Los meses se cuentan desde 0, así que hay que sumar 1
    this.FecEnd = this.FecEnd+'-'+final.getDate();    
    this.FecEnd = this.FecEnd+' '+'00:00:00';    
    //11-111-2022 00:00:00    
  }


  ClearInputs(){
    this.FecIni ='';
    this.FecEnd = '';
    this.estatus ='0';
    this.idUser= '0';
    this.idBranch = '0';
    this.idEstatus = '0'
  }


  //obtencion de estado
  estatus: string = '0';
  
  //select de estatus
  getIdEstatus(item: any){
    return item.id;
  }

  getLabelEstatus(item: any){
    return item.title;
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



  UploadReportSucursal(){   
    

    if(this.idEstatus == '1'){
      this.estatus = 'ESPERA'
    }else if(this.idEstatus == '2'){
      this.estatus = 'ACEPTADO'
    }else if(this.idEstatus == '3'){
      this.estatus = 'REVISION'
    }else if(this.idEstatus == '4'){
      this.estatus = 'PROCESO'
    }else if(this.idEstatus == '5'){
      this.estatus = 'TERMINADO'
    }else if(this.idEstatus == '6'){
      this.estatus = 'RECHAZADO'
    }    
    
    
    if(this.idBranch == '0'){
      this.APIPetition.SnackBarError('Error no selecciono sucursal','X');
    }else if(this.estatus == '0'){
      this.APIPetition.SnackBarError('Error no selecciono Estado del problema','X');
    }else if(this.FecIni == ''|| this.FecEnd == ''){
      this.APIPetition.SnackBarError('Error no especifico rango de fechas','X');
    }else{
      this.ItemsTableBranch = [];
      this.gastoProblemaSucursal = 0;
      this.ReloadProblemsSucursal(this.idBranch, this.FecIni,this.FecEnd);         
            
    }        
  }

  
  UploadReportEmployee(){
    if(this.idEstatus == '1'){
      this.estatus = 'ESPERA'
    }else if(this.idEstatus == '2'){
      this.estatus = 'ACEPTADO'
    }else if(this.idEstatus == '3'){
      this.estatus = 'REVISION'
    }else if(this.idEstatus == '4'){
      this.estatus = 'PROCESO'
    }else if(this.idEstatus == '5'){
      this.estatus = 'TERMINADO'
    }else if(this.idEstatus == '6'){
      this.estatus = 'RECHAZADO'
    }    
    
    
    if(this.idBranch == '0'){
      this.APIPetition.SnackBarError('Error no selecciono sucursal','X');
    }else if(this.estatus == '0'){
      this.APIPetition.SnackBarError('Error no selecciono Estado del problema','X');
    }else if(this.FecIni == ''|| this.FecEnd == ''){
      this.APIPetition.SnackBarError('Error no especifico rango de fechas','X');
    }else{
      this.ItemsTableUser = [];    
      this.gastoProlbemaUsuario = 0;                  
      this.ReloadProblemsEmployee(this.idBranch, this.FecIni,this.FecEnd);                     
      
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
      {title: 'Tipo problema:', data:this.dataShowProblem.tipo_problema},
      {title: 'Descripcion:', data:this.dataShowProblem.descripcion_problema},      
      {title: 'Nombre Encargada que solicita:', data:this.dataShowProblem.nombre_empleado},      
      {title: 'Nombre Sucursal:', data:this.dataShowProblem.nombre_sucursal},      
      {title: 'Solucionador Designado:', data:this.dataShowProblem.nombre_empleado_designado},
      {title: 'Estado:', data:this.dataShowProblem.estatus},
      {title: 'Fecha Solicitud:', data:this.dataShowProblem.fecha_solicitud},
      {title: 'Fecha de Asignado:', data:this.dataShowProblem.fecha_aceptado},            
      {title: 'Fecha de Inicio:', data:this.dataShowProblem.fecha_enproceso},            
      {title: 'Fecha de Terminado:', data:this.dataShowProblem.fecha_terminado},
      {title: 'Fecha de Rechazado:', data:this.dataShowProblem.fecha_rechazado},   
      {title: 'Prioridad:', data:this.dataShowProblem.prioridad},       
      {title: 'Gasto De Mantenimiento:', data:this.dataShowProblem.total},       
    ],      
    });      
  }

  ReloadProblemsSucursal(id: string, fechaInicio: string, fechaFinal: string){
    this.arrayProblems = [];    
    this.APIPetition.getProblemsSucursal(parseInt(id),fechaInicio,fechaFinal).subscribe(result =>{              
      //console.log(result);
      if(result.Estatus){
        this.APIPetition.SnackBarError(result.Mensaje, 'X');
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
              prioridad:'sin prioridad',
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
              prioridad:row.prioridad,
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
              prioridad:row.prioridad,
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
              prioridad:row.prioridad,
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
              prioridad:row.prioridad,
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
              prioridad:row.prioridad,
              total: row.total
            });
          }                      
        });                   
      }      
      this.ReloadTableBranch(this.idBranch, this.estatus);
    });           
  }
  
  //sucursal
  ReloadTableBranch(id: string, estatus: string){  
  //console.log('entro');
    this.arrayProblems.forEach((row) => {                
      if(row.id_sucursal == parseInt(id) && row.estatus == String(estatus)){                
          //console.log(id+'---'+estatus);
          this.ItemsTableBranch.push({col1: String(row.tipo_problema) , col2: String(row.nombre_sucursal) , col3: String(row.fecha_solicitud), col4: String(row.estatus), col5:String(row.prioridad), col6:'--'});
          this.gastoProblemaSucursal = this.gastoProblemaSucursal + row.total;        
      }
    });    
    if(this.ItemsTableBranch.length == 0){      
      this.ItemsTableBranch = [];
    }
    this.ClearInputs();
  }


  //para empleados
  ReloadProblemsEmployee(id: string, fechaInicio: string, fechaFinal: string){
    this.arrayProblems = [];    
    this.APIPetition.getProblemsEmployee(parseInt(id),fechaInicio,fechaFinal).subscribe(result =>{              
      //console.log(result);
      if(result.Estatus){
        this.APIPetition.SnackBarError(result.Mensaje, 'X');
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
              prioridad:'sin prioridad',
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
              prioridad:row.prioridad,
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
              prioridad:row.prioridad,
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
              prioridad:row.prioridad,
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
              prioridad:row.prioridad,
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
              prioridad:row.prioridad,
              total: row.total
            });
          }                      
        });                   
      }      
      this.ReloadTableUser(this.idUser, this.estatus);
    });           
  }
  

  ReloadTableUser(id: string,estatus: string){
    this.arrayProblems.forEach((row) => {                
      if(row.id_usuario_designado == parseInt(id) && row.estatus == String(estatus)){
        this.ItemsTableUser.push({col1: String(row.tipo_problema) , col2: String(row.nombre_sucursal) , col3: String(row.fecha_solicitud), col4: String(row.estatus), col5:String(row.prioridad), col6:'--'});
        this.gastoProlbemaUsuario = this.gastoProlbemaUsuario + row.total;
      }
    });    
    if(this.ItemsTableUser.length == 0){    
      this.ItemsTableUser=[];
    }
    this.ClearInputs();
  }

}
