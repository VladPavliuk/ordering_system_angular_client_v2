import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable()
export class AdminsGuestGuard implements CanActivate {
    constructor(
        private cookieService: CookieService,
        private router: Router
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.cookieService.check('admin_token')) {
          this.router.navigate(['/admin/home']);
        } else {
          return !this.cookieService.check('admin_token');
        }
    }
}