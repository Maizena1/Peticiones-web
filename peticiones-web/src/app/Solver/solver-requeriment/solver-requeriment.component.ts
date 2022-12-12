import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/Admin/services/admin.service';
import { FormBuilder, } from '@angular/forms';
import { MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { requeriment, table_show, User } from 'src/app/Admin/services/type';
import { DialogDetailComponent } from 'src/app/components/dialog-detail/dialog-detail.component';
import { of } from 'rxjs';
import { ResourceLoader } from '@angular/compiler';



@Component({
  selector: 'app-solver-requeriment',
  templateUrl: './solver-requeriment.component.html',
  styleUrls: ['./solver-requeriment.component.css']
})
export class SolverRequerimentComponent implements OnInit {

  nameColumn: string[] = ['Material','Cantidad','Unidad', 'Precio','Botones'];  

  arrayRequeriment: requeriment [] = [];

  form = {
    articleId: '',
    description: '',
    amount: '',
    unit: '',
    price: ''
  }

  idProblem : number =0;

  unit: any [] = [{
    id: 1, title: 'Metros'
  },{
    id: 2, title: 'Metros cuadrados'
  },{
    id: 3, title: 'Kilogramos'
  },{
    id: 4, title: 'Piezas'
  },];


  articleTable: requeriment | any;
  dataArticleShow: requeriment | any;
  problemArticle: any [] = [];
  verticalPosition: MatSnackBarVerticalPosition = 'top'; 

  dataidProblema: string | null;
  dataidTipo: string | null;  
  constructor(private routerAc: ActivatedRoute,public dialog: MatDialog ,private router: Router, private adminService: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,) {
    this.dataidProblema = this.routerAc.snapshot.paramMap.get('idproblema');
    this.dataidTipo = this.routerAc.snapshot.paramMap.get('idtipo');
  }

  idRol : number = 0;
  dataSesion: User|any;

  item: any [] = [];
  itemsTable: table_show [] = [];

  ngOnInit(): void {
    // if (localStorage){    
    //   if(localStorage.getItem('dataSesion') !== undefined && localStorage.getItem('dataSesion')){        
    //     const userJson = localStorage.getItem('dataSesion');
    //     this.dataSesion = userJson !== null ? JSON.parse(userJson) : console.log('Estoy devolviendo nulo');                                
    //     this.idRol = this.dataSesion.id_rol;        
    //     if(this.idRol != 4){          
    //       this._snackBar.open('Error no tiene permisos o no inicio sesión', 'X', {      
    //         verticalPosition: this.verticalPosition,   
    //         duration: 3000,   
    //         panelClass: ['red-snackbar'],
    //       });
    //       this.router.navigate(["login"]);              
    //     }
    //   }else{        
    //       //alert("DataSesion no existe en localStorage!!"); 
    //       this.router.navigate(["login"]);              
    //   }
    // }        
    
    if(this.dataidProblema != null)
    this.adminService.getArticleForProblemType(parseInt(this.dataidProblema)).subscribe(article => {
      this.item = article;

      console.log(article);
    })
    
    
    
    
  }

  unidad: string = '';

  SnackBarError(mensaje: string, icon: string){
    this._snackBar.open(mensaje, icon, {
      verticalPosition: this.verticalPosition,
      panelClass: ['red-snackbar'],
      duration: 3000,
    });
  }

  SnackBarSuccessful(mensaje: string, icon: string){
    this._snackBar.open(mensaje, icon, {
      verticalPosition: this.verticalPosition,
      panelClass: ['green-snackbar'],
      duration: 1000,
    });
  }

  clearInput(){    
    this.form.articleId= '0';
    this.form.description= '';
    this.form.amount= ' ';
    this.form.unit= '0';
    this.form.price= ' ';    
  }

  add(){

    if(this.form.unit == '1'){
      this.unidad = 'Metros';
    }else if(this.form.unit == '2'){
      this.unidad = 'Metros cuadrado';
    }else if(this.form.unit == '3'){
      this.unidad = 'Kilogramos';
    }else if(this.form.unit == '4'){
      this.unidad = 'Piezas'
    }


    if(this.dataidProblema != null){
      this.idProblem = parseInt(this.dataidProblema);
    }

    this.arrayRequeriment.push({      
      id_problema: this.idProblem,
      id_codigo_articulo: this.form.articleId,
      descripcion_requisito: this.form.description, 
      cantidad: parseInt(this.form.amount),
      unidad: this.form.unit,
      precio: parseInt(this.form.price)
    });

    this.adminService.getArticleForId(this.form.articleId).subscribe(result => {
      let articleName = result[0].nombre_articulo;
      this.itemsTable.push({
        col1: articleName,
        col2: this.form.amount,
        col3: this.unidad,
        col4: this.form.price,
        col5: this.form.articleId
      })
    })

    this.clearInput();
    this.SnackBarSuccessful('Articulo agregado.','X')

//-----------------------------------------------------------------------------------------------------------

/*
    if(this.arrayRequeriment.find(element => this.form.articleId == element.id_codigo_articulo)){
      this.SnackBarError('Error. Este articulo ya ha sido agregado.','X')
    }else{
      this.arrayRequeriment.push({
        id_problema: 1,
        id_codigo_articulo: this.form.articleId,
        descripcion_requisito: this.form.description, 
        cantidad: parseInt(this.form.amount),
        unidad: this.form.unit,
        precio: parseInt(this.form.price)
      });

      if(this.form.unit == '1'){
        this.unidad = 'Metros';
      }else if(this.form.unit == '2'){
        this.unidad = 'Metros cuadrado';
      }else if(this.form.unit == '3'){
        this.unidad = 'Kilogramos';
      }else if(this.form.unit == '4'){
        this.unidad = 'Piezas'
      }

      
      this.adminService.getArticleForId(this.form.articleId).subscribe(result => {
        let articleName = result[0].nombre_articulo;
        this.itemsTable.push({
          col1: articleName,
          col2: this.form.amount,
          col3: this.unidad,
          col4: this.form.price,
          col5: this.form.articleId
        })
      })

      console.log(this.arrayRequeriment)
      this.SnackBarSuccessful('Articulo agregado.','X')
    }

  */
    
  }

  
  updateTable: any;
  removeArticle(data: any){
    if(data.action === 'delete'){

      this.updateTable = this.itemsTable.filter(element => element.col5 !== String(data.id))
      this.itemsTable = [];
      this.itemsTable = this.updateTable;
      this.arrayRequeriment = this.updateTable;
      
    }


  }

  onChangeActionTable(data: any){  
    if(data.action === 'detail'){
      this.ActionDatil(data.id);
    }else if(data.action == 'delete'){
      this.ActionRemoveRequeriment(data.id);
    }
  }

  ActionRemoveRequeriment(id: string){

  }

  description: any;
  ActionDatil(id: string){

    if(id == '5000000000'){
      this.dataArticleShow = this.arrayRequeriment.find(element => element.id_codigo_articulo == id);
      console.log(this.dataArticleShow)
    }else{
      this.adminService.getArticleForId(id).subscribe(result => {
        console.log(this.description = result[0])
      })  
    }


    const dialogRef = this.dialog.open(DialogDetailComponent, {
        width: '300px',
        data: [{title: 'ID:', data: id},
        {title: 'Descripcion:', data: this.description},
        ]
      })
    
    
  }

  getUnitId(item: any){
    return item.id.toString()
  }

  getUnitLabel(item: any){
    return item.title
  }
  

  getArticleId(item: any){
    return item.id_codigo_articulo
  }

  getArticleLabel(item: any){
    return item.nombre_articulo
  }


}
