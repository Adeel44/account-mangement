import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthGuard } from './guard/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'auth', 
    component: LayoutComponent,  
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('./user/user.module').then((mod) => mod.UserModule),  canActivate : [AuthGuard]
      },
      {
        path: 'role',
        loadChildren: () =>
          import('./role/role.module').then((mod) => mod.RoleModule),  canActivate : [AuthGuard]
      },
      {
        path: 'ledger',
        loadChildren: () =>
          import('./ledger/ledger.module').then((mod) => mod.LedgerModule),  canActivate : [AuthGuard]
      }, 
    ]
  ,canActivate : [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent,canActivate : [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
