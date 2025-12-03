import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { FileSearch, Brain, Search, FileText } from "lucide-react";

const steps = [
  { id: 1, label: "Extracting article content...", icon: FileSearch },
  { id: 2, label: "Analyzing for marketing patterns...", icon: Brain },
  { id: 3, label: "Checking financial relationships...", icon: Search },
  { id: 4, label: "Generating report...", icon: FileText },
];

interface LoadingAnalysisProps {
  isDemo?: boolean;
}

export function LoadingAnalysis({ isDemo = false }: LoadingAnalysisProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepDuration = isDemo ? 500 : 7500; // Faster for demo
    const progressInterval = 50;
    const progressIncrement = (100 / (stepDuration * 4)) * progressInterval;

    const progressTimer = setInterval(() => {
      setProgress((prev) => Math.min(prev + progressIncrement, 100));
    }, progressInterval);

    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, stepDuration);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
    };
  }, [isDemo]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-8">
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-4 border-muted flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        </div>
      </div>

      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-200 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground text-center">{Math.round(progress)}% complete</p>
        </div>

        <div className="space-y-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isComplete = index < currentStep;

            return (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-all duration-300",
                  isActive && "bg-card border border-border",
                  isComplete && "opacity-50"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                  isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                  isComplete && "bg-success text-success-foreground"
                )}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={cn(
                  "text-sm transition-colors",
                  isActive ? "text-foreground font-medium" : "text-muted-foreground"
                )}>
                  {step.label}
                </span>
                {isActive && (
                  <div className="ml-auto flex gap-1">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
