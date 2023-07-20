import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
//import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch:'full'},
  { 
    path: 'auth', component: LayoutComponent, 
    children: [
      { path: 'users', loadChildren: () => import('./user/user.module').then(mod => mod.UserModule) },
      { path: 'role',  loadChildren: () => import('./role/role.module').then(mod => mod.RoleModule) }
     // { path: 'permission-group', loadChildren: () => import('./permission-group/permission-group.module').then(mod => mod.PermissionGroupModule) }
      
    ] ,canActivate:[AuthGuard]
   },
  {path:'login' , component:LoginComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
