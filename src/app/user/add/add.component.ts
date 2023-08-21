import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { RoleService } from 'src/app/role/role.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  roleList: any;
  
  userList: any;


  constructor(private user_Service: UserService, private roleService: RoleService, private toastr: ToastrService) {
    this.getRoleList()
    this.getUserList()
  }


  userForm = new FormGroup({
    /// id:new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]),
    description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]),
    role: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    number: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^[0-9]*$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  addUser() {
    

    const emailExist = this.userList.find((data: any) => {
      return data.email === this.userForm.value.email
    })

    if (emailExist) {
      this.toastr.warning("Email already exist");
    } else {

      console.log(this.userForm.value)
      this.user_Service.createUser(this.userForm.value).subscribe({

        next: (res) => {
          this.toastr.success("User  added successfully");
          this.userForm.reset()
          console.log("data is" + res)

        },
        error: (err) => {
          this.toastr.error("User not added");
          console.log(err)
        }

      })
    }


  }

  getUserList() {
    this.user_Service.getUserList().subscribe((res: any) => {
      // stored the user list in variable
      this.userList = res
      console.log("user list" + res)
    })

  }
  get f() {
    return this.userForm.controls;
  }

  getRoleList() {
    this.roleService.getRoleList().subscribe((result: any) => {
      this.roleList = result
      console.log(result)
    })
  }

}
