import { AssessmentResult, UserInfo, Answer } from '@/types/assessment';

interface AssessmentData {
  results: AssessmentResult;
  userInfo: UserInfo;
  answers: Answer[];
}

export async function sendAssessmentResults(data: AssessmentData) {
  try {
    const response = await fetch('/api/assessment/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to send assessment results');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending assessment results:', error);
    throw error;
  }
}