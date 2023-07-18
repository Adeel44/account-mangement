import { Component } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import { PermissionGroupService } from '../permission-group.service';

@Component({
  selector: 'app-add-permission-group',
  templateUrl: './add-permission-group.component.html',
  styleUrls: ['./add-permission-group.component.css']
})
export class AddPermissionGroupComponent {
  constructor( private permissionGroupService:PermissionGroupService ){}

  roleForm = new FormGroup({
   /// id:new FormControl(''),
    name:new FormControl('', [Validators.required ]),
    description:new FormControl(''),
  });

  createRole(){
    console.log(this.roleForm.value)
    this.permissionGroupService.createPermissionGroup(this.roleForm.value).subscribe((result:any)=>{
      this.roleForm.reset()
      alert("Permission group added ")
    },(error)=>{
      alert("Permission group not added")
    })
  }

}
