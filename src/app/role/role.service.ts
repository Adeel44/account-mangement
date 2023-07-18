import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  baseURL = "http://localhost:3000/role"

  constructor( private http:HttpClient) { }

  getRoleList(){
    return this.http.get("http://localhost:3000/role")

  }
  deleteRoleById(id:any){
    return this.http.delete(`${this.baseURL}/${id}`)
  }
  createRole(data:any){
    return this.http.post("http://localhost:3000/role", data)
  }
  getRoleById(id:any){
    return this.http.get(`${this.baseURL}/${id}`)
  }
  
  UpdateRoleDetail(id:any , data:any){
    return this.http.put(`${this.baseURL}/${id}`,data)
    //return this.http.post("http://localhost:3000/client", data)
  }

}
