import { Component } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import { RoleService } from '../role.service';



@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent {
  constructor( private roleService:RoleService ){}

  roleForm = new FormGroup({
   /// id:new FormControl(''),
    name:new FormControl('', [Validators.required ]),
    description:new FormControl(''),
  });

  createRole(){
    console.log(this.roleForm.value)
    this.roleService.createRole(this.roleForm.value).subscribe((result:any)=>{
      this.roleForm.reset()
      alert("Role added ")
    },(error)=>{
      alert("Role not added ")
    })
  }

}
