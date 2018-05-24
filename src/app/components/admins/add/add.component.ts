import { Component, OnInit } from '@angular/core';
import {ServerApiService} from '../../../services/server-api/server-api.service';
import {Location} from '@angular/common';
import {SnackBarService} from '../../../services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
	public name: string;
	public password: string;

  constructor(
    private serverApiService: ServerApiService,
    private location: Location,
    private snackBarService: SnackBarService,
  ) {
  }

  ngOnInit() {
  }

	onNameInput(event) {
	  this.name = event.target.value;
	}

	onPasswordInput(event) {
    this.password = event.target.value;
  }

  create(): void {
    this.serverApiService
      .userApi
      .addAdmin({
        name: this.name,
        password: this.password
      }).then(res => {
      this.snackBarService.show({
        data: {
          message: 'Admin added!',
        },
        panelClass: 'success',
        duration: 1000
      });
      this.location.back();
    });
  }

}
