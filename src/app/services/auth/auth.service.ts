import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthService {

  private readonly TOKEN_KEY_IN_STORAGE: string;
  private readonly IS_ADMIN_KEY_IN_STORAGE: string;

  constructor(
    private cookieService: CookieService
  ) {
    this.TOKEN_KEY_IN_STORAGE = 'user_token';
    this.IS_ADMIN_KEY_IN_STORAGE = 'is_admin';
  }

  public getToken(): string {
    return this.cookieService.get(this.TOKEN_KEY_IN_STORAGE);
  }

  public setToken(token): void {
    this.cookieService.set(this.TOKEN_KEY_IN_STORAGE, token);
  }

  public deleteToken(): void {
    this.cookieService.delete(this.TOKEN_KEY_IN_STORAGE);
    this.deleteAdminStatusToken();
  }

  public deleteAdminStatusToken(): void {
    this.cookieService.delete(this.IS_ADMIN_KEY_IN_STORAGE);
  }

  public isAuthorized(): boolean {
    return this.cookieService.check(this.TOKEN_KEY_IN_STORAGE);
  }

  public setIsAdmin(status): void{
    return this.cookieService.set(this.IS_ADMIN_KEY_IN_STORAGE, status);
  }

  public isAdmin(): boolean {
    return this.cookieService.get(this.IS_ADMIN_KEY_IN_STORAGE) === 'true';
  }
}
