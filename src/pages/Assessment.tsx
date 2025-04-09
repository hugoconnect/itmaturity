import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from "@/data/assessmentQuestions";
import { Answer, UserInfo, CategoryId } from "@/types/assessment";
import { calculateResults } from "@/utils/assessmentUtils";
import CategoryStep from "@/components/assessment/CategoryStep";
import UserInfoForm from "@/components/assessment/UserInfoForm";
import { Card, CardContent } from "@/components/ui/card";
import ProgressIndicator from "@/components/assessment/ProgressIndicator";
import { sendAssessmentResults } from '@/utils/emailService'; // Add this import
import logoColor from '@/assets/logo-color.png'; // Add this import
import Footer from '@/components/Footer';
  import { Button } from '@/components/ui/button'; // Change this line

// Define Step type that includes both CategoryId and "user-info"
type Step = CategoryId | "user-info";

interface ProgressStep {
  id: Step;
  name: JSX.Element;
}

const steps: ProgressStep[] = [
  { id: "responsibility", name: <span>IT responsibility & support</span> },
  { id: "alignment", name: <span>business & technology alignment</span> },
  { id: "technology", name: <span>core technology & reliability</span> },
  { id: "security", name: <span>security & data protection</span> },
  { id: "user-info", name: <span>your info</span> },
];

const Assessment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(() => {
    // Try to get saved step from sessionStorage
    const savedStep = sessionStorage.getItem("currentStep");
    return (savedStep as Step) || "responsibility";
  });
  
  const [completedSteps, setCompletedSteps] = useState<Step[]>(() => {
    // Try to get completed steps from sessionStorage
    const savedSteps = sessionStorage.getItem("completedSteps");
    return savedSteps ? JSON.parse(savedSteps) : [];
  });
  
  const [answers, setAnswers] = useState<Answer[]>(() => {
    // Try to get saved answers from sessionStorage
    const savedAnswers = sessionStorage.getItem("answers");
    return savedAnswers ? JSON.parse(savedAnswers) : [];
  });

  // Save progress whenever it changes
  useEffect(() => {
    sessionStorage.setItem("currentStep", currentStep);
    sessionStorage.setItem("completedSteps", JSON.stringify(completedSteps));
    sessionStorage.setItem("answers", JSON.stringify(answers));
  }, [currentStep, completedSteps, answers]);

  const handleAnswersUpdate = (newAnswers: Answer[]) => {
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
    // Progress is automatically saved by the useEffect above
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

  const handleUserInfoSubmit = async (userInfo: UserInfo) => {
    try {
      // Mark the final step as completed
      setCompletedSteps([...completedSteps, currentStep]);
      
      // Calculate results
      const results = calculateResults(answers);
      
      // Save data to session storage first
      sessionStorage.setItem("assessmentResults", JSON.stringify(results));
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      
      // Send results to backend
      await sendAssessmentResults({
        results,
        userInfo,
        answers
      });

      // Navigate to results page after everything is saved
      navigate("/results", { replace: true });
    } catch (error) {
      console.error('Failed to send assessment results:', error);
      // Add error handling here if needed
      // Still navigate to results since we saved to session storage
      navigate("/results", { replace: true });
    }
  };

  const handleStartOver = () => {
    sessionStorage.removeItem("currentStep");
    sessionStorage.removeItem("completedSteps");
    sessionStorage.removeItem("answers");
    setCurrentStep("responsibility");
    setCompletedSteps([]);
    setAnswers([]);
  };

  // Render the current step
  const renderStep = () => {
    if (currentStep === "user-info") {
      return (
        <UserInfoForm
          onSubmit={handleUserInfoSubmit}
          onBack={handleBack}
        />
      );
    }

    const categoryQuestions = questions.filter(q => q.category === currentStep);
    const categoryAnswers = answers.filter(
      (answer) => answer.category === currentStep
    );

    return (
      <CategoryStep
        questions={categoryQuestions}
        answers={categoryAnswers}
        onAnswersUpdate={handleAnswersUpdate}
        onNext={handleNext}
        onBack={handleBack}
        isFirstStep={currentStep === "responsibility"}
        isLastStep={false}
        category={currentStep as CategoryId}
      />
    );
  };

  return (
    <div className="page-container">
      <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <img 
          src={logoColor} 
          alt="Company Logo" 
          className="h-12 md:h-16 w-auto"
        />
      </div>

      <div className="content-wrapper">
        <div className="assessment-container">
          <Card className="fluent-card">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="heading-primary">
                  IT health check assessment
                </h1>
                <Button 
                  variant="ghost" 
                  onClick={handleStartOver}
                  className="text-hugo-accent hover:text-hugo-accent/80"
                >
                  start over
                </Button>
              </div>
              
              <p className="text-body mb-8">
                this 5-minute assessment will help identify your IT strengths and areas for improvement.
              </p>

              <ProgressIndicator 
                steps={steps} 
                currentStep={currentStep} 
                completedSteps={completedSteps} 
              />

              <div className="mt-8">
                {renderStep()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Assessment;
