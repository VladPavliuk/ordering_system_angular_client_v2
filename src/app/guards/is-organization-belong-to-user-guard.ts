import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute} from '@angular/router';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {ServerApiService} from '../services/server-api/server-api.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class IsOrganizationBelongToUserGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private router: Router,
    private serverApiService: ServerApiService,
    private route: ActivatedRoute
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = +route.url[1].path;
    return this.serverApiService.organizationApi.isBelongToMe(id);
  }
}