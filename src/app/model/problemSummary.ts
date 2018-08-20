export class ProblemSummary {
  
  id: string;
  source: string;
  title: string;
  number: number;
  level: string;
  createdBy: number;
  companies: string[] = [];
  topics: string[] = [];
  tags: string[] = [];
  familiarity: number;
  createdByAdmin: boolean;

  constructor(
    r : any
  ) {
    this.id = String(r.id);
    this.source = r.source;
    this.title = r.title;
    this.number = r.number;
    this.level = r.level;
    this.createdBy = r.createdBy;
    this.companies = (r.companies instanceof Array) ? r.companies : [];
    this.topics = (r.topics instanceof Array) ? r.topics : [];
    this.tags = (r.tags instanceof Array) ? r.tags : [];
    this.familiarity = r.familiarity;
    this.createdByAdmin = r.createdByAdmin;
  }
    
}
  