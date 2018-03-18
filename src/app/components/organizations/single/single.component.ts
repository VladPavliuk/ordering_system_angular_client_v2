import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrganizationsService} from '../../../services/organizations/organizations.service';
import {Organization} from '../../../essences/Organization';
import {Service} from '../../../essences/Service';
import {Location} from '@angular/common';
import {ServerApiService} from '../../../services/server-api/server-api.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {

  public organization: Organization;
  public isOrganizationBelongToMe = false;
  public services: Service[];
  displayedColumns = ['id', 'title', 'price', 'duration', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private serverApiService: ServerApiService,
    private location: Location
  ) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.getOrganization(id);
    this.checkIsOrganizationBelongToMe(id);
    this.getServicesList(id);
  }

  getOrganization(id: number) {
    this.serverApiService.organizationApi.show(id)
      .subscribe(res => {
        this.organization = res;
      });
  }

  checkIsOrganizationBelongToMe(id: number) {
    return this.serverApiService.organizationApi.isBelongToMe(id)
      .subscribe(res => {
        this.isOrganizationBelongToMe = res;
      });
  }

  getServicesList(id: number) {
    this.serverApiService.organizationApi.servicesList(id)
      .subscribe(res => {
        this.services = res;
      });
  }

  delete() {
    this.serverApiService.organizationApi.destroy(this.organization.id)
      .subscribe(res => {
        this.location.back();
      });
  }

  unpinService(serviceId: number) {
    this.serverApiService.organizationApi.unpinService(this.organization.id, serviceId)
      .subscribe(res => {
        this.getServicesList(this.organization.id);
      });
  }

}
