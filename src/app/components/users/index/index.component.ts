import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';
import { User } from '../../../essences/User';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public users: User[];
  displayedColumns: string [] = ['firstName', 'lastName', 'phone'];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): any {
    this.usersService.index()
      .subscribe(res => {
        this.users = res;
      });
  }

}
