import { Component, OnInit} from '@angular/core';
import { branch, response } from '../../services/type';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import {FormBuilder, Validators} from '@angular/forms';
import { request_table } from 'src/app/components/services/request-table';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { DialogDetailComponent } from 'src/app/components/dialog-detail/dialog-detail.component';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-admin-branch-abc',
  templateUrl: './admin-branch-abc.component.html',
  styleUrls: ['./admin-branch-abc.component.css']
})

export class AdminBranchAbcComponent implements OnInit {

  /**/  
  //declaracion de variables para registrar sucursal    
  id_sucursal : string ='';
  nombre: string ='';
  domicilio: string ='';
  correo: string ='';
  telefono: string ='';
  estatus: string ='';

  response: response | any; //subscripcion de respuesta
  isChecked = true;     //variable para el toggle  
  DataBranchShow: branch | any; //tipo de dato para buscar  
  enableid : boolean = false; //para poner campo en modo lectura
  butonAddUpdate : string = '';
  
    
  //arreglo donde de almacenara todas las sucursales
  Arraybranches: branch[]=[];

  //arreglo donde se almacenara solo los datos de la tabla de la tabla 
  ItemsTable : request_table[]=[]; 

  //nombres de columnas de tabla
  namecolum: string[] = ['ID','Nombre','Estado','Botones'];
  ItemSend: String = "";  
    
  constructor(public dialog: MatDialog ,private router: Router, private APIpeticion: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, ) { }
  
  //obtener categoria
  onChangeid(data: String){    
    alert(data);
  }
  
  //------------------------------------------------
  //obtener sucursales actuales y cagarlos a la tabla
  ngOnInit(): void {
    //obtener los datos de la bd get sucursal y pasarlos a 
    /**/  
    this.APIpeticion.getBranches().subscribe(result =>{                
      this.Arraybranches = result;
      //console.table(this.Arraybranches); 
      this.Arraybranches.forEach((row) => {                   
        this.ItemsTable.push({col1: String(row.id_sucursal), col2: row.nombre_sucursal , col3:row.estatus, col4:'-' });        
      });                                     
      //console.table(this.ItemsTable);      
    })        
  }

  //obtner sucursales actuales
  ReloadBranches(){
    this.Arraybranches = [];
    this.APIpeticion.getBranches().subscribe(result =>{                
      //console.table(result);
      this.Arraybranches = result;      
      //console.table(this.Arraybranches);
    })       
  }


  //obtener el id de la sucursal
  onChangeIdBranch(idsucursal: string){
    this.id_sucursal = idsucursal;       
  }
  
  //obtener el nombre de la sucursal
  onChangeNameBranch(data: string){
    this.nombre = data;    
  }

//obtener domicilio
  onChangeDirectionBranch(data:string){
    this.domicilio = data;
  }

//obtener el correo
  onChangeEmailBranch(data: string){
    this.correo = data;    
  }

  onChangePhoneNumberBranch(data: string){
    this.telefono = data;    
  }


//metod para la tabla delete,edit, detail
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

          //alert('eliminando...');
          //this.router.navigate(["admin/tournament/list"]);
          this.APIpeticion.DeleteBranch(parseInt(id)).subscribe(response =>{                    
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
              this.ItemsTable[inAct].col3 = 'B';          //cambiamos a B si se elimino
            }                  
          });      
          this.ReloadBranches();
          this.Clearinputs();
      }
  });
}

Clearinputs(){
  //limpieza
  this.enableid = false;  
  this.id_sucursal ='';
  this.nombre ='';
  this.domicilio ='';
  this.correo ='';
  this.telefono='';
  this.estatus ='';  
  this.isChecked == true
}

//si es edit
ActionEdit(id:string){
  this.butonAddUpdate = 'a';
  this.enableid = true;      
  this.DataBranchShow = this.Arraybranches.find(element => element.id_sucursal == parseInt(id));  
  //console.table(this.DataBranchShow);
  //console.table(this.DataBranchShow);
  this.Clearinputs();
  //asignacion de las variables a mostrar        
  this.id_sucursal = String(this.DataBranchShow.id_sucursal);  
  this.nombre = this.DataBranchShow.nombre_sucursal;
  this.domicilio =  this.DataBranchShow.domicilio;  
  this.correo = this.DataBranchShow.correo;
  this.telefono = this.DataBranchShow.telefono;
  if(this.DataBranchShow.estatus == 'A'){
    this.isChecked = true;
  }else{
    this.isChecked = false;
  }  
}

//si es detail
ActionDatil(id:string){
  //obtener los detalles de la sucursal a mostrar  
  this.DataBranchShow = this.Arraybranches.find(element => element.id_sucursal == parseInt(id));  
  const dialogRef = this.dialog.open(DialogDetailComponent, {
    
    data: [{ title: 'ID:', data: id },
    {title: 'Nombre:', data: this.DataBranchShow.nombre_sucursal},
    {title: 'Domicilio:', data: this.DataBranchShow.domicilio },
    {title: 'Correo:', data: this.DataBranchShow.correo },
    {title: 'Telefono:', data: this.DataBranchShow.telefono},
  ],      
  });  
}

verticalPosition: MatSnackBarVerticalPosition = 'top';


inAct : number = 0;
idupdate: any;
//Metodo de actualizacion de sucursal
UpdateBranch(){

  //obtencion del estatus
  if (this.isChecked == true){
    this.estatus = 'A'
    //alert(this.estatus);
  }else{
    this.estatus = 'B'
    //alert(this.estatus);
  }

  if((this.nombre == '')|| (this.domicilio == '')||(this.correo == '')||(this.telefono == '')||(this.estatus == '')) {
                          
    //this._snackBar.open('Error faltan datos para actualizar', 'x');    
    this._snackBar.open('Error faltan datos', 'X', {      
      verticalPosition: this.verticalPosition,      
      panelClass: ['red-snackbar'],
    });
    
  }else{

    //llenar data a enviar
      const datasend : branch = {                      
        nombre_sucursal: this.nombre,
        domicilio: this.domicilio,
        correo: this.correo,
        telefono: this.telefono,
        estatus: this.estatus,                                                            
      };

      //console.table(datasend);
      this.idupdate = this.id_sucursal;      

      this.APIpeticion.UpdatedBranch(datasend, parseInt(this.idupdate)).subscribe(response =>{                    
        this.response = response;   
        
        this.id_sucursal =this.idupdate ;        // se iguala porque se puedan
        this.nombre = datasend.nombre_sucursal;
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

          this.inAct = this.ItemsTable.findIndex( element => element.col1  == this.id_sucursal);                         
          if( this.inAct != -1){
            this.ItemsTable[this.inAct].col2 = this.nombre;
            this.ItemsTable[this.inAct].col3 = this.estatus;          
          }                    
          //actualizar 
          this.ReloadBranches();
        }                  
      });      
      this.Clearinputs();
      this.butonAddUpdate = '';  
    }
}



CreateBranch() {
     
    //obtencion del estatus
    if (this.isChecked == true){
        this.estatus = 'A'
        //alert(this.estatus);
    }else{
        this.estatus = 'B'
        //alert(this.estatus);
    }
                            
    if((this.nombre == '')|| (this.id_sucursal == '')|| (this.domicilio == '')||(this.correo == '')||(this.telefono == '')||(this.estatus == '')) {                      
      //alert("error faltan datos");      
      //this._snackBar.open('Error faltan datos para actualizar', 'X');          
      this._snackBar.open('Error faltan datos', 'X', {        
        verticalPosition: this.verticalPosition,
        //panelClass: ['green-snackbar'],
        panelClass: ['red-snackbar'],
      });

    }else{

      //llenar data a enviar
        const datasend : branch = {              
          id_sucursal: parseInt(this.id_sucursal),
          nombre_sucursal: this.nombre,
          domicilio: this.domicilio,
          correo: this.correo,
          telefono: this.telefono,
          estatus: this.estatus,                                                            
        };

        //console.table(datasend);        
        this.APIpeticion.createBranch(datasend).subscribe(response =>{                    
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
            this.ItemsTable.push({col1: String(datasend.id_sucursal), col2:datasend.nombre_sucursal , col3: datasend.estatus, col4:'-' });            
            this.ReloadBranches();
            this.Clearinputs();
          }          
          //this.router.navigate(["admin/tournament/list"]);
        })        
      }
}

   
   


}

