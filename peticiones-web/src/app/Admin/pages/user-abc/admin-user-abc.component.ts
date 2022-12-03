import { Component, OnInit } from '@angular/core';
import { Item } from '../../services/type';
import { User, response } from '../../services/type';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, Validators} from '@angular/forms';
import { request_table } from 'src/app/components/services/request-table';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-admin-user-abc',
  templateUrl: './admin-user-abc.component.html',
  styleUrls: ['./admin-user-abc.component.css']
})
export class AdminUserAbcComponent implements OnInit {
  
  COLUMN_NAMES: string[] = ['ID','Usuario','Estatus','Botones'];

  formAction: "create" | "edit" = "create";

  form = {
    user: '',
    password: '',
    employeeId: '',
    roleId: 0,
    status: true
  }

  users: User [] = [];
  itemsTable : User[] = []; 
  roleSelect: Item[] = [];

  constructor(
    public dialog: MatDialog ,
    private APIpeticion: AdminService ){}
  

  ngOnInit(): void {

    this.APIpeticion.getUsers().subscribe(result =>{   
      this.users = result;

      // this.users.forEach((row) => { 
      //   this.itemsTable.push({
      //     col1: row.id?.toString() ?? '', 
      //     col2: row.userName, 
      //     col3: row.status,
      //     col4:'-' });
      // });                                      
    }) 

    this.APIpeticion.getRol().subscribe(result => {
      this.roleSelect = result.map((rol: any) =>{
        return {
          _id: rol.id_rol,
          option: rol.nombre_rol
        }
      });
    })

  }
  
  onClickAction(data: any){ 
    console.log(data, 'asdasd') 
    if(data.action === 'delete'){
      this.ActionDelete(data.id);
    }
    else if(data.action === 'edit'){
      this.ActionEdit(data.id);
      this.formAction = "edit";

      const selectedUser = this.users.find((user) => user.id === data.id)
      if(!selectedUser){
        return
      }
      
      const {userName, password, employeeId, roleId, status} = selectedUser
      
      this.form = {
        user: userName,
        password,
        employeeId: employeeId.toString(),
        roleId,
        status


      }


    }
    else if(data.action === 'detail'){
      this.ActionDatil(data.id);
    }  
  }
  ActionDelete(id: string){

  }

  ActionEdit(id: string){
    
  }

  ActionDatil(id: string){

  }

  createUser(){
  
  }
  
  changeRole(role: string){
    this.form.roleId = parseInt(role);
  }
  
}
