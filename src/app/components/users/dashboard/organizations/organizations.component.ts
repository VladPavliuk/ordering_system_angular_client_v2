import {Component, OnInit} from '@angular/core';
import {Organization} from '../../../../essences/Organization';
import {ServerApiService} from '../../../../services/server-api/server-api.service';

@Component({
  selector: 'app-users-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

  public usersOrganizations: Organization[];
  displayedColumns = ['title', 'actions'];

  constructor(
    private serverApiService: ServerApiService
  ) {
  }

  ngOnInit() {
    this.getUsersOrganizations();
  }

  getUsersOrganizations(): void {
    this.serverApiService.userApi.organiztionsOwnerList()
      .subscribe(res => {
        this.usersOrganizations = res;
      });
  }

}
