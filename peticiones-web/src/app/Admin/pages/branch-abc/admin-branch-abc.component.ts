import { Component, OnInit} from '@angular/core';
import { branch, response, User } from '../../services/type';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { FormBuilder } from '@angular/forms';
import { request_table } from 'src/app/components/services/request-table';
import { MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { DialogDetailComponent } from 'src/app/components/dialog-detail/dialog-detail.component';

@Component({
  selector: 'app-admin-branch-abc',
  templateUrl: './admin-branch-abc.component.html',
  styleUrls: ['./admin-branch-abc.component.css']
})

export class AdminBranchAbcComponent implements OnInit {

  /**/  
  //declaracion de variables para registrar sucursal    
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  id_sucursal : string ='';
  nombre: string ='';
  domicilio: string ='';
  correo: string ='';
  telefono: string ='';
  estatus: string ='';

  response: response | any; //subscripcion de respuesta
  isChecked = true;     //variable para el toggle  
  dataBranchShow: branch | any; //tipo de dato para buscar  
  enableid : boolean = false; //para poner campo en modo lectura
  butonAddUpdate : string = ''; 
  
    
  //arreglo donde de almacenara todas las sucursales
  Arraybranches: branch[]=[];

  //arreglo donde se almacenara solo los datos de la tabla de la tabla 
  ItemsTable : request_table[]=[]; 

  //nombres de columnas de tabla
  nameColumn: string[] = ['ID','Nombre','Estado','Botones'];
  ItemSend: String = "";  
    
  constructor( public dialog: MatDialog ,private router: Router, private APIAdminPetition: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, ) { }
  
  //------------------------------------------------  
  idRol : number = 0;
  dataSesion:User|any;
  ngOnInit(): void {
    if (localStorage){    
      if(localStorage.getItem('dataSesion') !== undefined && localStorage.getItem('dataSesion')){        
        const userJson = localStorage.getItem('dataSesion');
        this.dataSesion = userJson !== null ? JSON.parse(userJson) : console.log('Estoy devolviendo nulo');                                
        this.idRol = this.dataSesion.id_rol;        
        if(this.idRol != 1){        
          this.APIAdminPetition .SnackBarError('Error, no tiene permisos o no inicio sesión.', 'X');
         
          this.router.navigate(["login"]);              
        }
      }else{        
          //alert("DataSesion no existe en localStorage!!"); 
          this.router.navigate(["login"]);              
      }
    }        
    
    this.ReloadBranches();
  }

  //obtner sucursales actuales
  ReloadBranches(){
    this.Arraybranches = [];
    this.ItemsTable = [];
    this.APIAdminPetition.getBranches().subscribe(result =>{                      
      //console.table(result);
      this.Arraybranches = result;            
      if(this.Arraybranches.length > 0){
        this.Arraybranches.forEach((row) => {                   
          if(row.estatus == 'A'){          
            this.ItemsTable.push({col1: String(row.id_sucursal), col2: row.nombre_sucursal , col3:'Activo', col4:'-' });        
          }else{          
            this.ItemsTable.push({col1: String(row.id_sucursal), col2: row.nombre_sucursal , col3:'Inactivo', col4:'-' });        
          }        
        });   
      }
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


//metodo para la tabla delete,edit, detail
onChangeActionTable(data: any){    
  console.log(data.action)
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
    data: { name: 'Eliminar', subname: '¿Estás seguro que deseas deshabilitar?'},
  });

  dialogRef.afterClosed().subscribe(result => {

    if ( result == true){          
        const inDesc = this.ItemsTable.findIndex((element) => element.col1 == id);
        if(this.ItemsTable[inDesc].col3 == 'Inactivo'){
          this.APIAdminPetition.SnackBarError('Error, no se puede desactivar porque ya está inactiva', 'X');
            
        }else if (this.id_sucursal == '16'){
          this.APIAdminPetition.SnackBarError('Error, no se puede desactivar sucursal almacén', 'X');
        }else{

          this.APIAdminPetition.DeleteBranch(parseInt(id)).subscribe(response =>{                    
            this.response = response;                                        
            if(this.response.Estatus == 'Error'){   
              this.APIAdminPetition.SnackBarError(this.response.Mensaje, 'X');         
            }else{
              this.APIAdminPetition.SnackBarSuccessful(this.response.Mensaje, 'X');
              const inAct = this.ItemsTable.findIndex((element) => element.col1 == id);
              this.ItemsTable[inAct].col3 = 'Inactivo';     
            }                  
          });      
          this.ReloadBranches();
          this.Clearinputs();
        }                      
      }
  });
}

Clearinputs(){
  this.isChecked == true;
  this.enableid = false;  
  this.id_sucursal =' ';
  this.nombre =' ';
  this.domicilio =' ';
  this.correo =' ';
  this.telefono=' ';
  this.estatus =' ';    
}

ActionEdit(id:string){
  this.butonAddUpdate = 'a';  
  this.dataBranchShow = this.Arraybranches.find(element => 
    element.id_sucursal == parseInt(id)
  );  
  
  console.table(this.dataBranchShow);
  this.Clearinputs();
  this.enableid = true;      
  this.id_sucursal = String(this.dataBranchShow.id_sucursal);  
  this.nombre = this.dataBranchShow.nombre_sucursal;
  this.domicilio =  this.dataBranchShow.domicilio;  
  this.correo = this.dataBranchShow.correo;
  this.telefono = this.dataBranchShow.telefono;
  if(this.dataBranchShow.estatus == 'A'){
    this.isChecked = true;
  }else{
    this.isChecked = false;
  }  
}

ActionDatil(id:string){
  this.dataBranchShow = this.Arraybranches.find(element => element.id_sucursal == parseInt(id));  
  const dialogRef = this.dialog.open(DialogDetailComponent, {
    width: '300px',
    data: [{ title: 'ID:', data: id },
    {title: 'Nombre:', data: this.dataBranchShow.nombre_sucursal},
    {title: 'Domicilio:', data: this.dataBranchShow.domicilio },
    {title: 'Correo:', data: this.dataBranchShow.correo },
    {title: 'Telefono:', data: this.dataBranchShow.telefono},
  ],      
  });  
}



idupdate: any;

UpdateBranch(){

  if (this.isChecked == true){
    this.estatus = 'A'
  }else{
    this.estatus = 'B'
  }

  if((this.nombre == '')|| (this.domicilio == '')||(this.correo == '')||(this.telefono == '')||(this.estatus == '')) {
    this.APIAdminPetition.SnackBarError('Error, faltan datos.', 'X');
  }else if(this.telefono.length != 10){
    this.APIAdminPetition.SnackBarError('Error, mínimo 10 dígitos en el teléfono.','X')
  }else{

    const datasend : branch = {                      
      nombre_sucursal: this.nombre,
      domicilio: this.domicilio,
      correo: this.correo,
      telefono: this.telefono,
      estatus: this.estatus,                                                            
      };

      //console.table(datasend);
      this.idupdate = this.id_sucursal;      

      this.APIAdminPetition.UpdatedBranch(datasend, parseInt(this.idupdate)).subscribe(response =>{                    
        this.response = response;   
        
        this.id_sucursal =this.idupdate ;        // se iguala porque se puedan
        this.nombre = datasend.nombre_sucursal;
        this.estatus = datasend.estatus;
        
        if(this.response.Estatus == 'Error'){      
          this.APIAdminPetition.SnackBarError(this.response.Mensaje, 'X');           
               
        }else{
          this.APIAdminPetition.SnackBarSuccessful(this.response.Mensaje, 'X');     
                                        
          this.Clearinputs();
          //actualizar 
          this.ReloadBranches();          
        }                  
      });      
      
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
      
      this.APIAdminPetition.SnackBarError('Error, faltan datos.', 'X');        

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
        this.APIAdminPetition.createBranch(datasend).subscribe(response =>{                    
          this.response = response;          
          if(this.response.Estatus == 'Error'){     
            this.APIAdminPetition.SnackBarError(this.response.Mensaje, 'X');            
           
          }else{
            this.APIAdminPetition.SnackBarSuccessful(this.response.Mensaje, 'X');     
      
            this.ReloadBranches();
            this.Clearinputs();
          }          
          //this.router.navigate(["admin/tournament/list"]);
        })        
      }
}

   
   


}

