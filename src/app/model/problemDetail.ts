import { Problem } from "./problem";
import { AppConstants } from "../shared/app-constants";
import { ProblemSummary } from "./problemSummary";

export class ProblemDetail extends ProblemSummary{

    type: string;
    description: string;
    note: string;
    solution_language: string;
    solution: string;
    solutions: any[];
    submissions: any[];

    constructor(r: any, constants?: AppConstants) {
        super(r);
        if(r instanceof Problem){
            this.id = r.ID.toString();
            this.number = r.NUMBER;
            this.type = r.TYPE;
            this.title = r.TITLE;
            this.familiarity = r.FAMILIARITY;
            this.description = r.DESCRIPTION;
            this.solution = r.SOLUTION;
            this.solution_language = r.SOLUTION_LANGUAGE;
            this.note = r.NOTE;
        } else {
            this.type = r.type;
            this.description = r.description;
            this.note = r.note;
            this.solutions = r.solutions;
            this.submissions = r.submissions;
        }        
    }
}
