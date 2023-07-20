import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  

  constructor(private router: Router, private http: HttpClient,
    private route: ActivatedRoute , private toastr: ToastrService) {
     // sessionStorage.clear()
     }

  LoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });


  authenticateLogin() {
    this.http.get<any>('http://localhost:3000/user')
      .subscribe(res => {
        const userMatched = res.find((data: any) => {
        return data.email === this.LoginForm.value.email && data.password === this.LoginForm.value.password
        });
        if (userMatched) {
          console.log(userMatched)
          sessionStorage.setItem('userInfo', JSON.stringify(userMatched))
          this.toastr.success('Login Succesful');
          this.LoginForm.reset()
          this.router.navigate(["/auth"] )


        } else {
          this.toastr.error('Invalid credentials');
          //alert("Invalid Email OR Password")
        }
      }, err => {
        this.toastr.error('Server Error');

      })
  }

}
