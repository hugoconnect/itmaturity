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
  maturityDescription: string;  // Add this
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

// It might also be useful to have a Category type that includes its questions,
// if you fetch or structure data that way elsewhere:
/*
export interface Category {
  id: CategoryId;
  name: string;
  description?: string;
  questions: Question[];
}
*/

export const isCategoryId = (step: CategoryId): boolean => {
  return ["responsibility", "alignment", "technology", "security", "user-info"].includes(step);
};

export * from '../../shared/types/assessment';