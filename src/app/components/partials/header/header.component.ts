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
  }

  ngOnInit() {
    this.isAuthorized = this.authService.isAuthorized();
  }

  toPrevPage(): void {
    this.location.back();
  }

  logout(): void {
    console.log('yeaaaa');
    this.authService.deleteToken();
    this.router.navigate(['/login']);
  }

}
