import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn = false;
  LogedInUser:any

  baseURL = "http://localhost:3000/user"

  constructor( private http:HttpClient , private router:Router) { 
   

    this.LogedInUser= sessionStorage.getItem('userInfo');
    this.LogedInUser= JSON.parse(this.LogedInUser)
    //console.log("CanI"+ this.LogedInUser.email)
  }

  

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

  }

  Login(){

    debugger
    this.isLoggedIn = true;
    // sessionStorage.getItem('email');
    // sessionStorage.getItem('password')
    this.LogedInUser.email
    this.LogedInUser.password
  }
  Logout(){
    this.isLoggedIn = false;
  }

  // isAuth(){
   
  //   return this.isLoggedIn;
  // }

  isLogged(){
   
    return   this.LogedInUser?.email != null
    
  }



}
