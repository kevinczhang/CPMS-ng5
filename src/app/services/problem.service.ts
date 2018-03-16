import { Problem } from '../model/problem';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProblemService {
  baseUrl : string;
  
  constructor(private http: Http) {
    this.baseUrl = 'http://localhost:8081/SpringBootCRUDApp/api/problem/';
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
    let problem = this.http.put('http://localhost:8081/api/problems/', newProblem)
      .map((res: Response) => {
        res = res.json();
      }).catch(
        this.handleError
      );
      return problem;
  }

  addProblem(newProblem: Problem): Observable<Problem> {
    let problem = this.http.post('http://localhost:8081/api/problems/', newProblem)
      .map((res: Response) => {        
        res = res.json();
      }).catch(
        this.handleError
      );
    return Observable.of(newProblem);
  }

  private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
