import { Component, OnInit} from '@angular/core';
import { employee, response, Item } from '../../services/type';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import {FormBuilder, Validators} from '@angular/forms';
import { request_table } from 'src/app/components/services/request-table';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { DialogDetailComponent } from 'src/app/components/dialog-detail/dialog-detail.component';

@Component({
  selector: 'app-admin-employee-abc',
  templateUrl: './admin-employee-abc.component.html',
  styleUrls: ['./admin-employee-abc.component.css']
})
export class AdminEmployeeAbcComponent implements OnInit {

  //declaracion de variables para registrar sucursal    
  idEmpleado : string ='';
  nombre: string ='';  
  idSucursal: string = '' ;
  correo: string ='';
  telefono: string ='';
  estatus: string ='';

  response: response | any; //subscripcion de respuesta
  isChecked = true;     //variable para el toggle  
  DataEmployeeShow: employee | any; //tipo de dato para buscar  
  enableid : boolean = false; //para poner campo en modo lectura
  butonAddUpdate : string = '';

  //arreglo donde de almacenara todos los empleados
  ArrayEmployees: employee[]=[];
  //arreglo donde se almacenara solo los datos de la tabla de la tabla 
  ItemsTable : request_table[]=[]; 
  //Arreglo donde se almacena la informacion de id sucursal y nombre sucursal
  itemsSelecBranches: Item[] =[];

  //nombres de columnas de tabla
  namecolum: string[] = ['ID','Nombre','Estado','Botones'];
  ItemSend: String = ""; 
  verticalPosition: MatSnackBarVerticalPosition = 'top'; 

  inAct : number = 0;
  idupdate: any;


  constructor(public dialog: MatDialog ,private router: Router, private APIAdminPetition: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,) { }
 
  ngOnInit(): void {
    this.APIAdminPetition.getEmployees().subscribe(result =>{                
      this.ArrayEmployees = result;
      //console.table(this.Arraybranches); 
      this.ArrayEmployees.forEach((row) => {                   
        if(row.estatus == 'A'){          
          this.ItemsTable.push({col1: String(row.id_empleado), col2: row.nombre_empleado , col3:'Activo', col4:'-' });        
        }else{          
          this.ItemsTable.push({col1: String(row.id_empleado), col2: row.nombre_empleado , col3:'Inactivo', col4:'-' });        
        }        
      });                                     
      //console.table(this.ItemsTable);      
    })  
    //obtener las sucursales      
    this.APIAdminPetition.getBranches().subscribe(result =>{                            
      result.forEach((row:any) => {                   
        if(row.estatus == 'A'){          
          this.itemsSelecBranches.push({_id: row.id_sucursal, option: row.nombre_sucursal});        
        }        
      });                                     
      //console.table(this.itemsSelecBranches);      
    })                 
  }

  //obtner sucursales actuales
  ReloadEmployees(){
    this.ArrayEmployees = [];
    this.APIAdminPetition.getBranches().subscribe(result =>{                
      //console.table(result);
      this.ArrayEmployees = result;      
      //console.table(this.Arraybranches);
    })       
  }

  
  onChangeIdBranch(data: string){
     this.idSucursal = data;
  }

  //obtener el id de la sucursal
  onChangeIdEmployee(data: string){
    this.idEmpleado = data;       
  }
  
  //obtener el nombre de la sucursal
  onChangeNameEmployee(data: string){
    this.nombre = data;    
  }

//obtener el correo
  onChangeEmailEmployee(data: string){
    this.correo = data;    
  }

  onChangePhoneNumberEmployee(data: string){
    this.telefono = data;    
  }

  Clearinputs(){
    //limpieza
    this.isChecked == true;
    this.enableid = false;  
    this.idEmpleado ='';
    this.nombre ='';    
    this.idSucursal='';
    this.correo ='';
    this.telefono='';
    this.estatus ='';    
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

//si es delete
ActionDelete(id: string){

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
          this.APIAdminPetition.DeleteEmployee(parseInt(id)).subscribe(response =>{                    
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
          this.ReloadEmployees();
          this.Clearinputs();
        }                      
      }
  });
}

ActionEdit(id:string){
  this.butonAddUpdate = 'a';
  this.enableid = true;      
  this.DataEmployeeShow = this.ArrayEmployees.find(element => element.id_empleado == parseInt(id));    
  this.Clearinputs();
  console.table(this.DataEmployeeShow);
  //asignacion de las variables a mostrar        
  this.idEmpleado = id;  
  this.nombre = this.DataEmployeeShow.nombre_empleado;  
  this.idSucursal = String(this.DataEmployeeShow.id_sucursal);
  alert(this.idSucursal);
  this.correo = this.DataEmployeeShow.correo;
  this.telefono = this.DataEmployeeShow.telefono;
  if(this.DataEmployeeShow.estatus == 'A'){
    this.isChecked = true;    
  }else{    
    this.isChecked = false;
  }  
}

//si es detail
ActionDatil(id:string){
  //obtener los detalles de la sucursal a mostrar  
  this.DataEmployeeShow = this.ArrayEmployees.find(element => element.id_empleado == parseInt(id));  
  const dialogRef = this.dialog.open(DialogDetailComponent, {
    width: '300px',
    data: [{ title: 'ID:', data: id },
    {title: 'Nombre:', data: this.DataEmployeeShow.nombre_empleado},    
    {title: 'Sucursal', data: 'Sucursal Ejemplo'},    
    {title: 'Correo:', data: this.DataEmployeeShow.correo },
    {title: 'Telefono:', data: this.DataEmployeeShow.telefono},
    {title: 'Estatus:', data:this.DataEmployeeShow.estatus}
  ],      
  });  
}

UpdateEmployee(){

  //obtencion del estatus
  if (this.isChecked == true){
    this.estatus = 'A'
    //alert(this.estatus);
  }else{
    this.estatus = 'B'
    //alert(this.estatus);
  }

  if((this.nombre == '')||(this.correo == '')||(this.telefono == '')||(this.estatus == '')) {
                          
    //this._snackBar.open('Error faltan datos para actualizar', 'x');    
    this._snackBar.open('Error faltan datos', 'X', {      
      verticalPosition: this.verticalPosition,      
      panelClass: ['red-snackbar'],
    });
    
  }else{

    //llenar data a enviar
      const datasend : employee = {                      
        nombre_empleado: this.nombre,
        id_sucursal: parseInt(this.idSucursal),
        correo: this.correo,
        telefono: this.telefono,
        estatus: this.estatus,                                                                             
      };

      //console.table(datasend);
      this.idupdate = this.idEmpleado;      

      this.APIAdminPetition.UpdatedEmployee(datasend, parseInt(this.idupdate)).subscribe(response =>{                    
        this.response = response;   
        
        this.idEmpleado =this.idupdate ;        // se iguala porque se puedan
        this.nombre = datasend.nombre_empleado;
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

          this.inAct = this.ItemsTable.findIndex( element => element.col1  == this.idEmpleado);                         
          if( this.inAct != -1){
            this.ItemsTable[this.inAct].col2 = this.nombre;
            if(this.estatus == 'A'){
              this.ItemsTable[this.inAct].col3 = 'Activo';          
            }else{
              this.ItemsTable[this.inAct].col3 = 'Inactivo';          
            }            
          }                    
          
          this.Clearinputs();
          //actualizar 
          this.ReloadEmployees();          
        }                  
      });      
      
      this.butonAddUpdate = '';  
    }
}

CreateEmployee() {     
  //obtencion del estatus
  if (this.isChecked == true){
      this.estatus = 'A'
      //alert(this.estatus);
  }else{
      this.estatus = 'B'
      //alert(this.estatus);
  }
                          
  if((this.nombre == '')|| (this.idSucursal == '')|| (this.idEmpleado == '')||(this.correo == '')||(this.telefono == '')||(this.estatus == '')) {                      
    //alert("error faltan datos");      
    //this._snackBar.open('Error faltan datos para actualizar', 'X');          
    this._snackBar.open('Error faltan datos', 'X', {        
      verticalPosition: this.verticalPosition,
      //panelClass: ['green-snackbar'],
      panelClass: ['red-snackbar'],
    });

  }else{

    //llenar data a enviar
    const datasend : employee = {                      
      nombre_empleado: this.nombre,
      id_sucursal: parseInt(this.idSucursal),
      correo: this.correo,
      telefono: this.telefono,
      estatus: this.estatus,                                                                             
    };
      //console.table(datasend);        
      this.APIAdminPetition.createEmployee(datasend).subscribe(response =>{                    
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
          this.ItemsTable.push({col1: String(datasend.id_empleado), col2:datasend.nombre_empleado , col3: datasend.estatus, col4:'-' });            
          this.ReloadEmployees();
          this.Clearinputs();
        }          
        //this.router.navigate(["admin/tournament/list"]);
      })        
    }
}
  
    

}
