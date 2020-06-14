import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AppConstants } from '../shared/app-constants';
import { TOKEN_NAME } from '../shared/auth.constant';

@Injectable()
export class PasswordResetService {

  baseUrl: string;
  constants: AppConstants;
  options: RequestOptions;
  current_token: string;

  constructor(private http: Http, private app_constants: AppConstants) {
    this.baseUrl = app_constants.baseUrl + '/auth/';
    this.constants = app_constants;
    this.options = new RequestOptions();
  }

  resetPassword(email: string): Observable<string> {
    this.setHeader();
    return this.http.get(this.baseUrl + 'resetPassword?email=' + email, this.options)
      .map((res: Response) => {
        return res.json().payload;
      }).catch(
        this.handleError
      );
  }

  changePassword(token: string): Observable<string> {
    this.current_token = token;
    this.setHeader();
    return this.http.get(this.baseUrl + 'changePassword?token=' + token, this.options)
      .map((res: Response) => {
        return res.json().payload;
      }).catch(
        this.handleError
      );
  }

  savePassword(userInfo: any): Observable<string> {
    this.setHeader();
    const bodyToPost: any = {
      'oldPassword': '',
      'newPassword': userInfo.password,
      'token': this.current_token
    };

    return this.http.post(this.baseUrl + 'savePassword', bodyToPost, this.options)
      .map((res: Response) => {
        return res.json().payload;
      }).catch(
        this.handleError
      );
  }

  private handleError(error: any) {
      let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      return Observable.throw(errMsg);
  }

  private setHeader() {
      const headers = new Headers({
          Authorization: 'Bearer ' + localStorage.getItem(TOKEN_NAME)
      });
      this.options.headers = headers;
  }
}
