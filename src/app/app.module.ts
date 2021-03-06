import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { ChartsModule } from 'ng2-charts';
// import { CKEditorModule } from 'ng2-ckeditor';
import { AceEditorModule } from 'ng2-ace-editor';
import { NgxEditorModule } from 'ngx-editor';
import { ToastrModule } from 'ngx-toastr';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { BlockUIModule } from 'ng-block-ui';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProblemListComponent } from './problem-list/problem-list.component';
import { MessagesComponent } from './messages/messages.component';
import { DeletionConfirmDialog } from './modal/deletion.component';
import { LoaderComponent } from './loader/loader.component';
import { ViewProblemComponent } from './view-problem/view-problem.component';
import { EditProblemComponent } from './edit-problem/edit-problem.component';

import { AppRoutingModule } from './app-routing.module';
import { AppConstants } from './shared/app-constants';
import { CPMSDatabase } from "./shared/cpms-database";
import { ProblemService } from './services/problem.service';
import { SolutionService } from './services/solution.service';
import { LoaderService } from './services/loader.service';


import { TOKEN_NAME } from './shared/auth.constant';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth-guard.service';
import { AdminAuthGuard } from './guards/admin-auth-guard.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PasswordResetService } from './services/password-reset.service';
import { ChangePasswordComponent } from './change-password/change-password.component';

export function authHttpServiceFactory(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'Bearer',
    tokenName: TOKEN_NAME,
    globalHeaders: [{ 'Content-Type': 'application/json' }],
    noJwtError: false,
    noTokenScheme: true,
    tokenGetter: (() => localStorage.getItem(TOKEN_NAME))
  }), http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ProblemListComponent,
    MessagesComponent,
    DeletionConfirmDialog,
    LoaderComponent,
    ViewProblemComponent,
    EditProblemComponent,
    ResetPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    // CKEditorModule,
    HttpModule,
    HttpClientModule,
    ChartsModule,
    ReactiveFormsModule,
    AceEditorModule,
    NgxEditorModule,
    ToastrModule.forRoot(), // ToastrModule added
    BlockUIModule.forRoot() // NG Blcking spinner
  ],
  exports: [
    LoaderComponent
  ],
  entryComponents: [DeletionConfirmDialog],
  providers: [CPMSDatabase, ProblemService, AppConstants, LoaderService, SolutionService,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http] },
    AuthenticationService,
    UserService,
    AuthGuard,
    AdminAuthGuard, PasswordResetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
