import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/Admin/services/admin.service';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { DialogDetailComponent } from 'src/app/components/dialog-detail/dialog-detail.component';
import { User } from 'src/app/Admin/services/type';


@Component({
  selector: 'app-solver-requeriment',
  templateUrl: './solver-requeriment.component.html',
  styleUrls: ['./solver-requeriment.component.css']
})
export class SolverRequerimentComponent implements OnInit {

  problemArticle: any [] = [];
  verticalPosition: MatSnackBarVerticalPosition = 'top'; 
  constructor(public dialog: MatDialog ,private router: Router, private APIPetition: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,) { }

  idRol : number = 0;
  dataSesion: User|any;
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


    this.APIPetition.getArticlesProblems().subscribe(article => { 
      this.problemArticle = article;
    });

    
  }

}
