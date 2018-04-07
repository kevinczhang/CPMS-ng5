import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { ChartsModule } from 'ng2-charts';
import { CKEditorModule } from 'ng2-ckeditor';
import { AceEditorModule } from 'ng2-ace-editor';
import { NgxEditorModule } from 'ngx-editor';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DescriptionComponent } from './description/description.component';
import { ProblemListComponent } from './problem-list/problem-list.component';

import { AppRoutingModule }  from './app-routing.module';
import { CPMSDatabase } from "./shared/cpms-database";
import { ProblemService }  from './services/problem.service';
import { MessagesComponent } from './messages/messages.component';
import { AppConstants } from './shared/app-constants';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DescriptionComponent,
    ProblemListComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    CKEditorModule,
    HttpModule, 
    HttpClientModule,
    ChartsModule,
    ReactiveFormsModule,
    AceEditorModule,
    NgxEditorModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [CPMSDatabase, ProblemService, AppConstants],
  bootstrap: [AppComponent]
})
export class AppModule { }
