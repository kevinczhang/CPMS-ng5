import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Problem } from '../model/problem';
import { ProblemJSON } from '../model/problemJSON';
import { AppConstants } from '../shared/app-constants';
import { ProblemSummary } from '../model/problemSummary';

@Injectable()
export class ProblemService {
  baseUrl : string;
  constants: AppConstants;
  
  constructor(private http: Http, private app_constants: AppConstants) {
    this.baseUrl = app_constants.baseUrl + '/question/';
    this.constants = app_constants;
  }

  getProblems(): Observable<ProblemSummary[]> {
    const headers = new Headers({
      Authorization: 'Bearer ' + localStorage.getItem("access_token")
    });
    let options: RequestOptions = new RequestOptions();
    options.headers = headers;
    let problems = this.http.get(this.baseUrl, options)
      .map((res: Response) => {
        return res.json().payload.map((r: any) => {
          return new ProblemSummary(r);
        });
      });
    return problems;
  }

  getAdminProblems(): Observable<ProblemSummary[]> {
    const headers = new Headers({
      Authorization: 'Bearer ' + localStorage.getItem("access_token")
    });
    let options: RequestOptions = new RequestOptions();
    options.headers = headers;
    let problems = this.http.get(this.baseUrl + 'admin', options)
      .map((res: Response) => {
        return res.json().payload.map((r: any) => {
          return new ProblemSummary(r);
        });
      });
    return problems;
  }

  updateProblem(newProblem: Problem): Observable<Problem> {
    let problemJSON: ProblemJSON = new ProblemJSON(newProblem, this.constants);
    let problem = this.http.put(this.baseUrl + newProblem.ID, problemJSON)
      .map((res: Response) => {
        res = res.json();
      }).catch(
        this.handleError
      ).subscribe();
      return Observable.of(newProblem);
  }

  addProblem(newProblem: Problem): Observable<Problem> {
    let problemJSON: ProblemJSON = new ProblemJSON(newProblem, this.constants);
    let problem = this.http.post(this.baseUrl, problemJSON)
      .map((res: Response) => {        
        res = res.json();
      }).catch(
        this.handleError
      ).subscribe();
    return Observable.of(newProblem);
  }

  deleteProblem(id: string): Observable<Problem> {
    return this.http.delete(this.baseUrl + '/' + id)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  getOneProblem(id: string): Observable<Problem> {    
    let problem = this.http.get(this.baseUrl + '/' + id)
      .map((res: Response) => {
        return new Problem(res.json().payload);
      });
    return problem;
  }

  private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
