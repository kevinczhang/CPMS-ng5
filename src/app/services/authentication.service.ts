import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import {TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME} from '../shared/auth.constant';
import { AppConstants } from '../shared/app-constants';

@Injectable()
export class AuthenticationService {
  static AUTH_TOKEN = '/auth/signin';
  baseUrl: string;

  constructor(private http: Http, private app_constants: AppConstants) {
    this.baseUrl = this.app_constants.baseUrl;
  }

  login(username: string, password: string) {
    //const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`;
    const body = {"usernameOrEmail": username, "password": password};

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD));

    return this.http.post(this.baseUrl + AuthenticationService.AUTH_TOKEN, body, {headers})
      .map(res => res.json())
      .map((res: any) => {
        if (res.accessToken) {
          return res.accessToken;
        }
        return null;
      });
  }

  signup(newUser: any): Observable<Response>{
    let user = this.http.post(this.baseUrl + '/auth/signup', newUser)
      .map(
        res => res.json()
      )
      .catch(
        this.handleError
      ).subscribe();
    return Observable.of(newUser);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
