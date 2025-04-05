export type MaturityLevel = "reactive" | "foundational" | "managed" | "proactive" | "strategic";

export type CategoryId = "responsibility" | "alignment" | "technology" | "security"; // Renamed for clarity if used as ID

export interface Question {
  id: string;
  text: string;
  category: CategoryId; // Use the renamed type if applicable
  allowNA?: boolean;
  // Add this optional property:
  scale?: {
    minLabel?: string; // e.g., "strongly disagree"
    maxLabel?: string; // e.g., "strongly agree"
  };
}

export interface Answer {
  questionId: string;
  value: number | null;
}

export interface CategoryScore {
  category: CategoryId; // Use the renamed type if applicable
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
  focusArea: CategoryId; // Use the renamed type if applicable
}

export interface UserInfo {
  name: string;
  company: string;
  email: string;
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