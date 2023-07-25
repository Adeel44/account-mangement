import { Component } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LedgerService } from '../ledger.service';

@Component({
  selector: 'app-add-ledger',
  templateUrl: './add-ledger.component.html',
  styleUrls: ['./add-ledger.component.css']
})
export class AddLedgerComponent {
  constructor( private ledgerService:LedgerService, private toastr: ToastrService){}

  ledgerForm = new FormGroup({
   /// id:new FormControl(''),
   iamount:new FormControl('', [Validators.required ]),
   credit:new FormControl(''),
   debit:new FormControl(''),
   amount:new FormControl(''),

  });

  /// https://www.youtube.com/watch?v=IxoYUdKXrVE

  createLedger(){
    console.log(this.ledgerForm.value)
    this.ledgerService.createLedger(this.ledgerForm.value).subscribe((result:any)=>{
      this.ledgerForm.reset()
      this.toastr.success('Ledger Added Successfully');
    },(error)=>{
       this.toastr.error("Ledger not added ");
    })
  }

}
