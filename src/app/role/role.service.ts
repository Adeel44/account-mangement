import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRole } from './model/IRole';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  baseURL = "http://localhost:3000/role"

  constructor(private http: HttpClient) { }
  getRoleList() {
    return this.http.get<IRole[]>(this.baseURL)
  }
  deleteRoleById(id: string) {
    return this.http.delete<IRole>(`${this.baseURL}/${id}`)
  }
  createRole(role: IRole) {
    return this.http.post<IRole>(this.baseURL, role)
  }
  getRoleById(id: any) {
    return this.http.get<IRole>(`${this.baseURL}/${id}`)
  }
  UpdateRoleDetail(id: string, role: IRole) {
    return this.http.put<IRole>(`${this.baseURL}/${id}`, role)
  }
}
