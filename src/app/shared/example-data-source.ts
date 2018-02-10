import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";
import { ExampleDatabase } from "./example-database";
import { MatPaginator } from "@angular/material";
import { Problem } from "../model/problem";

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Problem[] = [];
  problemsCount = 0;

  constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MatPaginator) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);        
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Problem[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._paginator.page,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._exampleDatabase.data.slice();

      // Filter data
      this.filteredData = data.filter((item: Problem) => {
        if(item){
          let searchStr = (item.NUMBER + item.TITLE).toLowerCase();        
          return this.filter.trim() === "" || searchStr.indexOf(this.filter.toLowerCase()) != -1;
        }
        return false;
      });

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
