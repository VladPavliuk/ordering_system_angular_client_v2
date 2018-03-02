import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../../services/services/services.service';
import { Service } from '../../../essences/Service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  services: Service[];
  displayedColumns: string[] = ['title', 'price', 'duration', 'actions'];

  constructor(private servicesService: ServicesService) { }

  ngOnInit() {
    this.servicesService.index()
      .subscribe(res => {
        this.services = res;
      });
  }

}
