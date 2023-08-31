import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../model/IUser';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  userList!: IUser[] ;
  LogedInUser: any;
  constructor(
    private user_Service: UserService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getUserList();
    this.LogedInUser = sessionStorage.getItem('userInfo');
    this.LogedInUser = JSON.parse(this.LogedInUser);
  }
  getUserList() {
    this.user_Service.getUserList().subscribe({
      next: (res) => {
        this.userList = res;
      },
      error: () => {
        this.toastr.error('Server error User list not fetched');
      },
    });
  }
  deleteUser(userid: string) {
    if (this.LogedInUser.role === 'Manager') {
      this.toastr.warning('You are not authorized to delete User');
    } else {
      this.user_Service.deleteUserById(userid).subscribe({
        next: () => {
          this.toastr.success('User deleted successfully');
          this.getUserList();
        },
        error: () => {
          this.toastr.error('Server error User deleted');
        },
      });
    }
  }
}
