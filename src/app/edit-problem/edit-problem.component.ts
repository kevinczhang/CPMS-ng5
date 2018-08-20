import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Guid } from "guid-typescript";

import { CPMSDatabase } from "../shared/cpms-database";
import { Tag } from "../model/tag";
import { AppConstants } from '../shared/app-constants';
import { ProblemService } from '../services/problem.service';
import { UserService } from '../services/user.service';
import { ProblemDetail } from '../model/problemDetail';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-edit-problem',
  templateUrl: './edit-problem.component.html',
  styleUrls: ['./edit-problem.component.css']
})
export class EditProblemComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

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
    this.sourceOptions = this.app_constants.sourceOptions;
    this.difficultyOptions = this.app_constants.difficultyOptions;
    this.typeOptions = this.app_constants.typeOptions;
    this.tags = this.app_constants.tags;
    this.companies = this.app_constants.companies;
    this.specialTags = this.app_constants.specialTags;
    this.editorConfig = this.isAdmin ? this.app_constants.adminEditorConfig : this.app_constants.userEditorConfig;
    this.languageOptions = this.app_constants.languageOptions;

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
      'level': new FormControl('', [Validators.required]),
      'title': new FormControl('', [Validators.required]),
      'topics': new FormControl('', [Validators.required]),
      'companies': new FormControl('', []),
      'tags': new FormControl('', []),
      'familiarity': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required]),
      'solution': new FormControl('', [Validators.required]),
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
            // Set default values by converting to array
            let tagNums = p.topics;
            for (var i in tagNums) {
              this.defaultTags.push(String(this.tags.indexOf(tagNums[i])));
            }
            let companyNums = p.companies;
            for (var i in companyNums) {
              this.defaultCompanies.push(String(this.companies.indexOf(companyNums[i])));
            }
            let specialTagNums = p.tags;
            for (var i in specialTagNums) {
              this.defaultSpecialTags.push(String(this.specialTags.indexOf(specialTagNums[i])));
            }
            this.rForm.get('id').setValue(p.id);
            this.rForm.get('source').setValue(p.source);
            this.rForm.get('type').setValue(p.type);
            this.rForm.get('number').setValue(p.number);
            this.rForm.get('level').setValue(p.level);
            this.rForm.get('title').setValue(p.title);
            this.rForm.get('topics').setValue(this.defaultTags);
            this.rForm.get('companies').setValue(this.defaultCompanies);
            this.rForm.get('tags').setValue(this.defaultSpecialTags);
            this.rForm.get('familiarity').setValue(p.familiarity);
            this.rForm.get('description').setValue(p.description);
            if(p.solutions && p.solutions.length > 0){
              this.rForm.get('solution').setValue(p.solutions[0].content);
            }            
            this.rForm.get('solution_language').setValue('Java');
            this.rForm.get('note').setValue(p.note);
            
            this.familiarityText = this.getFamiliarityTextBasedOnNumber(p.familiarity);            
          });
      }      
    });
    
  }

  ngAfterViewInit() {
    this.editor.setTheme("eclipse");

    this.editor.getEditor().setOptions({
      enableBasicAutocompletion: true,
      readOnly: this.isAdmin ? false : true,
      maxLines: Infinity
    });

    this.editor.getEditor().commands.addCommand({
      name: "showOtherCompletions",
      bindKey: "Ctrl-.",
      exec: function (editor) {

      }
    })
  }

  addOrUpdateProblem(problem: any) {
    let newProblem: ProblemDetail = new ProblemDetail(problem);

    if (this._cpmsDatabase.data.find(x => x.id === newProblem.id)) {
      this._cpmsDatabase.updateProblem(newProblem);
      this.blockUI.start("Updating question.");
    } else {
      console.log("This is a new problem.");
      this._cpmsDatabase.addNewProblem(newProblem);
      this.blockUI.start("Adding new question.");
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

  languageSelectionChange($event) {
    console.log($event.value);
  }

}
