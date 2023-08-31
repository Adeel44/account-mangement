import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, DoCheck {
  LogedInUser: any;
  isAdmin = false;

  constructor(private router:Router){}

  ngOnInit(): void {
    this.LogedInUser = sessionStorage.getItem('userInfo');
    this.LogedInUser = JSON.parse(this.LogedInUser);
  }

  ngDoCheck(): void {
    if (
      this.LogedInUser.role === 'User' ||
      this.LogedInUser.role === 'Student'
    ) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
}
