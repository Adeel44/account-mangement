import { Component,OnInit ,DoCheck} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit,DoCheck{
   // saved loged user data
  LogedInUser:any
  isAdmin=false;

  ngOnInit(): void {
    //debugger

    this.LogedInUser= sessionStorage.getItem('userInfo');
   this.LogedInUser= JSON.parse(this.LogedInUser)
   //this.role= this.LogedInUser.role
    
  }

  ngDoCheck(): void {
    //debugger
    if((this.LogedInUser.role==="User")||(this.LogedInUser.role==="Student")){
      this.isAdmin= true;
    }else{
      this.isAdmin= false
    }
    
  }

}
