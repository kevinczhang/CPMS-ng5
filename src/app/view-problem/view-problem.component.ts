import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Guid } from "guid-typescript";

import { CPMSDatabase } from "../shared/cpms-database";
import { Problem } from "../model/problem";
import { Tag } from "../model/tag";
import { AppConstants } from '../shared/app-constants';
import { ProblemService } from '../services/problem.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-view-problem',
  templateUrl: './view-problem.component.html',
  styleUrls: ['./view-problem.component.css']
})
export class ViewProblemComponent implements OnInit {
 
  editorConfig: any;
  familiarityText: string;

  title: string;
  description: string;
  source: string;
  type: string;
  number: number;
  difficulty: string;
  tags: string[];
  companies: string[];
  specialTags: string[];

  rForm: FormGroup;
  @ViewChild('editor') editor;
  isAdmin: boolean;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private _cpmsDatabase: CPMSDatabase,
    private fb: FormBuilder,
    private app_constants: AppConstants,
    private problemService: ProblemService,
    private userService: UserService
  ) {
    // Initialize the variables
    this.isAdmin = userService.isAdminUser();
    this.editorConfig = this.app_constants.userEditorConfig;

    // Define FormControl and formGroup
    this.rForm = fb.group({
      'id': new FormControl('', [Validators.required]),
      'familiarity': new FormControl('', [Validators.required]),
      'solution': new FormControl('', [Validators.required]),
      'note': new FormControl('', [])
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let passedInId: string = params['id'];
      if (passedInId === '-1') {
        this.rForm.get('id').setValue(Guid.create());
      } else {
        this.problemService.getOneProblem(passedInId)
          .subscribe(p => {
            this.description = p.DESCRIPTION;
            this.title = p.TITLE;
            this.source = p.SOURCE;
            this.type = p.TYPE;
            this.difficulty = p.DIFFICULTY;
            this.number = p.NUMBER; 
            this.tags = p.TAGS;
            this.companies = p.COMPANIES;    
            this.specialTags = p.SPECIALTAGS;

            this.rForm.get('id').setValue(p.ID);
            this.rForm.get('familiarity').setValue(p.FAMILIARITY);
            this.rForm.get('solution').setValue(p.SOLUTION);
            this.familiarityText = this.getFamiliarityTextBasedOnNumber(p.FAMILIARITY);
            this.rForm.get('note').setValue(p.NOTE);                     
          });
      }      
    });
    
  }

  ngAfterViewInit() {
    this.editor.setTheme("eclipse");

    this.editor.getEditor().setOptions({
      enableBasicAutocompletion: true,
      readOnly: this.isAdmin ? false : true
    });

    this.editor.getEditor().commands.addCommand({
      name: "showOtherCompletions",
      bindKey: "Ctrl-.",
      exec: function (editor) {

      }
    })
  }

  addOrUpdateProblem(problem: any) {
    let newProblem: Problem = new Problem(problem);

    if (this._cpmsDatabase.data.find(x => x.id === newProblem.ID)) {
      this._cpmsDatabase.updateProblem(newProblem);
    } else {
      console.log("This is a new problem.");
      this._cpmsDatabase.addNewProblem(newProblem);
    }
    this.location.back();
  }

  familiarityChange(r: any) {
    this.familiarityText = this.getFamiliarityTextBasedOnNumber(r.value);
  }

  private getFamiliarityTextBasedOnNumber(input: number): string {
    if (input >= 2 && input < 3) {
      return 'Familiarity';
    } else if (input >= 3 && input < 4) {
      return 'Proficiency';
    } else if (input >= 4) {
      return 'Mastery    ';
    }
    return 'New        ';
  }

}
