import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Service } from '../../essences/Service';

@Injectable()
export class ServicesService {

  protected serverRoutes = {
    domainURI: 'http://localhost:5000/api',
    
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

  constructor(private http: HttpClient) { }

  index(): Observable<Service[]>  {
    return this.http.get<Service[]>(this.serverRoutes.index());
  }

  show(id: number): Observable<Service>  {
    return this.http.get<Service>(this.serverRoutes.show(id));
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
