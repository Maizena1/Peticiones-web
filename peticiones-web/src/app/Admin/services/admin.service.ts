import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { branch } from './type';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  
  url = 'http://peticionesdelmuro.ddns.net:3600/api/';

  createBranch(dato: branch):Observable<any>{
    //console.log(dato);
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
    return this.http.get(`${this.url}/sucursales`);
  }
  


  
}
