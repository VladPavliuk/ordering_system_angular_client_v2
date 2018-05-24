import {Component, OnInit, DoCheck} from '@angular/core';
import {Location} from '@angular/common';
import {AdminsService} from '../../../services/admins/admins.service';
import {AuthService} from '../../../services/auth/auth.service';
import {ServerApiService} from '../../../services/server-api/server-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {

  public isAuthorized = false;
  public isAdmin = false;
  constructor(
    private location: Location,
    private authService: AuthService,
    private adminService: AdminsService,
    private serverApiService: ServerApiService,
    private router: Router
  ) {
  }

  ngDoCheck() {
    this.isAuthorized = this.authService.isAuthorized();
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit() {
    this.isAuthorized = this.authService.isAuthorized();
    this.isAdmin = this.authService.isAdmin();
  }

  toPrevPage(): void {
    this.location.back();
  }

  logout(): void {
    this.authService.deleteToken();
    this.router.navigate(['/login']);
  }

}
