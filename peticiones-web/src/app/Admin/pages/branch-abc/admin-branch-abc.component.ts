import { Component, OnInit } from '@angular/core';
import { branch, response } from '../../services/type';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';


/**/

@Component({
  selector: 'app-admin-branch-abc',
  templateUrl: './admin-branch-abc.component.html',
  styleUrls: ['./admin-branch-abc.component.css']
})

export class AdminBranchAbcComponent implements OnInit {
  /**/  
  //declaracion de variables para registrar sucursal  
  id_sucursal : number | any;
  nombre: String | null = null;  
  domicilio: String | null = null;  
  correo: String | null = null;  
  telefono: String| null = null;  
  estatus: String| null = null;  
  response: response | any;

  //declaracion de los datos a mostrar por si hay id
  Idbranch: String = "";
  namebranch: String ="";
  
  //, private snackBar: MatSnackBar

  constructor( private router: Router, private APIpeticion: AdminService) { }

  ngOnInit(): void {
  }

  //obtener el id de la sucursal
  onChangeIdBranch(data: String){

  }
  
  //obtener el nombre de la sucursal
  onChangeNameBranch(data: String){
    this.nombre = data;
    alert(this.nombre);
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
