import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from "@/data/assessmentQuestions";
import { Answer, UserInfo } from "@/types/assessment";
import { calculateResults } from "@/utils/assessmentUtils";
import CategoryStep from "@/components/assessment/CategoryStep";
import UserInfoForm from "@/components/assessment/UserInfoForm";
import { Card, CardContent } from "@/components/ui/card";
import ProgressIndicator from "@/components/assessment/ProgressIndicator";
import { FormattedText } from '@/components/FormattedText';

interface ProgressStep {
  id: string;
  name: JSX.Element;
}

const steps: ProgressStep[] = [
  { id: "responsibility", name: <FormattedText>IT responsibility & support</FormattedText> },
  { id: "alignment", name: <FormattedText>business & technology alignment</FormattedText> },
  { id: "technology", name: <FormattedText>core technology & reliability</FormattedText> },
  { id: "security", name: <FormattedText>security & data protection</FormattedText> },
  { id: "user-info", name: <FormattedText>your info</FormattedText> },
];

type Step = "responsibility" | "alignment" | "technology" | "security" | "user-info";

const Assessment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>("responsibility");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleAnswersUpdate = (newAnswers: Answer[]) => {
    // Merge new answers with existing answers
    const updatedAnswers = [...answers];
    
    newAnswers.forEach((newAnswer) => {
      const index = updatedAnswers.findIndex(
        (a) => a.questionId === newAnswer.questionId
      );
      
      if (index >= 0) {
        updatedAnswers[index] = newAnswer;
      } else {
        updatedAnswers.push(newAnswer);
      }
    });
    
    setAnswers(updatedAnswers);
  };

  const moveToStep = (step: Step) => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      moveToStep(steps[currentIndex + 1].id as Step);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex > 0) {
      moveToStep(steps[currentIndex - 1].id as Step);
    }
  };

  const handleUserInfoSubmit = (userInfo: UserInfo) => {
    // Mark the final step as completed
    setCompletedSteps([...completedSteps, currentStep]);
    
    // Calculate results
    const results = calculateResults(answers);
    
    // Save data to session storage
    sessionStorage.setItem("assessmentResults", JSON.stringify(results));
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    
    // Navigate to results page
    navigate("/results");
  };

  // Render the current step
  const renderStep = () => {
    if (currentStep === "user-info") {
      return <UserInfoForm 
        onSubmit={handleUserInfoSubmit} 
        onBack={handleBack}  // Add this line
      />;
    }
  
    const categoryQuestions = questions.filter((q) => q.category === currentStep);
    const categoryAnswers = answers.filter((a) =>
      categoryQuestions.some((q) => q.id === a.questionId)
    );
  
    return (
      <CategoryStep
        questions={categoryQuestions}
        answers={categoryAnswers}
        onAnswersUpdate={handleAnswersUpdate}
        onNext={handleNext}
        onBack={handleBack}
        isFirstStep={currentStep === "responsibility"}
        isLastStep={currentStep === "security"}
        category={currentStep}
      />
    );
  };

  return (
    <div className="container py-8">
      <Card>
        <CardContent className="pt-6">
          <h1 className="text-3xl font-bold text-primary">
            <FormattedText>IT health check assessment</FormattedText>
          </h1>
          <p className="text-gray-600 mt-2">
            <FormattedText>this 5-minute assessment will help identify your IT strengths and areas for improvement.</FormattedText>
          </p>
          <ProgressIndicator steps={steps} currentStep={currentStep} completedSteps={completedSteps} />
          {renderStep()}
        </CardContent>
      </Card>
    </div>
  );
};

export default Assessment;
