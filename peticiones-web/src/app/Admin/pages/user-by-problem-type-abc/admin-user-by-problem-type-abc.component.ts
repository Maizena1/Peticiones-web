import { Component, OnInit } from '@angular/core';
import { request_table } from 'src/app/components/services/request-table';
import { AdminService } from '../../services/admin.service';
import { response, user_problem } from '../../services/type';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { DialogDetailComponent } from 'src/app/components/dialog-detail/dialog-detail.component';

@Component({
  selector: 'app-admin-user-by-problem-type-abc',
  templateUrl: './admin-user-by-problem-type-abc.component.html',
  styleUrls: ['./admin-user-by-problem-type-abc.component.css']
})
export class AdminUserByProblemTypeAbcComponent implements OnInit {

  problemType: any [] = [];

  idTypeProblem: number = 0;
  idUser: string ='';
  estatus: string = '';

  response: response | any; //subscripcion de respuesta
  isChecked = true;     //variable para el toggle    
  enableid : boolean = false; //para poner campo en modo lectura
  butonAddUpdate : string = ''; 

  verticalPosition: MatSnackBarVerticalPosition = 'top'; 

  inAct : number = 0;
  idupdate: any;

  arrayUser: user_problem [] = [];
  itemsTable : request_table [] = []; 

  namecolum: string[] = ['ID','Tipo Problema','Usuario','Botones'];

  constructor(public dialog: MatDialog ,private router: Router, private APIPetition: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {

    this.APIPetition.getUserByTypeProblem().subscribe(result =>{                
      this.arrayUser = result;
      //console.table(this.Arraybranches); 
      this.arrayUser.forEach((row) => {                   
        this.itemsTable.push({col1: String(row.id_usuario_problema), col2: String(row.tipo_problema) , col3:String(row.usuario), col4:'-' });                
      });                                     
      //console.table(this.ItemsTable);      
    }) 

    this.APIPetition.getTypeProblems().subscribe(types => { 
      this.problemType = types;
    });  
  }

 //obtner sucursales actuales
 ReloadUserProblem(){
  this.arrayUser = [];
  this.APIPetition.getBranches().subscribe(result =>{                
    //console.table(result);
    this.arrayUser= result;      
    //console.table(this.Arraybranches);
  })         
}


  Clearinputs(){
    //limpieza
    this.isChecked == true;
    this.enableid = false;  
    this.idTypeProblem = 0;
    this.idUser = '';
    this.estatus ='';    
  }



  getId(item: any){
    return item.id_tipo_problema;
  }

  getLabel(item: any){
    return item.tipo_problema;
  }


  onChangeIdTypeProblem(data: string){
    this.idTypeProblem = parseInt(data);
  }

  onChangeIdEmployee(data: string){
    this.idUser = data;
  }

  //metodo para la tabla delete,edit, detail
  onChangeActionTable(data: any){  
    //alert(data.id+"---"+data.action);
    if(data.action === 'delete'){
      this.ActionDelete(data.id);
    }else if(data.action === 'edit'){
      this.ActionEdit(data.id);
    }else if(data.action === 'detail'){
      this.ActionDetail(data.id);
    }  
  }

  ActionDelete(id: string){
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '420px',
      height: '200px',
      data: { name: 'Eliminar', subname: '¿Estas seguro que desea Deshabilitar?'},
    });
  
    dialogRef.afterClosed().subscribe(result => {
  
      if ( result == true){
            
          const inDesc = this.arrayUser.findIndex((element) => element.id_usuario_problema == parseInt(id));

                //agregar a la tabla                        
          if(this.arrayUser[inDesc].estatus == 'B'){
                this._snackBar.open('No se puede desactivar porque ya esta inactivo', 'X', {                
                  verticalPosition: this.verticalPosition,                
                  duration: 3000,
                  panelClass: ['red-snackbar'],
                });
          }else{
            this.APIPetition.deleteUserByPoblem(parseInt(id)).subscribe(response =>{                    
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
            });      
            this.ReloadUserProblem();
            this.Clearinputs();
          }                      
        }
    });
  }

  ActionEdit(id: string){

  }

  ActionDetail(id: string){

  }

  CreateUserProblem(){

  }

  UpdateUserProblem(){

  }

}
