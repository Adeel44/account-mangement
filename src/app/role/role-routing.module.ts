import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRoleComponent } from './list-role/list-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { AddRoleComponent } from './add-role/add-role.component';

const routes: Routes = [
  { path: "add", component:AddRoleComponent },
  { path: "edit/:id", component:EditRoleComponent },
   { path: "list", component:ListRoleComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
