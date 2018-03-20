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
  public daysList: { internalTitle: string, externalTitle: string }[] = [
    {
      internalTitle: '',
      externalTitle: ''
    },
    {
      internalTitle: '',
      externalTitle: ''
    },
    {
      internalTitle: '',
      externalTitle: ''
    },
    {
      internalTitle: '',
      externalTitle: ''
    },
    {
      internalTitle: '',
      externalTitle: ''
    },
    {
      internalTitle: '',
      externalTitle: ''
    },
    {
      internalTitle: '',
      externalTitle: ''
    },
  ];

  public title: string;
  public selectedMoments = [
    new Date(2018, 1, 9, 9),
    new Date(2018, 3, 21, 18)
  ];
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

  onDayAndNightClick() {

  }

  create(): void {
    this.serverApiService
      .organizationApi
      .store({
        title: this.title
      }).then(res => {
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
