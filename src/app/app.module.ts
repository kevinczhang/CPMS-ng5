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
import { DeletionConfirmDialog } from './modal/deletion.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService }  from './services/loader.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DescriptionComponent,
    ProblemListComponent,
    MessagesComponent,
    DeletionConfirmDialog,
    LoaderComponent
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
  exports:[
    LoaderComponent
  ],
  entryComponents: [DeletionConfirmDialog],
  providers: [CPMSDatabase, ProblemService, AppConstants, LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
