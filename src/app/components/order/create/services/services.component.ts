import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {ServicesService} from '../../../../services/services/services.service';
import {Service} from '../../../../essences/Service';
import {Globals} from '../../../../globals';

@Component({
  selector: 'app-order-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  @Input() public services: Service[];
  @Output() public onServiceSelected = new EventEmitter<Service>();

  constructor(
    private servicesService: ServicesService,
    public globals: Globals
  ) {
  }

  ngOnInit() {

  }

  onServiceSelect(service: Service): void {
    this.onServiceSelected.emit(service);
  }

}
