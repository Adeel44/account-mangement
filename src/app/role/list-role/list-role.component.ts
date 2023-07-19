import { Component } from '@angular/core';
import { RoleService } from '../role.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent {
  roleList:any
  // Loged User Data saved in variable
  LogedInUser:any
  constructor( private roleService:RoleService , private activatedRoute:ActivatedRoute , private toastr:ToastrService ){

  }

  ngOnInit(): void {

    this.LogedInUser= sessionStorage.getItem('userInfo');
    this.LogedInUser= JSON.parse(this.LogedInUser)
    //this.role= this.LogedInUser.role
 
    console.log("Login User Detail"+this.LogedInUser)
    console.log("Login User role"+this.LogedInUser.role)
    console.log("Login User email:"+this.LogedInUser.email)

    this.getRoleList()
    
  }
  getRoleList(){
    this.roleService.getRoleList().subscribe((result:any)=>{
      this.roleList = result
      console.log(result)
    })
  }
  deleteRole(roleid:any){
    if(this.LogedInUser.role==='Manger'){
    this.toastr.warning('You are not authorized to delete Role');
    }else{
     console.log(roleid)
     this.roleService.deleteRoleById(roleid).subscribe((result)=>{
       //console.log(result);
       this.toastr.success("Role deleted successfully")
       this.getRoleList();
     });
    }

  }



}
