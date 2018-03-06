import { Problem } from '../model/problem';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProblemService {
  constructor(private http: Http) {

  }

  getProblems(): Observable<Problem[]> {
    //let problems = this.http.get('../../assets/problems.json')
    let problems = this.http.get('http://localhost:8081/api/problems')
      .map((res: Response) => {
        return res.json().map((r: any) => {
          return <Problem>({
            ID: r.ID,
            NUMBER: r.NUMBER,
            TITLE: r.TITLE,
            DIFFICULTY: r.DIFFICULTY,
            DESCRIPTION: r.DESCRIPTION,
            SOLUTION: r.SOLUTION,
            TAGS: r.TAGS,
            COMPANIES: r.COMPANIES,
            SPECIALTAGS: r.SPECIALTAGS
          });
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
