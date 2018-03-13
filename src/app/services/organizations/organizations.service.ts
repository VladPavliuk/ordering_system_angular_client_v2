import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Organization} from '../../essences/Organization';
import {Service} from '../../essences/Service';
import {AdminsService} from '../admins/admins.service';

@Injectable()
export class OrganizationsService {

  protected serverRoutes = {
    domainURI: 'http://vladpavliuk-001-site1.itempurl.com/api',

    availableServices(id: number): string {
      return this.domainURI + '/organizations/' + id + '/available-services';
    },
    servicesList(id: number): string {
      return this.domainURI + '/organizations/' + id + '/services-list';
    },
    pinService(organizationId: number, serviceId: number): string {
      return this.domainURI + '/organizations/pin-service/' + organizationId + '/' + serviceId;
    },
    unpinService(organizationId: number, serviceId: number): string {
      return this.domainURI + '/organizations/unpin-service/' + organizationId + '/' + serviceId;
    },
    index(): string {
      return this.domainURI + '/organizations';
    },
    store(): string {
      return this.domainURI + '/organizations';
    },
    show(id: number): string {
      return this.domainURI + '/organizations/' + id;
    },
    update(id: number): string {
      return this.domainURI + '/organizations/' + id;
    },
    delete(id: number): string {
      return this.domainURI + '/organizations/' + id;
    }
  };

  constructor(
    private http: HttpClient,
    private adminsService: AdminsService
  ) {
  }

  availableService(id: number): Observable<Service[]> {
    return this.http.get<Service[]>(this.serverRoutes.availableServices(id), {headers: {admin_token: this.adminsService.getAuthToken()}});
  }

  servicesList(id: number): Observable<Service[]> {
    return this.http.get<Service[]>(this.serverRoutes.servicesList(id), {headers: {admin_token: this.adminsService.getAuthToken()}});
  }

  pinService(organizationId: number, serviceId: number): any {
    return this.http.post(this.serverRoutes.pinService(organizationId, serviceId), {}, {headers: {admin_token: this.adminsService.getAuthToken()}});
  }

  unpinService(organizationId: number, serviceId: number): any {
    return this.http.delete(this.serverRoutes.unpinService(organizationId, serviceId), {headers: {admin_token: this.adminsService.getAuthToken()}});
  }

  index(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.serverRoutes.index(), {headers: {admin_token: this.adminsService.getAuthToken()}});
  }

  show(id: number): Observable<Organization> {
    return this.http.get<Organization>(this.serverRoutes.show(id), {headers: {admin_token: this.adminsService.getAuthToken()}});
  }

  update(id: number, data: any): any {
    return this.http.put(this.serverRoutes.update(id), data, {headers: {admin_token: this.adminsService.getAuthToken()}});
  }

  store(data: any): any {
    console.log(this.serverRoutes.store());
    return this.http.post(this.serverRoutes.store(), data, {headers: {admin_token: this.adminsService.getAuthToken()}});
  }

  delete(id: number): any {
    return this.http.delete(this.serverRoutes.delete(id), {headers: {admin_token: this.adminsService.getAuthToken()}});
  }
}
