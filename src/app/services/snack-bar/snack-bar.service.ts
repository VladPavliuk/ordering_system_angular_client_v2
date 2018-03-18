import {Injectable} from '@angular/core';
import {SnackBarComponent} from '../../components/partials/snack-bar/snack-bar.component';
import {MatSnackBar} from '@angular/material';
import {MatSnackBarConfig} from '@angular/material/snack-bar/typings/snack-bar-config';

@Injectable()
export class SnackBarService {

  constructor(
    private snackBar: MatSnackBar
  ) {
  }

  show(config: MatSnackBarConfig): void {
    this.snackBar.openFromComponent(SnackBarComponent, config);
  }

}
