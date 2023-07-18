import { Component } from '@angular/core';
import { PermissionGroupService } from '../permission-group.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-permission-group',
  templateUrl: './list-permission-group.component.html',
  styleUrls: ['./list-permission-group.component.css']
})
export class ListPermissionGroupComponent {

  permissionGroupList:any
  constructor( private permissionGroupService:PermissionGroupService , private activatedRoute:ActivatedRoute){

  }

  ngOnInit(): void {
    this.getPermissionGroupList()
    
  }
  getPermissionGroupList(){
    this.permissionGroupService.permissionGroupList().subscribe((result:any)=>{
      this.permissionGroupList = result
      console.log(result)
    })
  }

  // deleteRole(roleid:any){
  //   console.log(roleid)
  //    this.roleService.deleteRoleById(roleid).subscribe((result)=>{
  //      //console.log(result);
  //      alert("User deleted")
  //      this.getRoleList();
  //    });

  // }

  deletePermissionGroupList(id:any){
    // console.log(id)
    //  this.permissionGroupService.deleteRoleById(id).subscribe((result)=>{
    //    //console.log(result);
    //    alert("User deleted")
    //    this.getRoleList();
    //  })
  }

}
