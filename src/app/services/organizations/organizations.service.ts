import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Organization } from '../../essences/Organization';
import { Service } from '../../essences/Service';

@Injectable()
export class OrganizationsService {

  protected serverRoutes = {
    domainURI: 'http://localhost:5000/api',
    
    availableServices(id: number): string {
      return this.domainURI + '/organizations/' + id +'/available-services';
    },
    servicesList(id: number): string {
      return this.domainURI + '/organizations/' + id +'/services-list';
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

  constructor(private http: HttpClient) { }

  availableService(id: number): Observable<Service[]> {
    return this.http.get<Service[]>(this.serverRoutes.availableServices(id));
  }

  servicesList(id: number): Observable<Service[]> {
    return this.http.get<Service[]>(this.serverRoutes.servicesList(id));
  }

  pinService(organizationId: number, serviceId: number): any {
    return this.http.post(this.serverRoutes.pinService(organizationId, serviceId), {});
  }

  unpinService(organizationId: number, serviceId: number): any {
    return this.http.delete(this.serverRoutes.unpinService(organizationId, serviceId));
  }

  index(): Observable<Organization[]>  {
    return this.http.get<Organization[]>(this.serverRoutes.index());
  }

  show(id: number): Observable<Organization>  {
    return this.http.get<Organization>(this.serverRoutes.show(id));
  }

  update(id: number, data: any): any {
    return this.http.put(this.serverRoutes.update(id), data);
  }

  store(data: any): any {
    console.log(this.serverRoutes.store());
    return this.http.post(this.serverRoutes.store(), data);
  }

  delete(id: number): any {
    return this.http.delete(this.serverRoutes.delete(id));
  }
}
