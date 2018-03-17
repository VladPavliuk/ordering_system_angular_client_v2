import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Organization} from '../../essences/Organization';
import {Service} from '../../essences/Service';
import {ServerService} from '../server/server.service';
import {User} from '../../essences/User';
import {AuthService} from '../auth/auth.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class ServerApiService {
  public organizationApi: OrganizationApi;
  public serviceApi: ServiceApi;
  public userApi: UserApi;

  public constructor(
    private serverService: ServerService,
    private authService: AuthService,
  ) {
    this.organizationApi = new OrganizationApi(serverService);
    this.serviceApi = new ServiceApi(serverService);
    this.userApi = new UserApi(serverService, authService);
  }

}

interface StandardActions<T> {
  store(instance: T): Observable<T>;

  index(): Observable<T[]>;

  show(id: number): Observable<T>;

  update(id: number, instance: T): Observable<T>;

  destroy(id: number): Observable<any>;
}

// class AdminApi implements StandardActions {
// }

class UserApi implements StandardActions<User> {
  public constructor(
    private serverService: ServerService,
    private authService: AuthService
  ) {
  }

  login(userName: string, password: string): Observable<any> {
    return this.serverService.request({
      method: 'post',
      body: {
        email: userName,
        password: password
      },
      url: 'api/auth/login'
    }).pipe(
      tap(res => {
        this.authService.setToken(res['auth_token']);
      })
    );
  }

  store(organization: User): Observable<User> {
    return this.serverService.request({
      method: 'post',
      url: 'api/organizations'
    });
  }

  index(): Observable<User[]> {
    return this.serverService.request({
      method: 'get',
      url: 'api/organizations'
    });
  }

  show(id: number): Observable<User> {
    return this.serverService.request({
      method: 'get',
      url: 'api/organizations/' + id
    });
  }

  update(id: number, organization: User): Observable<User> {
    return this.serverService.request({
      method: 'put',
      url: 'api/organizations/' + id
    });
  }

  destroy(id: number): Observable<any> {
    return this.serverService.request({
      method: 'delete',
      url: 'api/organizations/' + id
    });
  }
}

// class OrderApi implements StandardActions {
// }

class OrganizationApi implements StandardActions<Organization> {
  public constructor(
    private serverService: ServerService
  ) {
  }

  store(organization: Organization): Observable<Organization> {
    return this.serverService.request({
      method: 'post',
      url: 'api/organizations'
    });
  }

  index(): Observable<Organization[]> {
    return this.serverService.request({
      method: 'get',
      url: 'api/organizations'
    });
  }

  show(id: number): Observable<Organization> {
    return this.serverService.request({
      method: 'get',
      url: 'api/organizations/' + id
    });
  }

  update(id: number, organization: Organization): Observable<Organization> {
    return this.serverService.request({
      method: 'put',
      url: 'api/organizations/' + id
    });
  }

  destroy(id: number): Observable<any> {
    return this.serverService.request({
      method: 'delete',
      url: 'api/organizations/' + id
    });
  }
}

class ServiceApi implements StandardActions<Service> {
  public constructor(
    private serverService: ServerService
  ) {
  }

  store(organization: Service): Observable<Service> {
    return this.serverService.request({
      method: 'post',
      url: 'api/organizations'
    });
  }

  index(): Observable<Service[]> {
    return this.serverService.request({
      method: 'get',
      url: 'api/organizations'
    });
  }

  show(id: number): Observable<Service> {
    return this.serverService.request({
      method: 'get',
      url: 'api/organizations/' + id
    });
  }

  update(id: number, organization: Service): Observable<Service> {
    return this.serverService.request({
      method: 'put',
      url: 'api/organizations/' + id
    });
  }

  destroy(id: number): Observable<any> {
    return this.serverService.request({
      method: 'delete',
      url: 'api/organizations/' + id
    });
  }
}
