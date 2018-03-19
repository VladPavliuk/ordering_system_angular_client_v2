import {Component, OnInit} from '@angular/core';
import {ServerApiService} from '../../../services/server-api/server-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public firstName: string;
  public lastName: string;
  public email: string;
  public phoneNumber: string;
  public password: string;

  constructor(
    private serverApiService: ServerApiService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  userSignup() {
    this.serverApiService.userApi.signup(
      this.firstName,
      this.lastName,
      this.email,
      this.phoneNumber,
      this.password
    ).then(res => {
      this.serverApiService.userApi.login(this.email, this.password)
        .then(innerRes => {
          this.router.navigate(['/home']);
        });
    });
  }

}
