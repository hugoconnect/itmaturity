export type MaturityLevel = 'reactive' | 'foundational' | 'managed' | 'proactive' | 'strategic';

export type CategoryId = 'responsibility' | 'alignment' | 'technology' | 'security' | 'user-info';

export interface Question {
  id: string;
  text: string;
  options: {
    value: string;
    label: string;
  }[];
  category: string;
  allowNA?: boolean;
  scale?: {
    minLabel?: string;
    maxLabel?: string;
  };
}

export interface Answer {
  category: string;
  questionId: string;
  value: number | null;
}

export interface CategoryScore {
  category: CategoryId;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface AssessmentResult {
  overallScore: number;
  maturityLevel: MaturityLevel;
  maturityDescription: string;
  scores: {
    [key in CategoryId]: {
      score: number;
      count: number;
    };
  };
  categoryScores: CategoryScore[];
  focusArea: CategoryId;
  responsibilityText: string;
}

export interface UserInfo {
  name: string;
  email: string;
  company: string;
}