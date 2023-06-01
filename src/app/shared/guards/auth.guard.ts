import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthPermissionService{

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  public canActivate(): boolean {
    if(!this.authService.checkToken()){
      this.router.navigate(['/auth'])
      return false
    }else{
      this.authService.loggedInSubject.next(true)
      return true
    }
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthPermissionService).canActivate()
};
