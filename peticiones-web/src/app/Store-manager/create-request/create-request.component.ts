import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/Admin/services/admin.service';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { add_problem, response, User } from 'src/app/Admin/services/type';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {


  problemType: number = 0;
  descriptionProblem: string = '';  

  problemTypes: any [] = [];
  verticalPosition: MatSnackBarVerticalPosition = 'top'; 

  idRol : number = 0;
  dataSesion: User|any;

  response: response | any;

  constructor(public dialog: MatDialog ,private router: Router, private APIPetition: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,) {}
  
  
  ngOnInit(): void {
    if (localStorage){    
      if(localStorage.getItem('dataSesion') !== undefined && localStorage.getItem('dataSesion')){        
        const UserJson = localStorage.getItem('dataSesion');
        this.dataSesion = UserJson !== null ? JSON.parse(UserJson) : null;                                
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

  getProblemType(id: any){
    this.problemType = parseInt(id);
  }

  getDescriptionProblem(desc : string){
    this.descriptionProblem = desc;
  }

  
  createPetition(){

    if(this.problemType == 0 || this.descriptionProblem == '' ||  this.dataSesion == null ){      
      this._snackBar.open('Error faltan datos', 'X', {      
        verticalPosition: this.verticalPosition,  
        duration: 3000,    
        panelClass: ['red-snackbar'],
      });
    }else{
      const datasend : add_problem = {                            
        id_tipo_problema : this.problemType,
        descripcion_problema: this.descriptionProblem, 
        id_usuario: parseInt(this.dataSesion.id_usuario),
        estatus:'ESPERA'             
      };

      this.APIPetition.addProblem(datasend).subscribe(response =>{                
        this.response = response;          
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
          });          
        }          
        this.router.navigate(["storeManager/requestedRequestModule"]);
      });     


    }      
  }

  
  

}
