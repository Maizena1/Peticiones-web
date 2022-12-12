import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { article, articlebytypeproblem, assignament_problem, branch, employee, estatus_problem, login, User, store, type_of_problem, user_problem, add_problem } from './type';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  
  //url ='http://peticionesdelmuro.ddns.net:3600/api/';
  url = 'http://localhost:5000/api/';

  //para el header------------------------------------------------
  getUser(id: number):Observable<any>{
    //console.log(dato);
    return this.http.get(`${this.url}usuario/${id}`);
  }

  //para sucursales-----------------------------------------------
  createBranch(dato: branch):Observable<any>{
    return this.http.post(`${this.url}registrar-sucursal`,dato);
  }

  UpdatedBranch(dato: branch, id: number):Observable<any>{
    return this.http.put(`${this.url}modificar-sucursal/${id}`,dato);
  }

  DeleteBranch(id:number):Observable<any>{
    return this.http.delete(`${this.url}eliminar-sucursal/${id}`);
  }

  getBranches():Observable<any>{
    //console.log(dato);
    return this.http.get(`${this.url}sucursales`);
  }
  
  //Eployees --------------------------------------------------------
  getEmployees():Observable<any>{    
    return this.http.get(`${this.url}empleados`);
  }

  getEmployee(id:number):Observable<any>{    
    return this.http.get(`${this.url}empleado/${id}`);
  }
  
  DeleteEmployee(id:number):Observable<any>{
    return this.http.delete(`${this.url}eliminar-empleado/${id}`);
  }

  UpdatedEmployee(dato: employee, id: number):Observable<any>{
    return this.http.put(`${this.url}modificar-empleado/${id}`,dato);
  }

  createEmployee(dato: employee):Observable<any>{    
    return this.http.post(`${this.url}registrar-empleado`,dato);
  }

  //users ---------------------------------------------------------
  
  getUsers():Observable<any>{
    return this.http.get(`${this.url}usuarios`);
  }

  getRol():Observable<any>{    
    return this.http.get(`${this.url}roles`);
  }

  updateUser(dato: User, id: number):Observable<any>{
    return this.http.put(`${this.url}modificar-usuario/${id}`,dato);
  }
  
  createUser(user: Omit<User,'id_usuario' | 'login'>):Observable<any>{
    return this.http.post(`${this.url}registrar-usuario`, user);
  }

  deleteUser({id_usuario}: Pick<User, 'id_usuario'>):Observable<any>{
    return this.http.post(`${this.url}registrar-usuario`, id_usuario);
  }


  

  //Tipo de Problema-----------------------------------------------
  getTypeProblems():Observable<any>{
    //console.log(dato);
    return this.http.get(`${this.url}tipos-problemas`);
  }

  DeleteTypeProblem(id:number):Observable<any>{
    return this.http.delete(`${this.url}eliminar-tipo-problema/${id}`);
  }

  createTypeProblem(dato: type_of_problem):Observable<any>{    
    return this.http.post(`${this.url}registrar-tipo-problema`,dato);
  }

  UpdatedTypeProblem(dato: type_of_problem, id: number):Observable<any>{
    return this.http.put(`${this.url}modificar-tipo-problema/${id}`,dato);
  }

  //login y logout----------------------------------------------------------
  createSesion(dato: login):Observable<any>{    
    return this.http.post(`${this.url}login`,dato);
  }

  deleteSesion(dato: login):Observable<any>{
    return this.http.put(`${this.url}logout`,dato);
  }
  
  //Codigo de Articulos-------------------------------------------
  getArticle():Observable<any>{
    //console.log(dato);
    return this.http.get(`${this.url}codigos-articulos`);
  }

  getArticleForId(id: string):Observable<any>{
    //console.log(dato);
    return this.http.get(`${this.url}codigo-articulo/${id}`);
  }

  UpdatedArticle(dato: article, id: string):Observable<any>{
    return this.http.put(`${this.url}modificar-codigo-articulo/${id}`,dato);
  }

  createCodeArticle(dato: article):Observable<any>{    
    return this.http.post(`${this.url}registrar-codigo-articulo`,dato);
  }
  //ALmacen-----------------------------------------------------------------
  getStores():Observable<any>{
    //console.log(dato);
    return this.http.get(`${this.url}almacenes`);
  }

  UpdatedStore(dato: store, id: number):Observable<any>{
    return this.http.put(`${this.url}modificar-almacen/${id}`,dato);
  }

  createStore(dato: store):Observable<any>{    
    return this.http.post(`${this.url}registrar-almacen`,dato);
  }
  //Articulo por tipo de problema
  getArticlesProblems():Observable<any>{    
    return this.http.get(`${this.url}articulos-problemas`);
  }
  UpdatedArticleProblem(dato: articlebytypeproblem, id: number):Observable<any>{
    return this.http.put(`${this.url}modificar-articulo-problema/${id}`,dato);
  }

  createArticleProblem(dato: articlebytypeproblem):Observable<any>{    
    return this.http.post(`${this.url}registrar-articulo-problema`,dato);
  }
  //USUARIO POR TIPO DE PROBLEMA 
  getUserByTypeProblem():Observable<any>{    
    return this.http.get(`${this.url}usuarios-problemas`);
  }

  getUsersSolevers():Observable<any>{    
    return this.http.get(`${this.url}usuarios-solvers`);
  }
  
  deleteUserByPoblem(id:number):Observable<any>{
    return this.http.delete(`${this.url}eliminar-usuario-problema/${id}`);
  }

  updatedUserByProblem(dato: user_problem , id: number):Observable<any>{
    return this.http.put(`${this.url}modificar-usuario-problema/${id}`,dato);
  }

  createUserByProblem(dato: user_problem):Observable<any>{
    return this.http.post(`${this.url}registrar-usuario-problema`,dato);
  }
  
  //problemas ------------------------------------------------
  getProblems():Observable<any>{    
    return this.http.get(`${this.url}problemas`);
  }

  deleteProblem(dato: estatus_problem , id: number):Observable<any>{
    return this.http.put(`${this.url}estatus-problema/${id}`,dato);
  }
    
  assignamentProblem(dato: assignament_problem , id: number):Observable<any>{
    return this.http.put(`${this.url}estatus-problema/${id}`,dato);
  }

  addProblem(dato: add_problem):Observable<any>{    
    return this.http.post(`${this.url}registrar-problema`,dato);
  }


  getProblemsOrder():Observable<any>{    
    return this.http.get(`${this.url}problemas-order`);
  }

  //requisitos------------------------------------------------
  getRequirementProblem(id:number):Observable<any>{    
    return this.http.get(`${this.url}requisitos-problema/${id}`);
  }

  //obtencion de empleados por tipo de problema
  getTypeUserProblem(id:number):Observable<any>{    
    return this.http.get(`${this.url}usuario-tipo-problema/${id}`);
  }  


  deleteRequestProblems(id:number):Observable<any>{    
    return this.http.delete(`${this.url}requisito-problema/${id}`);
  }

  
  //solver------------------------------------------------
  getArticleForProblemType(id: number):Observable<any>{    
    return this.http.get(`${this.url}almacen-problema/${id}`);
  }  


} 
