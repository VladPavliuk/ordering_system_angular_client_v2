import {HttpHeaders} from '@angular/common/http/src/headers';

export class RequestStructure {
  public method: string;
  public url: string;
  public body?: object;
  public auth?: boolean;
  public messageSuccess?: false |string;
  public messageError?: false | string;
  public disableJsonHead?: boolean;
  public headers?: HttpHeaders | {
    [header: string]: string | string[];
  };

  public constructor() {
    this.method = 'get';
    this.auth = false;
    this.disableJsonHead = false;
    this.messageSuccess = false;
    this.messageError = false;
    this.body = {};
  }
}
