import { Clock } from "lucide-react";
import { ScoreGauge } from "./ScoreGauge";
import type { AnalysisResult } from "@/data/demoArticles";

interface RecentAnalysesProps {
  analyses: AnalysisResult[];
  onSelect: (url: string) => void;
}

export function RecentAnalyses({ analyses, onSelect }: RecentAnalysesProps) {
  if (analyses.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span className="text-sm font-medium">Recent Analyses</span>
      </div>
      
      <div className="space-y-2">
        {analyses.map((analysis) => (
          <button
            key={analysis.url}
            onClick={() => onSelect(analysis.url)}
            className="w-full p-4 bg-card hover:bg-secondary/50 rounded-lg border border-border transition-colors text-left group"
          >
            <div className="flex items-center gap-4">
              <ScoreGauge score={analysis.score} size="sm" showLabel={false} />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate group-hover:text-accent transition-colors">
                  {analysis.title}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {analysis.publication}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
