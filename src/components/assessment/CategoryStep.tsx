import React, { useState, useEffect } from 'react';
import { Question, Answer } from '@/types/assessment';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getCategoryName, getCategoryDescription } from '@/utils/assessmentUtils';
import { cn } from '@/lib/utils';
import { FormattedText } from '../FormattedText';

interface CategoryStepProps {
  questions: Question[];
  answers: Answer[];
  onAnswersUpdate: (answers: Answer[]) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  category: string;
}

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

  const handleAnswerChange = (questionId: string, valueStr: string | null) => {
    const value = valueStr === null ? null : parseInt(valueStr, 10);
    const updatedMap = { ...categoryAnswersMap, [questionId]: value };
    setCategoryAnswersMap(updatedMap);
    const updatedAnswersArray: Answer[] = Object.entries(updatedMap)
      .map(([qId, val]) => ({ questionId: qId, value: val }));
    onAnswersUpdate(updatedAnswersArray);
  };

  const categoryName = getCategoryName(category);
  const categoryDescription = getCategoryDescription(category);

  return (
    <Card className="w-full border-0 shadow-none bg-transparent">
      <CardHeader className="px-1 pb-6">
        <CardTitle className="text-2xl md:text-3xl font-semibold">
          <FormattedText>{categoryName}</FormattedText>
        </CardTitle>
        <CardDescription className="pt-2 text-base">
          <FormattedText>{categoryDescription}</FormattedText>
        </CardDescription>
        <p className="text-muted-foreground mt-3 text-base">
          <FormattedText>please rate how much you agree with each statement about your business.</FormattedText>
        </p>
      </CardHeader>
      <CardContent className="px-1 space-y-8">
        {questions.map((question) => (
          <div key={question.id}>
            <Label htmlFor={question.id} className="text-base font-medium mb-4 block">
              <FormattedText>{question.text}</FormattedText>
            </Label>
            <RadioGroup
              id={question.id}
              value={categoryAnswersMap[question.id]?.toString() || ""}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <Label
                  key={value}
                  htmlFor={`${question.id}-${value}`}
                  className={cn(
                    "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors duration-150",
                    categoryAnswersMap[question.id] === value ? "border-primary ring-2 ring-primary" : "hover:border-muted-foreground/50"
                  )}
                >
                  <RadioGroupItem value={value.toString()} id={`${question.id}-${value}`} className="sr-only" />
                  <span className="font-semibold text-lg mb-1">{value}</span>
                  {(value === 1 || value === 5) && (
                    <span className="text-xs text-center text-muted-foreground">
                      <FormattedText>
                        {value === 1 ? (question.scale?.minLabel || "strongly disagree") : (question.scale?.maxLabel || "strongly agree")}
                      </FormattedText>
                    </span>
                  )}
                </Label>
              ))}
            </RadioGroup>
          </div>
        ))}
      </CardContent>
      <div className="flex justify-between pt-6 mt-4">
        {!isFirstStep && (
          <Button variant="outline" onClick={onBack}>
            <FormattedText>back</FormattedText>
          </Button>
        )}
        <Button onClick={onNext} disabled={!isComplete}>
          <FormattedText>next</FormattedText>
        </Button>
      </div>
    </Card>
  );
};

export default CategoryStep;
