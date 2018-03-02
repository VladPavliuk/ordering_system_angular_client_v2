import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { OrganizationsService } from '../../../../services/organizations/organizations.service';
import { Organization } from '../../../../essences/Organization';

@Component({
  selector: 'app-order-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

  @Output() onOrganizationSelected = new EventEmitter<number>();

  @Input() public organizations: Organization[];

  constructor(private organizationsService: OrganizationsService) { }

  ngOnInit() {
    
  }

  onOrganizationSelect(organizationId: any): void {
    this.onOrganizationSelected.emit(parseInt(organizationId.value));
  }



}
