import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from "../../essences/User";

@Injectable()
export class UsersService {

  protected serverRoutes = {
    domainURI: 'http://localhost:5000/api',
    
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

  constructor(private http: HttpClient) { }

  index(): Observable<User[]>  {
    return this.http.get<User[]>(this.serverRoutes.index());
  }

  show(id: number): Observable<User>  {
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
