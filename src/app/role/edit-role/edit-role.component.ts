import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { RoleService } from '../role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRole } from '../model/IRole';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css'],
})
export class EditRoleComponent {
  editRole: any;
  editRoleForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private roleService: RoleService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.roleService
      .getRoleById(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe({
        next: (result) => {
          this.editRole = result;
          this.editRoleForm.controls['name'].setValue(this.editRole.name);
          this.editRoleForm.controls['description'].setValue(
            this.editRole.description
          );
        },
        error: () => {
          this.router.navigate(['/auth/role/list']);
        },
      });
  }
  UpdateRole(data: IRole) {
    this.roleService.UpdateRoleDetail(this.editRole.id, data).subscribe({
      next: (res) => {
        this.editRoleForm.reset();
        this.toastr.success('Role Updated Successfully');
        this.router.navigateByUrl('/auth/role/list');
      },
      error: () => {
        this.toastr.error('Role not Updated');
      },
    });
  }

  get editRoleFormControls() {
    return this.editRoleForm.controls;
  }
}
