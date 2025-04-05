
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Answer, UserInfo } from "@/types/assessment";
import { questions } from "@/data/assessmentQuestions";
import { calculateResults } from "@/utils/assessmentUtils";
import CategoryStep from "@/components/assessment/CategoryStep";
import UserInfoForm from "@/components/assessment/UserInfoForm";
import ProgressIndicator from "@/components/assessment/ProgressIndicator";
import { Card, CardContent } from "@/components/ui/card";

type Step = "responsibility" | "alignment" | "technology" | "security" | "user-info";

const steps = [
  { id: "responsibility", name: "IT Responsibility & Support" },
  { id: "alignment", name: "Business & Technology Alignment" },
  { id: "technology", name: "Core Technology & Reliability" },
  { id: "security", name: "Security & Data Protection" },
  { id: "user-info", name: "Your Info" },
];

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
    const categoryQuestions = questions.filter((q) => q.category === currentStep);
    
    switch (currentStep) {
      case "responsibility":
      case "alignment":
      case "technology":
      case "security":
        return (
          <CategoryStep
            questions={categoryQuestions}
            categoryId={currentStep}
            answers={answers}
            onAnswersUpdate={handleAnswersUpdate}
            onNext={handleNext}
            onBack={currentStep !== "responsibility" ? handleBack : undefined}
            showBack={currentStep !== "responsibility"}
          />
        );
      case "user-info":
        return (
          <UserInfoForm
            onSubmit={handleUserInfoSubmit}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary">
          IT Health Check Assessment
        </h1>
        <p className="text-gray-600 mt-2">
          This 5-minute assessment will help identify your IT strengths and areas for improvement.
        </p>
      </div>
      
      <ProgressIndicator
        steps={steps}
        currentStep={currentStep}
        completedSteps={completedSteps}
      />
      
      <Card>
        <CardContent className="pt-6">
          {renderStep()}
        </CardContent>
      </Card>
    </div>
  );
};

export default Assessment;
