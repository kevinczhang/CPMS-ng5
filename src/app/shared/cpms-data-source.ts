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
  _sorterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  get sorter(): string {
    return this._sorterChange.value;
  }

  set sorter(sorter: string) {
    this._sorterChange.next(sorter);
  }

  filteredData: Problem[] = [];
  problemsCount = 0;

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
      this._sorterChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._cpmsDatabase.data.slice();

      console.log("Sort clicked in data source with name of " + this.sorter);

      // Filter data
      this.filteredData = data.filter((item: Problem) => {
        if(item){
          let searchStr = (item.NUMBER + item.TITLE);        
          return this.filter.trim() === "" || searchStr.indexOf(this.filter.toLowerCase()) != -1;
        }
        return false;
      });
      if(this.sorter === 'Number'){
        this.filteredData.sort((a, b) => a.NUMBER - b.NUMBER);
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
}
