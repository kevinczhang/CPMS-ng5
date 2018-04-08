import { Component, OnInit, ViewChild, 
  ElementRef, ChangeDetectionStrategy, Inject } from '@angular/core';
import {MatPaginator, MatAccordion, MatExpansionPanel, 
  MatExpansionPanelHeader, MatExpansionPanelTitle, Sort, 
  MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { CPMSDatabase } from "../shared/cpms-database";
import { CPMSDataSource } from "../shared/cpms-data-source";
import { AppConstants } from '../shared/app-constants';
import { DeletionConfirmDialog } from '../modal/deletion.component';

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

  difficultyOptions: object[];
  sourceOptions: object[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;

  constructor(private cpmsDatabase: CPMSDatabase, private app_constants: AppConstants, private dialog: MatDialog) {
    this.displayedColumns = app_constants.displayedColumns;
    this.difficultyOptions = app_constants.difficultyOptions;
    this.sourceOptions = app_constants.sourceOptions;    
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

  private sortData(sort: Sort) {
    this.dataSource.sorter = [sort.active, sort.direction];
  }
  
  private applyAdvancedFilter(){
    this.dataSource.advancedFilter = [this.problemSource, this.problemTitle, this.problemNumber, this.problemDifficulty];
    this.advancedSearchDescription = (this.problemSource || this.problemTitle || 
      this.problemNumber || this.problemDifficulty) ? 'Has options' : '';
  }

  private deleteProblem(id: any){
    let dialogRef = this.dialog.open(DeletionConfirmDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result: ' + result);
      if(result === 'Y'){
        this.cpmsDatabase.deleteProblem(id);
      }
    });
  }
}

