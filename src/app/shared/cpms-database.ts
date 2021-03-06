import { BehaviorSubject } from "rxjs";
import { Injectable }    from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material';
import { JwtHelper } from 'angular2-jwt';

import { ProblemService }  from '../services/problem.service';
import { SolutionService }  from '../services/solution.service';
import { ProblemSummary } from "../model/problemSummary";
import { LoaderService } from "../services/loader.service";
import { Solution } from "../model/solution";
import { UserService } from "../services/user.service";
import { ProblemDetail } from "../model/problemDetail";
import { BlockUI, NgBlockUI } from "ng-block-ui";

@Injectable()
export class CPMSDatabase {  
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<ProblemSummary[]>;
  get data(): ProblemSummary[] { return this.dataChange.value; }
  jwtHelper: JwtHelper = new JwtHelper();
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private problemService: ProblemService, 
    private toastr: ToastrService, 
    private snackBar: MatSnackBar, 
    private loaderService: LoaderService,
    private solutionService: SolutionService,
    private userService: UserService
  ) {
      const decodedToken = this.jwtHelper.decodeToken(localStorage.getItem("access_token"));
      this.dataChange = new BehaviorSubject<ProblemSummary[]>([]);
      if(!userService.isAdmin){
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
  addProblem(problem : ProblemDetail) {
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
  updateExistingProblem(problem : ProblemDetail){
    const copiedData = this.data.slice();
    let updateProblem = copiedData.find(p => p.id === problem.id);
    if(!updateProblem) return;
    updateProblem.number = problem.number ? problem.number : updateProblem.number;
    updateProblem.source = problem.source ? problem.source : updateProblem.source;
    updateProblem.title = problem.title ? problem.title : updateProblem.title;
    updateProblem.level = problem.level ? problem.level : updateProblem.level;
    updateProblem.companies = problem.companies ? problem.companies : updateProblem.companies;
    updateProblem.tags = problem.tags ? problem.tags : updateProblem.tags;    
    this.dataChange.next(copiedData);
    this.toastr.success('Problem updated!', 'Success');
    this.snackBar.open('Problem updated!', null, {
      duration: 2000,
    });
  }

  // Update by calling service
  updateProblem(problem : ProblemDetail){
    let newProblem = problem;
    this.problemService.updateProblem(problem)
        .subscribe(problem => {
          this.updateExistingProblem(newProblem);
          this.blockUI.stop();
          });
  }

  // Update by calling service
  addNewProblem(problem : ProblemDetail){
    let newProblem = problem;
    this.problemService.addProblem(problem)
        .subscribe(problem => {
          this.addProblem(newProblem);
          this.blockUI.stop();
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
          this.blockUI.stop();
        });
  }

  submitSolution(solution: Solution): any {
    this.solutionService.submitSolution(solution)
        .subscribe(() => {
          this.toastr.success('Solution submitted!', 'Success');
          this.snackBar.open('Solution submitted!', null, {
            duration: 2000,
          });
          this.blockUI.stop();
        });
  }

}
