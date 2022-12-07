import { Component, OnInit } from '@angular/core';
import { request_table } from 'src/app/components/services/request-table';
import { AdminService } from '../../services/admin.service';
import { response, User, user_problem } from '../../services/type';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { DialogDetailComponent } from 'src/app/components/dialog-detail/dialog-detail.component';

@Component({
  selector: 'app-admin-User-by-problem-type-abc',
  templateUrl: './admin-User-by-problem-type-abc.component.html',
  styleUrls: ['./admin-User-by-problem-type-abc.component.css']
})
export class AdminUserByProblemTypeAbcComponent implements OnInit {

  problemType: [] = [];

  id: string = '';
  idTypeProblem: string = '';
  idUser: string ='';
  estatus: string = '';
  dataUserByTypeProblem: user_problem | any;
  

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

  idRol : number = 0;
  dataSesion:User|any;
  ngOnInit(): void {

    if (localStorage){    
      if(localStorage.getItem('dataSesion') !== undefined && localStorage.getItem('dataSesion')){        
        const UserJson = localStorage.getItem('dataSesion');
        this.dataSesion = UserJson !== null ? JSON.parse(UserJson) : console.log('Estoy devolviendo nulo');                                
        this.idRol = this.dataSesion.id_rol;        
        if(this.idRol != 1){          
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

    this.APIPetition.getUserByTypeProblem().subscribe(result =>{                
      this.arrayUser = result;
      //console.table(this.Arraybranches); 
      this.arrayUser.forEach((row) => {                   
        this.itemsTable.push({col1: String(row.id_usuario_problema), col2: String(row.tipo_problema) , col3:String(row.usuario), col4:'-' });                
      });                                     
      //console.table(this.itemsTable);      
    }) 

    this.APIPetition.getTypeProblems().subscribe(types => { 
      this.problemType = types;
    });  
  }

 //obtner sucursales actuales
 ReloadUserProblem( option: string){
  this.arrayUser = [];

  this.APIPetition.getUserByTypeProblem().subscribe(result =>{                
    //console.table(result);
    this.arrayUser= result;      
    //console.table(this.Arraybranches);    
    if(option == 'u'){ 
      this.inAct = this.itemsTable.findIndex( element => element.col1  == this.id);                
      const indexUserProblem =  this.arrayUser.findIndex( element => element.id_usuario_problema  == parseInt(this.id));                        
      if( this.inAct != -1){
        this.itemsTable[this.inAct].col2 = String(this.arrayUser[indexUserProblem].tipo_problema);
        this.itemsTable[this.inAct].col3 = String(this.arrayUser[indexUserProblem].usuario);                               
      }                            
    }
    
    if(option == 'c'){                        
      this.itemsTable.push({col1: String(this.arrayUser[this.arrayUser.length -1].id_usuario_problema), col2: String(this.arrayUser[this.arrayUser.length -1].tipo_problema) , col3: String(this.arrayUser[this.arrayUser.length -1].usuario), col4:'-' });                                        
    }     
    this.Clearinputs();      
  });
}


  Clearinputs(){
    //limpieza
    this.isChecked == true;
    this.enableid = false;  
    this.idTypeProblem = '';
    this.id = '';
    this.idUser = '';
    this.estatus ='';    
  }



  getId(item: any){
    return item.id_tipo_problema;
  }

  getLabel(item: any){
    return item.tipo_problema;
  }


  onChangeIdTypeProblem(data: any){
    this.idTypeProblem = data.toString();    
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
            this.ReloadUserProblem('u');
            this.Clearinputs();
          }                      
        }
    });
  }

  ActionEdit(id: string){
    this.butonAddUpdate = 'a';    
    this.dataUserByTypeProblem = this.arrayUser.find(element => 
      element.id_usuario_problema == parseInt(id)
    );    
    console.table(this.dataUserByTypeProblem);
    this.Clearinputs();
    //asignacion de las variables a mostrar                
    this.id = id;
    this.idTypeProblem = this.dataUserByTypeProblem.id_tipo_problema;
    this.idUser = String(this.dataUserByTypeProblem.id_usuario);      
    if(this.dataUserByTypeProblem.estatus == 'A'){      
      this.isChecked = true;
      this.estatus = 'A'
    }else{
      this.isChecked = false;
      this.estatus = 'B';
    }
  }

  ActionDetail(id: string){
      this.dataUserByTypeProblem = this.arrayUser.find(element => element.id_usuario_problema == parseInt(id));  

      if(this.dataUserByTypeProblem.estatus == 'A'){
        this.estatus = 'Activo';
      }else{
        this.estatus = 'Inactivo';
      }

    const dialogRef = this.dialog.open(DialogDetailComponent, {
    width: '300px',
    data: [{ title: 'ID:', data: id },
      {title: 'Tipo de Problema:', data: this.dataUserByTypeProblem.tipo_problema},    
      {title: 'Ususario Solver:', data: this.dataUserByTypeProblem.usuario},
      {title: 'Pertenece a:', data: this.dataUserByTypeProblem.nombre_empleado},
      {title: 'Estado:', data: this.estatus}
    ],      
    });  
  }

  UpdateUserProblem(){
    
    //obtener estatus
    if(this.isChecked == true){
      this.estatus = 'A';
    }else{
      this.estatus = 'B';
    }

    if((this.idTypeProblem == '')||(this.idUser == '') || this.estatus == ''){
                          
      //this._snackBar.open('Error faltan datos para actualizar', 'x');    
      this._snackBar.open('Error faltan datos', 'X', {      
        verticalPosition: this.verticalPosition,      
        panelClass: ['red-snackbar'],
      });
      
    }else{
      
      //llenar data a enviar
        const datasend : user_problem = {                                      
          id_tipo_problema: parseInt(this.idTypeProblem),        
          id_usuario: parseInt(this.idUser),
          estatus: this.estatus
        };      
        //console.log(this.id);
        //console.table(datasend);
        this.idupdate = this.id;      
        this.APIPetition.updatedUserByProblem(datasend, parseInt(this.idupdate)).subscribe(response =>{                    
          this.response = response;           
          this.id =this.idupdate ;        // se iguala porque se puedan usar
          this.idUser = String(datasend.id_usuario);
          this.idTypeProblem = datasend.id_tipo_problema.toString();
  
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
              //actualizar 
              this.ReloadUserProblem('u');                     
          }                  
        });            
        this.butonAddUpdate = '';  
      }
  }

  CreateUserProblem(){

    //obtener estatus
    if(this.isChecked == true){
      this.estatus = 'A';
    }else{
      this.estatus = 'B';
    }

    if((this.idTypeProblem == '')||(this.idUser == '') || this.estatus == ''){
                          
      //this._snackBar.open('Error faltan datos para actualizar', 'x');    
      this._snackBar.open('Error faltan datos', 'X', {      
        verticalPosition: this.verticalPosition,      
        panelClass: ['red-snackbar'],
      });
      
    }else{
      
      //llenar data a enviar
        const datasend : user_problem = {                                      
          id_tipo_problema: parseInt(this.idTypeProblem),        
          id_usuario: parseInt(this.idUser),
          estatus: this.estatus
        };      
        //console.log(this.id);
        //console.table(datasend);
        this.idupdate = this.id;      
        this.APIPetition.createUserByProblem(datasend).subscribe(response =>{                    
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
                //panelClass: ['red-snackbar'],
              });                          
              //actualizar 
              this.ReloadUserProblem('c');                     
          }                  
        });                    
      }    
  }

}
