import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Service } from '../../essences/Service';
import {AdminsService} from '../admins/admins.service';

@Injectable()
export class ServicesService {

  protected serverRoutes = {
    domainURI: 'http://vladpavliuk-001-site1.itempurl.com/api',
    
    index(): string {
      return this.domainURI + '/services';
    },
    store(): string {
      return this.domainURI + '/services';
    },
    show(id: number): string {
      return this.domainURI + '/services/' + id;
    },
    update(id: number): string {
      return this.domainURI + '/services/' + id;
    },
    delete(id: number): string {
      return this.domainURI + '/services/' + id;
    }
  };

  constructor(
    private http: HttpClient,
    private adminsService: AdminsService
  ) { }

  index(): Observable<Service[]>  {
    return this.http.get<Service[]>(this.serverRoutes.index(), {headers: {admin_token: this.adminsService.getAuthToken()}});
  }

  show(id: number): Observable<Service>  {
    return this.http.get<Service>(this.serverRoutes.show(id), {headers: {admin_token: this.adminsService.getAuthToken()}});
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
