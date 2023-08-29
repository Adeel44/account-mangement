import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { RoleService } from 'src/app/role/role.service';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../model/IUser';
import { IRole } from 'src/app/role/model/IRole';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  editUser: any;
  roleList!: IRole[];

  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    role: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    number: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^[0-9]*$'),
    ]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private user_Service: UserService,
    private router: Router,
    private roleService: RoleService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getRoleList();
    this.user_Service
      .getUserById(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe({
        next: (res) => {
          this.editUser = res;
          this.userForm.controls['name'].setValue(res.name);
          this.userForm.controls['description'].setValue(res.description);
          this.userForm.controls['role'].setValue(res.role);
          this.userForm.controls['email'].setValue(res.email);
          this.userForm.controls['number'].setValue(res.number);
        },
        error: () => {
          this.router.navigate(['/auth/users/list']);
        },
      });
  }

  UpdateUser(user: IUser) {
    this.user_Service.UpdateUserDetail(this.editUser.id, user).subscribe({
      next: () => {
        this.userForm.reset();
        this.toastr.success('User Updated Successfully');
        this.router.navigateByUrl('/auth/users/list');
      },
      error: () => {
        this.toastr.error('Server error');
      },
    });
  }
  get userFormControls() {
    return this.userForm.controls;
  }
  getRoleList() {
    this.roleService.getRoleList().subscribe({
      next: (res) => {
        this.roleList = res;
      },
      error: () => {
        this.toastr.error('Server error');
      },
    });
  }
}
