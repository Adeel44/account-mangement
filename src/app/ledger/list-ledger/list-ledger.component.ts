import { Component, DoCheck, OnInit } from '@angular/core';
import { LedgerService } from '../ledger.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators , FormArray, FormBuilder } from '@angular/forms';
import { RoleService } from 'src/app/role/role.service';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';



// interface ILedger
// {
//   description: string, 
//   amount: number,
//   date:Date
// }

@Component({
  selector: 'app-list-ledger',
  templateUrl: './list-ledger.component.html',
  styleUrls: ['./list-ledger.component.css']
})
export class ListLedgerComponent implements OnInit {
  ledgerList: any
  // Loged User Data saved in variable
  LogedInUser: any
  // storing debit and credit sum initialy 0
  debitSum = 0;
  creditSum = 0;
  deletedId: any
  deletedLedger: any

  constructor(private ledgerService: LedgerService, private toastr: ToastrService, private role: RoleService) {

  }
  ledgerForm = new FormGroup({
    description: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required , Validators.pattern("^[0-9,-1--9]*$")]),
    date: new FormControl(''),

  });


  ngOnInit(): void {

    this.LogedInUser = sessionStorage.getItem('userInfo');
    this.LogedInUser = JSON.parse(this.LogedInUser)
    //this.role= this.LogedInUser.role

    console.log("Login User Detail" + this.LogedInUser)
    console.log("Login User role" + this.LogedInUser.role)
    console.log("Login User email:" + this.LogedInUser.email)

    this.getLedgerList()

    this.debitTottal()
    this.getcreditTottal()

  }

  createLedger() {

    if(!this.ledgerForm.invalid){
    
    let checkValue = Number(this.ledgerForm.value.amount)
    if(checkValue==0){
      this.toastr.warning('Enter postiver OR negitive amount');
    }
    else if(checkValue < 0) {
      this.ledgerForm.value.amount = Math.abs(Number(this.ledgerForm.value.amount)).toString();

      this.ledgerService.createLedger({ description: this.ledgerForm.value.description, debit: Math.abs(Number(this.ledgerForm.value.amount)), date: this.ledgerForm.value.date }).subscribe((result: any) => {

        this.debitSum = this.debitSum + Number(result.debit)
        console.log("New result:" + result)

        this.ledgerForm.reset()
        this.toastr.success('Record Added Successfully');
        this.getLedgerList()

      }, (error) => {
        this.toastr.error("Record not added ");
      })

    } else {
      this.creditSum = this.creditSum + Number(this.ledgerForm.value.amount)
      this.ledgerService.createLedger(this.ledgerForm.value).subscribe((result: any) => {
        this.ledgerForm.reset()
        console.log("console")

        this.toastr.success('Record Added Successfully');
        this.getLedgerList()

      }, (error) => {
        this.toastr.error("Record not added ");
      })
    }

  }
  

  }

  debitTottal() {
    this.ledgerService.getLedgerList().subscribe((result: any) => {
      let ledgerList = result
      for (var i = 0; i < ledgerList.length; i++) {
        if (ledgerList[i].debit == undefined) {
          ledgerList[i].debit = 0;
        }
        console.log(ledgerList[i].debit)
        this.debitSum += ledgerList[i].debit
      }
    })

  }

  getcreditTottal() {

    this.ledgerService.getLedgerList().subscribe((result: any) => {
      let ledgerList = result
      ledgerList.forEach((item: any) => {
        if (item.amount == undefined) {
          item.amount = 0;
        }

        return this.creditSum += Number(item.amount);
      });
      console.log("Sum is:" + this.creditSum)
    })
  }

  getLedgerList() {
    this.ledgerService.getLedgerList().subscribe((result: any) => {
      this.ledgerList = result
      console.log("List is" + result)
    })
  }


  deleteLedger(id: any) {

    this.deletedId = id

    if (this.LogedInUser.role === 'Manager') {
      this.toastr.warning('You are not authorized to delete Ledger record');
    } else {

      debugger
      this.getLedgerById()
      this.ledgerService.deleteLedegerById(id).subscribe((result) => {
        console.log(result);
        // removing debit value on delete 
        if (this.deletedLedger.debit == undefined) {
          this.deletedLedger.debit = 0;
        }
        if (this.deletedLedger.amount == undefined) {
          this.deletedLedger.amount = 0;
        }

        this.debitSum = this.debitSum - this.deletedLedger.debit
        this.creditSum = this.creditSum - this.deletedLedger.amount
        this.toastr.success("Record deleted successfully")
        this.getLedgerList();
        
      });
    }

  }

  getLedgerById() {

    this.ledgerService.getLedgerById(this.deletedId).subscribe((result: any) => {
      // storing the deleted data in variable
      console.log("new" + result.debit)
      this.deletedLedger = result;

    })
  }

}
