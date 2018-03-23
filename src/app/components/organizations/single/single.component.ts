import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrganizationsService} from '../../../services/organizations/organizations.service';
import {Organization} from '../../../essences/Organization';
import {Service} from '../../../essences/Service';
import {Location} from '@angular/common';
import {ServerApiService} from '../../../services/server-api/server-api.service';
import {SnackBarService} from '../../../services/snack-bar/snack-bar.service';
import {Globals} from '../../../globals';
import {DaySchedule} from '../../../essences/DaySchedule';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {

  public daysList: DaySchedule[] = [];
  public organization: Organization;
  public isOrganizationBelongToMe = false;
  public services: Service[];
  public displayedColumns = ['title', 'price', 'duration', 'actions'];
  public showUploadAvatarButton = false;
  public selectedAvatar: { file: any, title: string } = {file: '', title: ''};
  @ViewChild('avatar_input') avatarInput;

  constructor(
    private route: ActivatedRoute,
    private serverApiService: ServerApiService,
    private location: Location,
    public globals: Globals,
    private snackBarService: SnackBarService
  ) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.getOrganization(id);
    this.checkIsOrganizationBelongToMe(id);
    this.getServicesList(id);
  }

  onAvatarMouseOver() {
    this.showUploadAvatarButton = true;
  }

  onAvatarMouseOut() {
    this.showUploadAvatarButton = false;
  }

  onSetAvatarClick() {
    this.avatarInput.nativeElement.click();
  }

  onAvatarSelect(event: any) {
    this.selectedAvatar.file = event.target.files[0];
    this.selectedAvatar.title = event.target.files[0].name;

    const formData = new FormData();
    formData.append('image', this.selectedAvatar.file);

    this.serverApiService.organizationApi.setAvatar(this.organization.id, formData)
      .then(res => {
        this.getOrganization(this.organization.id);
        this.snackBarService.show({
          data: {
            message: 'Avatar changed!',
          },
          panelClass: 'success',
          duration: 1000
        });
      });
  }

  getOrganization(id: number) {
    this.serverApiService.organizationApi.show(id)
      .then(res => {
        this.organization = res;
        this.serverApiService.organizationApi.getSchedule(this.organization.id)
          .then(res => {
            this.daysList = res;
          });
      });
  }

  checkIsOrganizationBelongToMe(id: number) {
    return this.serverApiService.organizationApi.isBelongToMe(id)
      .then(res => {
        this.isOrganizationBelongToMe = res;
      });
  }

  getServicesList(id: number) {
    this.serverApiService.organizationApi.servicesList(id)
      .then(res => {
        this.services = res;
      });
  }

  delete() {
    this.serverApiService.organizationApi.destroy(this.organization.id)
      .then(res => {
        this.location.back();
        this.snackBarService.show({
          data: {
            message: 'Organization deleted!',
          },
          panelClass: 'success',
          duration: 1000
        });
      });
  }

  unpinService(serviceId: number) {
    this.serverApiService.organizationApi.unpinService(this.organization.id, serviceId)
      .then(res => {
        this.getServicesList(this.organization.id);
        this.snackBarService.show({
          data: {
            message: `Service unpined`,
          },
          panelClass: 'success',
          duration: 1000
        });
      });
  }

}
