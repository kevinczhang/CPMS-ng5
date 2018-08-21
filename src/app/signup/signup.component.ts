import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hide = true;
  model: any = {};
  loading = false;
  error = '';
  redirectUrl: string;

  rForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);  
  name = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private toastr: ToastrService
  ) {

    // Define FormControl and formGroup
    this.rForm = fb.group({
      'email': this.email,
      'password': this.password,
      'confirmPassword': this.confirmPassword,
      'name': this.name,
      'username': this.username
    }, {
      validator: this.MatchPassword // your validation method
    });
  }

  ngOnInit(): void {
    this.userService.logout();    
  }

  signup(userInfo: any) {
    this.loading = true;

    this.authenticationService.signup(userInfo)
      .subscribe(
        result => {
          this.loading = false;

          if (result) {
            this.router.navigate(['/']);
            this.toastr.success("Thanks for sign up!", 'Success');
          } else {
            this.error = 'User account creation failed.';
            this.toastr.error("Sorry, we can't sign you up!", 'Warning');
          }
        },
        error => {
          this.error = 'User account creation failed.';
          this.toastr.error("Sorry, we can't sign you up!", 'Warning');
          this.loading = false;
        }
      );
  }

  MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
     if(password != confirmPassword) {
         AC.get('confirmPassword').setErrors( {MatchPassword: true} )
     } else {
         return null
     }
 }
}
