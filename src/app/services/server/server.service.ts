import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {RequestStructure} from '../../essences/RequestStructure';
import {AuthService} from '../../services/auth/auth.service';
import {HttpHeaders} from '@angular/common/http/src/headers';
import {SnackBarService} from '../snack-bar/snack-bar.service';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

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

  public request(requestParams: RequestStructure): Promise<any> {
    requestParams = this.defineHeaders(requestParams);
    requestParams = this.defineAuth(requestParams);

    return this.httpDriver.request(requestParams.method, this.apiDomain + requestParams.url, {
      headers: requestParams.headers,
      body: requestParams.body
    }).pipe(
      tap(res => {
        if (requestParams.messageSuccess) {
          this.showResponseMessage(requestParams.messageSuccess, 'success');
        }

        console.log('|-----------------------------------------------------------------------------------------------');
        console.log('|REQUEST:', requestParams);
        console.log('|RESPONSE:', res);
        console.log('|-----------------------------------------------------------------------------------------------');
      }),
      catchError(err => {
        if (requestParams.messageError) {
          this.showResponseMessage(requestParams.messageError, 'error');
        }
        console.error('|-----------------------------------------------------------------------------------------------');
        console.error('|REQUEST:', requestParams);
        console.error('|RESPONSE:', err);
        console.error('|-----------------------------------------------------------------------------------------------');

        return of('error');
      })
    ).toPromise();
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
