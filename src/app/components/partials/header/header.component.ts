import {Component, OnInit, DoCheck} from '@angular/core';
import {Location} from '@angular/common';
import {AdminsService} from '../../../services/admins/admins.service';
import {AuthService} from '../../../services/auth/auth.service';

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
    private adminService: AdminsService
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
    this.adminService.logout();
  }

}
