import {HttpHeaders} from '@angular/common/http/src/headers';

export class RequestStructure {
  public method: string;
  public url: string;
  public auth?: boolean;
  public headers?: HttpHeaders;
  public constructor() {
    this.method = 'get';
    this.auth = false;
  }
}