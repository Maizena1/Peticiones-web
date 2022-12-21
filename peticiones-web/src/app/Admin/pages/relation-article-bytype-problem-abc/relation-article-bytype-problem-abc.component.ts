import { Component, OnInit} from '@angular/core';
import { response, Item, articlebytypeproblem, User } from '../../services/type';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { FormBuilder} from '@angular/forms';
import { request_table } from 'src/app/components/services/request-table';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-relation-article-bytype-problem-abc',
  templateUrl: './relation-article-bytype-problem-abc.component.html',
  styleUrls: ['./relation-article-bytype-problem-abc.component.css']
})
export class RelationArticleBytypeProblemAbcComponent implements OnInit {

    id:string = '';
    idArticle: string = '';    
    idTypeProblem: string = '';

    //arreglo donde de almacenara todos los empleados
    ArrayArticleProblem: articlebytypeproblem[]=[];
    //arreglo donde se almacenara solo los datos de la tabla de la tabla 
    ItemsTable : request_table[]=[];     
    
    itemsArticles: any [] = [];    
    problemType: any [] = [];

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
   dataSesion:User|any;
  ngOnInit(): void {
    if (localStorage){    
      if(localStorage.getItem('dataSesion') !== undefined && localStorage.getItem('dataSesion')){        
        const userJson = localStorage.getItem('dataSesion');
        this.dataSesion = userJson !== null ? JSON.parse(userJson) : console.log('Estoy devolviendo nulo');                                
        this.idRol = this.dataSesion.id_rol;        
        if(this.idRol != 1){       
          this.APIAdminPetition.SnackBarError('Error no tiene permisos o no inicio sesión', 'X'); 
          this.router.navigate(["login"]);              
        }
      }else{        
          //alert("DataSesion no existe en localStorage!!"); 
          this.router.navigate(["login"]);              
      }
    }        


   this.ReloadArticleProblems();
    
    //obtener las Tipos de problema      
    this.APIAdminPetition.getTypeProblemsAct().subscribe(types => { 
      this.problemType = types;
    }); 
    
    //obtener los articulos 
    this.APIAdminPetition.getArticle().subscribe(result =>{                      
      this.itemsArticles = result      
    })        
  }


  ReloadArticleProblems(){
    this.ArrayArticleProblem = [];
    this.ItemsTable = [];
    this.APIAdminPetition.getArticlesProblems().subscribe(result =>{                      
      this.ArrayArticleProblem = result;      
      //console.table(this.Arraybranches);
     if(this.ArrayArticleProblem.length>0){
      this.ArrayArticleProblem.forEach((row) => {                           
        if(row.id_codigo_articulo != '5000000000'){
          this.ItemsTable.push({col1: String(row.id_articulo_problema), col2: String(row.nombre_articulo) , col3: String(row.tipo_problema), col4:'-' });                                    
        }        
      });                               
     }           
    })       
  }

  Clearinputs(){
    //limpieza    
    this.enableid = false;      
    this.idArticle = '0';
    this.idTypeProblem = '0';
  }

  getIdTypeProblem(item: any){
    return item.id_tipo_problema;
  }

  getLabelTypeProblem(item: any){
    return item.tipo_problema;
  }

  getIdArticles(item: any){
    return item.id_codigo_articulo;
  }

  getLabelArticles(item: any){
    return item.nombre_articulo;
  }
  
  onChangeActionTable(data: {id:string, action:string}){
    //alert(data.id+"---"+data.action);    
   if(data.action === 'edit'){
     this.ActionEdit(data.id);
   }
 }

 ActionEdit(id:string){

  this.butonAddUpdate = 'a';    
  this.DataArticlePoblemShow = this.ArrayArticleProblem.find(element => element.id_articulo_problema == parseInt(id));    
  console.log(this.DataArticlePoblemShow);
  this.Clearinputs();
  
  this.id = id;
  this.idTypeProblem = this.DataArticlePoblemShow.id_tipo_problema;
   this.idArticle = String(this.DataArticlePoblemShow.id_codigo_articulo);  
}

UpdateRelation(){
  if((this.idTypeProblem == '')|| (this.idArticle == '')) {
    this.APIAdminPetition.SnackBarError('Error, faltan datos', 'X');
  }else{
    
    //llenar data a enviar
      const datasend : articlebytypeproblem = {                            
        id_codigo_articulo: String(this.idArticle),
        id_tipo_problema: parseInt(this.idTypeProblem),        
      };      
      //console.log(this.id);
      //console.table(datasend);
      this.idupdate = this.id;      
      this.APIAdminPetition.UpdatedArticleProblem(datasend, parseInt(this.idupdate)).subscribe(response =>{                    
        this.response = response;           
        this.id =this.idupdate ;        // se iguala porque se puedan usar
        this.idArticle = datasend.id_codigo_articulo;
        this.idTypeProblem = datasend.id_tipo_problema.toString();

        if(this.response.Estatus == 'Error'){ 
          this.APIAdminPetition.SnackBarError(this.response.Mensaje, 'X');     
                   
        }else{
          this.APIAdminPetition.SnackBarSuccessful(this.response.Mensaje, 'X');
          this.Clearinputs();
          this.ReloadArticleProblems();               
          }                  
      });            
      this.butonAddUpdate = '';
    }
}

CreateRelation(){
  if((this.idTypeProblem == '')||(this.idArticle == '')) {
    this.APIAdminPetition.SnackBarError('Error, faltan datos', 'X');              
  }else if( String(this.idArticle).length !=10 ){
    this.APIAdminPetition.SnackBarError('Error, mínimo 10 dígitos en el artículo.','X')
  }else{
    //llenar data a enviar
      const datasend : articlebytypeproblem = {                            
        id_codigo_articulo: String(this.idArticle),
        id_tipo_problema: parseInt(this.idTypeProblem),        
      };      
      //console.log(this.id);
      //console.table(datasend);
      this.idupdate = this.id;      
      this.APIAdminPetition.createArticleProblem(datasend).subscribe(response =>{                    
        this.response = response;                           
        this.idArticle = datasend.id_codigo_articulo;
        this.idTypeProblem = datasend.id_tipo_problema.toString();

        if(this.response.Estatus == 'Error'){            
          this.APIAdminPetition.SnackBarError(this.response.Mensaje, 'X');  
               
        }else{
          this.APIAdminPetition.SnackBarSuccessful(this.response.Mensaje, 'X');      
          
          //actualizar 
          this.ReloadArticleProblems();               
          this.Clearinputs();
        }                  
      });            
      
    }

}

}
