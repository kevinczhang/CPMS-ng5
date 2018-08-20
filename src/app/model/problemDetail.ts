import { AppConstants } from "../shared/app-constants";
import { ProblemSummary } from "./problemSummary";
import { Solution } from "./solution";

export class ProblemDetail extends ProblemSummary{

    type: string;
    description: string;
    note: string;
    solution_language: string;
    solution: string;
    solutions: any[] = [];
    submissions: any[] = [];

    constructor(r: any, constants?: AppConstants) {
        super(r);
        this.type = r.type;
        this.description = r.description;
        this.note = r.note;
        this.solution = r.solution;
        this.solution_language = r.solution_language;
        if(r.solutions == null || r.solutions.length === 0){
            this.solutions.push(new Solution(r));
        } else {
            this.solutions = r.solutions;
        }
        this.submissions = r.submissions;
    }
}
