import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @Input() public day;
  @Output() onSetDateEvent = new EventEmitter<any>();
  public selectedDay: any;

  constructor() {
  }

  ngOnInit() {
    this.selectedDay = [
      new Date(moment(this.day.from, 'HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')),
      new Date(moment(this.day.to, 'HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')),
    ];
  }

  onSetDate(day: any) {
    this.onSetDateEvent.emit(this.selectedDay);
  }

}
