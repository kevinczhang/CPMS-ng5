import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PasswordResetService } from '../services/password-reset.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  rForm: FormGroup;
  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);
  loading = false;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private passwordResetService: PasswordResetService, private toastr: ToastrService) {
    // Define FormControl and formGroup
    this.rForm = fb.group({
      'password': this.password,
      'confirmPassword': this.confirmPassword
    }, {
      validator: this.MatchPassword // your validation method
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const token: string = params['token'];
      this.passwordResetService.changePassword(token).subscribe(
        res => {
          this.toastr.success("Please enter your new password", 'Success');
        },
        error => {
          this.toastr.error("Sorry, the token expired!", 'Warning');
          this.router.navigate(['/resetPassword']);
        }
      );
    });
  }

  savePassword(userInfo: any) {
    this.loading = true;

    this.passwordResetService.savePassword(userInfo)
      .subscribe(
        result => {
          this.loading = false;
          this.toastr.success("New password has been updated!", 'Success');
          this.router.navigate(['/']);
        },
        error => {
          this.toastr.error("Sorry, we can't update your password now! Please try again later.", 'Warning');
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
