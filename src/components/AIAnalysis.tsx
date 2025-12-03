import { MessageSquare } from "lucide-react";

interface AIAnalysisProps {
  analysis: string;
}

export function AIAnalysis({ analysis }: AIAnalysisProps) {
  return (
    <div className="analysis-card fade-in">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg">AI Analysis</h3>
      </div>
      
      <div className="p-4 bg-background rounded-lg border border-border">
        <p className="text-muted-foreground leading-relaxed italic">
          "{analysis}"
        </p>
      </div>
    </div>
  );
}
