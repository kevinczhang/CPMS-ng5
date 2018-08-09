import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title: string;
  menu: any[];

  firstName: string;
  lastName: string;
  userEmail: string;

  constructor(){
    this.title = 'Coding Practice Management System';
    this.firstName = 'Chao';
    this.lastName = 'Zhang';
    this.userEmail = 'joseph.chaozhang@gmail.com';
    this.menu = [
      {
        link: '/dashboard',
        title: 'Dashboard',
        icon: 'dashboard',
        isActive: 'active'
      },
      {
        link: '/problemList/1',
        title: 'Algorithm',
        icon: 'code',
        isActive: 'disactive'
      },
      {
        link: '/messages',
        title: 'Messages',
        icon: 'message',
        isActive: 'disactive'
      }
    ];
  }

  ngOnInit(): void {

  }  
}
