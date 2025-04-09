import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressStep {
  id: string;
  name: JSX.Element;
}

interface ProgressIndicatorProps {
  steps: ProgressStep[];
  currentStep: string;
  completedSteps: string[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  completedSteps,
}: ProgressIndicatorProps) => {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center justify-between w-full">
        {steps.map((step, stepIdx) => {
          const isActive = step.id === currentStep;
          const isCompleted = completedSteps.includes(step.id);

          return (
            <li key={step.id} className="relative flex-1">
              <div className="flex flex-col items-center group">
                {stepIdx < steps.length - 1 && (
                  <div 
                    className={cn(
                      "absolute top-4 left-[calc(50%+1rem)] w-[calc(100%-2rem)] h-[2px]",
                      isCompleted ? "bg-hugo-anchor" : "bg-hugo-accent"
                    )}
                  />
                )}
                <span
                  className={cn(
                    "assessment-progress-step relative z-10 bg-white",
                    isActive && "assessment-progress-step-active",
                    isCompleted && "assessment-progress-step-completed"
                  )}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : (stepIdx + 1)}
                </span>
                <span
                  className={cn(
                    "mt-2 text-xs text-center min-h-[2rem] px-1",
                    isActive ? "text-hugo-anchor" : "text-hugo-accent"
                  )}
                >
                  {step.name}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default ProgressIndicator;
