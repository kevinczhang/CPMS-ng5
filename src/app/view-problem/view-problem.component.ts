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
  languageOptions: any[];

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
    this.languageOptions = this.app_constants.languageOptions;

    // Define FormControl and formGroup
    this.rForm = fb.group({
      'id': new FormControl('', [Validators.required]),
      'familiarity': new FormControl('', [Validators.required]),
      'answer': new FormControl('', [Validators.required]),
      'solution': new FormControl('', []),
      'solution_language': new FormControl('', [Validators.required]),
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
            this.description = p.description;
            this.title = p.title;
            this.source = p.source;
            this.type = p.type;
            this.difficulty = p.level;
            this.number = p.number; 
            this.tags = p.topics;
            this.companies = p.companies;    
            this.specialTags = p.tags;

            this.rForm.get('id').setValue(p.id);
            this.rForm.get('familiarity').setValue(p.familiarity);
            this.rForm.get('answer').setValue((p.solutions && p.solutions.length > 0) ? p.solutions[0].content : "");
            this.rForm.get('solution').setValue((p.submissions && p.submissions.length > 0) ? p.submissions[0].content : "");
            this.familiarityText = this.getFamiliarityTextBasedOnNumber(p.familiarity);
            this.rForm.get('note').setValue(p.note);
            this.rForm.get('solution_language').setValue('Java');                     
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

  submitSolution(solution: any) {
    this._cpmsDatabase.submitSolution(solution);
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

  languageSelectionChange($event) {
    console.log($event.value);
  }

}
