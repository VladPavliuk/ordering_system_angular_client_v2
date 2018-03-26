import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {OrganizationsService} from '../../../../services/organizations/organizations.service';
import {Organization} from '../../../../essences/Organization';
import {Globals} from '../../../../globals';

@Component({
  selector: 'app-order-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {
  public displayedColumns = ['avatar', 'title', 'actions', 'mark'];
  public Math;
  @Output() onOrganizationSelected = new EventEmitter<Organization>();
  @Input() public organizations: Organization[];

  constructor(
    private organizationsService: OrganizationsService,
    public globals: Globals,
  ) {
    this.Math = Math;
  }

  ngOnInit() {

  }

  onOrganizationSelect(organization: Organization): void {
    this.onOrganizationSelected.emit(organization);
  }


}
