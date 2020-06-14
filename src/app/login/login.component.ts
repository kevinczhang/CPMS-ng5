import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { AuthenticationService } from "../services/authentication.service";
import { UserService } from "../services/user.service";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  hide = true;
  model: any = {};
  loading = false;
  error = "";
  redirectUrl: string;

  rForm: FormGroup;
  usernameOrEmail = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);
  password = new FormControl("", [Validators.required]);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.redirectUrl = this.activatedRoute.snapshot.queryParams["redirectTo"];
    // Define FormControl and formGroup
    this.rForm = this.fb.group({
      usernameOrEmail: this.usernameOrEmail,
      password: this.password,
    });
  }

  ngOnInit(): void {
    this.userService.logout();
  }

  login(userInfo: any) {
    this.loading = true;

    this.authenticationService
      .login(userInfo.usernameOrEmail, userInfo.password)
      .subscribe(
        (result) => {
          this.loading = false;

          if (result) {
            this.userService.login(result);
            this.navigateAfterSuccess();
          } else {
            this.error = "Username or password is incorrect";
          }
        },
        (error) => {
          this.error = "Username or password is incorrect";
          this.toastr.error(this.error, "Warning");
          this.loading = false;
        }
      );
  }

  resetPassword() {
    this.router.navigate(["/resetPassword"]);
  }

  private navigateAfterSuccess() {
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigate(["/"]);
    }
  }
}
