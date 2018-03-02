import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders/orders.service';
import * as moment from 'moment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public orders: any;
  public moment: any;

  constructor(
    private ordersService: OrdersService,
  ) {
      this.moment = moment;
   }

  displayedColumns = ['price', 'startedAt', 'duration', 'user phone', 'user name', 'organization', 'service'];

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.ordersService.index()
      .subscribe(res => {
        this.orders = res;
      });
  }

}
