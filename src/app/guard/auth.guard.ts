import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    //    let isLoggedin = this.userService.isAuth();

    //    if(isLoggedin){

    //     return true;

    //    }else{
    //     this.router.navigate(['/login']);
    //    }

    // return true;
    // }
    //////

    if (this.userService.isLogged()) {
      return true

    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
