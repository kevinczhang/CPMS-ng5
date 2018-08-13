export class Problem {
  
  ID: string;
  SOURCE: string;
  TYPE: string;
  NUMBER: number;
  TITLE: string;
  DIFFICULTY: string;
  DESCRIPTION: string;
  SOLUTION: string;
  SUBMISSION: string;
  SOLUTION_LANGUAGE: string;
  TAGS: string[];
  FAMILIARITY: number;
  COMPANIES: string[];
  SPECIALTAGS: string[];
  NOTE: string;
    
  sources: string[] = ['LeetCode', 'Facebook', 'CodeSnippet', 'LintCode'];
  types: string[] = ['Algorithm', 'Database', 'OODesign', 'SystemDesign'];
  levels: string[] = ['Easy', 'Medium', 'Hard' ];

  getTags(topics: string[]): string[] {
    let res:string[] = [];
    topics.forEach(i => {
      res.push(i.toString());
    });
    return res;
  }

  getCompanies(companies: string[]): string[] {
    let res:string[] = [];
    companies.forEach(i => {
      res.push(i.toString());
    });
    return res;
  }

  getSpecialTags(specialTags: string[]): string[] {
    let res:string[] = [];
    specialTags.forEach(i => {
      res.push(i.toString());
    });
    return res;
  }

  constructor(r : any) {
    this.ID = r.id;
    this.SOURCE = (typeof r.source) === 'string' ? r.source : this.sources[r.source];
    this.TYPE = (typeof r.type) === 'string' ? r.type : this.types[r.type];
    this.NUMBER = r.number;
    this.TITLE = r.title;
    this.DIFFICULTY = (typeof r.level) === 'string' ? r.level : this.levels[r.level];
    this.DESCRIPTION = r.description;
    this.SOLUTION_LANGUAGE = r.solution_language;
    if(r.solution || r.solutions){
      this.SOLUTION = (typeof r.solution) === 'string' ? r.solution : r.solutions[0].content;
    }
    if(r.submissions && r.submissions.length > 0){
      this.SUBMISSION = r.submissions[0].content;
    }
    this.TAGS = r.topics ? this.getTags(r.topics) : [] ;
    this.FAMILIARITY = r.familiarity ? r.familiarity : 0;
    this.COMPANIES = r.companies ? this.getCompanies(r.companies) : [];
    this.SPECIALTAGS = r.tags ? this.getSpecialTags(r.tags) : [];
    this.NOTE = r.note;
  }
    
}
  