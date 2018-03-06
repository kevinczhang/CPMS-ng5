import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { ExampleDatabase } from "../shared/example-database";
import { Problem } from "../model/problem";
import { Tag } from "../model/tag";

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  problem: Problem;
  passedInId: number;

  @ViewChild('editor') editor;
  text: string = "Selcet * From myDatabase;";

  difficultyOptions = [
    { value: 'Easy', viewValue: 'Easy' },
    { value: 'Medium', viewValue: 'Medium' },
    { value: 'Hard', viewValue: 'Hard' }
  ];

  tags: string[] = ["Array", "Hash Table", "Linked List", "Math", "Two Pointer", "String",
    "Binary Search", "Divide and Conquer", "Backtracking", "Dynamic Programming", "Design",
    "Trie", "Tree", "Sort", "Depth-first Search", "Stack",
    "Union Find", "Greedy", "Queue", "Breath-first Search", "Heap",
    "Matrix", "Bit Manipulation", "Graph", "Topological Sort", "Queue",
    "Binary Indexed Tree", "Segment Tree", "Binary Search Tree", "Memorization",
    "Minimax", "Recursion", "Reservoir Sampling", "Minimax"];

  companies: string[] = ["Facebook", "Amazon", "Microsoft", "Linkedin"];

  specialTags: string[] = ["Remember", "CodeSnippet", "Recent"];

  tagOptions: Tag[] = [];
  companyOptions: Tag[] = [];
  specialTagOptions: Tag[] = [];

  rForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private _exampleDatabase: ExampleDatabase,
    private fb: FormBuilder
  ) {
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
      'problemId': new FormControl('', [Validators.required]),
      'problemNumber': new FormControl('', []),
      'problemDifficulty': new FormControl('', [Validators.required]),
      'problemTitle': new FormControl('', [Validators.required]),
      'problemTags': new FormControl('', [Validators.required]),
      'problemCompanies': new FormControl('', []),
      'problemSpecialTags': new FormControl('', []),
      'problemDescription': new FormControl('', [Validators.required]),
      'problemSolution': new FormControl('', [Validators.required])
    });
  }

  defaultTags: string[] = [];
  defaultCompanies: string[] = [];
  defaultSpecialTags: string[] = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.passedInId = +params['id'];
      if (this.passedInId === -1) {
        this.rForm.get('problemId').setValue(this._exampleDatabase.data.length);
      } else {
        this.problem = this._exampleDatabase.data.find(x => x.ID === this.passedInId);
        if (this.problem) {
          // Set default values by converting to array
          let tagNums = this.problem.TAGS.split(',');
          for (var i in tagNums) {
            this.defaultTags.push(tagNums[i].trim());
          }
          let companyNums = this.problem.COMPANIES.split(',');
          for (var i in companyNums) {
            this.defaultCompanies.push(companyNums[i].trim());
          }
          let specialTagNums = this.problem.SPECIALTAGS.split(',');
          for (var i in specialTagNums) {
            this.defaultSpecialTags.push(specialTagNums[i].trim());
          }
          this.rForm.get('problemId').setValue(this.problem.ID);
          this.rForm.get('problemNumber').setValue(this.problem.NUMBER);
          this.rForm.get('problemDifficulty').setValue(this.problem.DIFFICULTY);
          this.rForm.get('problemTitle').setValue(this.problem.TITLE);
          this.rForm.get('problemTags').setValue(this.defaultTags);
          this.rForm.get('problemCompanies').setValue(this.defaultCompanies);
          this.rForm.get('problemSpecialTags').setValue(this.defaultSpecialTags);
          this.rForm.get('problemDescription').setValue(this.problem.DESCRIPTION);
          this.rForm.get('problemSolution').setValue(this.problem.SOLUTION);
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
    let newProblem: Problem = new Problem();
    newProblem.ID = problem.problemId;
    newProblem.NUMBER = problem.problemNumber;
    newProblem.TITLE = problem.problemTitle;
    newProblem.DIFFICULTY = problem.problemDifficulty;
    newProblem.DESCRIPTION = problem.problemDescription;
    newProblem.SOLUTION = problem.problemSolution;
    newProblem.TAGS = problem.problemTags ? problem.problemTags.join(',') : '';
    newProblem.COMPANIES = problem.problemCompanies ? problem.problemCompanies.join(',') : '';
    newProblem.SPECIALTAGS = problem.problemSpecialTags ? problem.problemSpecialTags.join(',') : '';
    console.log(problem);
    console.log(newProblem);

    if (problem.problemId < this._exampleDatabase.data.length) {
      this._exampleDatabase.updateProblem(newProblem);
    } else {
      console.log("This is a new problem.");
      this._exampleDatabase.addNewProblem(newProblem);
    }
    this.location.back();
  }
}
