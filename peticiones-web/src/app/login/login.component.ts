import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { AdminService } from '../Admin/services/admin.service';
import { login } from '../Admin/services/type';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string = '';
  password: string = ''

  verticalPosition: MatSnackBarVerticalPosition = 'top'; 

  constructor(private router: Router, private APIAdminPetition: AdminService,private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {

  }  

  onChangeUser(user: string){
    alert(user);
    this.usuario = user;
  }

  onChangePassword(pasword: string){
    alert(pasword);
    this.password = pasword;
  }

  loginSystem(){
      if( this.usuario == '' || this.password == '' ){
        this._snackBar.open('Error falntan datos', 'X', {          
          verticalPosition: this.verticalPosition,            
          duration: 3000,
          panelClass: ['red-snackbar'],
        });          
      }else{
        
        const datasend : login = {                      
          usuario: this.usuario,
          password: this.password                                                                      
        };

        
        /*
        this._snackBar.open(this.response.Mensaje, 'X', {            
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar'],
          //panelClass: ['red-snackbar'],
        });          
        */
        //solo si ya se inicion sesion 
        this.router.navigate(["admin/branchAbc"]);              
                
      }
  }

}
