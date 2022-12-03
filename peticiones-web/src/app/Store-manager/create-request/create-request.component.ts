import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/Admin/services/admin.service';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { User } from 'src/app/Admin/services/type';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {

  form = {
    problemType: '',
    descriptionProblem: ''
  }

  descriptionProblem: string = '';

  problemTypes: [] = [];
  verticalPosition: MatSnackBarVerticalPosition = 'top'; 
  constructor(public dialog: MatDialog ,private router: Router, private APIPetition: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,) { }
  
  idRol : number = 0;
  dataSesion:User|any;
  ngOnInit(): void {
    if (localStorage){    
      if(localStorage.getItem('dataSesion') !== undefined && localStorage.getItem('dataSesion')){        
        const UserJson = localStorage.getItem('dataSesion');
        this.dataSesion = UserJson !== null ? JSON.parse(UserJson) : console.log('Estoy devolviendo nulo');                                
        this.idRol = this.dataSesion.id_rol;        
        if(this.idRol != 2){          
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

    this.APIPetition.getTypeProblems().subscribe(types => { 
      this.problemTypes = types;
    });
    
  }

  getId(item: any){
    return item.id_tipo_problema;
  }

  getLabel(item: any){
    return item.tipo_problema;
  }

  getProblemType(type: any){
    this.form.problemType = type;
  }

}
