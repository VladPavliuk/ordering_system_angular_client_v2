import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {RequestStructure} from '../../essences/RequestStructure';
import {AuthService} from '../../services/auth/auth.service';
import {HttpHeaders} from '@angular/common/http/src/headers';
import {SnackBarService} from '../snack-bar/snack-bar.service';

@Injectable()
export class ServerService {

  public readonly apiDomain: string;
  private readonly AUTH_TOKEN_HEADER_KEY: string;

  constructor(
    private httpDriver: HttpClient,
    private authService: AuthService,
    private snackBarService: SnackBarService
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

  // private showMessage(message: string, status: string) {
  //   this.snackBarService.show({
  //     data: {
  //       message: message,
  //     },
  //     panelClass: status,
  //     duration: 10000
  //   });
  // }

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
