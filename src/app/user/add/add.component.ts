import { Component } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import { UserService } from '../user.service';
import { RoleService } from 'src/app/role/role.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent   {

  roleList:any;
  

  constructor( private user_Service:UserService , private roleService: RoleService ){
    this.getRoleList()
  }
  

  userForm = new FormGroup({
   /// id:new FormControl(''),
    name:new FormControl('', [Validators.required ]),
    description:new FormControl(''),
    role:new FormControl('', [Validators.required ]),
    email:new FormControl('', [Validators.required,  Validators.email ]),
    number:new FormControl('', [Validators.required , Validators.minLength(6)]),
    password:new FormControl('', [Validators.required , Validators.minLength(6) ]),
  });

  // addUser(){
  //   console.log(this.userForm.value)
  //   this.user_Service.createUser(this.userForm.value).subscribe((result:any)=>{
  //     this.userForm.reset()
  //     alert("User added ")
  //   },(error)=>{
  //     alert("User not added ")
  //   })
  // }

  addUser(){
    console.log(this.userForm.value)
    this.user_Service.createUser(this.userForm.value).subscribe({
      next:(res)=>{
        alert("User  added")
        this.userForm.reset()
        console.log("data is"+res)

      },
      error:(err)=>{
        alert("User not added")
        console.log(err)
      },
      // complete:()=>{
      //   console.log("User added")
      // }
    
    })
  }

  getRoleList(){
    this.roleService.getRoleList().subscribe((result:any)=>{
    this.roleList = result
      console.log(result)
    })
  }



}
