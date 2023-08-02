import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  baseURL = "http://localhost:3000/ledger"

  constructor( private http:HttpClient) { }

  getLedgerList(){
    return this.http.get(this.baseURL)

  }
  deleteLedegerById(id:any){
    return this.http.delete(`${this.baseURL}/${id}`)
  }
  createLedger(data:any){
    return this.http.post(this.baseURL, data)
  }
  getLedgerById(id:any){
    return this.http.get(`${this.baseURL}/${id}`)
    //return this.http.get(this.baseURL+'/'+id)

  }
  
  UpdateLedgerDetail(id:any , data:any){
    return this.http.put(`${this.baseURL}/${id}`,data)
    
  }

 
}
