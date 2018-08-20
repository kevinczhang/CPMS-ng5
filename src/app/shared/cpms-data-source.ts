import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";

import { MatPaginator } from "@angular/material";

import { CPMSDatabase } from "./cpms-database";
import { LoaderService }  from '../services/loader.service';
import { ProblemSummary } from "../model/problemSummary";

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class CPMSDataSource extends DataSource<any> {
  
  _filterChange = new BehaviorSubject('');
  _sorterChange = new BehaviorSubject<[string, string]>(null);
  _advancedFilterChange = new BehaviorSubject<[string, string, number, string, string, string]>(null);

  filteredData: ProblemSummary[] = [];
  problemsCount = 0;

  private findInGeneralFilter(item: ProblemSummary): boolean{
    let searchStr = (item.source + item.title + item.number + item.level);
    return this.filter.trim() === "" || searchStr.toLowerCase().indexOf(this.filter.toLowerCase()) != -1;
  }

  private findInAdvancedFilter(item: ProblemSummary): boolean {
    if(this._advancedFilterChange.value)
    {
      let matchSource : boolean = !this._advancedFilterChange.value[0] || 
        this._advancedFilterChange.value[0] && item.source === this._advancedFilterChange.value[0];
      let matchTitle : boolean = !this._advancedFilterChange.value[1] || 
        this._advancedFilterChange.value[1] && item.title === this._advancedFilterChange.value[1];
      let matchNumber : boolean = !this._advancedFilterChange.value[2] || 
        this._advancedFilterChange.value[2] && item.number === Number(this._advancedFilterChange.value[2]);  
      let matchLevel : boolean = !this._advancedFilterChange.value[3] || 
        this._advancedFilterChange.value[3] && item.level === this._advancedFilterChange.value[3];
      let matchCompanies : boolean = !this._advancedFilterChange.value[4] || 
        this._advancedFilterChange.value[4] && item.companies.indexOf(this._advancedFilterChange.value[4]) != -1;
      let matchTopics : boolean = !this._advancedFilterChange.value[5] || 
        this._advancedFilterChange.value[5] && item.topics.indexOf(this._advancedFilterChange.value[5]) != -1;

      return matchSource && matchTitle && matchNumber && matchLevel && matchCompanies && matchTopics;
    }
    return false;
  }

  constructor(private _cpmsDatabase: CPMSDatabase, private _paginator: MatPaginator, 
    private loaderService: LoaderService) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);           
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ProblemSummary[]> {
    const displayDataChanges = [
      this._cpmsDatabase.dataChange,
      this._paginator.page,
      this._filterChange,
      this._sorterChange,
      this._advancedFilterChange,
    ];    

    return Observable.merge(...displayDataChanges).map(() => { 

      const data = this._cpmsDatabase.data ? this._cpmsDatabase.data.slice() : [];
      this.filteredData = data;

      // Filter data
      if (this._advancedFilterChange.value && (this._advancedFilterChange.value[0] || 
        this._advancedFilterChange.value[1] || this._advancedFilterChange.value[2] || 
        this._advancedFilterChange.value[3] || this._advancedFilterChange.value[4] || 
        this._advancedFilterChange.value[5])
      ){
          this.filteredData = data.filter((item: ProblemSummary) => {
            if(item){          
              return this.findInAdvancedFilter(item);
            }
            return false;
          });
      } else if (this.filter && this.filter.trim().length > 0) {
        this.filteredData = data.filter((item: ProblemSummary) => {
          if(item){
            return this.findInGeneralFilter(item);
          }
          return false;
        });
      }
      // Sort data
      if(this.sorter){
        if(this.sorter[0] === 'Number'){
          this.filteredData.sort((a, b) => this.sorter[1] === 'asc' ? a.number - b.number : b.number - a.number);
        } else if(this.sorter[0] === 'Source'){
          this.sortSource();
        } else if(this.sorter[0] === 'Title'){
          this.sortTitle();
        } else if(this.sorter[0] === 'Difficulty'){
          this.sortDifficulty();
        }
      }      

      this.problemsCount = this.filteredData.length;

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      let problemsLeft = this.filteredData.length - startIndex;
      let pageSize = problemsLeft < this._paginator.pageSize ? problemsLeft : this._paginator.pageSize;
      if(this.filteredData.length > 0){
        this.loaderService.hide();
      }
      return this.filteredData.splice(startIndex, pageSize);
    });
  }
  
  disconnect() {
    this._filterChange.complete();
    this._filterChange.observers = [];
    this._sorterChange.complete();
    this._sorterChange.observers = [];
    this._advancedFilterChange.complete();
    this._advancedFilterChange.observers = [];
    console.log("data source disconnected.");  
  }  

  private sortSource(): void {
    if (this.sorter[1] === 'asc') {
      this.filteredData.sort((a, b) => {
        if (a.source > b.source)
          return 1;
        if (a.source < b.source)
          return -1;
        return 0;
      });
    }
    else if (this.sorter[1] === 'desc') {
      this.filteredData.sort((a, b) => {
        if (b.source > a.source)
          return 1;
        if (b.source < a.source)
          return -1;
        return 0;
      });
    }
  }

  private sortTitle(): void {
    if (this.sorter[1] === 'asc') {
      this.filteredData.sort((a, b) => {
        if (a.title > b.title)
          return 1;
        if (a.title < b.title)
          return -1;
        return 0;
      });
    }
    else if (this.sorter[1] === 'desc') {
      this.filteredData.sort((a, b) => {
        if (b.title > a.title)
          return 1;
        if (b.title < a.title)
          return -1;
        return 0;
      });
    }
  }

  private sortDifficulty(): void {
    if (this.sorter[1] === 'asc') {
      this.filteredData.sort((a, b) => {
        if (a.level > b.level)
          return 1;
        if (a.level < b.level)
          return -1;
        return 0;
      });
    }
    else if (this.sorter[1] === 'desc') {
      this.filteredData.sort((a, b) => {
        if (b.level > a.level)
          return 1;
        if (b.level < a.level)
          return -1;
        return 0;
      });
    }
  }

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  get sorter(): [string, string] {
    return this._sorterChange.value;
  }

  set sorter(sorter: [string, string]) {
    this._sorterChange.next(sorter);
  }

  get advancedFilter(): [string, string, number, string, string, string] {
    return this._advancedFilterChange.value;
  }

  set advancedFilter(filter: [string, string, number, string, string, string]) {
    this._advancedFilterChange.next(filter);
  }
}
