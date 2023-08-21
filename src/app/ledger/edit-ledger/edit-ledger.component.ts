import { Component, DoCheck, OnInit } from '@angular/core';
import { LedgerService } from '../ledger.service';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ILedger } from '../models/ILedger';

@Component({
  selector: 'app-edit-ledger',
  templateUrl: './edit-ledger.component.html',
  styleUrls: ['./edit-ledger.component.css']
})
export class EditLedgerComponent implements OnInit, DoCheck {
  editLedger!: ILedger;
  editLedgerQuantities:any;
  creditSum = 0;
  debitSum = 0;
  ledgerLost = 0;
  ledgerProfit = 0;
  ledgerForm!: FormGroup;
  

  constructor(private activatedRoute: ActivatedRoute, private ledgerService: LedgerService,
    private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder) {
  }
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
      creditSum: this.formBuilder.control(['']),
      debitSum: this.formBuilder.control(['']),
      loss: this.formBuilder.control(['']),
      profit: this.formBuilder.control(['']),
      ledgerquantities: this.formBuilder.array(
        [this.createLedgerledgerQuantities()],
        [Validators.required])
    });

    console.log(this.activatedRoute.snapshot.paramMap.get('id'))
    this.ledgerService.getLedgerById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((result) => {

      // storing the edited data in variable
      this.editLedger = result
      let editledgerquantities = result.ledgerquantities
    
      for (let i = 1; i < editledgerquantities.length; i++) {
        this.addFormArrayRow()
      }
      this.editLedgerDetail(result)

      for (let i = 0; i < editledgerquantities.length; i++) {
        console.log("credit is" + editledgerquantities[i]?.credit);
        (<FormArray>this.ledgerForm.controls['ledgerquantities']).at(i)?.get("description")?.patchValue(editledgerquantities[i].description);
        (<FormArray>this.ledgerForm.get("ledgerquantities")).at(i)?.get("credit")?.setValue(editledgerquantities[i].credit);
        (<FormArray>this.ledgerForm.get("ledgerquantities")).at(i)?.get("debit")?.setValue(editledgerquantities[i].debit);
        (<FormArray>this.ledgerForm.get("ledgerquantities")).at(i)?.get("date")?.setValue(editledgerquantities[i].date);

      }
    },(error)=>{
          this.router.navigate(["/auth/ledger/list"])
    })

    this.calculateCreditSum()
    this.calculateDebitSum()
  }

  editLedgerDetail(Ledger: ILedger) {
    this.ledgerForm.patchValue({
      name: Ledger.name,
      year: Ledger.year,
      creditSum: Ledger.creditSum,
      debitSum: Ledger.debitSum,
      loss: Ledger.loss,
      profit: Ledger.profit,
    });
  }
  
  quantities(): FormArray {
    return this.ledgerForm.get("ledgerquantities") as FormArray
  }
  addFormArrayRow() {
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

  createLedgerledgerQuantities(): FormGroup {
    return this.formBuilder.group({
      description: new FormControl('', [Validators.required, Validators.minLength(3)]),
      credit: new FormControl('', [Validators.required, Validators.pattern("^-?[0-9]\\d*(\\.\\d{1,4})?$")]),
      debit: new FormControl('', [Validators.required, Validators.pattern("^-?[0-9]\\d*(\\.\\d{1,4})?$")]),
      date: new FormControl('', [Validators.required]),
    })
  }

  onKeyPressCredit(event: any, i: any) {
    const debitControl = (<FormArray>this.ledgerForm.get("ledgerquantities")).at(i).get("debit")
    if (event.target.value) {
      debitControl?.setValue(0)
    } else {
      debitControl?.setValue('')
    }
  }

  onKeyPressDebit(event: any, i: any) {
    const creditControl = (<FormArray>this.ledgerForm.get("ledgerquantities")).at(i).get("credit")
    if (event.target.value) {
      creditControl?.setValue(0)
    } else {
      creditControl?.setValue('')
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
          return this.creditSum =  total + Number(item.credit)
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
          return this.debitSum = total + Number(item.debit)
        }, 0)
      )
    })
  }

  UpdateLedger(data:ILedger) {
    console.log(data)
    this.ledgerService.UpdateLedgerDetail(this.editLedger.id, data).subscribe({
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
    },
    )
  }
}
