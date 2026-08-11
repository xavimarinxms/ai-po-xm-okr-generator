export interface KeyResult {
  id: string;
  description: string;
  baseline: string;
  target: string;
  unit: string;
  progress: number; // 0-100
}

export interface Objective {
  id: string;
  title: string;
  description: string;
  keyResults: KeyResult[];
}

export interface OKRInput {
  productName: string;
  mission: string;
  quarter: string;
  teamFocus: string;
  constraints?: string;
}

export interface GeneratedOKRs {
  objectives: Omit<Objective, 'id'>[];
}
