import { Component } from '@angular/core';
import { LedgerService } from '../ledger.service';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-ledger',
  templateUrl: './edit-ledger.component.html',
  styleUrls: ['./edit-ledger.component.css']
})
export class EditLedgerComponent {
  editLedger:any;

  ledgerquantities:any;


  ledgerForm!: FormGroup;
  // ledgerForm = new FormGroup({
  //  name:new FormControl('', [Validators.required ]),
  //  year:new FormControl('', [Validators.required ]),
  //  loss:new FormControl(''),
  //  profit:new FormControl(''),
  //  creditSum:new FormControl('', [Validators.required ]),
  //  debitSum:new FormControl('', [Validators.required ]),
   


  // //  description:new FormControl(''),
  // //  credit:new FormControl(''),
  // //  debit:new FormControl(''),
  // //  date:new FormControl(''),



  // });

  constructor(private activatedRoute: ActivatedRoute, private ledgerService: LedgerService ,
    private router:Router , private toastr:ToastrService , private formBuilder: FormBuilder){

  }

  ngOnInit(): void {


    this.ledgerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      ledgerquantities: this.formBuilder.array([
        this.formBuilder.group({
          description: new FormControl('', [Validators.required]),
          credit: new FormControl('', [Validators.required]),
          debit: new FormControl('', [Validators.required]),
          date: '',
    
        })

      ], [Validators.required]),
      creditSum: this.formBuilder.control(['']),
      debitSum: this.formBuilder.control(['']),
      loss: this.formBuilder.control(['']),
      profit: this.formBuilder.control(['']),
    });

    console.log("active id is:"+ this.activatedRoute.snapshot.paramMap.get('id'))
    console.log(this.activatedRoute.snapshot.params)
     
    this.ledgerService.getLedgerById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((result:any)=>{
      // storing the edited data in variable
         this.editLedger = result;
         console.log("------")
         console.log(result.ledgerquantities)
         this.ledgerquantities = result.ledgerquantities
         console.log(result.ledgerquantities[0].credit)

      this.ledgerForm.controls["name"].setValue(this.editLedger.name)
      this.ledgerForm.controls["year"].setValue(this.editLedger.year)
      this.ledgerForm.controls["creditSum"].setValue(this.editLedger.creditSum)
      this.ledgerForm.controls["debitSum"].setValue(this.editLedger.debitSum)
      this.ledgerForm.controls["loss"].setValue(this.editLedger.loss)
      this.ledgerForm.controls["profit"].setValue(this.editLedger.profit)

      // this.ledgerForm.controls["description"].setValue(this.ledgerquantities[0].description)
      // this.ledgerForm.controls["credit"].setValue(this.ledgerquantities[0].credit)
      // this.ledgerForm.controls["debit"].setValue(this.editLedger.ledgerquantities[0].debit)
      // this.ledgerForm.controls["debit"].setValue(this.editLedger.ledgerquantities[0].date)

      // this.ledgerForm.controls["description"].setValue(this.editLedger.ledgerquantities[1].description)
      // this.ledgerForm.controls["credit"].setValue(this.editLedger.ledgerquantities[1].credit)
      // this.ledgerForm.controls["debit"].setValue(this.editLedger.ledgerquantities[1].debit)
      // this.ledgerForm.controls["debit"].setValue(this.editLedger.ledgerquantities[1].date)



      

      

    })

    this.check()
  }

  check(){

    // for (var i = 0; i < this.ledgerquantities.length; i++) {
    //   console.log("----");
    //   console.log(this.ledgerquantities[i].description);
    // }

    const description = (<FormArray>this.ledgerForm.get("ledgerquantities")).at(0).get("description")
    description?.setValue("testing ")
    const credit = (<FormArray>this.ledgerForm.get("ledgerquantities")).at(0).get("credit")
    credit?.setValue(700);
     (<FormArray>this.ledgerForm.get("ledgerquantities")).at(0).get("debit")?.setValue(900);
     (<FormArray>this.ledgerForm.get("ledgerquantities")).at(0).get("date")?.setValue(9/12/23);

     (<FormArray>this.ledgerForm.get("ledgerquantities")).at(1).get("description")?.setValue("test333");
    const credit2 = (<FormArray>this.ledgerForm.get("ledgerquantities")).at(1).get("credit")
    credit2?.setValue(70000);

     (<FormArray>this.ledgerForm.get("ledgerquantities")).at(1).get("debit")?.setValue(90000)
    


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
