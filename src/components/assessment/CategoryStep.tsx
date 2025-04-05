import { useState, useEffect } from "react";
import type { Question, Answer } from "@/types/assessment"; // Assuming types are defined here
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategoryName, getCategoryDescription } from "@/utils/assessmentUtils"; // Assuming these exist
import { cn } from "@/lib/utils"; // For conditional classes

interface CategoryStepProps {
  questions: Question[];
  categoryId: string; // Assuming categoryId is passed directly
  answers: Answer[];
  onAnswersUpdate: (newAnswers: Answer[]) => void;
  onNext: () => void;
  onBack?: () => void;
  showBack?: boolean;
}

// Helper to apply hugo connect branding rules to text
const applyBranding = (text: string | undefined): string => {
  if (!text) return "";
  // Convert to lowercase, then replace standalone "it" (case-insensitive) with "IT"
  // Use word boundaries (\b) to avoid replacing "it" within words like "with"
  return text.toLowerCase().replace(/\b(it)\b/gi, 'IT');
};

const CategoryStep = ({
  questions,
  categoryId,
  answers,
  onAnswersUpdate,
  onNext,
  onBack,
  showBack = false,
}: CategoryStepProps) => {
  // State to hold answers for the current category being displayed
  const [categoryAnswersMap, setCategoryAnswersMap] = useState<Record<string, number | null>>({});
  // State to track if all required questions in this step are answered
  const [isComplete, setIsComplete] = useState(false);

  // Initialize or update the local answer map when props change
  useEffect(() => {
    const initialMap: Record<string, number | null> = {};
    questions.forEach(q => {
      const existingAnswer = answers.find(a => a.questionId === q.id);
      initialMap[q.id] = existingAnswer ? existingAnswer.value : null;
    });
    setCategoryAnswersMap(initialMap);
  }, [questions, answers]); // Rerun when questions or parent answers change

  // Check if all required questions are answered whenever the local map changes
  useEffect(() => {
    const allAnswered = questions.every((q) => {
      // A question is considered answered if:
      // 1. It allows N/A (we don't block progress for optional questions) OR
      // 2. An answer exists for it in the map and the value is not null
      return q.allowNA || (categoryAnswersMap[q.id] !== undefined && categoryAnswersMap[q.id] !== null);
    });
    setIsComplete(allAnswered);
  }, [questions, categoryAnswersMap]); // Rerun when questions or local answers change

  // Handle changes to an individual question's answer
  const handleAnswerChange = (questionId: string, valueStr: string | null) => {
    const value = valueStr === null ? null : parseInt(valueStr, 10);

    // Update local state immediately for UI feedback
    const updatedMap = { ...categoryAnswersMap, [questionId]: value };
    setCategoryAnswersMap(updatedMap);

    // Create the Answer array structure expected by the parent
    const updatedAnswersArray: Answer[] = Object.entries(updatedMap)
      .map(([qId, val]) => ({ questionId: qId, value: val }));

    // Propagate the changes up to the parent component
    onAnswersUpdate(updatedAnswersArray);
  };

  // Get category details using utility functions and apply branding
  const categoryName = applyBranding(getCategoryName(categoryId as any));
  const categoryDescription = applyBranding(getCategoryDescription(categoryId as any));
  const instructionText = applyBranding("please rate how much you agree with each statement about your business.");
  const backButtonText = applyBranding("back");
  const nextButtonText = applyBranding("next");

  return (
    // Use Card for structure, remove default border/shadow to blend into page
    <Card className="w-full border-0 shadow-none bg-transparent">
      <CardHeader className="px-1 pb-6"> {/* Adjusted padding */}
        {/* Apply branding to category name */}
        <CardTitle className="text-2xl md:text-3xl font-semibold lowercase">{categoryName}</CardTitle>
        {/* Apply branding to category description */}
        <CardDescription className="lowercase pt-2 text-base"> {/* Adjusted padding and text size */}
           {categoryDescription}
        </CardDescription>
         {/* Apply branding to instruction text */}
        <p className="text-muted-foreground mt-3 text-base lowercase">
           {instructionText}
        </p>
      </CardHeader>
      <CardContent className="px-1 space-y-8"> {/* Add vertical spacing between questions */}
        {questions.map((question) => (
          <div key={question.id}>
             {/* Apply branding to question text */}
            <Label htmlFor={question.id} className="text-base font-medium mb-4 block lowercase">
               {applyBranding(question.text)}
            </Label>
            {/* Use shadcn RadioGroup for the options */}
            <RadioGroup
              id={question.id}
              // Use the local map for the value
              value={categoryAnswersMap[question.id]?.toString() || ""}
              // Update local map on change
              onValueChange={(value) => handleAnswerChange(question.id, value)}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4" // Responsive grid
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <Label
                  key={value}
                  htmlFor={`${question.id}-${value}`}
                  // Apply conditional styling using cn utility
                  className={cn(
                    "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors duration-150",
                    // Highlight if this value matches the stored answer for this question
                    categoryAnswersMap[question.id] === value ? "border-primary ring-2 ring-primary" : "hover:border-muted-foreground/50" // Subtle hover border
                  )}
                >
                   {/* Hide the actual radio input visually but keep for accessibility */}
                  <RadioGroupItem value={value.toString()} id={`${question.id}-${value}`} className="sr-only" />
                  {/* Display the numeric value */}
                  <span className="font-semibold text-lg mb-1">{value}</span>
                  {/* Only show text labels for the endpoints (1 and 5) */}
                  {(value === 1 || value === 5) && (
                     <span className="text-xs text-center text-muted-foreground lowercase">
                       {/* Apply branding to scale labels - uses optional chaining ?. just in case scale is undefined */}
                       {value === 1 ? applyBranding(question.scale?.minLabel || "strongly disagree") : applyBranding(question.scale?.maxLabel || "strongly agree")}
                     </span>
                  )}
                </Label>
              ))}
            </RadioGroup>
          </div>
        ))}
      </CardContent>

       {/* Footer with navigation buttons */}
      <div className="flex justify-between pt-6 mt-4"> {/* Added margin-top */}
        {showBack ? (
          <Button
            variant="outline"
            onClick={onBack}
            className="lowercase" // Apply branding
          >
            {backButtonText}
          </Button>
        ) : (
           // Use null for cleaner conditional rendering when back button is hidden
           null
        )}
        <Button
          onClick={onNext}
          disabled={!isComplete} // Disable button if not all required questions are answered
          className="lowercase" // Apply branding
        >
          {nextButtonText}
        </Button>
      </div>
    </Card> // Ensure Card closing tag is present
  );
};

export default CategoryStep;
