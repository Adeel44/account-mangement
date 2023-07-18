import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionGroupRoutingModule } from './permission-group-routing.module';
import { AddPermissionGroupComponent } from './add-permission-group/add-permission-group.component';
import { ListPermissionGroupComponent } from './list-permission-group/list-permission-group.component';
import { EditPermissionGroupComponent } from './edit-permission-group/edit-permission-group.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddPermissionGroupComponent,
    ListPermissionGroupComponent,
    EditPermissionGroupComponent
  ],
  imports: [
    CommonModule,
    PermissionGroupRoutingModule,
    ReactiveFormsModule
  ]
})
export class PermissionGroupModule { }
