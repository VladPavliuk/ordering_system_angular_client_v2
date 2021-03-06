import {Component, OnInit} from '@angular/core';
import {Organization} from '../../../../essences/Organization';
import {ServerApiService} from '../../../../services/server-api/server-api.service';
import {Globals} from '../../../../globals';

@Component({
  selector: 'app-users-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

  public usersOrganizations: Organization[];
  displayedColumns = ['avatar', 'title', 'mark', 'void', 'actions'];

  constructor(
    private serverApiService: ServerApiService,
    public globals: Globals
  ) {
  }

  ngOnInit() {
    this.getUsersOrganizations();
  }

  getUsersOrganizations(): void {
    this.serverApiService.userApi.organizationsOwnerList()
      .then(res => {
        this.usersOrganizations = res;
      });
  }

}
