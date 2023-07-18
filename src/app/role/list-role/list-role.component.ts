import { Component } from '@angular/core';
import { RoleService } from '../role.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent {
  roleList:any
  constructor( private roleService:RoleService , private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.getRoleList()
    
  }
  getRoleList(){
    this.roleService.getRoleList().subscribe((result:any)=>{
      this.roleList = result
      console.log(result)
    })
  }
  deleteRole(roleid:any){
    console.log(roleid)
     this.roleService.deleteRoleById(roleid).subscribe((result)=>{
       //console.log(result);
       alert("User deleted")
       this.getRoleList();
     });

  }



}
