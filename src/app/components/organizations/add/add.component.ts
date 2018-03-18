import {Component, OnInit} from '@angular/core';
import {ServerApiService} from '../../../services/server-api/server-api.service';
import {Location} from '@angular/common';
import {SnackBarService} from '../../../services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public title: string;

  constructor(
    private serverApiService: ServerApiService,
    private location: Location,
    private snackBarService: SnackBarService,
  ) {
  }

  ngOnInit() {
  }

  onTitleInput(event) {
    this.title = event.target.value;
  }

  create(): void {
    this.serverApiService
      .organizationApi
      .store({
        title: this.title
      }).subscribe(res => {
      this.snackBarService.show({
        data: {
          message: 'Organization created!',
        },
        panelClass: 'success',
        duration: 1000
      });
      this.location.back();
    });
  }
}
