import { Component, OnInit } from '@angular/core';
import {Organization} from '../../../../essences/Organization';
import {ServerApiService} from '../../../../services/server-api/server-api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-user-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public usersOrders: any[];
  public moment = moment;
  displayedColumns = ['organization', 'service', 'price', 'started_at', 'actions'];

  constructor(
    private serverApiService: ServerApiService
  ) {
  }

  ngOnInit() {
    this.getUsersOrders();
  }

  getUsersOrders(): void {
    this.serverApiService.orderApi.getAuthUserOrders()
      .then(res => {
        this.usersOrders = res;
      });
  }

}
