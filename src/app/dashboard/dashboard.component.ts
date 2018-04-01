import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Doughnut
  doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  doughnutChartData:number[] = [350, 450, 100];
  doughnutChartType:string = 'doughnut';
 
  // events
  chartClicked(e:any):void {
    console.log("chartClicked");
  }
 
  chartHovered(e:any):void {
    console.log("chartHovered");
  }

  constructor() {
    this.doughnutChartLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    this.doughnutChartData = [350, 450, 100];
    this.doughnutChartType = 'doughnut';
   }

  ngOnInit() {
  }

}
