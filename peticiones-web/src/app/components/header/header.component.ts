import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/Admin/services/admin.service';
import { login, response, User } from 'src/app/Admin/services/type';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nameEmlployee: string = 'No reconocido';

  dataSesion:User|any;
  idRol : number = 0;
  response: response | any;
  constructor(private router: Router, private APIAdminPetition: AdminService,) { }
  ngOnInit(): void {
    if (localStorage){    
      if(localStorage.getItem('dataSesion') !== undefined && localStorage.getItem('dataSesion')){        
        const userJson = localStorage.getItem('dataSesion');
        this.dataSesion = userJson !== null ? JSON.parse(userJson) : console.log('Estoy devolviendo nulo');                                        
        this.idRol = this.dataSesion.id_rol;     
        
        

          this.APIAdminPetition.getUser(this.dataSesion.id_usuario).subscribe(result =>{                          
            this.nameEmlployee = result[0].nombre_empleado;            
          });
        
      }else{        
          //alert("DataSesion no existe en localStorage!!"); 
          this.router.navigate(["login"]);              
      }
    }        
  }

  logout(){
    if (localStorage){    
      if(localStorage.getItem('dataSesion') !== undefined && localStorage.getItem('dataSesion')){        
        
        //alert("DataSesion si existe en localStorage!!");                                  
            const userJson = localStorage.getItem('dataSesion');
            this.dataSesion = userJson !== null ? JSON.parse(userJson) : console.log('Estoy devolviendo nulo');                        
            const datasend : login = {                      
                usuario: this.dataSesion.usuario,
                password: this.dataSesion.password                                                                      
                //usuario: 'SauloAdmin',
                //password: 'Saulo@123'                                                                      
            };    
            this.APIAdminPetition.deleteSesion(datasend).subscribe(response =>{                          
              this.response = response;          
              if(this.response.Estatus == 'Ok'){                                       
                //alert('Logout Con Exito');
                localStorage.removeItem('dataSesion');  
                this.router.navigate(["login"]);      
              }            
            });

      }else{       
        const datasend : login = {                      
          usuario: 'LuisAdmin',
          password: 'Luis@123'                                                                 
          //usuario: 'SauloAdmin',
          //password: 'Saulo@123'                                                                      
      };    
      this.APIAdminPetition.deleteSesion(datasend).subscribe(response =>{                          
        this.response = response;          
        if(this.response.Estatus == 'Ok'){                       
          localStorage.removeItem('dataSesion');  
          this.router.navigate(["login"]);      
        }            
      }); 
          //alert("DataSesion no existe en localStorage!!"); 
          this.router.navigate(["login"]);              
      }
    }

  }
  
}
