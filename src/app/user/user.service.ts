import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './model/IUser';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  LogedInUser: any;
  isLoggedIn=false;
  
  baseURL = 'http://localhost:3000/user';
  constructor(private http: HttpClient) {
    this.LogedInUser = sessionStorage.getItem('userInfo');
    this.LogedInUser = JSON.parse(this.LogedInUser);
  }
  getUserList() {
    return this.http.get<IUser[]>('http://localhost:3000/user');
  }
  deleteUserById(id: string) {
    return this.http.delete<IUser>(`${this.baseURL}/${id}`);
  }
  createUser(data: IUser) {
    return this.http.post<IUser>('http://localhost:3000/user', data);
  }
  getUserById(id: any) {
    return this.http.get<IUser>(`${this.baseURL}/${id}`);
  }
  UpdateUserDetail(id: any, user: IUser) {
    return this.http.put<IUser>(`${this.baseURL}/${id}`, user);
  }
  isLogged() {
    return this.LogedInUser?.email != null;
  }
  getRole() {
    return this.LogedInUser.role;
  }
  authenticate() {
    return this.http.get<any>('http://localhost:3000/user');
  }
  
}

