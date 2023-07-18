import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPermissionGroupComponent } from './add-permission-group/add-permission-group.component';
import { EditPermissionGroupComponent } from './edit-permission-group/edit-permission-group.component';
import { ListPermissionGroupComponent } from './list-permission-group/list-permission-group.component';

const routes: Routes = [
  { path: "add", component:AddPermissionGroupComponent },
  { path: "edit/:id", component:EditPermissionGroupComponent },
  { path: "list", component:ListPermissionGroupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionGroupRoutingModule { }
