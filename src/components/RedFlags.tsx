import { AlertTriangle, Quote, EyeOff, Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RedFlag } from "@/data/demoArticles";

interface RedFlagsProps {
  flags: RedFlag[];
}

const flagIcons = {
  superlative: Quote,
  undisclosed: EyeOff,
  biased: Scale,
};

const flagLabels = {
  superlative: "Superlative",
  undisclosed: "Undisclosed",
  biased: "Biased",
};

export function RedFlags({ flags }: RedFlagsProps) {
  if (flags.length === 0) {
    return (
      <div className="analysis-card fade-in">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-success" />
          <h3 className="font-semibold text-lg">Red Flags</h3>
        </div>
        <p className="text-muted-foreground">No significant red flags detected.</p>
      </div>
    );
  }

  return (
    <div className="analysis-card fade-in">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-destructive" />
        <h3 className="font-semibold text-lg">Red Flags Detected</h3>
        <span className="ml-auto bg-destructive/10 text-destructive text-sm font-medium px-2 py-0.5 rounded-full">
          {flags.length} found
        </span>
      </div>
      
      <div className="space-y-3">
        {flags.map((flag, index) => {
          const Icon = flagIcons[flag.type];
          return (
            <div 
              key={index} 
              className="p-4 bg-background rounded-lg border border-border"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-destructive/10 text-destructive">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {flagLabels[flag.type]}
                    </span>
                  </div>
                  <p className="font-medium text-foreground">"{flag.text}"</p>
                  <p className="text-sm text-muted-foreground">{flag.explanation}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
