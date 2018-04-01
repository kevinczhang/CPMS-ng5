import { BehaviorSubject } from "rxjs";
import { Injectable }    from '@angular/core';

import { Problem } from "../model/problem";
import { ProblemService }  from '../services/problem.service';

@Injectable()
export class CPMSDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<Problem[]>;
  get data(): Problem[] { return this.dataChange.value; }

  constructor(private problemService: ProblemService) {
    this.dataChange = new BehaviorSubject<Problem[]>([]);
    // Fill up the database with 100 users.
    this.problemService.getProblems().subscribe(problems => {
      const copiedData = this.data.slice();
      for (let i = 0; i < problems.length; i++) {        
        copiedData.push(problems[i]);  
      }
      this.dataChange.next(copiedData);
    });
  }

  /** Adds a new user to the database. */
  addProblem(problem : Problem) {
    const copiedData = this.data.slice();
    copiedData.push(problem);
    this.dataChange.next(copiedData);
  }

  updateExistingProblem(problem : Problem){
    const copiedData = this.data.slice();
    let updateProblem = copiedData.find(p => p.ID === problem.ID);
    if(!updateProblem) return;
    if(updateProblem.NUMBER){
      updateProblem.NUMBER = problem.NUMBER;
    }
    if(updateProblem.TITLE){
      updateProblem.TITLE = problem.TITLE;
    }
    if(updateProblem.DIFFICULTY){
      updateProblem.DIFFICULTY = problem.DIFFICULTY;
    }
    if(updateProblem.DESCRIPTION){
      updateProblem.DESCRIPTION = problem.DESCRIPTION;
    }
    if(updateProblem.SOLUTION){
      updateProblem.SOLUTION = problem.SOLUTION;
    }
    if(updateProblem.TAGS){
      updateProblem.TAGS = problem.TAGS;
    }
    if(updateProblem.COMPANIES){
      updateProblem.COMPANIES = problem.COMPANIES;
    }
    if(updateProblem.SPECIALTAGS){
      updateProblem.SPECIALTAGS = problem.SPECIALTAGS;
    }
    this.dataChange.next(copiedData);
  }

  updateProblem(problem : Problem){
    let newProblem = problem;
    this.problemService.updateProblem(problem)
        .subscribe(problem => {
          this.updateExistingProblem(newProblem);
          });
  }

  addNewProblem(problem : Problem){
    let newProblem = problem;
    this.problemService.addProblem(problem)
        .subscribe(problem => {
          this.addProblem(newProblem);
        });
  }

}
