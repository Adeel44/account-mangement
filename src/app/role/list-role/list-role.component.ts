import { Component } from '@angular/core';
import { RoleService } from '../role.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent {
  roleList: any
  LogedInUser: any
  constructor(private roleService: RoleService, private toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.LogedInUser = sessionStorage.getItem('userInfo');
    this.LogedInUser = JSON.parse(this.LogedInUser)
    this.getRoleList()
  }
  getRoleList() {
    this.roleService.getRoleList().subscribe({
      next: (res) => {
        this.roleList = res
      },
      error: () => {
        this.toastr.error("Server error");
      }
    })
  }
  deleteRole(roleid: string) {
    if (this.LogedInUser.role === 'Manager') {
      this.toastr.warning('You are not authorized to delete Role');
    } else {
      this.roleService.deleteRoleById(roleid).subscribe({
        next: () => {
          this.toastr.success("Role deleted successfully")
          this.getRoleList();
        },
        error: () => {
          this.toastr.error("Role not deleted ");
        }
      })
    }
  }
}
