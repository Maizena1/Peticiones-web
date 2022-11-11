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

  //arreglo donde de almacenara todas las sucursales
  ArrayArticles: article[]=[];

  //arreglo donde se almacenara solo los datos de la tabla de la tabla 
  ItemsTable : request_table[]=[]; 

  //nombres de columnas de tabla
  nameColumn: string[] = ['ID','Nombre','','Botones'];

  constructor(public dialog: MatDialog ,private router: Router, private APIAdminPetition: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
  }


  onChangeIdArticle(data:string){

  }
  
  onChangeNameArticle(data:string){

  }

  onChangeDescrptionArticle(data:string){

  }

  onChangeActionTable(data: any){  
    //alert(data.id+"---"+data.action);
    if(data.action === 'delete'){
   //   this.ActionDelete(data.id);
    }else if(data.action === 'edit'){
      //this.ActionEdit(data.id);
    }else if(data.action === 'detail'){
      //this.ActionDatil(data.id);
    }  
  }

  
  UpdateArticle(){}
  
  CreateArticle(){}


}
