import {Component, OnInit} from '@angular/core';
import {AdminsService} from '../../../services/admins/admins.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public phone: string;
  public password: string;

  constructor(
    private adminsService: AdminsService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  onPasswordInput($event: any) {
    this.password = $event.target.value;
  }

  onPhoneInput($event: any) {
    this.phone = $event.target.value;
  }

  login() {
    this.adminsService.login({
      phone: this.phone,
      password: this.password
    }).subscribe(res => this.router.navigate(['admin/home']));
  }
}
