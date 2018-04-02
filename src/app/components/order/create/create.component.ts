import {Component, OnInit} from '@angular/core';
import {OrganizationsService} from '../../../services/organizations/organizations.service';
import {OrdersService} from '../../../services/orders/orders.service';
import {ServicesService} from '../../../services/services/services.service';
import {Organization} from '../../../essences/Organization';
import {Service} from '../../../essences/Service';
import {Location} from '@angular/common';
import * as moment from 'moment';
import {ServerApiService} from '../../../services/server-api/server-api.service';
import {Router} from '@angular/router';
import {Globals} from '../../../globals';
import {SnackBarService} from '../../../services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public stepperIndex = 0;
  public selectedOrganization: Organization;
  public selectedService: Service;
  public moment = moment;
  public services: Service[];
  public organizations: Organization[];
  public isAvailable = false;

  private customerFirstName: string;
  private customerLastName: string;
  private customerPhone: string;
  private customerService: Service;
  public startingDate: any = '';
  public endingDate: any = '';

  constructor(
    private organizationsService: OrganizationsService,
    private servicesService: ServicesService,
    private ordersService: OrdersService,
    private location: Location,
    private router: Router,
    private serverApiService: ServerApiService,
    private snackBarService: SnackBarService
  ) {
  }

  ngOnInit() {
    this.getServices();
  }

  setStartingDate(event): void {
    this.startingDate = event.value;
    this.endingDate = moment(this.startingDate).add(this.selectedService.duration, 'm');
  }

  getOrganizations(): void {
    this.serverApiService.organizationApi.index()
      .then(res => {
        this.organizations = res;
      });
  }

  getServices(): void {
    this.serverApiService.serviceApi.index()
      .then(res => {
        this.services = res;
      });
  }

  makeOrder(): void {
    this.serverApiService.orderApi.store({
      // FirstName: this.customerFirstName,
      // LastName: this.customerLastName,
      // Phone: this.customerPhone,
      Organization_ID: this.selectedOrganization.id,
      Service_ID: this.selectedService.id,
      Price: this.selectedService.price,
      Duration: this.selectedService.duration,
      StartedAt: moment(this.startingDate).format('YYYY-MM-DDTHH:mm:ss')
    }).then(res => {
      this.router.navigate(['/home']);
    });
  }

  checkAvailability(): void {
    this.serverApiService.organizationApi.isAvailable(
      this.selectedOrganization.id,
      moment(this.startingDate).format('YYYY-MM-DDTHH:mm:ss'),
      moment(this.endingDate).format('YYYY-MM-DDTHH:mm:ss')
    ).then(res => {
      this.snackBarService.show({
        data: {
          message: res ? 'Is available' : 'Is not available',
        },
        panelClass: res ? 'success' : 'error',
        duration: 1000
      }); 

      this.isAvailable = res;
    });
  }

  onOrganizationSelect(organization: Organization) {
    this.stepperIndex = 2;
    this.selectedOrganization = organization;
  }

  onCustomerUserNameInput(event): void {
    this.customerFirstName = event.target.value;
  }

  onCustomerPhoneInput(event): void {
    this.customerPhone = event.target.value;
  }

  onStepperSelectionChange(event) {
    this.stepperIndex = event.selectedIndex;
  }

  getAverageMarkForOrganizations(): void {
    for (let i = 0; i < this.organizations.length; i++) {
      this.serverApiService.organizationApi.getAverageMark(this.organizations[i].id, this.selectedService.id)
        .then(res => {
          this.organizations[i].mark = res;
        });
    }
  }

  onServiceSelect(service: Service) {
    this.selectedService = service;
    this.serverApiService.serviceApi.organizationsList(service.id)
      .then(res => {
        if (res && res.length > 0) {
          this.stepperIndex = 1;
          this.organizations = res;
          this.getAverageMarkForOrganizations();
        } else {
          this.snackBarService.show({
            data: {
              message: 'No organizations',
            },
            panelClass: 'error',
            duration: 1000
          });
        }
      });
  }

}
