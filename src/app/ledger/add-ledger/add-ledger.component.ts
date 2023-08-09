import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LedgerService } from '../ledger.service';


@Component({
  selector: 'app-add-ledger',
  templateUrl: './add-ledger.component.html',
  styleUrls: ['./add-ledger.component.css']
})
export class AddLedgerComponent implements OnInit, DoCheck {

  //ledgerList: any;
  id = 0
  creditSum = 0
  debitSum = 0

  ledgerLost = 0;
  ledgerProfit = 0;
  rowIndex: any

  ledgerForm!: FormGroup;
  constructor(private ledgerService: LedgerService, private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngDoCheck(): void {

    this.ledgerLost = this.debitSum - this.creditSum
    this.ledgerProfit = this.creditSum - this.debitSum
    if (this.debitSum > this.creditSum) {
      this.ledgerForm.controls["profit"].setValue(0)
      //this.ledgerForm.get('profit')?.patchValue(0)
      this.ledgerForm.get('creditSum')?.patchValue(this.debitSum)


    }
    if (this.debitSum < this.creditSum) {
      this.ledgerForm.controls["loss"].setValue(0)
      ///this.ledgerForm.get('loss')?.patchValue(0)
      this.ledgerForm.get('debitSum')?.patchValue(this.creditSum)

    }

    if (this.debitSum === this.creditSum) {
      this.ledgerForm.controls["loss"].setValue(0)
      this.ledgerForm.controls["profit"].setValue(0)

    }

  }

  ngOnInit(): void {
    this.ledgerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      ledgerquantities: this.formBuilder.array([], [Validators.required]),
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
      //debitControl?.disable()
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

          return this.debitSum = total + (+item.debit)

        }, 0)

      )
    })

  }

  quantities(): FormArray {
    return this.ledgerForm.get("ledgerquantities") as FormArray
  }

  newQuantity(): FormGroup {

    return this.formBuilder.group({
      id: this.id++,
      description: new FormControl('', [Validators.required]),
      credit: new FormControl('', [Validators.required]),
      debit: new FormControl('', [Validators.required]),
      date: '',

    })
  }

  addQuantity() {

    if (this.rowIndex == 0 || this.rowIndex > 0) {
      this.quantities().insert(this.rowIndex, this.newQuantity());
    } else {
      this.quantities().push(this.newQuantity());
    }
  }

  onClickNumber(event: any) {

    if (event.target.value) {
      this.rowIndex = Number(event.target.value)
    } else {
      this.rowIndex = -8
    }
  }

  removeRow(i: number) {
    console.log("inedx is " + i)
    this.quantities().removeAt(i);
  }

  onSubmitForm() {
    console.log(this.ledgerForm.value);
    if (this.ledgerForm.valid) {
      this.ledgerService.createLedger(this.ledgerForm.value).subscribe((result: any) => {
        this.ledgerForm.reset()
        console.log(result)
        this.toastr.success('Record Added Successfully');

      }, (error) => {
        this.toastr.error("Record not added ");
      })

    }
  }
}
