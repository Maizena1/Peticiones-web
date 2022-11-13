import { Component, OnInit} from '@angular/core';
import { article, response } from '../../services/type';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, Validators} from '@angular/forms';
import { request_table } from 'src/app/components/services/request-table';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { DialogDetailComponent } from 'src/app/components/dialog-detail/dialog-detail.component';

@Component({
  selector: 'app-article-abc',
  templateUrl: './article-abc.component.html',
  styleUrls: ['./article-abc.component.css']
})
export class ArticleAbcComponent implements OnInit {

  idArticle: string = '';
  name: string = '';
  description: string = '';

  dataArticleShow: article | any; //tipo de dato para buscar  
  response: response | any; //subscripcion de respuesta
  butonAddUpdate : string = ''; 
  enableid: boolean = false;
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  //arreglo donde de almacenara todas las sucursales
  ArrayArticles: article[]=[];

  //arreglo donde se almacenara solo los datos de la tabla de la tabla 
  ItemsTable : request_table[]=[]; 

  //nombres de columnas de tabla
  nameColumn: string[] = ['ID','Nombre','Descripción','Botones'];

  constructor(public dialog: MatDialog ,private router: Router, private APIAdminPetition: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.APIAdminPetition.getCodeArticle().subscribe(result =>{                
      this.ArrayArticles = result;
      //console.table(this.Arraybranches); 
      this.ArrayArticles.forEach((row) => {                   
        /*
        "id_codigo_articulo": "5111100000",
        "nombre_articulo": "Monitor LG 27 pulgadas"
        */      
        this.ItemsTable.push({ col1: String(row.id_codigo_articulo), col2: row.nombre_articulo , col3: row.descripcion , col4:'-' });                
      });                                     
      console.table(this.ItemsTable);      
    })        
  }


  ReloadArticles(){
    this.ArrayArticles = [];
    this.APIAdminPetition.getCodeArticle().subscribe(result =>{                
      //console.table(result);
      this.ArrayArticles = result;      
      console.table(this.ArrayArticles);
    })       
  }

  Clearinputs(){
    //limpieza
    this.idArticle = '';
    this.name = '';
    this.description = '';
    this.enableid = false;
  }

  onChangeIdArticle(data:string){
      this.idArticle = data;      
  }
  
  onChangeNameArticle(data:string){
    this.name = data;
  }

  onChangeDescrptionArticle(data:string){
    this.description = data;
  }

  onChangeActionTable(data: any){  
    //alert(data.id+"---"+data.action);    
     if(data.action === 'edit'){
      this.ActionEdit(data.id);          
     }
  }

  ActionEdit(id:string){
    this.butonAddUpdate = 'a';
    this.enableid = true;      
    this.dataArticleShow = this.ArrayArticles.find(element => element.id_codigo_articulo == id);      
    this.Clearinputs();
    //asignacion de las variables a mostrar
    this.idArticle = this.dataArticleShow.id_codigo_articulo;
    this.name = this.dataArticleShow.nombre_articulo;
    this.description =  this.dataArticleShow.descricpion;          
  }


  updated : string = '';
  inAct: number = 0;
  
  UpdateArticle(){

    if((this.name == '')|| (this.idArticle == '')||(this.description == '')) {                          
      //this._snackBar.open('Error faltan datos para actualizar', 'x');    
      this._snackBar.open('Error faltan datos', 'X', {      
        verticalPosition: this.verticalPosition,      
        panelClass: ['red-snackbar'],
      });
      
    }else{
  
      //llenar data a enviar
        const datasend : article = {                                
          nombre_articulo: this.name,
          descripcion: this.description,                                                                    
        };
  
        console.table(datasend);          
        this.updated = this.idArticle;
        this.APIAdminPetition.UpdatedArticle(datasend, this.idArticle).subscribe(response =>{                    
          this.response = response;   

          this.idArticle =this.updated ;        // se iguala porque se puedan
          this.name = datasend.nombre_articulo;
          this.description = datasend.descripcion;
          
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
  

            this.inAct = this.ItemsTable.findIndex( element => element.col1  == this.idArticle);                         
            if( this.inAct != -1){
              this.ItemsTable[this.inAct].col2 = this.name;
              this.ItemsTable[this.inAct].col3 = this.description;              
            }                                
            
            //actualizar 
            this.ReloadArticles();                    
            this.Clearinputs();
          }                  
        });              
        this.butonAddUpdate = '';  
      }
  }
  
  CreateArticle(){
    if((this.name == '')|| (this.idArticle == '')||(this.idArticle.length != 10 ) ||(this.description == '')) {                      
      //alert("error faltan datos");      
      //this._snackBar.open('Error faltan datos para actualizar', 'X');          
      this._snackBar.open('Error faltan datos', 'X', {        
        verticalPosition: this.verticalPosition,
        //panelClass: ['green-snackbar'],
        panelClass: ['red-snackbar'],
      });

    }else{

      //llenar data a enviar
        
        const datasend : article = {                                
          nombre_articulo: this.name,
          descripcion: this.description,                                                                    
        };
        

        //console.table(datasend);        
        this.APIAdminPetition.createCodeArticle(datasend).subscribe(response =>{                    
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
            this.ItemsTable.push({col1: String(datasend.id_codigo_articulo), col2:datasend.nombre_articulo , col3: datasend.descripcion, col4:'-' });            
            this.ReloadArticles();
            this.Clearinputs();
          }          
          //this.router.navigate(["admin/tournament/list"]);
        })        
    }    
  }
}
