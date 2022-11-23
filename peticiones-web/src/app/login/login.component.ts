import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { AdminService } from '../Admin/services/admin.service';
import { login, response, user } from '../Admin/services/type';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string = '';
  password: string = ''
  response: response | any;
  dataSesion: user | any;
  verticalPosition: MatSnackBarVerticalPosition = 'top'; 

  constructor(private router: Router, private APIAdminPetition: AdminService,private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {

  }  

  onChangeUser(user: string){
    //alert(user);
    this.usuario = user;
    //alert(this.usuario);
  }

  onChangePassword(pasword: string){
    //alert(pasword);
    this.password = pasword;
    //alert(this.password);
  }

  loginSystem(){
      if( this.usuario == '' || this.password == '' ){
        this._snackBar.open('Error falntan datos 1', 'X', {          
          verticalPosition: this.verticalPosition,            
          duration: 3000,
          panelClass: ['red-snackbar'],
        });          
      }else{
        
        const datasend : login = {                      
          usuario: this.usuario,
          password: this.password                                                                      
        };
        
        this.APIAdminPetition.createSesion(datasend).subscribe(response =>{                    
          this.response = response;          
          if(this.response.Estatus == 'Error'){            
            this._snackBar.open(this.response.Mensaje, 'X', {              
              verticalPosition: this.verticalPosition,
              duration: 3000,              
              panelClass: ['red-snackbar'],
            });
            localStorage.removeItem('dataSesion');
          }else{
            this._snackBar.open(this.response.Mensaje, 'X', {              
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['green-snackbar'],              
            });                        
            localStorage.removeItem('dataSesion');                        
            localStorage.setItem('dataSesion', JSON.stringify(this.response.usuario[0]));               
            //solo si ya se inicion sesion             
            //para obtener del local storage --------------------------------------------------                   
            const userJson = localStorage.getItem('dataSesion');
            this.dataSesion = userJson !== null ? JSON.parse(userJson) : console.log('Error Estoy Devolviendo nulo');            
            //console.log(this.dataSesion);            
            //console.log(this.dataSesion.id_rol);
            if(this.dataSesion.id_rol == 1){
              this.router.navigate(["admin/branchAbc"]);     
            }
            if(this.dataSesion.id_rol == 2){
              this.router.navigate(["admin/branchAbc"]);     
            }
            if(this.dataSesion.id_rol == 3){
              this.router.navigate(["admin/branchAbc"]);     
            }
            if(this.dataSesion.id_rol == 4){
              this.router.navigate(["admin/branchAbc"]);     
            }
            //localStorage.removeItem('dataSesion');
          }                    
        })        
        
        
        
                
      }
  }

}
