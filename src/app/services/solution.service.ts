import { Injectable } from "../../../node_modules/@angular/core";
import { AppConstants } from "../shared/app-constants";
import { Http, RequestOptions, Headers, Response } from "../../../node_modules/@angular/http";
import { Observable } from "../../../node_modules/rxjs/Observable";
import { Solution } from "../model/solution";
import { TOKEN_NAME } from '../shared/auth.constant';

@Injectable()
export class SolutionService {
    baseUrl : string;
    constants: AppConstants;
    options: RequestOptions;

    constructor(private http: Http, private app_constants: AppConstants) {
        this.baseUrl = this.app_constants.baseUrl + '/solution/';      
        this.options = new RequestOptions();        
    }

    submitSolution(newSolution: Solution): Observable<Solution> {
        this.setHeader();
        let solution = this.http.post(this.baseUrl, newSolution, this.options)
          .map((res: Response) => {
            return new Solution(res.json().payload);
          });
        return solution;
      }

    private setHeader() {
        const headers = new Headers({
            Authorization: 'Bearer ' + localStorage.getItem(TOKEN_NAME)
        });
        this.options.headers = headers;
    }
}