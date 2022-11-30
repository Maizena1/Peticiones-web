import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { DialogDetailComponent } from 'src/app/components/dialog-detail/dialog-detail.component';
import { problem, user } from '../../services/type';


@Component({
  selector: 'app-manager-solver-assignment',
  templateUrl: './manager-solver-assignment.component.html',
  styleUrls: ['./manager-solver-assignment.component.css']
})
export class ManagerSolverAssignmentComponent implements OnInit {

  verticalPosition: MatSnackBarVerticalPosition = 'top'; 
  
  dateReceived: string | null;
  constructor(public dialog: MatDialog ,private router: Router, private routerAc: ActivatedRoute, private APIPetition: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,) { 
    this.dateReceived = this.routerAc.snapshot.paramMap.get('fecha');
  }

  idRol : number = 0;
  dataSesion:user|any;
  ngOnInit(): void {
    if (localStorage){    
      if(localStorage.getItem('dataSesion') !== undefined && localStorage.getItem('dataSesion')){        
        const userJson = localStorage.getItem('dataSesion');
        this.dataSesion = userJson !== null ? JSON.parse(userJson) : console.log('Estoy devolviendo nulo');                                
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

    //alert('Fecha Recivida desde Peticiones admin:'+ this.dateReceived );
    //this.router.navigate(['admin/showRequested']);        
  }

}
