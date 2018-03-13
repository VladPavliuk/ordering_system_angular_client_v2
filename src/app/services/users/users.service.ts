import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {User} from '../../essences/User';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class UsersService {

    protected serverRoutes = {
        domainURI: 'http://vladpavliuk-001-site1.itempurl.com/api',
        login(): string {
            return this.domainURI + '/users/login';
        },
        index(): string {
            return this.domainURI + '/users';
        },
        store(): string {
            return this.domainURI + '/users';
        },
        show(id: number): string {
            return this.domainURI + '/users/' + id;
        },
        update(id: number): string {
            return this.domainURI + '/users/' + id;
        },
        delete(id: number): string {
            return this.domainURI + '/users/' + id;
        }
    };

    constructor(
        private http: HttpClient,
        private cookieService: CookieService
    ) {
    }

    login(data: any): any {
        return this.http.post(this.serverRoutes.login(), data)
            .pipe(
                tap(res => {
                    this.cookieService.set('user_token', res['value']);
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
