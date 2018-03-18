import {Component, OnInit} from '@angular/core';
import {ServerApiService} from '../../../../services/server-api/server-api.service';
import {User} from '../../../../essences/User';

@Component({
  selector: 'app-user-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  public user: User;
  public selectedAvatar: { file: any,  title: string } = { file: '', title: ''};

  constructor(
    private serverApiService: ServerApiService
  ) {
  }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.serverApiService.userApi.getUserInfo()
      .subscribe(res => {
        this.user = res;
      });
  }

  onAvatarSelect(event: any) {
    this.selectedAvatar.file = event.target.files[0];
    this.selectedAvatar.title = event.target.files[0].name;

    let formData = new FormData();
    formData.append('image', this.selectedAvatar.file);

    this.serverApiService.userApi.setAvatar(formData)
      .subscribe(res => {
        this.getUserInfo();
      });
  }


}
