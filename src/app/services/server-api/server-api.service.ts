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
  public orderApi: OrderApi;

  public constructor(
    private serverService: ServerService,
    private authService: AuthService,
  ) {
    this.organizationApi = new OrganizationApi(serverService);
    this.serviceApi = new ServiceApi(serverService);
    this.userApi = new UserApi(serverService, authService);
    this.orderApi = new OrderApi(serverService, authService);
  }

}

interface StandardActions<T> {
  store(instance: T): Promise<T>;

  index(): Promise<T[]>;

  show(id: number): Promise<T>;

  update(id: number, instance: T): Promise<T>;

  destroy(id: number): Promise<any>;
}

// class AdminApi implements StandardActions {
// }

class OrderApi {
  public constructor(
    private serverService: ServerService,
    private authService: AuthService
  ) {
  }

  store(order: any): Promise<any> {
    return this.serverService.request({
      method: 'post',
      auth: true,
      body: order,
      url: 'api/orders/make-order'
    });
  }

  public getAuthUserOrders(): Promise<any> {
    return this.serverService.request({
      method: 'get',
      auth: true,
      url: 'api/orders/auth-user-orders'
    });
  }

}

class UserApi implements StandardActions<User> {
  public constructor(
    private serverService: ServerService,
    private authService: AuthService
  ) {
  }

  login(userName: string, password: string): Promise<any> {
    return this.serverService.request({
      method: 'post',
      body: {
        email: userName,
        password: password
      },
      url: 'api/auth/login'
    }).then(res => {
      if (res['auth_token']) {
        this.authService.setToken(res['auth_token']);
        this.authService.setIsAdmin(res['is_admin']);
      }
    });
  }

  signup(firstName: string, lastName: string, email: string, phoneNumber: string, password: string): Promise<any> {
    return this.serverService.request({
      method: 'post',
      body: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        password: password
      },
      messageError: 'Invalid!',
      messageSuccess: 'Success signup!',
      url: 'api/account/register'
    });
  }

  getUserInfo(): Promise<User> {
    return this.serverService.request({
      method: 'get',
      auth: true,
      url: 'api/manage/user'
    });
  }

  setAvatar(image: any): Promise<any> {
    return this.serverService.request({
      method: 'post',
      auth: true,
      body: image,
      disableJsonHead: true,
      url: 'api/manage/set-avatar'
    });
  }

  organizationsOwnerList(): Promise<Organization[]> {
    return this.serverService.request({
      method: 'get',
      url: 'api/organizations/owner',
      auth: true
    });
  }

  store(instance: User): Promise<User> {
    return this.serverService.request({
      method: 'post',
      url: 'api/organizations'
    });
  }

  index(): Promise<User[]> {
    return this.serverService.request({
      method: 'get',
      url: 'api/organizations'
    });
  }

  show(id: number): Promise<User> {
    return this.serverService.request({
      method: 'get',
      url: 'api/organizations/' + id
    });
  }

  update(id: number, instance: User): Promise<User> {
    return this.serverService.request({
      method: 'put',
      url: 'api/organizations/' + id
    });
  }

  destroy(id: number): Promise<any> {
    return this.serverService.request({
      method: 'delete',
      url: 'api/organizations/' + id
    });
  }
}

class DaysApi {
  public constructor(
    private serverService: ServerService
  ) {}

  index(): Promise<any> {
    return this.serverService.request({
      url: 'api/days',
      method: 'get'
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

  setAvatar(id: number, image: any): Promise<any> {
    return this.serverService.request({
      method: 'post',
      auth: true,
      body: image,
      disableJsonHead: true,
      url: 'api/organizations/' + id + '/set-avatar'
    });
  }

  store(instance: Organization): Promise<Organization> {
    return this.serverService.request({
      method: 'post',
      url: 'api/organizations',
      body: instance,
      auth: true
    });
  }

  index(): Promise<Organization[]> {
    return this.serverService.request({
      method: 'get',
      url: 'api/organizations'
    });
  }

  show(id: number): Promise<Organization> {
    return this.serverService.request({
      method: 'get',
      url: 'api/organizations/' + id
    });
  }

  servicesList(id: number): Promise<Service[]> {
    return this.serverService.request({
      method: 'get',
      url: 'api/organizations/' + id + '/services-list'
    });
  }

  availableService(id: number): Promise<Service[]> {
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

  unpinService(organizationId: number, serviceId: number): Promise<any> {
    return this.serverService.request({
      method: 'delete',
      auth: true,
      url: 'api/organizations/unpin-service/' + organizationId + '/' + serviceId
    });
  }

  isBelongToMe(id: number): Promise<boolean> {
    return this.serverService.request({
      method: 'get',
      auth: true,
      url: 'api/organizations/' + id + '/is-belong-to-me'
    });
  }

  update(id: number, instance: Organization): Promise<Organization> {
    return this.serverService.request({
      method: 'put',
      url: 'api/organizations/' + id
    });
  }

  destroy(id: number): Promise<any> {
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

  store(instance: Service): Promise<Service> {
    return this.serverService.request({
      method: 'post',
      auth: true,
      url: 'api/services',
      body: instance
    });
  }

  organizationsList(id: number): Promise<Organization[]> {
    return this.serverService.request({
      method: 'get',
      url: 'api/services/' + id + '/organizations'
    });
  }

  index(): Promise<Service[]> {
    return this.serverService.request({
      method: 'get',
      url: 'api/services'
    });
  }

  show(id: number): Promise<Service> {
    return this.serverService.request({
      method: 'get',
      url: 'api/services/' + id
    });
  }

  update(id: number, instance: Service): Promise<Service> {
    return this.serverService.request({
      method: 'put',
      auth: true,
      url: 'api/services/' + id
    });
  }

  destroy(id: number): Promise<any> {
    return this.serverService.request({
      method: 'delete',
      auth: true,
      url: 'api/services/' + id
    });
  }
}
