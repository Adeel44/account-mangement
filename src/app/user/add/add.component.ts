import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { RoleService } from 'src/app/role/role.service';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../model/IUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  roleList: any;
  userList: any;
  constructor(
    private user_Service: UserService,
    private roleService: RoleService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.getRoleList();
    this.getUserList();
  }

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
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  addUser(user: IUser) {
    const emailExist = this.userList.find((data: any) => {
      return data.email === this.userForm.value.email;
    });
    if (emailExist) {
      this.toastr.warning('Email already exist');
    } else {
      this.user_Service.createUser(user).subscribe({
        next: () => {
          this.toastr.success('User  added successfully');
          this.userForm.reset();
          this.router.navigate(['/auth/users/list']);
        },
        error: () => {
          this.toastr.error('User not added');
        },
      });
    }
  }
  getUserList() {
    this.user_Service.getUserList().subscribe({
      next: (res) => {
        this.userList = res;
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
