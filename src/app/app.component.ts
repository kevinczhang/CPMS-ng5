import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'Coding Practice Management System';
  menu = [
    {
      link: '/dashboard',
      title: 'Dashboard',
      icon: 'dashboard',
      isActive: 'active'
    },
    {
      link: '/problemList',
      title: 'Algorithm',
      icon: 'group',
      isActive: 'disactive'
    },
    {
      link: '/messages',
      title: 'Messages',
      icon: 'message',
      isActive: 'disactive'
    }
  ];

  firstName:string = 'Chao';
  lastName:string = 'Zhang';
  userEmail:string = 'joseph.chaozhang@gmail.com';

  constructor(){ 

  }

  ngOnInit(): void {

  }

  answer: string = '';
  answerDisplay: string = '';
  showSpinner: boolean = false;

  showAnswer() {
    this.showSpinner = true;

    setTimeout(() => {
      this.answerDisplay = this.answer;
      this.showSpinner = false;
    }, 2000);
  }
}
