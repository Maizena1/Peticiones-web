import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/Admin/services/admin.service';
import { FormBuilder, } from '@angular/forms';
import { MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { requeriment, User } from 'src/app/Admin/services/type';



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

  unit: any [] = [{
    id: 1, title: 'Metros'
  },{
    id: 2, title: 'Metros cuadrados'
  },{
    id: 3, title: 'Kilogramos'
  },{
    id: 4, title: 'Piezas'
  },];


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

  item:  [] = [];

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
    
    this.adminService.getArticleForProblemType(1).subscribe(article => {
      this.item = article;
    });
    
    console.log(this.dataidProblema);
    console.log(this.dataidTipo);
    
    
  }

  add(){
    this.arrayRequeriment.push({
      id_problema: 1,
      id_codigo_articulo: this.form.articleId,
      descripcion_requisito: this.form.description, 
      cantidad: parseInt(this.form.amount),
      unidad: this.form.unit,
      precio: parseInt(this.form.price)
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
