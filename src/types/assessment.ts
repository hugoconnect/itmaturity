
export type MaturityLevel = "reactive" | "foundational" | "managed" | "proactive" | "strategic";

export type Category = "responsibility" | "alignment" | "technology" | "security";

export interface Question {
  id: string;
  text: string;
  category: Category;
  allowNA?: boolean;
}

export interface Answer {
  questionId: string;
  value: number | null;
}

export interface CategoryScore {
  category: Category;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface AssessmentResult {
  overallScore: number;
  maxScore: number;
  percentage: number;
  maturityLevel: MaturityLevel;
  categoryScores: CategoryScore[];
  focusArea: Category;
}

export interface UserInfo {
  name: string;
  company: string;
  email: string;
}
