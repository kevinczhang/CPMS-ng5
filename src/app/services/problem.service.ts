import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Problem } from '../model/problem';
import { ProblemJSON } from '../model/problemJSON';
import { AppConstants } from '../shared/app-constants';

@Injectable()
export class ProblemService {
  baseUrl : string;
  constants: AppConstants;
  
  constructor(private http: Http, private app_constants: AppConstants) {
    this.baseUrl = 'http://localhost:8081/SpringBootCRUDApp/api/problem/';
    this.constants = app_constants;
  }

  getProblems(): Observable<Problem[]> {    
    let problems = this.http.get(this.baseUrl)
      .map((res: Response) => {
        return res.json().payload.map((r: any) => {
          return new Problem(r);
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

  deleteProblem(id: string): void {
    this.http.delete(this.baseUrl + '/' + id);
  }

  private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
