import { Component, OnInit } from '@angular/core';
import { OrganizationsService } from '../../../services/organizations/organizations.service';
import { Service } from '../../../essences/Service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-available-services',
  templateUrl: './available-services.component.html',
  styleUrls: ['./available-services.component.css']
})
export class AvailableServicesComponent implements OnInit {
  public availableServices: Service[];
  public organizationId: number;
  public displayedColumns = ['id', 'title', 'price', 'duration', 'actions'];
  
  constructor(
    private organizationsService: OrganizationsService, 
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.organizationId = +this.route.snapshot.paramMap.get('id');

    this.getAvailableServices(this.organizationId);
  }

  getAvailableServices(id: number): void {
    this.organizationsService.availableService(id)
      .subscribe(res => {
        this.availableServices = res;
      });
  }

  pinService(serviceId: number): void {
    this.organizationsService.pinService(this.organizationId, serviceId)
      .subscribe(res => {
        this.location.back();
      });
  }

}
