import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = "http://localhost:3000/user"

  constructor( private http:HttpClient) { }

  

  getUserList(){
    return this.http.get("http://localhost:3000/user")

  }
  deleteUserById(id:any){
    return this.http.delete(`${this.baseURL}/${id}`)
  }
  createUser(data:any){
    return this.http.post("http://localhost:3000/user", data)
  }
  getUserById(id:any){
    return this.http.get(`${this.baseURL}/${id}`)
  }
  
  UpdateUserDetail(id:any , data:any){
    return this.http.put(`${this.baseURL}/${id}`,data)
    //return this.http.post("http://localhost:3000/client", data)
  }

}
