import { Component, OnInit } from '@angular/core';
import { branch, response } from '../../services/type';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Item } from '../../services/type';
import {FormBuilder, Validators} from '@angular/forms';
import { request_table } from 'src/app/components/services/request-table';
//import {MatSnackBar} from '@angular/material/snack-bar';
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
  phone_number: string=""
  
  //prueba del select
  itemsArray: Item[] = [
    {_id: "55000", option: 'Opcion 1'},
    {_id: "22", option: 'Opcion 2'},
    {_id: "13", option: 'Opcion 3'},
    {_id: "44", option: 'Opcion 4'},
  ];

  //prueba de tabla
  itemstable: request_table[] = [
    {col1: "55001", col2: "Branch example" , col3: "Activo", col4:"botones" },
    {col1: "55002", col2: 'Branch example' , col3: 'Desactivado', col4:'botones' },
    {col1: "55003", col2: 'Branch example' , col3: 'Avtivo', col4:'botones' },
    {col1: "55004", col2: 'Branch example' , col3: 'Activo', col4:'botones' },
    {col1: "55005", col2: 'Branch example' , col3: 'Activo', col4:'botones' },
    {col1: "55006", col2: 'Branch example' , col3: 'Desactivado', col4:'botones' },
    {col1: "55007", col2: 'Branch example' , col3: 'Desactivado', col4:'botones' },
    {col1: "55008", col2: 'Branch example' , col3: 'Activo', col4:'botones' },
    {col1: "55010", col2: 'Branch example' , col3: 'Activo', col4:'botones' },
    {col1: "55011", col2: 'Branch example' , col3: 'Activo', col4:'botones' },
    {col1: "55012", col2: 'Branch example' , col3: 'Desactivo', col4:'botones' },
    {col1: "55013", col2: 'Branch example' , col3: 'Desactivo', col4:'botones' },
  ];

  //nombres de columnas de tabla
  namecolum: string[] = ['ID','Nombre','Estado','Botones'];

  ItemSend: String = "";  
  //private _snackBar: MatSnackBar
  constructor( private router: Router, private APIpeticion: AdminService, private _formBuilder: FormBuilder) { }

  //Prueba del select 
  //obtener categoria
  onChangeid(data: String){    
    alert(data);
  }

  //------------------------------------------------
  ngOnInit(): void {
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

  isChecked = true;  
  
  CreateBranch() {
              
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
