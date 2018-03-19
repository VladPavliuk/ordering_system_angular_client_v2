import {Component, OnInit} from '@angular/core';
import {ServerApiService} from '../../../services/server-api/server-api.service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../../services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(
    private serverApiService: ServerApiService,
    private router: Router,
    private snackBarService: SnackBarService,
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
      .then(res => {
        this.snackBarService.show({
          data: {
            message: 'Success login!',
          },
          panelClass: 'success',
          duration: 10000
        });
        this.router.navigate(['/home']);
      }, err => {
        if (err.status === 400) {
          this.snackBarService.show({
            data: {
              message: 'Invalid!',
            },
            panelClass: 'error',
            duration: 1000
          });
        }
      });
  }
}
