import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuardService implements CanActivate {

  constructor(private authHelper: AuthService, public router:Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      if(this.authHelper.isUserLogin)
      {
        
        return true
      }
      else
      {
        this.router.navigate([''])
        return false
      }
    }
}

