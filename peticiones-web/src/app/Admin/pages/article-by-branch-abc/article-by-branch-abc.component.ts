import { Component, OnInit} from '@angular/core';
import { response, Item, store } from '../../services/type';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import {FormBuilder} from '@angular/forms';
import { request_table } from 'src/app/components/services/request-table';
import {MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { DialogDetailComponent } from 'src/app/components/dialog-detail/dialog-detail.component';

@Component({
  selector: 'app-article-by-branch-abc',
  templateUrl: './article-by-branch-abc.component.html',
  styleUrls: ['./article-by-branch-abc.component.css']
})
export class ArticleByBranchAbcComponent implements OnInit {
    
  //declaracion de variables para registrar sucursal    
  id: string = '';
  idSucursal : number = 0;
  idArticle: number = 0;    
  totalAmount: string ='';
  totalAvailable: string ='';  
  tipo: string ='';

  response: response | any; //subscripcion de respuesta
  isChecked = true;     //variable para el toggle  
  DataStoreShow: store | any; //tipo de dato para buscar  
  enableid : boolean = false; //para poner campo en modo lectura
  butonAddUpdate : string = '';
  

  //arreglo donde de almacenara todos los empleados
  ArrayStore: store[]=[];
  //arreglo donde se almacenara solo los datos de la tabla de la tabla 
  ItemsTable : request_table[]=[]; 
  //Arreglo donde se almacena la informacion de id sucursal y nombre sucursal
  itemsSelecBranches: Item[] =[];
  itemsSelecArticles: Item[] =[];

  //nombres de columnas de tabla
  nameColum: string[] = ['ID','Sucursal','Articulo','Botones'];  
  
  verticalPosition: MatSnackBarVerticalPosition = 'top'; 

  inAct : number = 0;
  idupdate: any;

  constructor(public dialog: MatDialog ,private router: Router, private APIAdminPetition: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.APIAdminPetition.getStores().subscribe(result =>{                
      this.ArrayStore = result;
      //console.table(this.Arraybranches); 
      this.ArrayStore.forEach((row) => {                           
          this.ItemsTable.push({col1: String(row.id_almacen), col2: String(row.nombre_sucursal) , col3: String(row.nombre_articulo), col4:'-' });                                    
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
    })    

    //obtener los articulos 
    this.APIAdminPetition.getCodeArticle().subscribe(result =>{                      
      result.forEach((row:any) => {                           
        this.itemsSelecArticles.push({_id: row.id_codigo_articulo, option: String(row.nombre_articulo)});    
      });                                         
    }) 
           
  }

  //obtner empleados actuales
  ReloadStores(option: string){
    this.ArrayStore = [];
    this.APIAdminPetition.getStores().subscribe(result =>{                      
      this.ArrayStore = result;      
      //console.table(this.Arraybranches);
      if(option == 'c'){                
        this.ItemsTable.push({col1: String(this.ArrayStore[this.ArrayStore.length -1].id_almacen), col2: String(this.ArrayStore[this.ArrayStore.length -1].nombre_sucursal) , col3: String(this.ArrayStore[this.ArrayStore.length -1].nombre_articulo), col4:'-' });                                  
      }            
      this.Clearinputs();      
    })       
  }

  Clearinputs(){
    //limpieza
    this.isChecked == true;
    this.enableid = false;      
    this.id = '';
    this.idSucursal=0;
    this.idArticle=0;    
    this.totalAmount = '';
    this.totalAvailable='';
    this.tipo = '';
  }

  onChangeIdBranch(data: string){
    this.idSucursal = parseInt(data);
  }

  onChangeIdArticle(data: string){
    this.idArticle = parseInt(data);    
  }

  onChangeTotalAmount(data: string){
    this.totalAmount = data;
  }

  onChangeTotalAvailable(data: string){
    this.totalAvailable = data;
  }

  onChangeActionTable(data: {id:string, action:string}){
     //alert(data.id+"---"+data.action);    
    if(data.action === 'edit'){
      this.ActionEdit(data.id);
    }else if(data.action === 'detail'){
      this.ActionDatil(data.id);
    }  
  }

  ActionEdit(id:string){
    this.butonAddUpdate = 'a';    
    this.DataStoreShow = this.ArrayStore.find(element => 
      element.id_almacen == parseInt(id)
    );    
    this.Clearinputs();
    this.enableid = true;      
    //asignacion de las variables a mostrar                
    this.id = id;
    this.idSucursal = this.DataStoreShow.id_sucursal;
    this.idArticle = this.DataStoreShow.id_codigo_articulo;
    //console.log(this.idSucursal+'---'+this.idArticle);
    this.totalAmount = this.DataStoreShow.cantidad_total;
    this.totalAvailable = this.DataStoreShow.cantidad_disponible
    if(this.DataStoreShow.tipo == 'V'){
      this.isChecked = true;    
    }else{    
      this.isChecked = false;
    }  
  }

  //si es detail
  ActionDatil(id:string){
    //obtener los detalles de la sucursal a mostrar  
    this.DataStoreShow = this.ArrayStore.find(element => element.id_almacen == parseInt(id));      
    //console.table(this.DataStoreShow);
    if(this.DataStoreShow.tipo == 'V'){
      this.tipo = 'Valor'
    }else{    
      this.tipo = 'Comun'
    }  
    //alert(this.inAct);
    const dialogRef = this.dialog.open(DialogDetailComponent, {
      width: '300px',
      data: [{ title: 'ID:', data: id },
      {title: 'Id Sucursal:', data: this.DataStoreShow.id_sucursal},    
      {title: 'Nombre Sucursal: ', data: this.DataStoreShow.nombre_sucursal},    
      {title: 'Codigo Articulo:', data: this.DataStoreShow.id_codigo_articulo },
      {title: 'Nombre Articulo:', data: this.DataStoreShow.nombre_articulo },
      {title: 'Existentes:', data: String(this.DataStoreShow.cantidad_total) },
      {title: 'Disponibles:', data: String(this.DataStoreShow.cantidad_disponible)},
      {title: 'Tipo:', data: this.tipo}    
    ],      
    });  
  }
  

  UpdateStore(){    
     //obtencion del estatus
  if (this.isChecked == true){
    this.tipo = 'V'
    //alert(this.estatus);
  }else{
    this.tipo = 'C'
    //alert(this.estatus);
  }

  if((this.idSucursal == 0)||( String(this.idArticle).length !=10 ) || (this.idArticle == 0) || (this.totalAvailable == '')||(this.totalAmount == '') ||(this.tipo == '')) {
                          
    //this._snackBar.open('Error faltan datos para actualizar', 'x');    
    this._snackBar.open('Error faltan datos', 'X', {      
      verticalPosition: this.verticalPosition,      
      panelClass: ['red-snackbar'],
    });
    
  }else{
    
    //llenar data a enviar
      const datasend : store = {                            
        cantidad_total: parseInt(this.totalAmount),                      
        cantidad_disponible: parseInt(this.totalAvailable),
        tipo: this.tipo,
      };      
      //console.log(this.id);
      //console.table(datasend);
      this.idupdate = this.id;      

      this.APIAdminPetition.UpdatedStore(datasend, parseInt(this.idupdate)).subscribe(response =>{                    
        this.response = response;   
        
        this.id =this.idupdate ;        // se iguala porque se puedan        
        this.tipo = datasend.tipo;
        
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

          this.Clearinputs();
          //actualizar 
          this.ReloadStores('u');          
        }                  
      });            
      this.butonAddUpdate = '';  
    }
  }

  CreateStore(){
    //obtencion del estatus
    if (this.isChecked == true){
      this.tipo = 'V'
      //alert(this.estatus);
  }else{
      this.tipo = 'C'
      //alert(this.estatus);
  }
                          
  if((this.idSucursal == 0)||( String(this.idArticle).length !=10 ) || (this.idArticle == 0) || (this.totalAvailable == '')||(this.totalAmount == '') ||(this.tipo == '')) {                              
    this._snackBar.open('Error faltan datos', 'X', {        
      verticalPosition: this.verticalPosition,
      //panelClass: ['green-snackbar'],
      panelClass: ['red-snackbar'],
    });
  }else{

    //llenar data a enviar
    const datasend : store = {                      
      id_sucursal: this.idSucursal,
      id_codigo_articulo: String(this.idArticle),
      cantidad_total: parseInt(this.totalAmount),
      cantidad_disponible:parseInt(this.totalAvailable),
      tipo: this.tipo,
    };

      //console.table(datasend);        
      this.APIAdminPetition.createStore(datasend).subscribe(response =>{                    
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
          this.ReloadStores('c');          
        }          
        //this.router.navigate(["admin/tournament/list"]);
      })        
    }
  }

}
