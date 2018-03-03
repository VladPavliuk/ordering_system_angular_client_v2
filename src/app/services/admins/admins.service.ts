import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {User} from '../../essences/User';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable()
export class AdminsService {

  protected serverRoutes = {
    domainURI: 'http://localhost:5000/api',
    login(): string {
      return this.domainURI + '/admins/login';
    },
    index(): string {
      return this.domainURI + '/admins';
    },
    store(): string {
      return this.domainURI + '/admins';
    },
    show(id: number): string {
      return this.domainURI + '/admins/' + id;
    },
    update(id: number): string {
      return this.domainURI + '/admins/' + id;
    },
    delete(id: number): string {
      return this.domainURI + '/admins/' + id;
    }
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService
  ) {
  }

  isAuthorized(): boolean {
    return this.cookieService.check('admin_token');
  }

  logout(): void {
    this.cookieService.delete('admin_token');
    this.router.navigate(['admin/login']);
  }

  login(data: any): any {
    return this.http.post(this.serverRoutes.login(), data)
      .pipe(
        tap(res => {
          this.cookieService.set('admin_token', res['value']);
        })
      );
  }

  index(): Observable<User[]> {
    return this.http.get<User[]>(this.serverRoutes.index());
  }

  show(id: number): Observable<User> {
    return this.http.get<User>(this.serverRoutes.show(id));
  }

  update(id: number, data: any): any {
    return this.http.put(this.serverRoutes.update(id), data);
  }

  store(data: any): any {
    return this.http.post(this.serverRoutes.store(), data);
  }

  delete(id: number): any {
    return this.http.delete(this.serverRoutes.delete(id));
  }
}
