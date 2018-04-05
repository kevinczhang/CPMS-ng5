import { Injectable } from "@angular/core";

@Injectable()
export class AppConstants {
    readonly sources: string[] = ['LeetCode', 'Facebook', 'CodeSnippet', 'LintCode'];
    readonly types: string[] = ['Algorithm', 'Database', 'OODesign', 'SystemDesign'];
    readonly levels: string[] = ['Easy', 'Medium', 'Hard' ];
    
    readonly difficultyOptions = [
        { value: 'Easy', viewValue: 'Easy' },
        { value: 'Medium', viewValue: 'Medium' }, 
        { value: 'Hard', viewValue: 'Hard' }];
    readonly sourceOptions = [
        { value: 'LeetCode', viewValue: 'LeetCode' },
        { value: 'Facebook', viewValue: 'Facebook' }, 
        { value: 'CodeSnippet', viewValue: 'CodeSnippet' }, 
        { value: 'LintCode', viewValue: 'LintCode' }];
    readonly typeOptions = [
        { value: 'Algorithm', viewValue: 'Algorithm' },
        { value: 'Database', viewValue: 'Database' }, 
        { value: 'OODesign', viewValue: 'OO Design' }, 
        { value: 'SystemDesign', viewValue: 'System Design' }];
    readonly tags = ["Array", "Hash Table", "Linked List", "Math", "Two Pointer", "String",
      "Binary Search", "Divide and Conquer", "Backtracking", "Dynamic Programming", "Design",
      "Trie", "Tree", "Sort", "Depth-first Search", "Stack",
      "Union Find", "Greedy", "Queue", "Breath-first Search", "Heap",
      "Matrix", "Bit Manipulation", "Graph", "Topological Sort", "Queue",
      "Binary Indexed Tree", "Segment Tree", "Binary Search Tree", "Memorization",
      "Minimax", "Recursion", "Reservoir Sampling", "Minimax"];
    readonly companies = ["Facebook", "Amazon", "Microsoft", "Linkedin"];
    readonly specialTags = ["Remember", "CodeSnippet", "Recent"];
    
    readonly editorConfig = {
        editable: true,
        spellcheck: false,
        height: '10rem',
        minHeight: '5rem',
        placeholder: 'Type something. Test the Editor... ヽ(^。^)丿',
        translate: 'no'
      };
}