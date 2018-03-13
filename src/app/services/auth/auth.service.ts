import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthService {

  private readonly TOKEN_KEY_IN_STORAGE: string;

  constructor(
    private cookieService: CookieService
  ) {
    this.TOKEN_KEY_IN_STORAGE = 'user_token';
  }

  public getToken(): string {
    return this.cookieService.get(this.TOKEN_KEY_IN_STORAGE);
  }

  public setToken(token): void {
    this.cookieService.set(this.TOKEN_KEY_IN_STORAGE, token);
  }

  public isAuthorized(): boolean {
    return  this.cookieService.check(this.TOKEN_KEY_IN_STORAGE);
  }
}
