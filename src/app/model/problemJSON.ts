import { Problem } from "./problem";
import { AppConstants } from "../shared/app-constants";

export class ProblemJSON {

    id: string;
    source: number;
    number: number;
    type: number;
    title: string;
    difficulty: number;
    topics: number[];
    companies: number[];
    tags: number[];
    familiarity: number;
    solution_language: string;
    solution: string;
    description: string;

    constructor(r: Problem, constants: AppConstants) {
        this.id = r.ID.toString();
        this.source = constants.sources.indexOf(r.SOURCE);
        this.number = r.NUMBER;
        this.type = constants.types.indexOf(r.TYPE);
        this.title = r.TITLE;
        this.difficulty = constants.levels.indexOf(r.DIFFICULTY);
        this.topics = r.TAGS ? r.TAGS.map(x => +x) : [];
        this.companies = r.COMPANIES ? r.COMPANIES.map(x => +x) : [];
        this.tags = r.SPECIALTAGS ? r.SPECIALTAGS.map(x => +x) : [];
        this.familiarity = r.FAMILIARITY;
        this.description = r.DESCRIPTION;
        this.solution = r.SOLUTION;
        this.solution_language = r.SOLUTION_LANGUAGE;
    }
}
