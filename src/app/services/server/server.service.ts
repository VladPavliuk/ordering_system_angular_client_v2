import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {RequestStructure} from '../../essences/RequestStructure';
import {AuthService} from '../../services/auth/auth.service';
import {HttpHeaders} from '@angular/common/http/src/headers';
import {SnackBarService} from '../snack-bar/snack-bar.service';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Router} from '@angular/router';

@Injectable()
export class ServerService {

  public readonly apiDomain: string;
  private readonly AUTH_TOKEN_HEADER_KEY: string;

  constructor(
    private httpDriver: HttpClient,
    private authService: AuthService,
    private snackBarService: SnackBarService,
    private router: Router
  ) {
    this.apiDomain = 'http://localhost:5000/';
    this.AUTH_TOKEN_HEADER_KEY = 'Authorization';
  }

  public request(requestParams: RequestStructure): Promise<any> {
    requestParams = this.defineHeaders(requestParams);
    requestParams = this.defineAuth(requestParams);

    return new Promise((resolve, reject) => {
      this.httpDriver.request(requestParams.method, this.apiDomain + requestParams.url, {
        headers: requestParams.headers,
        body: requestParams.body
      }).toPromise()
        .then(res => {
          this.handleSuccessResponse(res, requestParams);
          resolve(res);
        }).catch(err => {
        this.handleErrorResponse(err, requestParams);
        reject(err);
      });
    });
  }

  private handleSuccessResponse(response, requestParams: RequestStructure) {
    if (requestParams.messageSuccess) {
      this.showResponseMessage(requestParams.messageSuccess, 'success');
    }

    console.log('|-----------------------------------------------------------------------------------------------');
    console.log('|REQUEST:', requestParams);
    console.log('|RESPONSE:', response);
    console.log('|-----------------------------------------------------------------------------------------------');
  }

  private handleErrorResponse(response, requestParams: RequestStructure) {
    if (response.status === 401) {
      this.authService.deleteToken();
      this.authService.deleteAdminStatusToken();
      this.router.navigate(['/login']);
    }

    if (requestParams.messageError) {
      this.showResponseMessage(requestParams.messageError, 'error');
    }
    console.error('|-----------------------------------------------------------------------------------------------');
    console.error('|REQUEST:', requestParams);
    console.error('|RESPONSE:', response);
    console.error('|-----------------------------------------------------------------------------------------------');
  }

  // private handleErrorResponse<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //
  //     console.error(error);
  //     console.error(error);
  //     console.error(error);
  //     console.error(error);
  //
  //     return of(result as T);
  //   };
  // }

  private showResponseMessage(message: string, status: string): any {
    this.snackBarService.show({
      data: {
        message: message,
      },
      panelClass: status,
      duration: 1000
    });
  }

  private defineHeaders(requestParams: RequestStructure): RequestStructure {
    if (!requestParams.headers) {
      requestParams.headers = {};
    }
    if (!requestParams.disableJsonHead) {
      requestParams.headers['Content-Type'] = 'application/json';
    }
    return requestParams;
  }

  private defineAuth(requestParams: RequestStructure): RequestStructure {
    if (requestParams.auth) {
      requestParams.headers[this.AUTH_TOKEN_HEADER_KEY] = 'Bearer ' + this.authService.getToken();
    }
    return requestParams;
  }
}
