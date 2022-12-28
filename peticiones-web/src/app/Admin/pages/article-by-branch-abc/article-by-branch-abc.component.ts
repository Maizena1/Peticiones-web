import { Component, OnInit} from '@angular/core';
import { response, Item, store, User } from '../../services/type';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import {FormBuilder} from '@angular/forms';
import { request_table } from 'src/app/components/services/request-table';
import {MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatDialog } from '@angular/material/dialog';
import { DialogDetailComponent } from 'src/app/components/dialog-detail/dialog-detail.component';

@Component({
  selector: 'app-article-by-branch-abc',
  templateUrl: './article-by-branch-abc.component.html',
  styleUrls: ['./article-by-branch-abc.component.css']
})
export class ArticleByBranchAbcComponent implements OnInit {
    
  branches: [] = [];
  articles: [] = [];

  //declaracion de variables para registrar sucursal    
  id: string = '';
  idSucursal : string = '';
  idArticle: string = '';    
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

  constructor(public dialog: MatDialog ,private router: Router, private APIPetition: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,) { }

  idRol : number = 0;
  dataSesion: User|any;
  ngOnInit(): void {
    if (localStorage){    
      if(localStorage.getItem('dataSesion') !== undefined && localStorage.getItem('dataSesion')){        
        const userJson = localStorage.getItem('dataSesion');
        this.dataSesion = userJson !== null ? JSON.parse(userJson) : console.log('Estoy devolviendo nulo');                                
        this.idRol = this.dataSesion.id_rol;        
        if(this.idRol != 1){          
          this.APIPetition.SnackBarError('Error no tiene permisos o no inicio sesión', 'X');
          this.router.navigate(["login"]);              
        }
      }else{        
          //alert("DataSesion no existe en localStorage!!"); 
          this.router.navigate(["login"]);              
      }
    }        
      
    this.ReloadStores();

    

    this.APIPetition.getBranches().subscribe(branch => {
      this.branches = branch;
    })

    this.APIPetition.getArticleSinOtros().subscribe(article => {
      this.articles = article;
    })

  }


  getIdBranches(item: any){
    return item.id_sucursal
  }

  getLabelBranches(item: any){
    return item.nombre_sucursal
  }

  getIdArticle(item: any){
    return item.id_codigo_articulo
  }

  getLabelArticle(item: any){
    return item.nombre_articulo
  }





  //obtner empleados actuales
  ReloadStores(){
    this.ArrayStore = [];
    this.ItemsTable = [];
    this.APIPetition.getStores().subscribe(result =>{                      
      this.ArrayStore = result;      
      if(this.ArrayStore.length > 0){
        this.ArrayStore.forEach((row) => {                           
          this.ItemsTable.push({col1: String(row.id_almacen), col2: String(row.nombre_sucursal) , col3: String(row.nombre_articulo), col4:'-' });                                    
        });                  
      }                
    })       
  }

  Clearinputs(){
    //limpieza
    this.isChecked == true;
    this.enableid = false;      
    this.id = '';
    this.idSucursal = '0';
    this.idArticle = '0';    
    this.totalAmount = ' ';
    this.totalAvailable=' ';
    this.tipo = '';
  }


  onChangeTotalAmount(data: string){
    this.totalAmount = data;
    console.log(this.totalAmount)
  }

  onChangeTotalAvailable(data: string){
    this.totalAvailable = data;
    console.log(this.totalAvailable)
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

    if(this.DataStoreShow.id_sucursal == '1'){
      const dialogRef = this.dialog.open(DialogDetailComponent, {
        width: '300px',
        data: [
        //{ title: 'ID:', data: id },
        {title: 'Id Sucursal:', data: this.DataStoreShow.id_sucursal},    
        {title: 'Nombre Sucursal: ', data: this.DataStoreShow.nombre_sucursal},    
        {title: 'Codigo Articulo:', data: this.DataStoreShow.id_codigo_articulo },
        {title: 'Nombre Articulo:', data: this.DataStoreShow.nombre_articulo },        
        {title: 'Disponibles:', data: String(this.DataStoreShow.cantidad_disponible)},
        {title: 'Tipo:', data: this.tipo}    
      ],      
      });  
    }else{
      const dialogRef = this.dialog.open(DialogDetailComponent, {
        width: '300px',
        data: [
        //{ title: 'ID:', data: id },
        {title: 'Id Sucursal:', data: this.DataStoreShow.id_sucursal},    
        {title: 'Nombre Sucursal: ', data: this.DataStoreShow.nombre_sucursal},    
        {title: 'Codigo Articulo:', data: this.DataStoreShow.id_codigo_articulo },
        {title: 'Nombre Articulo:', data: this.DataStoreShow.nombre_articulo },
        {title: 'Existentes:', data: String(this.DataStoreShow.cantidad_total) },        
        {title: 'Tipo:', data: this.tipo}    
      ],      
      });  
    }

    
    
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

  if(this.idSucursal =='1'){
    this.totalAmount = '0';
  }else{    
    this.totalAvailable = '0'
  }

  
  if((this.idSucursal == '')|| (this.idArticle == '') || (this.totalAvailable == '')||( String(this.totalAmount) == '') ||(this.tipo == '')) {                
    this.APIPetition.SnackBarError('Error, faltan datos.','X');
    this.Clearinputs();
  }else if(String(this.idArticle).length != 10){
    this.APIPetition.SnackBarError('Error, mínimo 10 dígitos en el ID.','X');
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

      this.APIPetition.UpdatedStore(datasend, parseInt(this.idupdate)).subscribe(response =>{                    
        this.response = response;   
        
        this.id =this.idupdate ;        // se iguala porque se puedan        
        this.tipo = datasend.tipo;
        
        if(this.response.Estatus == 'Error'){            
          this.APIPetition.SnackBarError(this.response.Mensaje, 'X');         
        }else{
          this.APIPetition.SnackBarSuccessful(this.response.Mensaje, 'X');      

          
          this.ReloadStores();          
          this.Clearinputs();          
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
  
  if(this.idSucursal =='1'){
    this.totalAmount = '0';
  }else{
    this.totalAvailable = '0';
  }      

  if((this.idSucursal == '') || (this.idArticle == '') || (this.totalAvailable == '')||(this.totalAmount == '') ||(this.tipo == '')) {                              
    this._snackBar.open('Error faltan datos', 'X', {        
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['red-snackbar'],
    });
  }else if( String(this.idArticle).length !=10 ){
    this.APIPetition.SnackBarError('Error, mínimo 10 dígitos en el ID.','X')
  }
  else{

    //llenar data a enviar
    const datasend : store = {                      
      id_sucursal: parseInt(this.idSucursal),
      id_codigo_articulo: String(this.idArticle),
      cantidad_total: parseInt(this.totalAmount),
      cantidad_disponible:parseInt(this.totalAvailable),
      tipo: this.tipo,
    };

    //console.log(datasend);
      //console.table(datasend);        
      this.APIPetition.createStore(datasend).subscribe(response =>{                    
        this.response = response;          
        if(this.response.Estatus == 'Error'){  
          this.APIPetition.SnackBarError(this.response.Mensaje, 'X');     
        }else{
          this.APIPetition.SnackBarSuccessful(this.response.Mensaje, 'X');     
          this.ReloadStores();               
          this.Clearinputs();      
        }          
        //this.router.navigate(["admin/tournament/list"]);
      })        
    }
  }

}
