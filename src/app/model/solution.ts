export class Solution {
    id: string;
    solution_language: string;
    solution: string;
    note: string;
    familiarity: number;

    constructor(r : any) {
        this.solution = r.solution;
        this.solution_language = r.solution_language;        
    }
}