import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/Admin/services/admin.service';
import { FormBuilder, } from '@angular/forms';
import { MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { estatus_problem, requeriment, response, table_show, User } from 'src/app/Admin/services/type';
import { DialogDetailComponent } from 'src/app/components/dialog-detail/dialog-detail.component';



@Component({
  selector: 'app-solver-requeriment',
  templateUrl: './solver-requeriment.component.html',
  styleUrls: ['./solver-requeriment.component.css']
})
export class SolverRequerimentComponent implements OnInit {

  nameColumn: string[] = ['Material','Cantidad','Unidad', 'Precio','Botones'];  

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
  verticalPosition: MatSnackBarVerticalPosition = 'top'; 


  dataidProblema: string | null;
  dataidTipo: string | null;  
  constructor(private routerAc: ActivatedRoute,public dialog: MatDialog ,private router: Router, private adminService: AdminService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,) {
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
  itemsTable: table_show [] = [];

  ngOnInit(): void {
     if (localStorage){    
       if(localStorage.getItem('dataSesion') !== undefined && localStorage.getItem('dataSesion')){        
         const userJson = localStorage.getItem('dataSesion');
         this.dataSesion = userJson !== null ? JSON.parse(userJson) : console.log('Estoy devolviendo nulo');                                
         this.idRol = this.dataSesion.id_rol;        
         if(this.idRol != 4){          
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

    if(this.dataidTipo != null)
    this.adminService.getArticleForProblemType(parseInt(this.dataidTipo)).subscribe(article => {
      this.item = article;
      //console.log(article);
    })
                
  }
  
  unidad: string = '';
  SnackBarError(mensaje: string, icon: string){
    this._snackBar.open(mensaje, icon, {
      verticalPosition: this.verticalPosition,
      panelClass: ['red-snackbar'],
      duration: 3000,
    });
  }

  SnackBarSuccessful(mensaje: string, icon: string){
    this._snackBar.open(mensaje, icon, {
      verticalPosition: this.verticalPosition,
      panelClass: ['green-snackbar'],
      duration: 1000,
    });
  }

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
      
        this.SnackBarError('Error articulo ya registrado.','X') ;
      }else{
  
        if(this.form.articleId == '0' || this.form.amount == '' || this.form.amount == '0' || this.form.price == '' ||this.form.price == '0'){
          this.SnackBarError('Error no hay datos para agregar.','X')          
        }else{
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
                unidad: this.form.unit,
                precio: parseInt(this.form.price)                
              });            
              
              this.adminService.getArticleForId(this.form.articleId).subscribe(result => {
                let articleName = result[0].nombre_articulo;
                this.itemsTable.push({
                  col1: articleName, //nombre
                  col2: this.form.amount,
                  col3: this.unidad,
                  col4: this.form.price,
                  col5: this.form.articleId
                });
                this.clearInput();
              });                       
              this.SnackBarSuccessful('Articulo agregado.','X')
              //this.reloadTable();
            })          
          }else{
  
            this.arrayRequeriment.push({      
              id_problema: this.idProblem,
              id_codigo_articulo: this.form.articleId,
              descripcion_requisito: this.form.description, 
              cantidad: parseInt(this.form.amount),
              unidad: this.form.unit,
              precio: parseInt(this.form.price)
            });  
            
            this.adminService.getArticleForId(this.form.articleId).subscribe(result => {
              let articleName = result[0].nombre_articulo;
              this.itemsTable.push({
                col1: articleName, //nombre
                col2: this.form.amount,
                col3: this.unidad,
                col4: this.form.price,
                col5: this.form.articleId
              });
              this.clearInput();
            });                     
            this.SnackBarSuccessful('Articulo agregado.','X')
            //this.reloadTable();          
          }
                      
        }
      }
    }else{

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
            unidad: this.form.unit,
            precio: parseInt(this.form.price)
          });            
          

          this.adminService.getArticleForId(this.form.articleId).subscribe(result => {
            let articleName = result[0].nombre_articulo;
            this.itemsTable.push({
              col1: articleName, //nombre
              col2: this.form.amount,
              col3: this.unidad,
              col4: this.form.price,
              col5: this.form.articleId
            });
            this.clearInput();
          });         
          
          this.SnackBarSuccessful('Articulo agregado.','X')
          //this.reloadTable();
        })          
      }else{

        this.arrayRequeriment.push({      
          id_problema: this.idProblem,
          id_codigo_articulo: this.form.articleId,
          descripcion_requisito: this.form.description, 
          cantidad: parseInt(this.form.amount),
          unidad: this.form.unit,
          precio: parseInt(this.form.price)
        });  

        this.adminService.getArticleForId(this.form.articleId).subscribe(result => {
          let articleName = result[0].nombre_articulo;
          this.itemsTable.push({
            col1: articleName, //nombre
            col2: this.form.amount,
            col3: this.unidad,
            col4: this.form.price,
            col5: this.form.articleId
          });
          this.clearInput();
        });         
                        
        this.SnackBarSuccessful('Articulo agregado.','X')
        //this.reloadTable();          
      }                  
    }
    
}
   
  onChangeActionTable(data: any){  
    if(data.action === 'detail'){
      this.ActionDatil(data.id,data.cantidad,data.precio);
    }else if(data.action == 'delete'){      
      this.ActionRemoveRequeriment(data.id, data.cantidad,data.precio);
    }
  }

  arrayAUX: any []= [];
  arrayAuxTable: any []=[];
  ActionRemoveRequeriment(id: string, cantidad:string, precio:string){        
    this.reload = false;
    
    if(id == '5000000000'){
      //limpiar de arreglo
      this.arrayAUX = this.arrayRequeriment.filter(element =>  element.precio != parseInt(precio) );
      this.arrayRequeriment = [];
      this.arrayRequeriment = this.arrayAUX;
      this.arrayAUX= [];    
      
      //limpiar de tabla
      this.arrayAuxTable = this.itemsTable.filter(element => element.col4 != precio);
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

  /*
  reloadTable(){
          
      this.arrayRequeriment.forEach(element =>{      
        this.adminService.getArticleForId(element.id_codigo_articulo).subscribe(result => {
          let articleName = result[0].nombre_articulo;
          this.itemsTable.push({
            col1: articleName, //nombre
            col2: String(element.cantidad),
            col3: element.unidad,
            col4: String(element.precio),
            col5: element.id_codigo_articulo
          });
        });                 
      });      
  }
*/
  description: any;
  ActionDatil(id: string, cantidad:string, precio:string){

    if(id == '5000000000'){
      this.dataArticleShow = this.arrayRequeriment.find(element => element.id_codigo_articulo == id && element.cantidad == parseInt(cantidad) && element.precio == parseInt(precio));      
      const dialogRef = this.dialog.open(DialogDetailComponent, {
        width: '300px',
        data: [{title: 'ID:', data: id},
        {title: 'Descripcion:', data: this.dataArticleShow.descripcion_requisito},
        ]
    });
    }else{
      this.adminService.getArticleForId(id).subscribe(result => {
        this.description = result[0].descripcion;                
        const dialogRef = this.dialog.open(DialogDetailComponent, {
          width: '300px',
          data: [{title: 'ID:', data: id},
          {title: 'Descripcion:', data: String(this.description)},
          ]
        });
      })  
    }        
  }


  bandOverflow : string ='n'
  ConfirRequest(){    
    this.bandOverflow = 'n'
    this.item.forEach(element => {      
      this.arrayRequeriment.forEach(elementl => {                
        if(element.id_codigo_articulo != '5000000000' && elementl.id_codigo_articulo != '5000000000'){
          if(element.id_codigo_articulo == elementl.id_codigo_articulo){          
            if(elementl.cantidad > element.cantidad_disponible){
              this.SnackBarError('Error uno de los requisitos sobrepasa la cantidad en stock.','X')                    
              this.bandOverflow ='s'
            }
          }        
        }        
      });
    });

    //console.log(this.arrayRequeriment);
    
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
            this._snackBar.open(this.response.Mensaje, 'X', {                
              verticalPosition: this.verticalPosition,                
              duration: 3000,
              panelClass: ['red-snackbar'],
            });
          }else{
            this._snackBar.open(this.response.Mensaje, 'X', {                
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['green-snackbar'],                
            }); 
            
            //Cambiar el estatus del problema a revison
            this.adminService.estatusProblem(datasend,datasend.id_problema).subscribe(response =>{           
              this.response = response;                                        
              if(this.response.Estatus == 'Error'){            
                this._snackBar.open(this.response.Mensaje, 'X', {                
                  verticalPosition: this.verticalPosition,                
                  duration: 3000,
                  panelClass: ['red-snackbar'],
                });
              }else{
                this._snackBar.open(this.response.Mensaje, 'X', {                
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['green-snackbar'],                
                });   

                //si los requisitos son vacios este poner en proceso directo
                if(this.arrayRequeriment.length == 0){

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
                      this._snackBar.open(this.response.Mensaje, 'X', {                
                        verticalPosition: this.verticalPosition,                
                        duration: 3000,
                        panelClass: ['red-snackbar'],
                      });
                    }else{
                      this._snackBar.open(this.response.Mensaje, 'X', {                
                        verticalPosition: this.verticalPosition,
                        duration: 3000,
                        panelClass: ['green-snackbar'],                
                      });                         
                    }                  
                  }); 
                }

                //regresa a las tablas de rutas
                this.router.navigate([      
                  'solver/showRequested',
                ]);        
                //this.ReloadProblems();                                                                       
              }                  
            });                
          }                  
        });                   
      }      
    }
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


}
