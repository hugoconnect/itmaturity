export type MaturityLevel = 'reactive' | 'foundational' | 'managed' | 'proactive' | 'strategic';

export type CategoryId = 'responsibility' | 'alignment' | 'technology' | 'security';

export interface Question {
  id: string;
  text: string;
  category: CategoryId;
  allowNA?: boolean;
  scale?: {
    minLabel?: string;
    maxLabel?: string;
  };
}

export interface Answer {
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
  scores: {
    [key in CategoryId]: {
      score: number;
      count: number;
    };
  };
  categoryScores: CategoryScore[];
  focusArea: CategoryId;
  summary: string;
  responsibilityText: string; // Add this line
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