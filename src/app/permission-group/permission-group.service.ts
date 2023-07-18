import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionGroupService {

  baseURL = "http://localhost:3000/permission-group"

  constructor( private http:HttpClient) { }

  permissionGroupList(){
    return this.http.get("http://localhost:3000/permission-group")

  }
  deletePermissionGroupById(id:any){
    return this.http.delete(`${this.baseURL}/${id}`)
  }
  createPermissionGroup(data:any){
    return this.http.post("http://localhost:3000/permission-group", data)
  }
  getPermissionGroupById(id:any){
    return this.http.get(`${this.baseURL}/${id}`)
  }
  
  updatePermissionGroup(id:any , data:any){
    return this.http.put(`${this.baseURL}/${id}`,data)
  
  }

}
