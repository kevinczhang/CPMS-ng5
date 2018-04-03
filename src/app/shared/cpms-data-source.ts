import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";

import { MatPaginator } from "@angular/material";

import { Problem } from "../model/problem";
import { CPMSDatabase } from "./cpms-database";

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
  _advancedFilterChange = new BehaviorSubject<[string, string, number, string]>(null);

  filteredData: Problem[] = [];
  problemsCount = 0;

  private findInGeneralFilter(item: Problem): boolean{
    let searchStr = (item.SOURCE + item.TITLE + item.NUMBER + item.DIFFICULTY);
    return this.filter.trim() === "" || searchStr.toLowerCase().indexOf(this.filter.toLowerCase()) != -1;
  }

  private findInAdvancedFilter(item: Problem): boolean {
    if(this._advancedFilterChange.value){
      return this._advancedFilterChange.value[0] && item.SOURCE === this._advancedFilterChange.value[0] ||
      this._advancedFilterChange.value[1] && item.TITLE === this._advancedFilterChange.value[1] ||
      this._advancedFilterChange.value[2] && item.NUMBER === Number(this._advancedFilterChange.value[2]) ||
      this._advancedFilterChange.value[3] && item.DIFFICULTY === this._advancedFilterChange.value[3];
    }
    return false;
  }

  constructor(private _cpmsDatabase: CPMSDatabase, private _paginator: MatPaginator) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);        
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Problem[]> {
    const displayDataChanges = [
      this._cpmsDatabase.dataChange,
      this._paginator.page,
      this._filterChange,
      this._sorterChange,
      this._advancedFilterChange
    ];    

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._cpmsDatabase.data.slice();
      this.filteredData = data;

      console.log("Sorter triggered " + this.sorter);

      // Filter data
      if (this._advancedFilterChange.value && (this._advancedFilterChange.value[0] || 
        this._advancedFilterChange.value[1] || this._advancedFilterChange.value[2] ||
        this._advancedFilterChange.value[3])){
          this.filteredData = data.filter((item: Problem) => {
            if(item){          
              return this.findInAdvancedFilter(item);
            }
            return false;
          });
      } else if (this.filter && this.filter.trim().length > 0) {
        this.filteredData = data.filter((item: Problem) => {
          if(item){
            return this.findInGeneralFilter(item);
          }
          return false;
        });
      }
      // Sort data
      if(this.sorter){
        if(this.sorter[0] === 'Number'){
          this.filteredData.sort((a, b) => this.sorter[1] === 'asc' ? a.NUMBER - b.NUMBER : b.NUMBER - a.NUMBER);
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
      return this.filteredData.splice(startIndex, pageSize);
    });
  }
  
  disconnect() {
  }  

  private sortSource(): void {
    if (this.sorter[1] === 'asc') {
      this.filteredData.sort((a, b) => {
        if (a.SOURCE > b.SOURCE)
          return 1;
        if (a.SOURCE < b.SOURCE)
          return -1;
        return 0;
      });
    }
    else if (this.sorter[1] === 'desc') {
      this.filteredData.sort((a, b) => {
        if (b.SOURCE > a.SOURCE)
          return 1;
        if (b.SOURCE < a.SOURCE)
          return -1;
        return 0;
      });
    }
  }

  private sortTitle(): void {
    if (this.sorter[1] === 'asc') {
      this.filteredData.sort((a, b) => {
        if (a.TITLE > b.TITLE)
          return 1;
        if (a.TITLE < b.TITLE)
          return -1;
        return 0;
      });
    }
    else if (this.sorter[1] === 'desc') {
      this.filteredData.sort((a, b) => {
        if (b.TITLE > a.TITLE)
          return 1;
        if (b.TITLE < a.TITLE)
          return -1;
        return 0;
      });
    }
  }

  private sortDifficulty(): void {
    if (this.sorter[1] === 'asc') {
      this.filteredData.sort((a, b) => {
        if (a.DIFFICULTY > b.DIFFICULTY)
          return 1;
        if (a.DIFFICULTY < b.DIFFICULTY)
          return -1;
        return 0;
      });
    }
    else if (this.sorter[1] === 'desc') {
      this.filteredData.sort((a, b) => {
        if (b.DIFFICULTY > a.DIFFICULTY)
          return 1;
        if (b.DIFFICULTY < a.DIFFICULTY)
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

  get advancedFilter(): [string, string, number, string] {
    return this._advancedFilterChange.value;
  }

  set advancedFilter(filter: [string, string, number, string]) {
    this._advancedFilterChange.next(filter);
  }
}
