import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServerApiService} from '../../../services/server-api/server-api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {

  public unActiveStarIconName = 'star_border';
  public activeStarIconName = 'star';
  public actualRate = 0;
  public currentRate = 0;
  public visualRate = 0;

  public moment = moment;
  public order: any;

  constructor(
    private route: ActivatedRoute,
    private serverApiService: ServerApiService
  ) {
  }

  ngOnInit() {
    this.getSingleOrder();
  }

  getMarkup() {
    this.serverApiService.orderApi.getMarkup(this.order.id)
      .then(innerRes => {
        if (innerRes)
          this.actualRate = innerRes.value;
      });
  }

  getSingleOrder() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.serverApiService.orderApi.show(id)
      .then(res => {
        this.order = res;
        this.getMarkup();
      });
  }

  onMouseEnterOnStart(rate: number) {
    this.visualRate = rate;
  }

  onMarkClick(rate: number) {
    this.currentRate = rate;

    this.serverApiService.orderApi.setMarkup(this.order.id, {
      comment: '',
      value: rate
    }).then(res => {
      this.getMarkup();
    });
  }
}
