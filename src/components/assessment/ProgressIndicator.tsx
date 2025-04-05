
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressStep {
  id: string;
  name: string;
}

interface ProgressIndicatorProps {
  steps: ProgressStep[];
  currentStep: string;
  completedSteps: string[];
}

const ProgressIndicator = ({
  steps,
  currentStep,
  completedSteps,
}: ProgressIndicatorProps) => {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center">
        {steps.map((step, stepIdx) => {
          const isActive = step.id === currentStep;
          const isCompleted = completedSteps.includes(step.id);
          const isLastStep = stepIdx === steps.length - 1;

          return (
            <li
              key={step.id}
              className={cn(
                "relative flex items-center",
                !isLastStep && "w-full"
              )}
            >
              <div className="flex items-center">
                <span
                  className={cn(
                    "assessment-progress-step",
                    isActive && "assessment-progress-step-active",
                    isCompleted && "assessment-progress-step-completed"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    stepIdx + 1
                  )}
                </span>
                <span
                  className={cn(
                    "ml-2 text-sm font-medium",
                    isActive ? "text-primary" : "text-gray-500"
                  )}
                >
                  {step.name}
                </span>
              </div>
              {!isLastStep && (
                <div
                  className={cn(
                    "assessment-progress-connector",
                    (isActive || isCompleted) && "assessment-progress-connector-active"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default ProgressIndicator;
