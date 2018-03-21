import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ServerApiService} from '../../../services/server-api/server-api.service';
import {Location} from '@angular/common';
import {SnackBarService} from '../../../services/snack-bar/snack-bar.service';
import {DayComponent} from './includes/day/day.component';
import {MatCheckboxChange} from '@angular/material/checkbox/typings/checkbox';
import {DaySchedule} from '../../../essences/DaySchedule';
import {MatCheckboxModule} from '@angular/material';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public daysList: DaySchedule[] = [];
  public title: string;
  // public daysSchedule: {
  //   id: number,
  //   title?: string,
  //   from?: string,
  //   to?: string,
  //   isAllDayAndNight?: boolean,
  //   isHoliday?: boolean
  // }[] = [];
  @ViewChildren('dayIsDayAndCheckbox') public dayIsDayAndCheckbox: QueryList<MatCheckboxModule>;
  @ViewChildren('dayIsHolidayCheckbox') public dayIsHolidayCheckbox: QueryList<MatCheckboxModule>;
  @ViewChildren('scheduleComponent') public scheduleComponents: QueryList<DayComponent>;

  constructor(
    private serverApiService: ServerApiService,
    private location: Location,
    private snackBarService: SnackBarService,
  ) {
  }

  ngOnInit() {
    this.getDaysList();
  }

  onTitleInput(event) {
    this.title = event.target.value;
  }

  getDaysList() {
    this.serverApiService.daysApi.index()
      .then(res => {
        this.daysList = res;
      });
  }

  setDayAndNightStatus(day: DaySchedule, iterator: number, status: MatCheckboxChange) {
    for (let i = 0; i < this.daysList.length; i++) {
      if (day.id === this.daysList[i].id) {
        this.daysList[i].isAllDayAndNight = status.checked;
        this.daysList[i].isHoliday = false;
      }
    }

    for (let i = 0; i < this.dayIsHolidayCheckbox.toArray().length; i++) {
      if (iterator + '-is-holiday-checkbox' === this.dayIsHolidayCheckbox.toArray()[i]['id']) {
        this.dayIsHolidayCheckbox.toArray()[i]['checked'] = false;
      }
    }
  }

  setHolidayStatus(day: DaySchedule, iterator: number, status: MatCheckboxChange) {
    for (let i = 0; i < this.daysList.length; i++) {
      if (day.id === this.daysList[i].id) {
        this.daysList[i].isHoliday = status.checked;
        this.daysList[i].isAllDayAndNight = false;
      }
    }

    for (let i = 0; i < this.dayIsDayAndCheckbox.toArray().length; i++) {
      if (iterator + '-is-day-and-night-checkbox' === this.dayIsDayAndCheckbox.toArray()[i]['id']) {
        this.dayIsDayAndCheckbox.toArray()[i]['checked'] = false;
      }
    }
  }

  onSetDate(date) {

    console.log(date);
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
