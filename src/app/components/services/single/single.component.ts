import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../../services/services/services.service';
import { Service } from '../../../essences/Service';
import { Location } from '@angular/common';
import {ServerApiService} from '../../../services/server-api/server-api.service';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {

  public isAdmin = false;
  public service: Service;

  constructor(
    private route: ActivatedRoute,
    private serverApiService: ServerApiService,
    private authServer: AuthService,
    private location: Location
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.checkIsAdmin();

    this.getOrganization(id);
  }

  checkIsAdmin() {
    this.isAdmin = this.authServer.isAdmin();
  }

  getOrganization(id: number) {
    this.serverApiService.serviceApi.show(id)
      .subscribe(res => {
        this.service = res;
      });
  }

  delete() {
    this.serverApiService.serviceApi.destroy(this.service.id)
      .subscribe(res => { this.location.back(); });
  }

}
