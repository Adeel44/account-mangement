import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LedgerService } from '../ledger.service';
import { Router } from '@angular/router';
import { ILedger } from '../models/ILedger';

@Component({
  selector: 'app-add-ledger',
  templateUrl: './add-ledger.component.html',
  styleUrls: ['./add-ledger.component.css']
})
export class AddLedgerComponent implements OnInit, DoCheck {
  creditSum = 0
  debitSum = 0
  ledgerLost = 0;
  ledgerProfit = 0;
  Ledger!: ILedger;
  ledgerForm!: FormGroup;

  constructor(private ledgerService: LedgerService, private toastr: ToastrService,
    private formBuilder: FormBuilder, private router: Router
  ) { }

  ngDoCheck(): void {

    this.ledgerLost = this.debitSum - this.creditSum
    this.ledgerProfit = this.creditSum - this.debitSum
    if (this.debitSum > this.creditSum) {
      this.ledgerForm.controls["profit"].setValue(0)
      this.ledgerForm.get('creditSum')?.patchValue(this.debitSum)
    }
    if (this.debitSum < this.creditSum) {
      this.ledgerForm.controls["loss"].setValue(0)
      this.ledgerForm.get('debitSum')?.patchValue(this.creditSum)
    }

    if (this.debitSum === this.creditSum) {
      this.ledgerForm.controls["loss"].setValue(0)
      this.ledgerForm.controls["profit"].setValue(0)
    }
  }

  ngOnInit(): void {
    this.ledgerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]),
      year: new FormControl('', [Validators.required ,Validators.minLength(4),Validators.pattern('^[0-9]*$')]),
      ledgerquantities: this.formBuilder.array(
        [this.createLedgerledgerQuantities()],
        [Validators.required]
      ),
      creditSum: this.formBuilder.control(['']),
      debitSum: this.formBuilder.control(['']),
      loss: [0],
      profit: this.formBuilder.control(['']),
    });
    this.calculateCreditSum()
    this.calculateDebitSum()

  }

  onKeyPressDebit(event: any, i: any) {

    const creditControl = (<FormArray>this.ledgerForm.get("ledgerquantities")).at(i).get("credit")

    if (event.target.value) {
      creditControl?.setValue(0)
    } else {
      creditControl?.setValue('')
    }
  }

  onKeyPressCredit(event: any, i: any) {
    const debitControl = (<FormArray>this.ledgerForm.get("ledgerquantities")).at(i).get("debit")
    if (event.target.value) {
      debitControl?.setValue(0)
    } else {
      debitControl?.setValue('')
    }
  }
  calculateCreditSum() {
    const creditControl = this.ledgerForm.get('ledgerquantities')
    creditControl?.valueChanges.subscribe(newValue => {
      console.log(newValue)
      // newVal contains the whole array
      this.ledgerForm.get('creditSum')?.patchValue(
        newValue.reduce((total: any, item: any) => {
          // interpret item.Number as a number using (Number)) 
          return this.creditSum = total + Number(item.credit)
        }, 0)

      )
    })
  }

  calculateDebitSum() {

    const debitControl = this.ledgerForm.get('ledgerquantities')
    debitControl?.valueChanges.subscribe(newValue => {
      console.log(newValue)
      // newVal contains the whole array
      // patching the value of total control
      this.ledgerForm.get('debitSum')?.patchValue(
        newValue.reduce((total: any, item: any) => {
          return this.debitSum = total +  Number(item.debit)
        }, 0)
      )
    })
  }

  quantities(): FormArray {
    return this.ledgerForm.get("ledgerquantities") as FormArray
  }

  createLedgerledgerQuantities(): FormGroup {
    return this.formBuilder.group({

      description: new FormControl('', [Validators.required, Validators.minLength(3)]),
      credit: new FormControl('', [Validators.required, Validators.pattern("^-?[0-9]\\d*(\\.\\d{1,4})?$")]),
      debit: new FormControl('', [Validators.required, Validators.pattern("^-?[0-9]\\d*(\\.\\d{1,4})?$")]),
      date: new FormControl('', [Validators.required]),

    })
  }

  addQuantity() {
    this.quantities().push(this.createLedgerledgerQuantities());
  }

  removeRow(i: number) {
    console.log("inedx is " + i)
    if (i == 0) {
      this.toastr.warning('Unable to delete first row');
    } else {
      this.quantities().removeAt(i);
    }
  }

  get f() {
    return this.ledgerForm.controls;
  }

  onSubmitForm(Ledger: ILedger) {
    if (this.ledgerForm.valid) {
      this.ledgerService.createLedger(Ledger).subscribe({
        next: (res) => {
          this.ledgerForm.reset()
          this.toastr.success('Record Added Successfully');
          this.router.navigate(["/auth/ledger/list"])
          console.log(res)
        },
        error: (err) => {
          this.toastr.error("Record not added ");
          console.log(err)
        }
      })

    }
  }

}
