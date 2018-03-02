import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ServicesService } from '../../../../services/services/services.service';
import { Service } from '../../../../essences/Service';

@Component({
  selector: 'app-order-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  @Input() public services: Service[];
  @Output() public onServiceSelected =  new EventEmitter<number>();

  constructor(private servicesService: ServicesService) { }

  ngOnInit() {
    
  }

  onServiceSelect(serviceId: any): void {
    this.onServiceSelected.emit(parseInt(serviceId.value));
  }

}
