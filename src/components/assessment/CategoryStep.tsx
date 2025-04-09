import React, { useState, useEffect } from 'react';
import { Question, Answer, CategoryId } from '@/types/assessment';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getCategoryName, getCategoryDescription } from '@/utils/assessmentUtils';
import { cn } from '@/lib/utils';

interface CategoryStepProps {
  questions: Question[];
  answers: Answer[];
  onAnswersUpdate: (answers: Answer[]) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  category: CategoryId;
}

interface ProgressStep {
  id: string;
  name: React.ReactNode;
}

// Note: ProgressStep and steps array are defined here but not used in this component.
// Keeping them for context if they are used elsewhere in the original file.
const steps: ProgressStep[] = [
  { id: "responsibility", name: "IT responsibility & support" },
  { id: "alignment", name: "business & technology alignment" },
  { id: "technology", name: "core technology & reliability" },
  { id: "security", name: "security & data protection" },
  { id: "user-info", name: "your info" },
];

const CategoryStep: React.FC<CategoryStepProps> = ({
  questions,
  answers,
  onAnswersUpdate,
  onNext,
  onBack,
  isFirstStep,
  isLastStep,
  category
}) => {
  const [categoryAnswersMap, setCategoryAnswersMap] = useState<Record<string, number | null>>({});
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const initialMap: Record<string, number | null> = {};
    questions.forEach(q => {
      const existingAnswer = answers.find(a => a.questionId === q.id);
      initialMap[q.id] = existingAnswer ? existingAnswer.value : null;
    });
    setCategoryAnswersMap(initialMap);
  }, [questions, answers]);

  useEffect(() => {
    const allAnswered = questions.every((q) => {
      return q.allowNA || (categoryAnswersMap[q.id] !== undefined && categoryAnswersMap[q.id] !== null);
    });
    setIsComplete(allAnswered);
  }, [questions, categoryAnswersMap]);

  // ---- removed problematic useEffect block ----
  // this useEffect was causing the focus to jump to the first option
  // useEffect(() => {
  //   const firstUnansweredQuestion = questions.find(
  //     q => !categoryAnswersMap[q.id]
  //   );
  //
  //   if (firstUnansweredQuestion) {
  //     const firstInput = document.querySelector(
  //       `[id^="${firstUnansweredQuestion.id}"]`
  //     ) as HTMLElement;
  //     if (firstInput) {
  //       firstInput.focus();
  //     }
  //   }
  // }, [category, categoryAnswersMap]);
  // ---- end of removed block ----

  const handleAnswerChange = (questionId: string, valueStr: string | null) => {
    const value = valueStr === null ? null : parseInt(valueStr, 10);
    const updatedMap = { ...categoryAnswersMap, [questionId]: value };
    setCategoryAnswersMap(updatedMap);
    const updatedAnswersArray: Answer[] = Object.entries(updatedMap)
      .map(([qId, val]) => ({ questionId: qId, value: val, category }));
    onAnswersUpdate(updatedAnswersArray);
  };

  const categoryName = getCategoryName(category);
  const categoryDescription = getCategoryDescription(category);

  return (
    <Card className="w-full border-0 shadow-none bg-transparent">
      <CardHeader className="px-1 pb-6">
        <CardTitle className="text-2xl md:text-3xl font-semibold text-hugo-primary" tabIndex={-1}> {/* made title focusable if needed */}
          {getCategoryName(category)}
        </CardTitle>
        <CardDescription className="pt-2 text-base text-hugo-dark">
          {categoryDescription}
        </CardDescription>
        <p className="text-hugo-accent mt-3 text-base">
          please rate how much you agree with each statement about your business
        </p>
      </CardHeader>
      <CardContent className="px-1 space-y-8">
        {questions.map((question, index) => (
          <div key={question.id}> {/* consider adding tabIndex={-1} here if you want to focus the whole question block */}
            <Label
              htmlFor={question.id} // should point to RadioGroup id
              className="text-base font-medium mb-4 block text-hugo-dark"
            >
              {question.text}
            </Label>
            <RadioGroup
              id={question.id} // id for the group
              value={categoryAnswersMap[question.id]?.toString() || ""}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <Label
                  key={value}
                  htmlFor={`${question.id}-${value}`}
                  className={cn(
                    "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 cursor-pointer transition-colors duration-150",
                    "hover:bg-hugo-light/50 focus-within:bg-hugo-light/50", // style based on focus within label
                    "focus-within:ring-2 focus-within:ring-hugo-primary focus-within:border-hugo-primary", // focus style on label
                    categoryAnswersMap[question.id] === value
                      ? "border-hugo-anchor ring-2 ring-hugo-anchor" // checked style
                      : "hover:border-hugo-accent/50"
                  )}
                >
                  <RadioGroupItem
                    value={value.toString()}
                    id={`${question.id}-${value}`}
                    className="sr-only" // visually hide the actual radio button, let the label handle visuals/focus
                    // removed explicit tabIndex - let Radix manage roving tabindex within the group
                  />
                  <span className="font-semibold text-lg mb-1 text-hugo-anchor">{value}</span>
                  {(value === 1 || value === 5) && (
                    <span className="text-xs text-center text-hugo-accent">
                      {value === 1 ? "strongly disagree" : "strongly agree"}
                    </span>
                  )}
                </Label>
              ))}
            </RadioGroup>
          </div>
        ))}
      </CardContent>
      <div className="flex justify-between mt-8">
        {!isFirstStep && (
          <Button
            variant="outline"
            onClick={onBack}
            className="border-hugo-anchor text-hugo-anchor hover:bg-hugo-anchor/10"
          >
            back
          </Button>
        )}

        <Button
          variant="secondary"
          onClick={onNext}
          className="ml-auto"
          disabled={!isComplete}
          aria-disabled={!isComplete}
          title={!isComplete ? "please answer all questions before proceeding" : undefined}
        >
          {isLastStep ? "submit" : "next"}
        </Button>
      </div>

      {!isComplete && (
        <p className="text-hugo-accent text-sm mt-4 text-center">
          please answer all questions to proceed
        </p>
      )}
    </Card>
  );
};

export default CategoryStep;