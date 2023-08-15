import { Component, OnInit } from '@angular/core';
import { LedgerService } from '../ledger.service';
import { ToastrService } from 'ngx-toastr';
import { ILedger } from '../models/ILedger';


@Component({
  selector: 'app-list-ledger',
  templateUrl: './list-ledger.component.html',
  styleUrls: ['./list-ledger.component.css']
})
export class ListLedgerComponent implements OnInit {
  ledgerList!: ILedger[];
  LogedInUser: any

  constructor(private ledgerService: LedgerService, private toastr: ToastrService) {
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

  deleteLedger(id: number) {
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
