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
import { ProblemService } from '../services/problem.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-problem',
  templateUrl: './edit-problem.component.html',
  styleUrls: ['./edit-problem.component.css']
})
export class EditProblemComponent implements OnInit {

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
  familiarityText: string;

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
    this.sourceOptions = this.app_constants.sourceOptions;
    this.difficultyOptions = this.app_constants.difficultyOptions;
    this.typeOptions = this.app_constants.typeOptions;
    this.tags = this.app_constants.tags;
    this.companies = this.app_constants.companies;
    this.specialTags = this.app_constants.specialTags;
    this.editorConfig = this.isAdmin ? this.app_constants.adminEditorConfig : this.app_constants.userEditorConfig;

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
      'familiarity': new FormControl('', [Validators.required]),
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
        this.problemService.getOneProblem(passedInId)
          .subscribe(p => {
            // Set default values by converting to array
            let tagNums = p.TAGS;
            for (var i in tagNums) {
              this.defaultTags.push(this.tags[+i]);
            }
            let companyNums = p.COMPANIES;
            for (var i in companyNums) {
              this.defaultCompanies.push(this.companies[+i].trim());
            }
            let specialTagNums = p.SPECIALTAGS;
            for (var i in specialTagNums) {
              this.defaultSpecialTags.push(this.specialTags[+i].trim());
            }
            this.rForm.get('id').setValue(p.ID);
            this.rForm.get('source').setValue(p.SOURCE);
            this.rForm.get('type').setValue(p.TYPE);
            this.rForm.get('number').setValue(p.NUMBER);
            this.rForm.get('difficulty').setValue(p.DIFFICULTY);
            this.rForm.get('title').setValue(p.TITLE);
            this.rForm.get('topics').setValue(p.TAGS);
            this.rForm.get('companies').setValue(p.COMPANIES);
            this.rForm.get('tags').setValue(p.SPECIALTAGS);
            this.rForm.get('familiarity').setValue(p.FAMILIARITY);
            this.rForm.get('description').setValue(p.DESCRIPTION);
            this.rForm.get('solution').setValue(p.SOLUTION);
            this.familiarityText = this.getFamiliarityTextBasedOnNumber(p.FAMILIARITY);

            // if(!this.isAdmin){
            //   this.rForm.get('source').disable();
            //   this.rForm.get('type').disable();
            //   this.rForm.get('difficulty').disable();
            //   this.rForm.get('topics').disable();
            //   this.rForm.get('companies').disable();
            //   this.rForm.get('tags').disable();
            //   this.rForm.get('familiarity').disable();
            // }
            
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
