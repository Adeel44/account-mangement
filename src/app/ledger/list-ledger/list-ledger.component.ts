import { Component, OnInit } from '@angular/core';
import { LedgerService } from '../ledger.service';
import { ToastrService } from 'ngx-toastr';
import { ILedger } from '../models/ILedger';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-ledger',
  templateUrl: './list-ledger.component.html',
  styleUrls: ['./list-ledger.component.css'],
})
export class ListLedgerComponent implements OnInit {
  ledgerList!: ILedger[];
  LogedInUser: any;

  constructor(
    private ledgerService: LedgerService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.LogedInUser = sessionStorage.getItem('userInfo');
    this.LogedInUser = JSON.parse(this.LogedInUser);
    this.getLedgerList();
  }
  getLedgerList() {
    this.ledgerService.getLedgerList().subscribe({
      next: (res) => {
        this.ledgerList = res;
      },
      error: () => {
        this.toastr.error('Server error');
      },
    });
  }
  onEditClick(id: number) {
    this.router.navigate(['/auth/ledger/edit/' + id]);
  }
  deleteLedger(id: number) {
    if (this.LogedInUser.role === 'Manager') {
      this.toastr.warning('You are not authorized to delete Ledger record');
    } else {
      this.ledgerService.deleteLedegerById(id).subscribe({
        next: () => {
          this.toastr.success('Record deleted successfully');
          this.getLedgerList();
        },
        error: () => {
          this.toastr.error('Record not deleted ');
        },
      });
    }
  }
}
