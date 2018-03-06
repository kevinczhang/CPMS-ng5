import { Component, OnInit, ViewChild, 
  ElementRef, ChangeDetectionStrategy } from '@angular/core';
import {MatPaginator, MatAccordion, MatExpansionPanel, 
  MatExpansionPanelHeader, MatExpansionPanelTitle} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import {ExampleDatabase} from "../shared/example-database";
import {ExampleDataSource} from "../shared/example-data-source";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {

  displayedColumns = ['ID', 'Title', 'Number', 'Difficulty'];
  //exampleDatabase = new ExampleDatabase();
  dataSource: ExampleDataSource | null;
  title = 'app';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;

  constructor(private exampleDatabase: ExampleDatabase) { }

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator);    
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

}
