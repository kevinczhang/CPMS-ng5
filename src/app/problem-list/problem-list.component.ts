import { Component, OnInit, ViewChild, 
  ElementRef, ChangeDetectionStrategy } from '@angular/core';
import {MatPaginator, MatAccordion, MatExpansionPanel, 
  MatExpansionPanelHeader, MatExpansionPanelTitle, Sort} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import {CPMSDatabase} from "../shared/cpms-database";
import {CPMSDataSource} from "../shared/cpms-data-source";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {

  displayedColumns: string[];
  dataSource: CPMSDataSource;
  problemSource: string;
  problemTitle: string;  
  problemNumber: number;
  problemDifficulty: string;
  advancedSearchDescription: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;

  constructor(private cpmsDatabase: CPMSDatabase) {
    this.displayedColumns = ['Source', 'Title', 'Number', 'Difficulty'];    
  }

  ngOnInit() {
    this.dataSource = new CPMSDataSource(this.cpmsDatabase, this.paginator);
    if(!this.dataSource)
      return;
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        this.dataSource.filter = this.filter.nativeElement.value;
      });      
  }

  sortData(sort: Sort) {
    this.dataSource.sorter = sort.active;
  }
  
  applyAdvancedFilter(){
    this.dataSource.advancedFilter = [this.problemSource, this.problemTitle, this.problemNumber, this.problemDifficulty];
    this.advancedSearchDescription = (this.problemSource || this.problemTitle || 
      this.problemNumber || this.problemDifficulty) ? 'Has options' : '';
  }
}
