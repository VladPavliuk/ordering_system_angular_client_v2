import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {RequestStructure} from '../../essences/RequestStructure';
import {AuthService} from '../../services/auth/auth.service';

@Injectable()
export class ServerService {

  public readonly apiDomain: string;
  private readonly AUTH_TOKEN_HEADER_KEY: string;

  constructor(
    private httpDriver: HttpClient,
    private authService: AuthService
  ) {
    this.apiDomain = 'http://localhost:5000/';
    this.AUTH_TOKEN_HEADER_KEY = 'user_token';
  }

  public request(requestParams: RequestStructure): Observable<any> {
    requestParams = this.defineAuth(requestParams);
    return this.httpDriver.request(requestParams.method, this.apiDomain + requestParams.url, {
      headers: requestParams.headers
    });
  }

  private defineAuth(requestParams: RequestStructure): RequestStructure {
    if (requestParams.auth) {
      requestParams.headers.set(this.AUTH_TOKEN_HEADER_KEY, this.authService.getToken());
    }
    return requestParams;
  }
}
