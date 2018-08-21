import {Injectable} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';

import {TOKEN_NAME} from '../shared/auth.constant';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UserService {
  jwtHelper: JwtHelper = new JwtHelper();
  accessToken: string;
  isAdmin: boolean;

  constructor(
    private toastr: ToastrService
  ) {
    let accessToken = localStorage.getItem(TOKEN_NAME);
    if(accessToken){
      const decodedToken = this.jwtHelper.decodeToken(accessToken);
      this.isAdmin = decodedToken.role.some(e => e.authority === 'ROLE_ADMIN');
    }    
  }

  login(accessToken: string) {
    const decodedToken = this.jwtHelper.decodeToken(accessToken);
    console.log(decodedToken);

    this.isAdmin = decodedToken.role.some(e => e.authority === 'ROLE_ADMIN');
    this.accessToken = accessToken;

    localStorage.setItem(TOKEN_NAME, accessToken);
    this.toastr.success("Welcome " + decodedToken.userName, 'success');
  }

  logout() {
    this.accessToken = null;
    this.isAdmin = false;
    localStorage.removeItem(TOKEN_NAME);
  }

  isAdminUser(): boolean {
    return this.isAdmin;
  }

  isUser(): boolean {
    return this.accessToken && !this.isAdmin;
  }
}
