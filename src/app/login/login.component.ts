import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  

  constructor(private router: Router, private http: HttpClient,
    private route: ActivatedRoute) { }

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
          alert("Loged in ")
          this.LoginForm.reset()
          this.router.navigate([""])


        } else {
          alert("Invalid Email OR Password")
        }
      }, err => {
        alert("Something went wrong")

      })
  }

}
