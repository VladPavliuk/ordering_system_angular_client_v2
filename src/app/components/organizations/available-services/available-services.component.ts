import {Component, OnInit} from '@angular/core';
import {OrganizationsService} from '../../../services/organizations/organizations.service';
import {Service} from '../../../essences/Service';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-available-services',
  templateUrl: './available-services.component.html',
  styleUrls: ['./available-services.component.css']
})
export class AvailableServicesComponent implements OnInit {
  public isAdmin = false;
  public availableServices: Service[];
  public organizationId: number;
  public displayedColumns = ['id', 'title', 'price', 'duration', 'actions'];

  constructor(
    private organizationsService: OrganizationsService,
    private route: ActivatedRoute,
    private location: Location,
    private authServer: AuthService
  ) {
  }

  ngOnInit() {
    this.organizationId = +this.route.snapshot.paramMap.get('id');
    this.checkIsAdmin();
    this.getAvailableServices(this.organizationId);
  }

  checkIsAdmin() {
    this.isAdmin = this.authServer.isAdmin();
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
