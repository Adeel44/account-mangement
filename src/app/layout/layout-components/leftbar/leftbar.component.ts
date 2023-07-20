import { Component,OnInit ,DoCheck} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css']
})
export class LeftbarComponent implements OnInit , DoCheck{

  isCollapsed = true;
  

  LogedInUser:any;
  LogedInUserDetail:any

  isAdmin= false;


  constructor(private router:Router){}


  
  ngOnInit(): void {

   this.LogedInUser= sessionStorage.getItem('userInfo');
   this.LogedInUser= JSON.parse(this.LogedInUser)
   //this.role= this.LogedInUser.role

   console.log("Login User Detail"+this.LogedInUser)
   console.log("Login User role"+this.LogedInUser?.role)
   console.log("Login User email:"+this.LogedInUser?.email)

  //  let email = sessionStorage.getItem('email');
  //  let pass= sessionStorage.getItem('password')
   console.log("check is"+this.LogedInUser.email+""+this.LogedInUser.password)
   
  }

  ngDoCheck(){
    
    console.log("DO CHECK"+ this.LogedInUser.role)
    if((this.LogedInUser.role==="Admin")||(this.LogedInUser.role==="Manager")){
      this.isAdmin= true;
    }else{
      this.isAdmin= false
    }
  }

  onLogoutClick(){
    this.router.navigate(["login"] )

    //sessionStorage.removeItem('userinfo')
    sessionStorage.clear()
    
   
  }

  

}
