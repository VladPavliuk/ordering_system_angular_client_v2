import {Component, OnInit} from '@angular/core';
import {AdminsService} from '../../../services/admins/admins.service';
import {Router} from '@angular/router';
import {ServerApiService} from '../../../services/server-api/server-api.service';

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
    private serverApiService: ServerApiService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.serverApiService.organizationApi.index()
      .then(res => {
        console.log(res);
      });
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
    }).then(res => this.router.navigate(['admin/home']));
  }
}
