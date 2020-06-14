import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { PasswordResetService } from "../services/password-reset.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"],
})
export class ResetPasswordComponent implements OnInit {

  rForm: FormGroup;
  usernameOrEmail = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);
  loading = false;

  constructor( private fb: FormBuilder, private passwordResetService: PasswordResetService, private toastr: ToastrService) {
    // Define FormControl and formGroup
    this.rForm = this.fb.group({
      usernameOrEmail: this.usernameOrEmail
    });
  }

  ngOnInit() {}

  resetPassword(formInfo) {
    this.loading = true;
    this.passwordResetService.resetPassword(formInfo.usernameOrEmail)
      .subscribe(response => {
        this.toastr.success("Email for reset password sent out", 'Success');
        this.loading = false;
      },
      error => {
        this.toastr.error("Sorry, we can't find your email!", 'Warning');
        this.loading = false;
      });
  }
}
