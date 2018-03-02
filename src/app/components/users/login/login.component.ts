import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../services/users/users.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public email: string;
    public password: string;

    constructor(private usersService: UsersService) {
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
        this.usersService.login({
            email: this.email,
            password: this.password
        }).subscribe(res => {
            console.log(res);
        });
    }
}
