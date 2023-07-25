import { Component } from '@angular/core';
import { LedgerService } from '../ledger.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-ledger',
  templateUrl: './edit-ledger.component.html',
  styleUrls: ['./edit-ledger.component.css']
})
export class EditLedgerComponent {
  editLedger:any;
  ledgerForm = new FormGroup({
    iamount:new FormControl('', [Validators.required ]),
   credit:new FormControl('', [Validators.required ]),
   debit:new FormControl('', [Validators.required ]),
   amount:new FormControl('', [Validators.required ])
  });

  constructor(private activatedRoute: ActivatedRoute, private ledgerService: LedgerService ,
    private router:Router , private toastr:ToastrService){

  }

  ngOnInit(): void {
    console.log("active id is:"+ this.activatedRoute.snapshot.paramMap.get('id'))
    console.log(this.activatedRoute.snapshot.params)
     
    this.ledgerService.getLedgerById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((result:any)=>{
      // storing the edited data in variable
         this.editLedger = result;

      this.ledgerForm.controls["iamount"].setValue(this.editLedger.iamount)
      this.ledgerForm.controls["credit"].setValue(this.editLedger.credit)
      this.ledgerForm.controls["debit"].setValue(this.editLedger.debit)
      this.ledgerForm.controls["amount"].setValue(this.editLedger.amount)

    })
  }
  UpdateLedger(){
    console.log(this.ledgerForm.value)
    this.ledgerService.UpdateLedgerDetail(this.editLedger.id ,this.ledgerForm.value).subscribe((data)=>{
      console.log(data)
      this.ledgerForm.reset();
      this.toastr.success('Record Updated Successfully');
      this.router.navigateByUrl('/auth/ledger/list');
    })

  }

}
