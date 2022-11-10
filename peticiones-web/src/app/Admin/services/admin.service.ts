import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { branch, employee, type_of_problem } from './type';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  
  url = 'http://peticionesdelmuro.ddns.net:3600/api/';

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
    //console.log(dato);
    return this.http.get(`${this.url}usuarios`);
  }

  getRol():Observable<any>{    
    return this.http.get(`${this.url}roles`);
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



}
