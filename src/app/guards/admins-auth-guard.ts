import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable()
export class AdminsAuthGuard implements CanActivate {
    constructor(
        private cookieService: CookieService,
        private router: Router
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.cookieService.check('is_admin') && this.cookieService.get('is_admin')) {
            return true;
        } else {
            this.router.navigate(['/admin/login']);
        }
    }
}