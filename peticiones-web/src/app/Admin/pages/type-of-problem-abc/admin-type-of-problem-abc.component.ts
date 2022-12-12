import { Component, OnInit} from '@angular/core';
import { response, type_of_problem, User } from '../../services/type';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import {FormBuilder } from '@angular/forms';
import { request_table } from 'src/app/components/services/request-table';
import {MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { DialogDetailComponent } from 'src/app/components/dialog-detail/dialog-detail.component';



@Component({
  selector: 'app-admin-type-of-problem-abc',
  templateUrl: './admin-type-of-problem-abc.component.html',
  styleUrls: ['./admin-type-of-problem-abc.component.css']
})
export class AdminTypeOfProblemAbcComponent implements OnInit {

  id : string = '';
  typeProblem: string = ''
  descriptionProblem: string='';
  estatus: string = '';
  isChecked = true;     //variable para el toggle  
  butonAddUpdate : string = '';
  response: response | any; //subscripcion de respuesta
  DataTypeProblemShow: type_of_problem | any; //tipo de dato para buscar  
  //arreglo para almacenar todos los tipos de problema
  ArrayTypeProblem: type_of_problem [] = [];
  //arreglo donde se almacenara solo los datos de la tabla de la tabla 
  ItemsTable : request_table[]=[]; 
  //nombres de columnas de tabla
  namecolum: string[] = ['ID','Tipo Problema','Estado',''];
  verticalPosition: MatSnackBarVerticalPosition = 'top'; 
  inAct : number = 0;  
  idupdate: any;  
  
  constructor(public dialog: MatDialog ,private router: Router, private APIAdminPetition: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,) { }


  //para validar lo de sesion  y rol  
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
    this,this.ReloadTypeProblem();    
  }

 
  //obtner sucursales actuales
  ReloadTypeProblem(){
    this.ArrayTypeProblem = [];
    this.ItemsTable= [];
    this.APIAdminPetition.getTypeProblems().subscribe(result =>{                
      //console.table(result);
      this.ArrayTypeProblem = result;            
      if(this.ArrayTypeProblem.length>0){
        this.ArrayTypeProblem.forEach((row) => {                   
          if(row.estatus == 'A'){          
            this.ItemsTable.push({col1: String(row.id_tipo_problema), col2: row.tipo_problema , col3:'Activo', col4:'-' });        
          }else{          
            this.ItemsTable.push({col1: String(row.id_tipo_problema), col2: row.tipo_problema , col3:'Inactivo', col4:'-' });        
          }        
        });       
      }              
    })  
  }


  Clearinputs(){
    //limpieza
    this.isChecked == true;
    this.typeProblem  = ' '
    this.descriptionProblem = ' ';        
  }


  onChangeTypeProblem(data: string){    
    this.typeProblem = data;
    //alert(this.typeProblem);
  }

  onChangeDescrptionProblem(data:string){    
    this.descriptionProblem = data;
    //alert(this.descriptionProblem);
  }

  //metodo para la tabla delete,edit, detail
onChangeActionTable(data: any){  
  //alert(data.id+"---"+data.action);
  if(data.action === 'delete'){
    this.ActionDelete(data.id);
  }else if(data.action === 'edit'){
    this.ActionEdit(data.id);
  }else if(data.action === 'detail'){
    this.ActionDatil(data.id);
  }  
}


ActionDelete(id: string){
  //alert(id);

  const dialogRef = this.dialog.open(DialogDeleteComponent, {
    width: '420px',
    height: '200px',
    data: { name: 'Eliminar', subname: '¿Estas seguro que desea Deshabilitar?'},
  });

  dialogRef.afterClosed().subscribe(result => {

    if ( result == true){
          
        const inDesc = this.ItemsTable.findIndex((element) => element.col1 == id);
              //agregar a la tabla                        
        if(this.ItemsTable[inDesc].col3 == 'Inactivo'){
              this._snackBar.open('No se puede desactivar porque ya esta inactiva', 'X', {                
                verticalPosition: this.verticalPosition,                
                duration: 3000,
                panelClass: ['red-snackbar'],
              });
        }else{
          this.APIAdminPetition.DeleteTypeProblem(parseInt(id)).subscribe(response =>{                    
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
              //buscar el index
              const inAct = this.ItemsTable.findIndex((element) => element.col1 == id);
              //agregar a la tabla                        
              this.ItemsTable[inAct].col3 = 'Inactivo';          //cambiamos a B si se elimino
            }                  
          });      
          this.ReloadTypeProblem();
          this.Clearinputs();
        }                      
      }
  });
}

ActionEdit(id: string){
  this.butonAddUpdate = 'a';  
  this.DataTypeProblemShow = this.ArrayTypeProblem.find(element => element.id_tipo_problema == parseInt(id));    
  this.Clearinputs();
  console.table(this.DataTypeProblemShow);
  //asignacion de las variables a mostrar        
  this.id = id;    
  this.typeProblem = this.DataTypeProblemShow.tipo_problema;
  this.descriptionProblem = this.DataTypeProblemShow.descripcion_tipo_problema;
  if(this.DataTypeProblemShow.estatus == 'A'){
    this.isChecked = true;    
  }else{    
    this.isChecked = false;
  }  
}

ActionDatil(id: string){
  //obtener los detalles de la sucursal a mostrar  
  this.DataTypeProblemShow = this.ArrayTypeProblem.find(element => element.id_tipo_problema == parseInt(id));  
  const dialogRef = this.dialog.open(DialogDetailComponent, {
    width: '300px',
    data: [{ title: 'ID:', data: id },
    {title: 'Tipo de Problema:', data: this.DataTypeProblemShow.tipo_problema},    
    {title: 'Descripcion del tipo de problema:', data: this.DataTypeProblemShow.descripcion_tipo_problema}    
  ],      
  });  
}

UpdateTypeProblem(){
     //obtencion del estatus
  if (this.isChecked == true){
    this.estatus = 'A'
    //alert(this.estatus);
  }else{
    this.estatus = 'B'
    //alert(this.estatus);
  }

  if((this.typeProblem == '')||(this.descriptionProblem == '')||(this.estatus == '')) {
                          
    //this._snackBar.open('Error faltan datos para actualizar', 'x');    
    this._snackBar.open('Error faltan datos', 'X', {      
      verticalPosition: this.verticalPosition,      
      panelClass: ['red-snackbar'],
    });
    
  }else{

    //llenar data a enviar
    const datasend : type_of_problem = {                          
      tipo_problema: this.typeProblem,
      descripcion_tipo_problema: this.descriptionProblem,
      estatus: this.estatus,                                                                          
    };

      //console.table(datasend);
      this.idupdate = this.id;      

      this.APIAdminPetition.UpdatedTypeProblem(datasend, parseInt(this.idupdate)).subscribe(response =>{                    
        this.response = response;   
        
        this.id =this.idupdate ;        // se iguala porque se puedan
        this.typeProblem = datasend.tipo_problema;
        this.estatus = datasend.estatus;
        
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
            //panelClass: ['red-snackbar'],
          });                                   
          
          this.ReloadTypeProblem();          
          this.Clearinputs();
          //actualizar 
          
        }                  
      });      
      
      this.butonAddUpdate = '';  
    }
}

CreateTypeProblem(){
  //obtencion del estatus
  if (this.isChecked == true){
    this.estatus = 'A'
    //alert(this.estatus);
  }else{
    this.estatus = 'B'
    //alert(this.estatus);
  }
                        
if((this.typeProblem == '')|| (this.descriptionProblem == '')||(this.estatus == '')) {                      
  //alert("error faltan datos");      
  //this._snackBar.open('Error faltan datos para actualizar', 'X');          
  this._snackBar.open('Error faltan datos', 'X', {        
    verticalPosition: this.verticalPosition,
    //panelClass: ['green-snackbar'],
    panelClass: ['red-snackbar'],
  });

}else{

  //llenar data a enviar
  const datasend : type_of_problem = {                          
    tipo_problema: this.typeProblem,
    descripcion_tipo_problema: this.descriptionProblem,
    estatus: this.estatus,                                                                          
  };
    //console.table(datasend);        
    this.APIAdminPetition.createTypeProblem(datasend).subscribe(response =>{                    
      this.response = response;                      
      if(this.response.Estatus == 'Error'){            
        this._snackBar.open(this.response.Mensaje, 'X', {              
          verticalPosition: this.verticalPosition,
          //panelClass: ['green-snackbar'],
          panelClass: ['red-snackbar'],
        });
      }else{
        this._snackBar.open(this.response.Mensaje, 'X', {              
          verticalPosition: this.verticalPosition,
          panelClass: ['green-snackbar'],
          //panelClass: ['red-snackbar'],
        });                                     
        this.ReloadTypeProblem();        
        this.Clearinputs();                    
      }             
    })            
  }
}




}
