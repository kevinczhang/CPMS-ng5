import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewProblemComponent } from './view-problem/view-problem.component';
import { EditProblemComponent } from './edit-problem/edit-problem.component';
import { ProblemListComponent } from './problem-list/problem-list.component';
import { MessagesComponent } from './messages/messages.component';

import {AuthGuard} from './guards/auth-guard.service';
import {AdminAuthGuard} from './guards/admin-auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'signup',  component: SignupComponent },
  { path: 'dashboard',  component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'problemList',  component: ProblemListComponent, canActivate: [AuthGuard] },
  { path: 'edit-problem/:id',  component: EditProblemComponent, canActivate: [AuthGuard] },
  { path: 'view-problem/:id',  component: ViewProblemComponent, canActivate: [AuthGuard] },
  { path: 'messages',  component: MessagesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
