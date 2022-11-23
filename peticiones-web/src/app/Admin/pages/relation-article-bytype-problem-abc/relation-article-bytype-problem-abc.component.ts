import { Component, OnInit} from '@angular/core';
import { response, Item, articlebytypeproblem, user } from '../../services/type';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import {FormBuilder} from '@angular/forms';
import { request_table } from 'src/app/components/services/request-table';
import {MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { DialogDetailComponent } from 'src/app/components/dialog-detail/dialog-detail.component';

@Component({
  selector: 'app-relation-article-bytype-problem-abc',
  templateUrl: './relation-article-bytype-problem-abc.component.html',
  styleUrls: ['./relation-article-bytype-problem-abc.component.css']
})
export class RelationArticleBytypeProblemAbcComponent implements OnInit {

    id:string = '';
    idArticle: number = 0;    
    idTypeProblem: number =0;

    //arreglo donde de almacenara todos los empleados
    ArrayArticleProblem: articlebytypeproblem[]=[];
    //arreglo donde se almacenara solo los datos de la tabla de la tabla 
    ItemsTable : request_table[]=[]; 
    //Arreglo donde se almacena la informacion de id sucursal y nombre sucursal    
    itemsSelecArticles: Item[] =[];
    itemsSelecTypeProblem: Item[]=[];

    response: response | any; //subscripcion de respuesta
    DataArticlePoblemShow: articlebytypeproblem | any; //tipo de dato para buscar  
    enableid : boolean = false; //para poner campo en modo lectura
    butonAddUpdate : string = '';
    nameColum: string[] = ['ID','Articulo','Tipo Problema','Botones'];    
    verticalPosition: MatSnackBarVerticalPosition = 'top';   
    inAct : number = 0;
    idupdate: any;

  constructor(public dialog: MatDialog ,private router: Router, private APIAdminPetition: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,) { }

   //para validar lo de sesion  y rol  
   idRol : number = 0;
   dataSesion:user|any;
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


    this.APIAdminPetition.getArticlesProblems().subscribe(result =>{                
      this.ArrayArticleProblem = result;
      //console.table(this.Arraybranches); 
      this.ArrayArticleProblem.forEach((row) => {                           
          this.ItemsTable.push({col1: String(row.id_articulo_problema), col2: String(row.nombre_articulo) , col3: String(row.tipo_problema), col4:'-' });                                    
      });                         
      //console.table(this.ItemsTable);      
    })
    
    //obtener las Tipos de problema
    this.APIAdminPetition.getTypeProblems().subscribe(result =>{                      
      //console.table(this.Arraybranches); 
      result.forEach((row:any) => {                                     
          this.itemsSelecTypeProblem.push({_id: row.id_tipo_problema, option: String(row.tipo_problema)});    
      });                                           
    })      
    
    //obtener los articulos 
    this.APIAdminPetition.getArticle().subscribe(result =>{                      
      result.forEach((row:any) => {                           
        this.itemsSelecArticles.push({_id: row.id_codigo_articulo, option: String(row.nombre_articulo)});    
      });                                         
    })        
  }


  ReloadArticleProblems(option: string){
    this.ArrayArticleProblem = [];
    this.APIAdminPetition.getStores().subscribe(result =>{                      
      this.ArrayArticleProblem = result;      
      //console.table(this.Arraybranches);
      if(option == 'c'){                        
        this.ItemsTable.push({col1: String(this.ArrayArticleProblem[this.ArrayArticleProblem.length -1].id_articulo_problema), col2: String(this.ArrayArticleProblem[this.ArrayArticleProblem.length -1].nombre_articulo) , col3: String(this.ArrayArticleProblem[this.ArrayArticleProblem.length -1].tipo_problema), col4:'-' });                                  
      }            
      this.Clearinputs();      
    })       
  }

  Clearinputs(){
    //limpieza    
    this.enableid = false;      
    this.idArticle = 0;
    this.idTypeProblem = 0;
  }

  onCTypeProblem(data: string){
    this.idTypeProblem = parseInt(data);
  }

  onChangeIdArticle(data: string){
    this.idArticle = parseInt(data);    
  }


  onChangeActionTable(data: {id:string, action:string}){
    //alert(data.id+"---"+data.action);    
   if(data.action === 'edit'){
     this.ActionEdit(data.id);
   }
 }

 ActionEdit(id:string){
  this.butonAddUpdate = 'a';    
  this.DataArticlePoblemShow = this.ArrayArticleProblem.find(element => 
    element.id_articulo_problema == parseInt(id)
  );    
  console.table(this.DataArticlePoblemShow);
  this.Clearinputs();
  //asignacion de las variables a mostrar                
  this.id = id;
  this.idTypeProblem = parseInt(this.DataArticlePoblemShow.id_tipo_problema);
  this.idArticle = this.DataArticlePoblemShow.id_codigo_articulo;

  //console.log(this.idSucursal+'---'+this.idArticle);  
}

UpdateRelation(){
  if((this.idTypeProblem == 0)||(String(this.idTypeProblem).length !=10)||( String(this.idArticle).length !=10 ) || (this.idArticle == 0)) {
                          
    //this._snackBar.open('Error faltan datos para actualizar', 'x');    
    this._snackBar.open('Error faltan datos', 'X', {      
      verticalPosition: this.verticalPosition,      
      panelClass: ['red-snackbar'],
    });
    
  }else{
    
    //llenar data a enviar
      const datasend : articlebytypeproblem = {                            
        id_codigo_articulo: String(this.idArticle),
        id_tipo_problema: this.idTypeProblem,        
      };      
      //console.log(this.id);
      //console.table(datasend);
      this.idupdate = this.id;      
      this.APIAdminPetition.UpdatedArticleProblem(datasend, parseInt(this.idupdate)).subscribe(response =>{                    
        this.response = response;           
        this.id =this.idupdate ;        // se iguala porque se puedan usar
        this.idArticle = parseInt(datasend.id_codigo_articulo);
        this.idTypeProblem = datasend.id_tipo_problema;

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
          this.ReloadArticleProblems('u');     

          this.inAct = this.ItemsTable.findIndex( element => element.col1  == this.id);              

          const indexPrblem =  this.itemsSelecTypeProblem.findIndex( element => element._id  == String(this.idTypeProblem))
          const indexArticle = this.itemsSelecArticles.findIndex( element => element._id  == String(this.idArticle))
          
            if( this.inAct != -1){
              this.ItemsTable[this.inAct].col2 = this.itemsSelecArticles[indexArticle].option;
              this.ItemsTable[this.inAct].col3 = this.itemsSelecTypeProblem[indexPrblem].option;                       
            }                                            
          }                  
      });            
      this.butonAddUpdate = '';  
    }
}

CreateRelation(){
  if((this.idTypeProblem == 0)||(String(this.idTypeProblem).length !=10)||( String(this.idArticle).length !=10 ) || (this.idArticle == 0)) {
                          
    //this._snackBar.open('Error faltan datos para actualizar', 'x');    
    this._snackBar.open('Error faltan datos', 'X', {      
      verticalPosition: this.verticalPosition,      
      panelClass: ['red-snackbar'],
    });
    
  }else{
    
    //llenar data a enviar
      const datasend : articlebytypeproblem = {                            
        id_codigo_articulo: String(this.idArticle),
        id_tipo_problema: this.idTypeProblem,        
      };      
      //console.log(this.id);
      //console.table(datasend);
      this.idupdate = this.id;      
      this.APIAdminPetition.createArticleProblem(datasend).subscribe(response =>{                    
        this.response = response;                           
        this.idArticle = parseInt(datasend.id_codigo_articulo);
        this.idTypeProblem = datasend.id_tipo_problema;

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
          
          //actualizar 
          this.ReloadArticleProblems('c');               
        }                  
      });            
      
    }

}

}
