import { Component, OnInit} from '@angular/core';
import { branch, response } from '../../services/type';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import {FormBuilder, Validators} from '@angular/forms';
import { request_table } from 'src/app/components/services/request-table';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';

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
  ItemsTable : request_table[]=[        
  ];
  //prueba de tabla  
  /*
  {col1: "55001", col2: "Branch example" , col3: "Activo", col4:"botones" },
    {col1: "55002", col2: 'Branch example' , col3: 'Desactivado', col4:'botones' },
    {col1: "55003", col2: 'Branch example' , col3: 'Avtivo', col4:'botones' },
    {col1: "55004", col2: 'Branch example' , col3: 'Activo', col4:'botones' },
    {col1: "55005", col2: 'Branch example' , col3: 'Activo', col4:'botones' },
    {col1: "55006", col2: 'Branch example' , col3: 'Desactivado', col4:'botones' },
    {col1: "55007", col2: 'Branch example' , col3: 'Desactivado', col4:'botones' },
    {col1: "55008", col2: 'Branch example' , col3: 'Activo', col4:'botones' },    
  */

  //nombres de columnas de tabla
  namecolum: string[] = ['ID','Nombre','Estado','Botones'];
  ItemSend: String = "";  
    
  constructor(public dialog: MatDialog ,private router: Router, private APIpeticion: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, ) { }
  
  //obtener categoria
  onChangeid(data: String){    
    alert(data);
  }

  //------------------------------------------------
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
    data: { name: 'Eliminar,', subname: '¿Estas seguro que desea eliminar?'},
  });

  dialogRef.afterClosed().subscribe(result => {
      if ( result == true){
          //proceder a eliminar
          alert('eliminando...') 
          //this.router.navigate(["admin/tournament/list"]);
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
  console.table(this.DataBranchShow);
  this.Clearinputs();
  //asignacion de las variables a mostrar      
  this.id_sucursal = id;
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

}



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
                          
    this._snackBar.open('Error faltan datos para actualizar', 'x');    
    
  }else{

    //llenar data a enviar
      const datasend : branch = {                      
        nombre_sucursal: this.nombre,
        domicilio: this.domicilio,
        correo: this.correo,
        telefono: this.telefono,
        estatus: this.estatus,                                                            
      };

      console.table(datasend);
      //console.table(datasend);        
      this.APIpeticion.UpdatedBranch(datasend, parseInt(this.id_sucursal)).subscribe(response =>{                    
        this.response = response;                          
          alert(this.response.Mensaje);  //sanackBar         
        //this.router.navigate(["admin/tournament/list"]);
      })

      //this.ItemsTable = [];              
      //this.ngOnInit();       
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
                            
    if((this.nombre == "")|| (this.id_sucursal == "")|| (this.domicilio == "")||(this.correo == "")||(this.telefono == "")||(this.estatus == "")) {
                      
      //alert("error faltan datos");      
      this._snackBar.open('Error faltan datos para actualizar', 'X');          

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
            alert(this.response.Mensaje);  //sanackBar 
          }else{
            this.ItemsTable.push({col1: String(datasend.id_sucursal), col2:datasend.nombre_sucursal , col3: datasend.estatus, col4:'-' });            
          }
          
          //this.router.navigate(["admin/tournament/list"]);
        })

        //this.ItemsTable = [];        
        //this.ngOnInit();
      }
}

   
   


}

