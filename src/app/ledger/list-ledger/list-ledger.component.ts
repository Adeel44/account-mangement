import { Component, OnInit } from '@angular/core';
import { LedgerService } from '../ledger.service';
import { ToastrService } from 'ngx-toastr';
import { ILedger } from '../models/ILedger';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-ledger',
  templateUrl: './list-ledger.component.html',
  styleUrls: ['./list-ledger.component.css']
})
export class ListLedgerComponent implements OnInit {
  ledgerList!: ILedger[];
  LogedInUser: any

  constructor(private ledgerService: LedgerService, private toastr: ToastrService ,private router:Router) {
  }
  ngOnInit(): void {

    this.LogedInUser = sessionStorage.getItem('userInfo');
    this.LogedInUser = JSON.parse(this.LogedInUser)

    console.log("Login User Detail" + this.LogedInUser)
    console.log("Login User role" + this.LogedInUser.role)
    console.log("Login User email:" + this.LogedInUser.email)

    this.getLedgerList()
  }

  getLedgerList() {
    this.ledgerService.getLedgerList().subscribe({
      next: (res) => {
        this.ledgerList = res
        console.log(res)
      },
      error: (err) => {
        this.toastr.error("Server error");
        console.log(err)
      }
    })
  }
  onEditClick(id:number){
    this.router.navigate(["/auth/ledger/edit/"+id])
  }

  deleteLedger(id: number) {
    debugger
    if (this.LogedInUser.role === 'Manager') {
      this.toastr.warning('You are not authorized to delete Ledger record');
    } else {
      this.ledgerService.deleteLedegerById(id).subscribe((result) => {
        console.log(result);
        this.toastr.success("Record deleted successfully")
        this.getLedgerList();
      });
    }

  }

}
