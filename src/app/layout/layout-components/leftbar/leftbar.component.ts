import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css'],
})
export class LeftbarComponent implements OnInit, DoCheck {
  isCollapsed = true;
  isCollaps = true;
  LogedInUser: any;
  LogedInUserDetail: any;
  isAdmin = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.LogedInUser = sessionStorage.getItem('userInfo');
    this.LogedInUser = JSON.parse(this.LogedInUser);
  }

  ngDoCheck() {
    if (
      this.LogedInUser.role === 'Admin' ||
      this.LogedInUser.role === 'Manager'
    ) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  onLogoutClick() {
    this.router.navigate(['login']);
    sessionStorage.clear();
    
  }
}
