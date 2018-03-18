import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class UsersGuestGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuthorized()) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}