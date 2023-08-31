import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService
  ) {}

  LoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  authenticateLogin() {
    this.userService.authenticate().subscribe({
      next: (res) => {
        const userMatched = res.find((data: any) => {
          return (
            data.email === this.LoginForm.value.email &&
            data.password === this.LoginForm.value.password
          );
        });
        if (userMatched) {
          sessionStorage.setItem('userInfo', JSON.stringify(userMatched));
          window.location.href="/auth";
          this.toastr.success('Login Succesful');
          this.LoginForm.reset();
        } else {
          this.toastr.error('Invalid credentials');
        }
      },
      error: () => {
        this.toastr.error('Server Error');
      },
    });
  }
  
  get LoginFormControls() {
    return this.LoginForm.controls;
  }
}
