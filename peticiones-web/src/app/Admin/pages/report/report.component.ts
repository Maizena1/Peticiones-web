import { Component, OnInit } from '@angular/core';
import { User } from '../../services/type';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  verticalPosition: MatSnackBarVerticalPosition = 'top'; 
  idRol : number = 0;
  dataSesion: User|any;  

  constructor(private _snackBar: MatSnackBar,private router: Router,) { }  



  ngOnInit(): void {
    if (localStorage){    
      if(localStorage.getItem('dataSesion') !== undefined && localStorage.getItem('dataSesion')){        
        const userJson = localStorage.getItem('dataSesion');
        this.dataSesion = userJson !== null ? JSON.parse(userJson) : console.log('Estoy devolviendo nulo');                                
        this.idRol = this.dataSesion.id_rol;        
        if(this.idRol != 1){          
          this._snackBar.open('Error no tiene permisos o no inicio sesión', 'X', {      
            verticalPosition: this.verticalPosition,   
            duration: 1000,   
            panelClass: ['red-snackbar'],
          });
          this.router.navigate(["login"]);              
        }
      }else{        
          //alert("DataSesion no existe en localStorage!!"); 
          this.router.navigate(["login"]);              
      }
    }        
  }    
}
