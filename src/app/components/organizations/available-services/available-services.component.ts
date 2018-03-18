import {Component, OnInit} from '@angular/core';
import {OrganizationsService} from '../../../services/organizations/organizations.service';
import {Service} from '../../../essences/Service';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {ServerApiService} from '../../../services/server-api/server-api.service';
import {SnackBarService} from '../../../services/snack-bar/snack-bar.service';

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
    private serverApiService: ServerApiService,
    private route: ActivatedRoute,
    private location: Location,
    private authServer: AuthService,
    private snackBarService: SnackBarService
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
    this.serverApiService.organizationApi.availableService(id)
      .subscribe(res => {
        this.availableServices = res;
      });
  }

  pinService(serviceId: number): void {
    this.serverApiService.organizationApi.pinService(this.organizationId, serviceId)
      .subscribe(res => {
        this.snackBarService.show({
          data: {
            message: `Service pined`,
          },
          panelClass: 'success',
          duration: 1000
        });
        this.location.back();
      });
  }

}
