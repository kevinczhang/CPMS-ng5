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
    solution: string;
    description: string;

    constants: AppConstants;

    constructor(r: Problem, constants: AppConstants) {
        this.constants = constants;
        this.id = r.ID;
        this.source = this.constants.sources.indexOf(r.SOURCE);
        this.number = r.NUMBER;
        this.type = this.constants.types.indexOf(r.TYPE);
        this.title = r.TITLE;
        this.difficulty = this.constants.levels.indexOf(r.DIFFICULTY);
        this.topics = r.TAGS ? this.getTopics(r.TAGS) : [];
        this.companies = r.COMPANIES ? this.getCompanies(r.COMPANIES) : [];
        this.tags = r.SPECIALTAGS ? this.getSpecialTags(r.SPECIALTAGS) : [];
        this.description = r.DESCRIPTION;
        this.solution = r.SOLUTION;
    }

    private getTopics(tags: string[]): number[] {
        let res: number[] = [];
        tags.forEach(i => {
            res.push(this.constants.tags.indexOf(i));
        });
        return res;
    }

    private getCompanies(companies: string[]): number[] {
        let res: number[] = [];
        companies.forEach(i => {
            res.push(this.constants.companies.indexOf(i));
        });
        return res;
    }

    private getSpecialTags(specialTags: string[]): number[] {
        let res: number[] = [];
        specialTags.forEach(i => {
            res.push(this.constants.specialTags.indexOf(i));
        });
        return res;
    }

}
