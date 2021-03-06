import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ProblemDetail } from '../model/problemDetail';
import { AppConstants } from '../shared/app-constants';
import { ProblemSummary } from '../model/problemSummary';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TOKEN_NAME } from '../shared/auth.constant';

@Injectable()
export class ProblemService {

  @BlockUI() blockUI: NgBlockUI;
  baseUrl : string;
  constants: AppConstants;
  options: RequestOptions;
  
  constructor(private http: Http, private app_constants: AppConstants) {
    this.baseUrl = app_constants.baseUrl + '/question/';
    this.constants = app_constants;
    this.options = new RequestOptions();
  }

  getProblems(): Observable<ProblemSummary[]> {
    this.setHeader();
    let problems = this.http.get(this.baseUrl, this.options)
      .map((res: Response) => {
        return res.json().payload.userQuestions.map((r: any) => {
          return new ProblemSummary(r);
        });
      }).catch(
        this.handleError
      );
    return problems;
  }

  getAdminProblems(): Observable<ProblemSummary[]> {
    this.setHeader();
    let problems = this.http.get(this.baseUrl, this.options)
      .map((res: Response) => {
        return res.json().payload.adminQuestions.map((r: any) => {
          return new ProblemSummary(r);
        });
      }).catch(
        this.handleError
      );
    return problems;
  }

  updateProblem(newProblem: ProblemDetail): Observable<ProblemDetail> {
    this.setHeader();
    let problemJSON: ProblemDetail = new ProblemDetail(newProblem, this.constants);
    let problem = this.http.put(this.baseUrl + newProblem.id, problemJSON, this.options)
      .map((res: Response) => {
        res = res.json();
      }).catch(
        this.handleError
      ).subscribe();
      return Observable.of(newProblem);
  }

  addProblem(newProblem: ProblemDetail): Observable<ProblemDetail> {
    this.setHeader();
    let problem = this.http.post(this.baseUrl, newProblem, this.options)
      .map((res: Response) => {        
        res = res.json();
      }).catch(
        this.handleError
      ).subscribe();
    return Observable.of(newProblem);
  }

  deleteProblem(id: string): Observable<any> {
    this.setHeader();
    return this.http.delete(this.baseUrl + id, this.options)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  getOneProblem(id: string): Observable<ProblemDetail> {
    this.setHeader();
    let problem = this.http.get(this.baseUrl + id, this.options)
      .map((res: Response) => {
        return new ProblemDetail(res.json().payload, this.constants);
      });
    return problem;
  }

  private handleError(error: any) {
      let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      this.blockUI.stop();
      return Observable.throw(errMsg);
  }

  private setHeader() {
      const headers = new Headers({
          Authorization: 'Bearer ' + localStorage.getItem(TOKEN_NAME)
      });
      this.options.headers = headers;
  }
}
