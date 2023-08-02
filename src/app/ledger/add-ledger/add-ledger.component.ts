import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LedgerService } from '../ledger.service';

@Component({
  selector: 'app-add-ledger',
  templateUrl: './add-ledger.component.html',
  styleUrls: ['./add-ledger.component.css']
})
export class AddLedgerComponent {

  ledgerList:any;
  checkindex=false

  id=0

  ledgerForm!:FormGroup;
  constructor(private ledgerService: LedgerService, private toastr: ToastrService, 
    private formBuilder:FormBuilder
    ) {

  }

  ngOnInit(): void {
    this.ledgerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required ]),
      quantities: this.formBuilder.array([],[Validators.required ]) 
    });
    
  }
  quantities() : FormArray {
    return this.ledgerForm.get("quantities") as FormArray
  }
   
  newQuantity(): FormGroup {
    return this.formBuilder.group({
      id:  this.id++,
      description: new FormControl('', [Validators.required ]),
      credit: new FormControl(''),
      debit: '',
      date: '',
    })
  }
  addQuantity(i:number) {

   
  //  if(i==0){
  //   this.checkindex = true
  //   this.quantities().push(this.newQuantity());

  //  }
    this.quantities().push(this.newQuantity());
  }
   
  removeQuantity(i:number) {
    console.log("inedx is "+i)
    this.quantities().removeAt(i);
  }
   
  onSubmitForm() {
    console.log(this.ledgerForm.value);
    this.ledgerService.createLedger(this.ledgerForm.value).subscribe((result: any) => {
      this.ledgerForm.reset()
      console.log(result)

      this.toastr.success('Record Added Successfully');
  
    }, (error) => {
      this.toastr.error("Record not added ");
    })
  }






  // constructor( private ledgerService:LedgerService, private toastr: ToastrService){}

  // ledgerForm = new FormGroup({
  //  /// id:new FormControl(''),
  //  iamount:new FormControl('', [Validators.required ]),
  //  credit:new FormControl(''),
  //  debit:new FormControl(''),
  //  amount:new FormControl(''),

  // });

  /// https://www.youtube.com/watch?v=IxoYUdKXrVE

  // createLedger(){
  //   console.log(this.ledgerForm.value)
  //   this.ledgerService.createLedger(this.ledgerForm.value).subscribe((result:any)=>{
  //     this.ledgerForm.reset()
  //     this.toastr.success('Ledger Added Successfully');
  //   },(error)=>{
  //      this.toastr.error("Ledger not added ");
  //   })
  // }

}
