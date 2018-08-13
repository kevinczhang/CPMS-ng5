import { Injectable } from "../../../node_modules/@angular/core";
import { AppConstants } from "../shared/app-constants";
import { Http, RequestOptions, Headers, Response } from "../../../node_modules/@angular/http";
import { Observable } from "../../../node_modules/rxjs/Observable";
import { Solution } from "../model/solution";


@Injectable()
export class SolutionService {
    baseUrl : string;
    constants: AppConstants;
    options: RequestOptions;

    constructor(private http: Http, private app_constants: AppConstants) {
        this.baseUrl = app_constants.baseUrl + '/solution/';
        this.constants = app_constants;
        const headers = new Headers({
            Authorization: 'Bearer ' + localStorage.getItem("access_token")
        });
        this.options = new RequestOptions();
        this.options.headers = headers;
    }

    submitSolution(newSolution: Solution): Observable<Solution> {    
        let solution = this.http.post(this.baseUrl, newSolution, this.options)
          .map((res: Response) => {
            return new Solution(res.json().payload);
          });
        return solution;
      }
}