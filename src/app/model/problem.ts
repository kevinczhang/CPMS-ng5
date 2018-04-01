export class Problem {
  
  ID: string;
  SOURCE: string;
  TYPE: string;
  NUMBER: number;
  TITLE: string;
  DIFFICULTY: string;
  DESCRIPTION: string;
  SOLUTION: string;
  TAGS: string[];
  COMPANIES: string[];
  SPECIALTAGS: string[];
    
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
    this.SOURCE = this.sources[r.source];
    this.TYPE = this.types[r.type];
    this.NUMBER = r.number;
    this.TITLE = r.title;
    this.DIFFICULTY = this.levels[r.difficulty];
    this.DESCRIPTION = r.description;
    this.SOLUTION = r.solution;
    this.TAGS = r.topics ? this.getTags(r.topics) : [] ;
    this.COMPANIES = r.companies ? this.getCompanies(r.companies) : [];
    this.SPECIALTAGS = r.tags ? this.getSpecialTags(r.tags) : [];
  }
    
}
  