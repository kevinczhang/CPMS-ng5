import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CKEditorModule } from 'ng2-ckeditor';

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DescriptionComponent } from './description/description.component';
import { ProblemListComponent } from './problem-list/problem-list.component';

import { AppRoutingModule }  from './app-routing.module';
import { ExampleDatabase } from "./shared/example-database";
import { ProblemService }  from './services/problem.service';

import { ChartsModule } from 'ng2-charts';
import { AceEditorModule } from 'ng2-ace-editor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DescriptionComponent,
    ProblemListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    CKEditorModule,
    HttpModule,
    ChartsModule,
    ReactiveFormsModule,
    AceEditorModule
  ],
  providers: [ExampleDatabase, ProblemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
