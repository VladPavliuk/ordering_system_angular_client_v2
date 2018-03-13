import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Organization} from '../../essences/Organization';
import {Service} from '../../essences/Service';
import {AdminsService} from '../admins/admins.service';

@Injectable()
export class OrdersService {

  protected serverRoutes = {
    domainURI: 'http://vladpavliuk-001-site1.itempurl.com/api',
    index(): string {
      return this.domainURI + '/orders';
    },
    store(): string {
      return this.domainURI + '/make-order';
    },
    show(id: number): string {
      return this.domainURI + '/orders/' + id;
    },
    update(id: number): string {
      return this.domainURI + '/orders/' + id;
    },
    delete(id: number): string {
      return this.domainURI + '/orders/' + id;
    }
  };

  constructor(
    private http: HttpClient,
    private adminsService: AdminsService
  ) {
  }

  index(): any {
    return this.http.get(this.serverRoutes.index(), {headers: {token: this.adminsService.getAuthToken()}});
  }

  show(id: number): any {
    return this.http.get(this.serverRoutes.show(id));
  }

  update(id: number, data: any): any {
    return this.http.put(this.serverRoutes.update(id), data);
  }

  store(data: any): any {
    console.log(this.serverRoutes.store(), {headers: {admin_token: this.adminsService.getAuthToken()}});
    return this.http.post(this.serverRoutes.store(), data);
  }

  delete(id: number): any {
    return this.http.delete(this.serverRoutes.delete(id));
  }

}
