import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { ListRoleComponent } from './list-role/list-role.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditRoleComponent,
    ListRoleComponent,
    AddRoleComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    ReactiveFormsModule
  ]
})
export class RoleModule { }
