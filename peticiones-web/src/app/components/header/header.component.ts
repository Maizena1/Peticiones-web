import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/Admin/services/admin.service';
import { login, response, user } from 'src/app/Admin/services/type';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  dataSesion:user|any;
  response: response | any;
  constructor(private router: Router, private APIAdminPetition: AdminService,) { }

  ngOnInit(): void {
  }

  logout(){
    
    if (localStorage){    
      if(localStorage.getItem('dataSesion') !== undefined && localStorage.getItem('dataSesion')){        
        //alert("DataSesion si existe en localStorage!!");                      
            this.dataSesion = localStorage.getItem('dataSesion');
            const datasend : login = {                      
                usuario: this.dataSesion.usuario,
                password: this.dataSesion.password                                                                      
                //usuario: 'SauloAdmin',
                //password: 'Saulo@123' 
            };    
            this.APIAdminPetition.deleteSesion(datasend).subscribe(response =>{                          
              this.response = response;          
              if(this.response.Estatus == 'Ok'){                                       
                alert('Logout Con Exito');
                localStorage.removeItem('dataSesion');  
                this.router.navigate(["login"]);      
              }            
            });
      }else{        

        this.dataSesion = localStorage.getItem('dataSesion');
            const datasend : login = {                      
                //usuario: this.dataSesion.usuario,
                //password: this.dataSesion.password                                                                      
                usuario: 'SauloAdmin',
                password: 'Saulo@123' 
            };    
            this.APIAdminPetition.deleteSesion(datasend).subscribe(response =>{                          
              this.response = response;          
              if(this.response.Estatus == 'Ok'){                                       
                alert('Logout Con Exito');
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
