import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LedgerService } from '../ledger.service';
import { ToastrService } from 'ngx-toastr';
import {FormControl,FormGroup, Validators} from '@angular/forms';


interface LedgerForm
{
  iamount: string, 
  amount: number,
  date:Date
}

@Component({
  selector: 'app-list-ledger',
  templateUrl: './list-ledger.component.html',
  styleUrls: ['./list-ledger.component.css']
})
export class ListLedgerComponent implements OnInit ,OnChanges {
  ledgerList:any
  // Loged User Data saved in variable
  LogedInUser:any
  debitSum=0;
  deletedId:any
  deletedLedger:any

  negitiveNumber= false

  creditSum=0;
  //name:any;
  constructor( private ledgerService:LedgerService  , private toastr:ToastrService ){

  }

  ledgerForm = new FormGroup({
    /// id:new FormControl(''),
    iamount:new FormControl('', [Validators.required ]),
    amount:new FormControl(''),
    //debit:new FormControl(''),
    date: new FormControl(''),
 
   });

  ngOnInit(): void {

    this.LogedInUser= sessionStorage.getItem('userInfo');
    this.LogedInUser= JSON.parse(this.LogedInUser)
    //this.role= this.LogedInUser.role
 
    console.log("Login User Detail"+this.LogedInUser)
    console.log("Login User role"+this.LogedInUser.role)
    console.log("Login User email:"+this.LogedInUser.email)

    this.getLedgerList()

    this.debitTottal()
    this.getcreditTottal()
    
  }

  createLedger(){
    //debugger
    console.log(this.ledgerForm.value)
     let  negativeValue = this.ledgerForm.value!.amount
    if(this.ledgerForm.value.amount! < '0'){
      this.negitiveNumber = true
      console.log("Negitive number")
    }else{
      console.log("Positive")
    }

    // this.debitSum = this.debitSum + Number(this.ledgerForm.value?.debit)
    // this.creditSum = this.creditSum + Number(this.ledgerForm.value?.credit)


    this.ledgerService.createLedger(this.ledgerForm.value).subscribe((result:any)=>{
      this.ledgerForm.reset()
      console.log("console")
      
      this.toastr.success('Record Added Successfully');
      this.getLedgerList()
      
    },(error)=>{
       this.toastr.error("Record not added ");
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
   
    
  }

  debitTottal(){

    this.ledgerService.getLedgerList().subscribe((result:any)=>{
      let  ledgerList = result
      ledgerList.forEach((item:any)=> {
       return this.debitSum += Number(item.debit);
      });
      console.log("Sum is this:"+this.debitSum)
    })

    console.log("cons"+this.debitSum)
  }
  getcreditTottal(){


    this.ledgerService.getLedgerList().subscribe((result:any)=>{
      let  ledgerList = result
      ledgerList.forEach((item:any)=> {

       return this.creditSum += Number(item.credit);
      });
      console.log("Sum is this:"+this.creditSum)
    })

  

  }



  getLedgerList(){
    this.negitiveNumber = true;
    this.ledgerService.getLedgerList().subscribe((result:any)=>{
      this.ledgerList = result
      console.log(result)
    })
    //this.getTottal()
  }


  deleteLedger(id:any){
    debugger
    this.deletedId = id

    if(this.LogedInUser.role==='Manager'){
    this.toastr.warning('You are not authorized to delete Ledger record');
    }else{
      debugger
     this.getLedgerById()
     console.log(id)
     this.ledgerService.deleteLedegerById(id).subscribe((result)=>{
       console.log(result);
       // removing debit value on delete 
       this.debitSum = this.debitSum - this.deletedLedger.debit
       this.creditSum = this.creditSum - this.deletedLedger.credit
       this.toastr.success("Record deleted successfully")
       this.getLedgerList();
       //this.getTottal()
     });
    }

  }

  getLedgerById(){
    
    this.ledgerService.getLedgerById(this.deletedId).subscribe((result:any)=>{
      // storing the edited data in variable
      console.log("new"+result.debit)
         this.deletedLedger = result;

    })
  }

}
