import { Component, DoCheck, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LedgerService } from '../ledger.service';
import { Router } from '@angular/router';
import { ILedger } from '../models/ILedger';

@Component({
  selector: 'app-add-ledger',
  templateUrl: './add-ledger.component.html',
  styleUrls: ['./add-ledger.component.css'],
})
export class AddLedgerComponent implements OnInit, DoCheck {
  creditSum = 0;
  debitSum = 0;
  ledgerLost = 0;
  ledgerProfit = 0;
  Ledger!: ILedger;
  ledgerForm!: FormGroup;
  date: Date[] | undefined;

  constructor(
    private ledgerService: LedgerService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngDoCheck(): void {
    this.ledgerLost = this.debitSum - this.creditSum;
    this.ledgerProfit = this.creditSum - this.debitSum;
    if (this.debitSum > this.creditSum) {
      this.ledgerForm.controls['profit'].setValue(0);
      this.ledgerForm.get('creditSum')?.patchValue(this.debitSum);
    }
    if (this.debitSum < this.creditSum) {
      this.ledgerForm.controls['loss'].setValue(0);
      this.ledgerForm.get('debitSum')?.patchValue(this.creditSum);
    }

    if (this.debitSum === this.creditSum) {
      this.ledgerForm.controls['loss'].setValue(0);
      this.ledgerForm.controls['profit'].setValue(0);
    }
  }

  ngOnInit(): void {
    this.ledgerForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      year: new FormControl('', [Validators.required]),
      ledgerquantities: this.formBuilder.array(
        [this.createLedgerledgerQuantities()],
        [Validators.required]
      ),
      creditSum: this.formBuilder.control([0]),
      debitSum: this.formBuilder.control([0]),
      loss: this.formBuilder.control(['']),
      profit: this.formBuilder.control(['']),
    });
    this.calculateCreditSum();
    this.calculateDebitSum();
  }

  onKeyPressDebitControl(event: any, i: any) {
    const creditControl = (<FormArray>this.ledgerForm.get('ledgerquantities'))
      .at(i)
      .get('credit');
    if (event.target.value) {
      creditControl?.setValue(0);
    } else {
      creditControl?.setValue('');
    }
  }

  onKeyPressCreditControl(event: any, i: any) {
    const debitControl = (<FormArray>this.ledgerForm.get('ledgerquantities'))
      .at(i)
      .get('debit');
    if (event.target.value) {
      debitControl?.setValue(0);
    } else {
      debitControl?.setValue('');
    }
  }
  calculateCreditSum() {
    const creditControl = this.ledgerForm.get('ledgerquantities');
    creditControl?.valueChanges.subscribe((ledgerquantities) => {
      this.ledgerForm.get('creditSum')?.patchValue(
        ledgerquantities.reduce((total: any, item: any) => {
          return (this.creditSum = total + Number(item.credit));
        }, 0)
      );
    });
  }

  calculateDebitSum() {
    const debitControl = this.ledgerForm.get('ledgerquantities');
    debitControl?.valueChanges.subscribe((ledgerquantities) => {
      this.ledgerForm.get('debitSum')?.patchValue(
        ledgerquantities.reduce((total: any, item: any) => {
          return (this.debitSum = total + Number(item.debit));
        }, 0)
      );
    });
  }

  createLedgerledgerQuantities(): FormGroup {
    return this.formBuilder.group({
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      credit: new FormControl('', [
        Validators.required,
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,4})?$'),
      ]),
      debit: new FormControl('', [
        Validators.required,
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,4})?$'),
      ]),
      date: new FormControl('', [Validators.required]),
    });
  }
  ledgerQuantities(): FormArray {
    return this.ledgerForm.get('ledgerquantities') as FormArray;
  }

  addLedgerRow() {
    this.ledgerQuantities().push(this.createLedgerledgerQuantities());
  }

  removeLedgerRow(i: number) {
    if (i == 0) {
      this.toastr.warning('We cannot not delete first row');
    } else {
      this.ledgerQuantities().removeAt(i);
    }
  }

  get ledgerFormControls() {
    return this.ledgerForm.controls;
  }

  onSubmitForm(Ledger: ILedger) {
    if (this.ledgerForm.valid) {
      Ledger.year = new Date(Ledger.year).getFullYear();
      this.ledgerService.createLedger(Ledger).subscribe({
        next: () => {
          this.ledgerForm.reset();
          this.toastr.success('Record Added Successfully');
          this.router.navigate(['/auth/ledger/list']);
        },
        error: () => {
          this.toastr.error('Record not added ');
        },
      });
    }
  }
}
