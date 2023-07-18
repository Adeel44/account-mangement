import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  userList:any
  // logedin user data
  LogedInUser:any;
  constructor( private user_Service:UserService , private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.getList()

    this.LogedInUser= sessionStorage.getItem('userInfo');
   this.LogedInUser= JSON.parse(this.LogedInUser)
   //this.role= this.LogedInUser.role

   console.log("Login User Detail"+this.LogedInUser)
   console.log("Login User role"+this.LogedInUser.role)
   console.log("Login User email:"+this.LogedInUser.email)


    
    
  }
  getList(){
    this.user_Service.getUserList().subscribe((result:any)=>{
      this.userList = result
      console.log(result)
    })

  }

  deleteUser(clientid:string){
    debugger
    if(this.LogedInUser.role==='Manger'){
      alert("You are not authorized to delete User")
    }else{
      console.log(clientid)
      this.user_Service.deleteUserById(clientid).subscribe((result)=>{
        //console.log(result);
        alert("User deleted")
        this.getList()
      });
    }
    
   
  }
  



}
