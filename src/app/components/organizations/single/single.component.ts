import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationsService } from '../../../services/organizations/organizations.service';
import { Organization } from '../../../essences/Organization';
import { Service } from '../../../essences/Service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {

  public  organization: Organization;
  public  services: Service[];
  displayedColumns = ['id', 'title', 'price', 'duration', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private organizationsService: OrganizationsService,
    private location: Location
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.getOrganization(id);
    this.getServicesList(id);
  }

  getOrganization(id: number) {
    this.organizationsService.show(id)
      .subscribe(res => {
        this.organization = res;
      });
  }

  getServicesList(id: number) {
    this.organizationsService.servicesList(id)
      .subscribe(res => {
        this.services = res;
      });
  }

  delete() {
    this.organizationsService.delete(this.organization.id)
      .subscribe(res => { this.location.back() });
  }

  unpinService(serviceId: number) {
    this.organizationsService.unpinService(this.organization.id, serviceId)
      .subscribe(res => { this.getServicesList(this.organization.id) });
  }

}
