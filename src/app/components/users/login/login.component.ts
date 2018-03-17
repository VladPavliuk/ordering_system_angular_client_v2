import {Component, OnInit} from '@angular/core';
import {ServerApiService} from '../../../services/server-api/server-api.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public email: string;
    public password: string;

    constructor(
      private serverApiService: ServerApiService
    ) {
    }

    ngOnInit() {
    }

    onPasswordInput($event: any) {
        this.password = $event.target.value;
    }

    onEmailInput($event: any) {
        this.email = $event.target.value;
    }

    login() {
        this.serverApiService.userApi.login(this.email, this.password)
          .subscribe(res => {
              console.log(res);
              console.log(res);
              console.log(res);
          });
    }
}
