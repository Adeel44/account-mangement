import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILedger } from './models/ILedger';

@Injectable({
  providedIn: 'root',
})
export class LedgerService {
  baseURL = 'http://localhost:3000/ledger';

  constructor(private http: HttpClient) {}

  getLedgerList() {
    return this.http.get<ILedger[]>(this.baseURL);
  }
  deleteLedegerById(id: any) {
    return this.http.delete<ILedger>(`${this.baseURL}/${id}`);
  }
  createLedger(Ledger: ILedger) {
    return this.http.post<ILedger>(this.baseURL, Ledger);
  }
  getLedgerById(id: any) {
    return this.http.get<ILedger>(`${this.baseURL}/${id}`);
  }
  UpdateLedgerDetail(id: any, data: ILedger) {
    return this.http.put<ILedger>(`${this.baseURL}/${id}`, data);
  }
}
