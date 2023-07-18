import { Component } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import { RoleService } from '../role.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent {

  editRole:any;
  roleForm = new FormGroup({
    name:new FormControl('', [Validators.required ]),
    description:new FormControl(''),
  });

  constructor(private activatedRoute: ActivatedRoute, private roleService: RoleService , private router:Router){

  }

  ngOnInit(): void {
    console.log("active id is:"+ this.activatedRoute.snapshot.paramMap.get('id'))
    console.log(this.activatedRoute.snapshot.params)
     
    this.roleService.getRoleById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((result:any)=>{
         this.editRole = result;

      this.roleForm.controls["name"].setValue(this.editRole.name)
      this.roleForm.controls["description"].setValue(this.editRole.description)

    })
  }
  UpdateRole(){
    console.log(this.roleForm.value)
    this.roleService.UpdateRoleDetail(this.editRole.id ,this.roleForm.value).subscribe((data)=>{
      console.log(data)
      this.roleForm.reset();
      alert("Role Updated");
      this.router.navigateByUrl('/role/list');
    })

  }

}
