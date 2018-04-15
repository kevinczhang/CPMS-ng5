import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

import {TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME} from '../shared/auth.constant';

@Injectable()
export class AuthenticationService {
  static AUTH_TOKEN = '/oauth/token';
  baseUrl: string;

  constructor(private http: Http) {
    //this.baseUrl = 'http://localhost:8081/SpringBootCRUDApp';
    this.baseUrl = 'https://cpms-java.herokuapp.com/SpringBootCRUDApp';
  }

  login(username: string, password: string) {
    const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`;

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD));

    return this.http.post(this.baseUrl + AuthenticationService.AUTH_TOKEN, body, {headers})
      .map(res => res.json())
      .map((res: any) => {
        if (res.access_token) {
          return res.access_token;
        }
        return null;
      });
  }
}
