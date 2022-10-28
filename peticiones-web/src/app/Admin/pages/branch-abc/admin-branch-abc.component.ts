import { Component, OnInit } from '@angular/core';
import { branch, response } from '../../services/type';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import {FormBuilder, Validators} from '@angular/forms';
import { request_table } from 'src/app/components/services/request-table';
//import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';

/**/

@Component({
  selector: 'app-admin-branch-abc',
  templateUrl: './admin-branch-abc.component.html',
  styleUrls: ['./admin-branch-abc.component.css']
})

export class AdminBranchAbcComponent implements OnInit {

  /**/  
  //declaracion de variables para registrar sucursal  
  id_sucursal : number = 0;
  nombre: String | null = null;  
  domicilio: String | null = null;  
  correo: String | null = null;  
  telefono: String| null = null;  
  estatus: String| null = null;  
  response: response | any;

  //declaracion de los datos a mostrar por si hay id
  Idbranch: string = "";  //convertir a string para enviar a compo numerico
  namebranch: string ="";
  domiciliobranch: string = "";
  emailbranch: string = "";
  phone_number: string="";
  
  
  //arreglo donde de almacenara todas las sucursales
  Arraybranches: branch[]=[];

  //arreglo de la tabla 
  ItemsTable : request_table[]=[
    {col1: "55001", col2: "Branch example" , col3: "Activo", col4:"botones" },
    {col1: "55002", col2: 'Branch example' , col3: 'Desactivado', col4:'botones' },
    {col1: "55003", col2: 'Branch example' , col3: 'Avtivo', col4:'botones' },
    {col1: "55004", col2: 'Branch example' , col3: 'Activo', col4:'botones' },
    {col1: "55005", col2: 'Branch example' , col3: 'Activo', col4:'botones' },
    {col1: "55006", col2: 'Branch example' , col3: 'Desactivado', col4:'botones' },
    {col1: "55007", col2: 'Branch example' , col3: 'Desactivado', col4:'botones' },
    {col1: "55008", col2: 'Branch example' , col3: 'Activo', col4:'botones' },    
  ];
  //prueba de tabla  

  //nombres de columnas de tabla
  namecolum: string[] = ['ID','Nombre','Estado','Botones'];
  ItemSend: String = "";  
  
  constructor( private router: Router, private APIpeticion: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar) { }
  
  
  //obtener categoria
  onChangeid(data: String){    
    alert(data);
  }

  //------------------------------------------------
  ngOnInit(): void {
    //obtener los datos de la bd get sucursal y pasarlos a 
    /*
    this.APIpeticion.getBranches().subscribe(result =>{                
      this.Arraybranches = result;
      //console.table(this.Arraybranches); 

      this.Arraybranches.forEach((row) => {                   
        this.ItemsTable.push({col1: String(row.id_sucursal), col2: row.nombre_sucursal , col3:row.estatus, col4:'-' });        
      });                                     

        console.table(this.ItemsTable);      
    })
    */    
  }

  //obtener el id de la sucursal
  onChangeIdBranch(idsucursal: any){
    this.id_sucursal = parseInt(idsucursal);  
    alert(idsucursal);
  }
  
  //obtener el nombre de la sucursal
  onChangeNameBranch(data: String){
    this.nombre = data;
    //alert(this.nombre);
  }

//obtener domicilio
  onChangeDirectionBranch(data:String){
    this.domicilio = data;
  }

//obtener el correo
  onChangeEmailBranch(data: String){
    this.correo = data;    
  }

  onChangePhoneNumberBranch(data: String){
    this.telefono = data;
    alert(this.telefono);
  }


//metod para la tabla delete,edit, detail
onChangeActionTable(data: any){  
  alert(data.id+"---"+data.action);
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

}

//si es edit
ActionEdit(id:string){

}

//si es detail
ActionDatil(id:string){

}

isChecked = true;  
  
CreateBranch() {
   
      this._snackBar.open('Message', 'x');    

    //obtencion del estatus
    if (this.isChecked == true){
        this.estatus = 'A'
        //alert(this.estatus);
    }else{
        this.estatus = 'B'
        //alert(this.estatus);
    }
                            
    if((this.nombre == null)|| (this.domicilio == null)||(this.correo == null)||(this.telefono == null)||(this.estatus == null)) {
                      
      //alert("error faltan datos");      
      //this._snackBar.open('ejemplo snackbar', 'X');

    }else{

      //llenar data a enviar
        const datasend : branch = {              
          id_sucursal: this.id_sucursal,
          nombre_sucursal: this.nombre,
          domicilio: this.domicilio,
          correo: this.correo,
          telefono: this.telefono,
          estatus: this.estatus,                                                            
        };

        console.table(datasend);
        /*
        this.APIpeticion.createBranch(datasend).subscribe(response =>{
          
          console.table(response);
                              
          //Crear la tupla y regresar al chrisyian
          //this.router.navigate(["admin/tournament/list"]);
        })
        */        
      }
}

   
   


}

