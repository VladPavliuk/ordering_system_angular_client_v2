import {Component, OnInit} from '@angular/core';
import {ServicesService} from '../../../services/services/services.service';
import {Location} from '@angular/common';
import {ServerApiService} from '../../../services/server-api/server-api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public title: string;
  public price: number;
  public duration: number;

  constructor(
    private servicesService: ServicesService,
    private location: Location,
    private serverApiService: ServerApiService
  ) {
  }

  ngOnInit() {

  }

  onTitleInput(event) {
    this.title = event.target.value;
  }

  onPriceInput(event) {
    this.price = parseFloat(event.target.value);
  }

  onDurationInput(event) {
    this.duration = parseFloat(event.target.value);
  }

  create(): void {
    this.serverApiService.serviceApi.store({
      title: this.title,
      price: this.price,
      duration: this.duration
    }).then(res => {
      this.location.back();
    });
  }

}
