import {Component, OnInit, ViewChild} from '@angular/core';
import {ServerApiService} from '../../../../services/server-api/server-api.service';
import {User} from '../../../../essences/User';
import {SnackBarService} from '../../../../services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  public user: User;
  public selectedAvatar: { file: any,  title: string } = { file: '', title: ''};
  public showUploadAvatarButton = false;
  @ViewChild('avatar_input') avatarInput;
  constructor(
    private serverApiService: ServerApiService,
    private snackBarService: SnackBarService
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

    this.serverApiService.userApi.setAvatar(formData)
      .subscribe(res => {
        this.getUserInfo();
        this.snackBarService.show({
          data: {
            message: 'Avatar changed!',
          },
          panelClass: 'success',
          duration: 1000
        });
      });
  }


}
