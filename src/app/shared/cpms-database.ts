import { BehaviorSubject } from "rxjs";
import { Injectable }    from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material';
import { JwtHelper } from 'angular2-jwt';

import { Problem } from "../model/problem";
import { ProblemService }  from '../services/problem.service';
import { ProblemSummary } from "../model/problemSummary";
import { LoaderService } from "../services/loader.service";

@Injectable()
export class CPMSDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<ProblemSummary[]>;
  get data(): ProblemSummary[] { return this.dataChange.value; }
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private problemService: ProblemService, private toastr: ToastrService, 
    private snackBar: MatSnackBar, private loaderService: LoaderService) {
      const decodedToken = this.jwtHelper.decodeToken(localStorage.getItem("access_token"));
      this.dataChange = new BehaviorSubject<ProblemSummary[]>([]);
      if(decodedToken.sub !== "1"){
        this.problemService.getProblems().subscribe(problems => {
          const copiedData = this.data.slice();
          for (let i = 0; i < problems.length; i++) {        
            copiedData.push(problems[i]);  
          }
          this.dataChange.next(copiedData);
        });
      }
      
      this.problemService.getAdminProblems().subscribe(problems => {
        const copiedData = this.data.slice();
        for (let i = 0; i < problems.length; i++) {        
          copiedData.push(problems[i]);  
        }
        this.dataChange.next(copiedData);
        loaderService.hide();
      });
    }

  /** Adds a new user to this database. */
  addProblem(problem : Problem) {
    const copiedData = this.data.slice();
    let problemSummary = new ProblemSummary(problem);
    copiedData.push(problemSummary);
    this.dataChange.next(copiedData);
    this.toastr.success('Problem added!', 'Success');
    this.snackBar.open('Problem added!', null, {
      duration: 2000,
    });
  }

  // Update this database
  updateExistingProblem(problem : Problem){
    const copiedData = this.data.slice();
    let updateProblem = copiedData.find(p => p.id === problem.ID);
    if(!updateProblem) return;
    updateProblem.number = problem.NUMBER ? problem.NUMBER : updateProblem.number;
    updateProblem.source = problem.SOURCE ? problem.SOURCE : updateProblem.source;
    updateProblem.title = problem.TITLE ? problem.TITLE : updateProblem.title;
    updateProblem.level = problem.DIFFICULTY ? problem.DIFFICULTY : updateProblem.level;    
    this.dataChange.next(copiedData);
    this.toastr.success('Problem updated!', 'Success');
    this.snackBar.open('Problem updated!', null, {
      duration: 2000,
    });
  }

  // Update by calling service
  updateProblem(problem : Problem){
    let newProblem = problem;
    this.problemService.updateProblem(problem)
        .subscribe(problem => {
          this.updateExistingProblem(newProblem);
          });
  }

  // Update by calling service
  addNewProblem(problem : Problem){
    let newProblem = problem;
    this.problemService.addProblem(problem)
        .subscribe(problem => {
          this.addProblem(newProblem);
        });
  }

  // Delete problem calling service then update this database
  deleteProblem(problemId: string) {
    const index: number = this.data.indexOf(this.data.find(x => x.id === problemId));
    if(index === -1){
      return;
    }
    this.problemService.deleteProblem(problemId)
        .subscribe(() => {
          const copiedData = this.data.slice();
          copiedData.splice(index, 1);
          this.dataChange.next(copiedData);
          this.toastr.warning('Problem deleted!', 'Warning');
          this.snackBar.open('Problem deleted!', null, {
            duration: 2000,
          });
        });
  }

}
