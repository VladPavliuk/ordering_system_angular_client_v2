import { Component, OnInit } from '@angular/core';
import { OrganizationsService } from '../../../services/organizations/organizations.service';
import { Organization } from '../../../essences/Organization';
import {DataSource} from '@angular/cdk/collections';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  organizations: Organization[];
  
  displayedColumns = ['title', 'actions'];

  constructor(private organizationsService: OrganizationsService) { }

  ngOnInit() {
    this.organizationsService.index()
      .subscribe(res => {
        this.organizations = res;
      });
  }

}