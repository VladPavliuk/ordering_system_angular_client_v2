import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Organization} from '../../essences/Organization';
import {Service} from '../../essences/Service';
import {ServerService} from '../server/server.service';
import {User} from '../../essences/User';
import {AuthService} from '../auth/auth.service';
import {tap, catchError} from 'rxjs/operators';

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
        if (res['auth_token']) {
          this.authService.setToken(res['auth_token']);
          this.authService.setIsAdmin(res['is_admin']);
        }
      })
    );
  }

  getUserInfo(): Observable<User> {
    return this.serverService.request({
      method: 'get',
      auth: true,
      url: 'api/manage/user'
    });
  }

  setAvatar(image: any): Observable<any> {
    return this.serverService.request({
      method: 'post',
      auth: true,
      body: image,
      disableJsonHead: true,
      url: 'api/manage/set-avatar'
    });
  }

  organizationsOwnerList(): Observable<Organization[]> {
    return this.serverService.request({
      method: 'get',
      url: 'api/organizations/owner',
      auth: true
    });
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
      url: 'api/organizations',
      body: organization,
      auth: true
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

  servicesList(id: number): Observable<Service[]> {
    return this.serverService.request({
      method: 'get',
      url: 'api/organizations/' + id + '/services-list'
    });
  }

  availableService(id: number): Observable<Service[]> {
    return this.serverService.request({
      method: 'get',
      auth: true,
      url: 'api/organizations/' + id + '/available-services'
    });
  }

  pinService(organizationId: number, serviceId: number): any {
    return this.serverService.request({
      method: 'post',
      auth: true,
      url: 'api/organizations/pin-service/' + organizationId + '/' + serviceId
    });
  }

  unpinService(organizationId: number, serviceId: number): Observable<any> {
    return this.serverService.request({
      method: 'delete',
      auth: true,
      url: 'api/organizations/unpin-service/' + organizationId + '/' + serviceId
    });
  }

  isBelongToMe(id: number): Observable<boolean> {
    return this.serverService.request({
      method: 'get',
      auth: true,
      url: 'api/organizations/' + id + '/is-belong-to-me'
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

  store(service: Service): Observable<Service> {
    return this.serverService.request({
      method: 'post',
      auth: true,
      url: 'api/services',
      body: service
    });
  }

  index(): Observable<Service[]> {
    return this.serverService.request({
      method: 'get',
      url: 'api/services'
    });
  }

  show(id: number): Observable<Service> {
    return this.serverService.request({
      method: 'get',
      url: 'api/services/' + id
    });
  }

  update(id: number, organization: Service): Observable<Service> {
    return this.serverService.request({
      method: 'put',
      auth: true,
      url: 'api/services/' + id
    });
  }

  destroy(id: number): Observable<any> {
    return this.serverService.request({
      method: 'delete',
      auth: true,
      url: 'api/services/' + id
    });
  }
}
