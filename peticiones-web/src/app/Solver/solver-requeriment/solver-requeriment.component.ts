import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/Admin/services/admin.service';
import { FormBuilder, } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { estatus_problem, requeriment, response, table_show, User } from 'src/app/Admin/services/type';
import { DialogDetailComponent } from 'src/app/components/dialog-detail/dialog-detail.component';



@Component({
  selector: 'app-solver-requeriment',
  templateUrl: './solver-requeriment.component.html',
  styleUrls: ['./solver-requeriment.component.css']
})
export class SolverRequerimentComponent implements OnInit {

  nameColumn: string[] = ['Material','Cantidad','Unidad', 'Precio','Botones','Descipcion'];  

  arrayRequeriment: requeriment [] = [];

  form = {
    articleId: '',
    description: '',
    amount: '',
    unit: '',
    price: ''
  }

  dataProblem : any;

  nameTypeProblem: string  = '';
  nameDescriptionProblem: string = '';
  namebranch:string = "";
  nameStoremanger: string = "";
  dateSolicitud:string = "";
  //variable para recargar el componente
  reload : boolean = false;

  response : response | any
;
  idProblem : number =0;
  unit: any [] = [{
    id: 1, title: 'Metros'
  },{
    id: 2, title: 'Metros cuadrados'
  },{
    id: 3, title: 'Kilogramos'
  },{
    id: 4, title: 'Piezas'
  },];


  articleTable: requeriment | any;
  dataArticleShow: requeriment | any;
  problemArticle: any [] = [];  


  dataidProblema: string | null;
  dataidTipo: string | null;  
  constructor(private routerAc: ActivatedRoute,public dialog: MatDialog ,private router: Router, private adminService: AdminService, private _formBuilder: FormBuilder,) {
    this.dataidProblema = this.routerAc.snapshot.paramMap.get('idproblema');
    this.dataidTipo = this.routerAc.snapshot.paramMap.get('idtipo');

    if(this.dataidProblema != null){    
      this.adminService.getProblem(parseInt(this.dataidProblema)).subscribe(result => {
        //console.table(result);    
        this.dataProblem = result[0];
        //console.table(this.dataProblem);    
        this.nameTypeProblem = result[0].tipo_problema;
        //console.log(this.nameTypeProblem);
        this.nameDescriptionProblem = result[0].descripcion_problema;
        this.namebranch = result[0].nombre_sucursal;
        this.nameStoremanger= result[0].nombre_empleado;
        this.dateSolicitud= result[0].fecha_solicitud;                
      })            
    }
    
  }

  idRol : number = 0;
  dataSesion: User|any;

  item: any [] = [];
  itemsTable: any [] = [];

  ngOnInit(): void {
     if (localStorage){    
       if(localStorage.getItem('dataSesion') !== undefined && localStorage.getItem('dataSesion')){        
         const userJson = localStorage.getItem('dataSesion');
         this.dataSesion = userJson !== null ? JSON.parse(userJson) : console.log('Estoy devolviendo nulo');                                
         this.idRol = this.dataSesion.id_rol;        
         if(this.idRol != 4){          
          this.adminService.SnackBarError('Error no tiene permisos o no inicio sesión', 'X');
           this.router.navigate(["login"]);              
         }
       }else{        
           //alert("DataSesion no existe en localStorage!!"); 
           this.router.navigate(["login"]);              
       }
     }        

    if(this.dataidTipo != null)
    this.adminService.getArticleForProblemType(parseInt(this.dataidTipo)).subscribe(article => {
      this.item = article;
      console.log(article);
    })                
  }
  
  getUnitId(item: any){
    return item.id.toString()
  }

  getUnitLabel(item: any){
    return item.title
  }
  

  getArticleId(item: any){
    return item.id_codigo_articulo
  }

  getArticleLabel(item: any){
    return item.nombre_articulo+'-#'+item.cantidad_disponible
  }

  
  unidad: string = '';
  
  clearInput(){    
    this.form.articleId= '0';
    this.form.description= '';
    this.form.amount= ' ';
    this.form.unit= '0';
    this.form.price= ' ';    
    this.reload = true;
  }

  add(){

    this.reload = false;

    if(this.form.unit == '1'){
      this.unidad = 'Metros';
    }else if(this.form.unit == '2'){
      this.unidad = 'Metros cuadrado';
    }else if(this.form.unit == '3'){
      this.unidad = 'Kilogramos';
    }else if(this.form.unit == '4'){
      this.unidad = 'Piezas'
    }
    
    
   

    if(this.form.articleId != '5000000000'){
      if(this.arrayRequeriment.find(element => element.id_codigo_articulo == this.form.articleId)){
      
        this.adminService.SnackBarError('Error articulo ya registrado.','X');
        
      }else{
  
        if(this.form.articleId == '0' || this.form.amount == '' || this.form.amount == '0' || this.form.price == '' ||this.form.price == '0'){
          this.adminService.SnackBarError('Error no hay datos para agregar.','X')          

        }else if(parseInt(this.form.amount) > 4000){
          this.adminService.SnackBarError('Error Limite maximo de 4000 en la cantidad.','X')          
        } else{
          if(this.dataidProblema != null){
            this.idProblem = parseInt(this.dataidProblema);
          }
          
          if(this.form.articleId != '5000000000'){
            this.adminService.getArticleForId(this.form.articleId).subscribe(result => {
              this.form.description = result[0].descripcion;                
  
              this.arrayRequeriment.push({      
                id_problema: this.idProblem,
                id_codigo_articulo: this.form.articleId,
                descripcion_requisito: this.form.description, 
                cantidad: parseInt(this.form.amount),
                unidad: this.unidad,
                precio: parseInt(this.form.price)                
              });            
              
              this.adminService.getArticleForId(this.form.articleId).subscribe(result => {
                let articleName = result[0].nombre_articulo;
                this.itemsTable.push({
                  col1: articleName, //nombre
                  col2: this.form.amount,
                  col3: this.unidad,
                  col4: this.form.price,
                  col5: this.form.articleId,
                  col6: this.form.description
                });
                this.clearInput();
              });                       
              this.adminService.SnackBarSuccessful('Articulo agregado.','X')
              //this.reloadTable();
            })          
          }                      
        }
      }
    }else{

      if(this.dataidProblema != null){
        this.idProblem = parseInt(this.dataidProblema);
      }            
        this.arrayRequeriment.push({      
          id_problema: this.idProblem,
          id_codigo_articulo: this.form.articleId,
          descripcion_requisito: this.form.description, 
          cantidad: parseInt(this.form.amount),
          unidad: this.unidad,
          precio: parseInt(this.form.price)
        });  

        this.adminService.getArticleForId(this.form.articleId).subscribe(result => {
          let articleName = result[0].nombre_articulo;
          this.itemsTable.push({
            col1: articleName, //nombre
            col2: this.form.amount,
            col3: this.unidad,
            col4: this.form.price,
            col5: this.form.articleId,
            col6: this.form.description
          });
          this.clearInput();
        });         
                        
        this.adminService.SnackBarSuccessful('Articulo agregado.','X')
        //this.reloadTable();          
                      
    }    
}
   
  onChangeActionTable(data: any){  
    if(data.action === 'detail'){
      this.ActionDatil(data.id,data.descripcion);
    }else if(data.action == 'delete'){      
      this.ActionRemoveRequeriment(data.id,data.descripcion );
    }
  }

  arrayAUX: any []= [];
  arrayAuxTable: any []=[];
  ActionRemoveRequeriment(id: string, descripcion:string){        
    this.reload = false;
    
    if(id == '5000000000'){
      //limpiar de arreglo
      this.arrayAUX = this.arrayRequeriment.filter(element =>  element.descripcion_requisito != descripcion );
      this.arrayRequeriment = [];
      this.arrayRequeriment = this.arrayAUX;
      this.arrayAUX= [];    
      
      //limpiar de tabla
      this.arrayAuxTable = this.itemsTable.filter(element => element.col6 != descripcion);
      this.itemsTable = [];          
      this.itemsTable = this.arrayAuxTable;
      this.arrayAuxTable = [];

      if(this.itemsTable.length > 0){
        this.reload = true;
      }

    }else{      
      this.arrayAUX =this.arrayRequeriment.filter(element => element.id_codigo_articulo != id );
      this.arrayRequeriment = [];
      this.arrayRequeriment = this.arrayAUX;
      this.arrayAUX= [];    

      //limpiar de tabla
      this.arrayAuxTable = this.itemsTable.filter(element => element.col5 != id );
      this.itemsTable = [];          
      this.itemsTable = this.arrayAuxTable;
      this.arrayAuxTable = [];

      if(this.itemsTable.length > 0){
        this.reload = true;
      }      
    }        
  }

  
  description: any;
  ActionDatil(id: string,descripcion:string){

    if(id == '5000000000'){
      this.dataArticleShow = this.arrayRequeriment.find(element => element.id_codigo_articulo == id && element.descripcion_requisito == descripcion);      
      const dialogRef = this.dialog.open(DialogDetailComponent, {
        width: '300px',
        data: [{title: 'ID:', data: id},
        {title: 'Descripcion:', data: this.dataArticleShow.descripcion_requisito},
        ]
    });
    }else{

      this.dataArticleShow = this.arrayRequeriment.find(element => element.id_codigo_articulo == id && element.descripcion_requisito == descripcion);      
      const dialogRef = this.dialog.open(DialogDetailComponent, {
        width: '300px',
        data: [{title: 'ID:', data: id},
        {title: 'Descripcion:', data: String(this.dataArticleShow.descripcion_requisito)},
        ]
      });     
    }        
  }



  bandOverflow : string ='n'
  ConfirRequest(){        
    if(this.arrayRequeriment.length > 0){
      
      this.bandOverflow = 'n'    
      this.item.forEach(element => {      
        this.arrayRequeriment.forEach(elementl => {                
          if(element.id_codigo_articulo != '5000000000' && elementl.id_codigo_articulo != '5000000000'){
            if(element.id_codigo_articulo == elementl.id_codigo_articulo){          
              if(elementl.cantidad > element.cantidad_disponible){
                this.adminService.SnackBarError('Error uno de los requisitos sobrepasa la cantidad en stock.','X')                    
                this.bandOverflow ='s'
              }
            }        
          }        
        });
      });
          
      if(this.bandOverflow =='n'){

        if(this.dataidProblema != null){

          const datasend : estatus_problem = {                              
            id_problema: parseInt(this.dataidProblema),                        
            estatus: 'REVISION',        
            requeriment: this.arrayRequeriment
          };                    
          //creacion de requisitos        
          this.adminService.createRequeriments(datasend).subscribe(response =>{           
            this.response = response;                                        
            if(this.response.Estatus == 'Error'){            
              this.adminService.SnackBarError(this.response.Mensaje, 'X');
            }else{
              this.adminService.SnackBarSuccessful(this.response.Mensaje, 'X' );              
              
              //Cambiar el estatus del problema a revison
              this.adminService.estatusProblem(datasend,datasend.id_problema).subscribe(response =>{           
                this.response = response;                                        
                if(this.response.Estatus == 'Error'){            
                  this.adminService.SnackBarError(this.response.Mensaje, 'X');
                }else{
                  this.adminService.SnackBarSuccessful(this.response.Mensaje, 'X');                                       
                  //regresa a las tablas de rutas
                  this.router.navigate(['solver/showRequested',]);        
                  //this.ReloadProblems();                                                                       
                }                  
              });                
            }                  
          });                   
        }      
      }
    }else{
      if(this.dataidProblema != null){
        const datasend : estatus_problem = {                              
          id_problema: parseInt(this.dataidProblema),                        
          estatus: 'REVISION',        
          requeriment: this.arrayRequeriment
        };                    
        //Cambiar el estatus del problema a revison
        this.adminService.estatusProblem(datasend,datasend.id_problema).subscribe(response =>{           
          this.response = response;                                        
          if(this.response.Estatus == 'Error'){            
            this.adminService.SnackBarError(this.response.Mensaje, 'X');
          }else{
            this.adminService.SnackBarSuccessful(this.response.Mensaje, 'X');
            
            //si los requisitos son vacios este poner en proceso directo           
              //this.arrayRequerimentProblem = [];
              const datasend : estatus_problem = {                      
                id_problema: this.dataProblem.id_problema,                
                id_sucursal: this.dataProblem.id_sucursal,
                estatus: 'PROCESO',        
                requeriment: this.arrayRequeriment
              };
              //console.log(datasend);
              this.adminService.estatusProblem(datasend,datasend.id_problema).subscribe(response =>{           
                this.response = response;                                        
                if(this.response.Estatus == 'Error'){            
                  this.adminService.SnackBarError(this.response.Mensaje, 'X');
                }else{
                  this.adminService.SnackBarSuccessful(this.response.Mensaje, 'X');                         
                  //regresa a las tablas de rutas
                  this.router.navigate(['solver/showRequested',]);     
                }                  
              });                                                                                                   
          }                  
        });                     
      }        
    }  
  }  
}
