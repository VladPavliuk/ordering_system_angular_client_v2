import { Component, OnInit } from '@angular/core';
import { OrganizationsService } from '../../../services/organizations/organizations.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public title: string;

  constructor(
    private organizationsService: OrganizationsService, 
    private location: Location
  ) { }

  ngOnInit() {
  }

  onTitleInput(event) {
    this.title = event.target.value;
  }

  create(): void {
    this.organizationsService.store({
      title: this.title
    }).subscribe(res => { this.location.back() });
  }
}
