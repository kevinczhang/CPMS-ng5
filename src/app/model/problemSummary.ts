export class ProblemSummary {
  
  id: string;
  source: string;
  title: string;
  number: number;
  level: string;
  createdBy: number;

  constructor(r : any) {
    this.id = r.id;
    this.source = r.source;
    this.title = r.title;
    this.number = r.number;
    this.level = r.level;
    this.createdBy = r.createdBy;
  }
    
}
  