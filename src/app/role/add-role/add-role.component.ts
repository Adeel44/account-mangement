import { Component } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import { RoleService } from '../role.service';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent {
  constructor( private roleService:RoleService, private toastr: ToastrService){}

  roleForm = new FormGroup({
   /// id:new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]),
    description:new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
  });
  get f() {
    return this.roleForm.controls;
  }


  createRole(){
    console.log(this.roleForm.value)
    this.roleService.createRole(this.roleForm.value).subscribe((result:any)=>{
      this.roleForm.reset()
      this.toastr.success('Role Added Successfully');
    },(error)=>{
       this.toastr.error("Role not added ");
    })
  }

}
