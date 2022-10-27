import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { branch } from './type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  
  url = 'http://localhost:5000/api/';

  createBranch(dato: branch):Observable<any>{
    //console.log(dato);
    return this.http.post(`${this.url}registrar-sucursal`,dato);
  }

  getBranches():Observable<any>{
    //console.log(dato);
    return this.http.get(`${this.url}/sucursales`);
  }
  


  
}
