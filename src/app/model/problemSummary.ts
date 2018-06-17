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

  constructor(r : any) {
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
  