import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private router: Router){}

  //si no esta autentificado, manda a login
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this._authService.loggedIn()){//si esta identificado, true si no navegas a identificacion
        return true;
      }else{
        this.router.navigate(['/identificacion']);
        return false;
      }
  }
}