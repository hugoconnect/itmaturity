
import { useState, useEffect } from "react";
import { Question, Answer } from "@/types/assessment";
import QuestionItem from "./QuestionItem";
import { Button } from "@/components/ui/button";
import { getCategoryName, getCategoryDescription } from "@/utils/assessmentUtils";

interface CategoryStepProps {
  questions: Question[];
  categoryId: string;
  answers: Answer[];
  onAnswersUpdate: (newAnswers: Answer[]) => void;
  onNext: () => void;
  onBack?: () => void;
  showBack?: boolean;
}

const CategoryStep = ({
  questions,
  categoryId,
  answers,
  onAnswersUpdate,
  onNext,
  onBack,
  showBack = false,
}: CategoryStepProps) => {
  const [categoryAnswers, setCategoryAnswers] = useState<Answer[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  // Initialize category answers from provided answers
  useEffect(() => {
    const filtered = answers.filter((a) => 
      questions.some((q) => q.id === a.questionId)
    );
    
    // If no answers exist for some questions, create defaults with null values
    const defaultAnswers = questions.map((q) => {
      const existing = filtered.find((a) => a.questionId === q.id);
      if (existing) return existing;
      return { questionId: q.id, value: null };
    });
    
    setCategoryAnswers(defaultAnswers);
  }, [questions, answers]);

  // Check if all required questions are answered
  useEffect(() => {
    const allAnswered = questions.every((q) => {
      if (q.allowNA) return true; // N/A is allowed, so it's optional
      const answer = categoryAnswers.find((a) => a.questionId === q.id);
      return answer && answer.value !== null; // Must have a value if N/A is not allowed
    });
    
    setIsComplete(allAnswered);
  }, [questions, categoryAnswers]);

  const handleAnswerChange = (questionId: string, value: number | null) => {
    const updatedAnswers = categoryAnswers.map((a) => 
      a.questionId === questionId ? { ...a, value } : a
    );
    
    setCategoryAnswers(updatedAnswers);
    onAnswersUpdate(updatedAnswers);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">
          {getCategoryName(categoryId as any)}
        </h2>
        <p className="text-gray-600">
          {getCategoryDescription(categoryId as any)}
        </p>
        <p className="text-gray-600 mt-2">
          Please rate how much you agree with each statement about your business.
        </p>
      </div>

      {questions.map((question) => (
        <QuestionItem
          key={question.id}
          question={question}
          value={(categoryAnswers.find((a) => a.questionId === question.id) || { value: null }).value}
          onChange={(value) => handleAnswerChange(question.id, value)}
        />
      ))}

      <div className="flex justify-between pt-4">
        {showBack ? (
          <Button
            variant="outline"
            onClick={onBack}
          >
            Back
          </Button>
        ) : (
          <div></div>
        )}
        <Button
          onClick={onNext}
          disabled={!isComplete}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CategoryStep;
