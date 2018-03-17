import {Component, OnInit} from '@angular/core';
import {ServerApiService} from '../../../services/server-api/server-api.service';
import {MatSnackBar} from '@angular/material';
import {SnackBarComponent} from '../../partials/snack-bar/snack-bar.component';
import {Router} from '@angular/router';

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
    private snackBar: MatSnackBar
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
        this.snackBar.openFromComponent(SnackBarComponent, {
          data: {
            message: 'Success login!',
          },
          panelClass: 'success',
          duration: 10000
        });
        this.router.navigate(['/home']);
      }, err => {
        if (err.status === 400) {
          this.snackBar.openFromComponent(SnackBarComponent, {
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
