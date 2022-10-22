import { Component, OnInit } from '@angular/core';
import { branch, response } from '../../services/type';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Item } from '../../services/type';
import {FormBuilder, Validators} from '@angular/forms';

/**/

@Component({
  selector: 'app-admin-branch-abc',
  templateUrl: './admin-branch-abc.component.html',
  styleUrls: ['./admin-branch-abc.component.css']
})

export class AdminBranchAbcComponent implements OnInit {
  /**/  
  //declaracion de variables para registrar sucursal  
  id_sucursal : number = 0;
  nombre: String | null = null;  
  domicilio: String | null = null;  
  correo: String | null = null;  
  telefono: String| null = null;  
  estatus: String| null = null;  
  response: response | any;

  //declaracion de los datos a mostrar por si hay id
  Idbranch: String = "";
  namebranch: String ="";
  domiciliobranch: String = "";
  emailbranch: String = "";
  phone_number: String=""
  
  //prueba del select
  itemsArray: Item[] = [
    {_id: "55000", name: 'Opcion 1'},
    {_id: "22", name: 'Opcion 2'},
    {_id: "13", name: 'Opcion 3'},
    {_id: "44", name: 'Opcion 4'},
  ];
  
  ItemSend: String = "";  

  constructor( private router: Router, private APIpeticion: AdminService, private _formBuilder: FormBuilder) { }



  //Prueba del select 
  //obtener categoria
  onChangeid(data: String){    
    alert(data);
  }


  //------------------------------------------------
  ngOnInit(): void {
  }

  //obtener el id de la sucursal
  onChangeIdBranch(idsucursal: number){
    //alert(idsucursal);
  }
  
  //obtener el nombre de la sucursal
  onChangeNameBranch(data: String){
    this.nombre = data;
    //alert(this.nombre);
  }

//obtener domicilio
  onChangeDirectionBranch(data:String){
    this.domicilio = data;
  }

  //obtener el correo
  onChangeEmailBranch(data: String){
    this.correo = data;    
  }

  onChangePhoneNumberBranch(data: String){
    this.telefono = data;
    alert(this.telefono);
  }

  isChecked = true;
  formGroup = this._formBuilder.group({
    status: '',
    acceptTerms: ['', Validators.requiredTrue],
  });

  onFormSubmit() {
    alert(JSON.stringify(this.formGroup.value, null, 2));
  }

  CreateBranch() {
                            
    if((this.nombre == null)|| (this.domicilio == null)||(this.correo == null)||(this.telefono == null)||(this.estatus == null)) {
                      
      alert("error faltan datos");

    }else{

            
      //llenar data a enviar
        const datasend : branch = {              
          id_sucursal: this.id_sucursal,
          nombre_sucursal: this.nombre,
          domicilio: this.domicilio,
          correo: this.correo,
          telefono: this.telefono,
          estatus: this.estatus,                                                            
        };
       
        
        console.table(datasend);
        /*
        this.APIpeticion.createBranch(datasend).subscribe(response =>{
          
          console.table(response);
                              
          //Crear la tupla y regresar al chrisyian
          //this.router.navigate(["admin/tournament/list"]);
        })
        */        
      }
   }

   
   


}
