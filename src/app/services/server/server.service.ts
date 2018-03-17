import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {RequestStructure} from '../../essences/RequestStructure';
import {AuthService} from '../../services/auth/auth.service';
import {HttpHeaders} from '@angular/common/http/src/headers';

@Injectable()
export class ServerService {

  public readonly apiDomain: string;
  private readonly AUTH_TOKEN_HEADER_KEY: string;

  constructor(
    private httpDriver: HttpClient,
    private authService: AuthService
  ) {
    this.apiDomain = 'http://localhost:5000/';
    this.AUTH_TOKEN_HEADER_KEY = 'Authorization';
  }

  public request(requestParams: RequestStructure): Observable<any> {

    requestParams = this.defineHeaders(requestParams);
    requestParams = this.defineAuth(requestParams);

    return this.httpDriver.request(requestParams.method, this.apiDomain + requestParams.url, {
      headers: requestParams.headers,
      body: requestParams.body
    });
  }

  private defineHeaders(requestParams: RequestStructure): RequestStructure {
    if (!requestParams.headers) {
      requestParams.headers = {};
    }
    requestParams.headers['Content-Type'] = 'application/json';
    return requestParams;
  }

  private defineAuth(requestParams: RequestStructure): RequestStructure {
    if (requestParams.auth) {
      requestParams.headers[this.AUTH_TOKEN_HEADER_KEY] = 'Bearer ' + this.authService.getToken();
    }
    return requestParams;
  }
}
