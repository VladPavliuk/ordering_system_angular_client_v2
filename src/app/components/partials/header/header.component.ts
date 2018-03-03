import {Component, OnInit, DoCheck} from '@angular/core';
import {Location} from '@angular/common';
import {AdminsService} from '../../../services/admins/admins.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {

  public isAuthorized: boolean = false;
  constructor(
    private location: Location,
    private adminService: AdminsService
  ) {
  }

  ngDoCheck() {
    this.isAuthorized = this.adminService.isAuthorized();
  }

  ngOnInit() {
    this.isAuthorized = this.adminService.isAuthorized();
  }

  toPrevPage(): void {
    this.location.back();
  }

  adminLogout(): void {
    this.adminService.logout();
  }

}
