import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css']
})
export class LeftbarComponent implements OnInit{

  isCollapsed = true;

  LogedInUser:any;
  LogedInUserDetail:any


  

  

  ngOnInit(): void {

    this.LogedInUser= sessionStorage.getItem('userInfo');
   this.LogedInUser= JSON.parse(this.LogedInUser)
   //this.role= this.LogedInUser.role

   console.log("Login User Detail"+this.LogedInUser)
   console.log("Login User role"+this.LogedInUser.role)
   console.log("Login User email:"+this.LogedInUser.email)
   

    
  }

  

}
