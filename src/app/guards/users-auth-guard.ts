import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from '../services/auth/auth.service';

@Injectable()
export class UsersAuthGuard implements CanActivate {
    constructor(
        private cookieService: CookieService,
        private authService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.isAuthorized();
    }
}