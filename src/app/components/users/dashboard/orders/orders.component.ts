import { Component, OnInit } from '@angular/core';
import {Organization} from '../../../../essences/Organization';
import {ServerApiService} from '../../../../services/server-api/server-api.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public usersOrders: any[];
  displayedColumns = ['organization', 'service', 'price'];

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
