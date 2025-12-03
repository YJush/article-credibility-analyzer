import { cn } from "@/lib/utils";

interface ScoreGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function ScoreGauge({ score, size = "lg", showLabel = true }: ScoreGaugeProps) {
  const getScoreColor = (score: number) => {
    if (score <= 30) return "text-success";
    if (score <= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score <= 30) return "Low Marketing Intent";
    if (score <= 60) return "Medium Marketing Intent";
    return "High Marketing Intent";
  };

  const getScoreBg = (score: number) => {
    if (score <= 30) return "bg-success/10";
    if (score <= 60) return "bg-warning/10";
    return "bg-destructive/10";
  };

  const getStrokeColor = (score: number) => {
    if (score <= 30) return "stroke-success";
    if (score <= 60) return "stroke-warning";
    return "stroke-destructive";
  };

  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-32 h-32",
    lg: "w-44 h-44",
  };

  const fontSizes = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={cn("relative", sizeClasses[size])}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            className="stroke-muted"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            className={cn("transition-all duration-1000 ease-out", getStrokeColor(score))}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("font-mono font-bold", fontSizes[size], getScoreColor(score))}>
            {score}
          </span>
        </div>
      </div>
      {showLabel && (
        <div className={cn("px-4 py-2 rounded-full font-medium text-sm", getScoreBg(score), getScoreColor(score))}>
          {getScoreLabel(score)}
        </div>
      )}
    </div>
  );
}
