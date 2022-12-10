import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Admin/services/admin.service';
import { FormBuilder, } from '@angular/forms';
import { MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/Admin/services/type';



@Component({
  selector: 'app-solver-requeriment',
  templateUrl: './solver-requeriment.component.html',
  styleUrls: ['./solver-requeriment.component.css']
})
export class SolverRequerimentComponent implements OnInit {

  form = {
    articleId: '',
    description: '',
    amount: '',
    unit: '',
    price: ''
  }

  unit: any [] = [];


  problemArticle: any [] = [];
  verticalPosition: MatSnackBarVerticalPosition = 'top'; 
  constructor(public dialog: MatDialog ,private router: Router, private adminService: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,) { }

  idRol : number = 0;
  dataSesion: User|any;

  item: [] = [];

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

    this.unit.push({
      id: 1, titulo: 'pieza',
    });

    this.unit.push({
      id: 2, titulo: 'pieza',
    });

    this.unit.push({
      id: 3, titulo: 'pieza',
    });

    this.unit.push({
      id: 4, titulo: 'pieza',
    });

    this.adminService.getArticleForProblemType(4).subscribe(article => {
      this.item = article;
    })
    
  }

  getId(item: any){
    return item.unit.toString()
  }

  getLabel(item: any){
    return item.nombre_rol
  }


}
