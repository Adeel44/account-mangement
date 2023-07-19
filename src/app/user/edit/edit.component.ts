import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { RoleService } from 'src/app/role/role.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  // stored edit user detail in this varibale 
  editUser:any;

  roleList:any;

  userForm = new FormGroup({
    name:new FormControl('', [Validators.required ]),
    description:new FormControl(''),
    role:new FormControl('', [Validators.required ]),
    email:new FormControl('', [Validators.required ]),
    number:new FormControl('', [Validators.required ]),
    
  });

  constructor(private activatedRoute: ActivatedRoute, private user_Service: UserService , private router:Router
    , private roleService:RoleService ,private toastr:ToastrService){

  }

  ngOnInit(): void {
    console.log("active id is:"+ this.activatedRoute.snapshot.paramMap.get('id'))
    console.log(this.activatedRoute.snapshot.params)
     
    this.user_Service.getUserById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((result:any)=>{
         this.editUser = result;

      this.userForm.controls["name"].setValue(this.editUser.name)
      this.userForm.controls["description"].setValue(this.editUser.description)
      this.userForm.controls["role"].setValue(this.editUser.role)
      this.userForm.controls["email"].setValue(this.editUser.email)
      this.userForm.controls["number"].setValue(this.editUser.number)

    })

    this.getRoleList()

    
  }

  UpdateUser(){
    console.log(this.userForm.value)
    this.user_Service.UpdateUserDetail(this.editUser.id ,this.userForm.value).subscribe((data)=>{
      console.log(data)
      this.userForm.reset();
      this.toastr.success('User Updated Successfully');
      this.router.navigateByUrl('/auth/users/list');
    })

  }

  getRoleList(){
    this.roleService.getRoleList().subscribe((result:any)=>{
// stored role list in the varibale 
    this.roleList = result
      console.log(result)
    })
  }

}
