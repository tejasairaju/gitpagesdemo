import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router:Router,private authService:AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot)
  {
    let user=this.authService.getCurrentUser();
    if(user && user.admin)
    {
      return true;
    } 
    this.router.navigate(["/no-access"]);
    return false;
  }
}
