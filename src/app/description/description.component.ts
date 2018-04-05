import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Guid } from "guid-typescript";

import { CPMSDatabase } from "../shared/cpms-database";
import { Problem } from "../model/problem";
import { Tag } from "../model/tag";
import { AppConstants } from '../shared/app-constants';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  
  problem: Problem;
  difficultyOptions: any[];
  sourceOptions: any[];
  typeOptions: any[];
  tags: string[];
  companies: string[];
  specialTags: string[];
  tagOptions: Tag[] = [];
  companyOptions: Tag[] = [];
  specialTagOptions: Tag[] = [];  
  defaultTags: string[] = [];
  defaultCompanies: string[] = [];
  defaultSpecialTags: string[] = [];
  editorConfig: any;

  rForm: FormGroup;
  @ViewChild('editor') editor;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private _cpmsDatabase: CPMSDatabase,
    private fb: FormBuilder,
    private app_constants: AppConstants
  ) {
    // Initialize the variables
    this.sourceOptions = this.app_constants.sourceOptions;
    this.difficultyOptions = this.app_constants.difficultyOptions;
    this.typeOptions = this.app_constants.typeOptions;
    this.tags = this.app_constants.tags;
    this.companies = this.app_constants.companies;
    this.specialTags = this.app_constants.specialTags;
    this.editorConfig = this.app_constants.editorConfig;

    // construct tagOptions
    for (var i in this.tags) {
      let newTag = new Tag(i, this.tags[i]);
      this.tagOptions.push(newTag);
    }
    // construct companyOptions
    for (var i in this.companies) {
      let newCompany = new Tag(i, this.companies[i]);
      this.companyOptions.push(newCompany);
    }
    // construct companyOptions
    for (var i in this.specialTags) {
      let newSpecailTag = new Tag(i, this.specialTags[i]);
      this.specialTagOptions.push(newSpecailTag);
    }
    // Define FormControl and formGroup
    this.rForm = fb.group({
      'id': new FormControl('', [Validators.required]),
      'source': new FormControl('', [Validators.required]),
      'type': new FormControl('', [Validators.required]),
      'number': new FormControl('', []),
      'difficulty': new FormControl('', [Validators.required]),
      'title': new FormControl('', [Validators.required]),
      'topics': new FormControl('', [Validators.required]),
      'companies': new FormControl('', []),
      'tags': new FormControl('', []),
      'description': new FormControl('', [Validators.required]),
      'solution': new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let passedInId: string = params['id'];
      if (passedInId === '-1') {
        this.rForm.get('id').setValue(Guid.create());
      } else {
        this.problem = this._cpmsDatabase.data.find(x => x.ID === passedInId);
        if (this.problem) {
          // Set default values by converting to array
          let tagNums = this.problem.TAGS;
          for (var i in tagNums) {
            this.defaultTags.push(this.tags[+i]);
          }
          let companyNums = this.problem.COMPANIES;
          for (var i in companyNums) {
            this.defaultCompanies.push(this.companies[+i].trim());
          }
          let specialTagNums = this.problem.SPECIALTAGS;
          for (var i in specialTagNums) {
            this.defaultSpecialTags.push(this.specialTags[+i].trim());
          }
          this.rForm.get('id').setValue(this.problem.ID);
          this.rForm.get('source').setValue(this.problem.SOURCE);
          this.rForm.get('type').setValue(this.problem.TYPE);
          this.rForm.get('number').setValue(this.problem.NUMBER);
          this.rForm.get('difficulty').setValue(this.problem.DIFFICULTY);
          this.rForm.get('title').setValue(this.problem.TITLE);
          this.rForm.get('topics').setValue(this.problem.TAGS);
          this.rForm.get('companies').setValue(this.problem.COMPANIES);
          this.rForm.get('tags').setValue(this.problem.SPECIALTAGS);
          this.rForm.get('description').setValue(this.problem.DESCRIPTION);
          this.rForm.get('solution').setValue(this.problem.SOLUTION);
        }
      }
    });

  }

  ngAfterViewInit() {
    this.editor.setTheme("eclipse");

    this.editor.getEditor().setOptions({
        enableBasicAutocompletion: true
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
    // newProblem.ID = problem.problemId;
    // newProblem.NUMBER = problem.problemNumber;
    // newProblem.TITLE = problem.problemTitle;
    // newProblem.DIFFICULTY = problem.problemDifficulty;
    // newProblem.DESCRIPTION = problem.problemDescription;
    // newProblem.SOLUTION = problem.problemSolution;
    // newProblem.TAGS = problem.problemTags ? problem.problemTags.join(',') : '';
    // newProblem.COMPANIES = problem.problemCompanies ? problem.problemCompanies.join(',') : '';
    // newProblem.SPECIALTAGS = problem.problemSpecialTags ? problem.problemSpecialTags.join(',') : '';
    console.log(problem);
    console.log(newProblem);

    if (this._cpmsDatabase.data.find(x => x.ID === newProblem.ID)) {
      this._cpmsDatabase.updateProblem(newProblem);
    } else {
      console.log("This is a new problem.");
      this._cpmsDatabase.addNewProblem(newProblem);
    }
    this.location.back();
  }
}
