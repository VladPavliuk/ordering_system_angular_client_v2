import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ServerApiService} from '../../../services/server-api/server-api.service';
import {Location} from '@angular/common';
import {SnackBarService} from '../../../services/snack-bar/snack-bar.service';
import {DayComponent} from './includes/day/day.component';
import {MatCheckboxChange} from '@angular/material/checkbox/typings/checkbox';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public daysList: any[] = [];
  public title: string;
  public daysSchedule: {
    id: number,
    title?: string,
    from?: string,
    to?: string,
    isAllDayAndNight?: boolean,
    isHoliday?: boolean
  }[] = [];

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

  setDayAndNightStatus(day, status: MatCheckboxChange) {
    if (status.checked) {
      day.isHoliday = false;
      day.isAllDayAndNight = true;
      this.addDayToList(day);
    } else {
      this.removeDayFromList(day);
    }
  }

  setHolidayStatus(day, status: MatCheckboxChange) {
    if (status.checked) {
      day.isHoliday = true;
      day.isAllDayAndNight = false;
      this.addDayToList(day);
    } else {
      this.removeDayFromList(day);
    }

    // this.scheduleComponents.toArray().forEach(el => {
    //   if (el.day.id === day.id) {
    //
    //   }
    // });
  }

  isDayExistsInList(day) {
    let i;

    for (i = 0; this.daysSchedule.length; i++) {
      if (day.id === this.daysSchedule[i].id) {
        return true;
      }
    }
    return false;
  }

  addDayToList(day) {
    if (!this.isDayExistsInList(day)) {
      this.daysSchedule.push({
        id: day.id,
        isHoliday: day.isHoliday
      });
    }
  }

  removeDayFromList(day) {
    let i;

    for (i = 0; this.daysSchedule.length; i++) {
      if (day.id === this.daysSchedule[i].id) {
        this.daysSchedule.splice(i, 1);
      }
    }
    return false;
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
