import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../../services/services/services.service';
import { Service } from '../../../essences/Service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {

  public service: Service;

  constructor(
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    private location: Location
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.getOrganization(id);
  }

  getOrganization(id: number) {
    this.servicesService.show(id)
      .subscribe(res => {
        this.service = res;
      });
  }

  delete() {
    this.servicesService.delete(this.service.id)
      .subscribe(res => { this.location.back() });
  }

}
