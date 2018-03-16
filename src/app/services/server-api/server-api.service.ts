import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Organization} from '../../essences/Organization';
import {Service} from '../../essences/Service';
import {ServerService} from '../server/server.service';
import {User} from '../../essences/User';

@Injectable()
export class ServerApiService {
  public organizationApi: OrganizationApi;
  public serviceApi: ServiceApi;

  public constructor(
    private serverService: ServerService,
  ) {
    this.organizationApi = new OrganizationApi(serverService);
    this.serviceApi = new ServiceApi(serverService);
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
    private serverService: ServerService
  ) {
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
