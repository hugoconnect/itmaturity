// src/data/assessmentQuestions.d.ts
 
export interface Question {
    id: string;
    text: string;
    category: string;
    options: any[]; // Or define a more specific type if you know the structure of options
   }
   
   export const questions: Question[];