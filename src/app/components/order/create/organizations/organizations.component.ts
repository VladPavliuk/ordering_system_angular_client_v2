import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { OrganizationsService } from '../../../../services/organizations/organizations.service';
import { Organization } from '../../../../essences/Organization';

@Component({
  selector: 'app-order-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {
  public displayedColumns = ['avatar', 'title', 'actions'];
  @Output() onOrganizationSelected = new EventEmitter<Organization>();
  @Input() public organizations: Organization[];

  constructor(private organizationsService: OrganizationsService) { }

  ngOnInit() {
    
  }

  onOrganizationSelect(organization: Organization): void {
    this.onOrganizationSelected.emit(organization);
  }



}
