import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../role.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IRole } from '../model/IRole';
@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent {
  constructor(private roleService: RoleService, private toastr: ToastrService, private router: Router) { }

  roleForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]),
    description: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
  });
  get roleFormControls() {
    return this.roleForm.controls;
  }
  createRole(role: IRole) {
    this.roleService.createRole(role).subscribe({
      next: () => {
        this.roleForm.reset()
        this.toastr.success('Role Added Successfully');
        this.router.navigate(["/auth/role/list"])
      },
      error: () => {
        this.toastr.error("Role not added ");
      }
    })
  }
}
