import { Problem } from "./problem";

export class ProblemSummary {
  
  id: string;
  source: string;
  title: string;
  number: number;
  level: string;
  createdBy: number;
  companies: string[];
  topics: string[];
  familiarity: number;

  constructor(
    r : any
  ) {
    if(r instanceof Problem){
      this.id = r.ID;
      this.source = r.SOURCE;
      this.title = r.TITLE;
      this.number = r.NUMBER;
      this.level = r.DIFFICULTY;
      this.companies = r.COMPANIES;
      this.topics = r.TAGS;
      this.familiarity = r.FAMILIARITY;
    } else {
      this.id = r.id;
      this.source = r.source;
      this.title = r.title;
      this.number = r.number;
      this.level = r.level;
      this.createdBy = r.createdBy;
      this.companies = r.companies;
      this.topics = r.topics;
      this.familiarity = r.familiarity;
    }    
  }
    
}
  