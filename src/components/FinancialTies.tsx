import { DollarSign, ExternalLink, CheckCircle } from "lucide-react";

interface FinancialTiesProps {
  ties: string | null;
  source?: string;
}

export function FinancialTies({ ties, source }: FinancialTiesProps) {
  const hasTies = ties !== null;

  return (
    <div className="analysis-card fade-in">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className={`w-5 h-5 ${hasTies ? "text-warning" : "text-success"}`} />
        <h3 className="font-semibold text-lg">Financial Relationships</h3>
      </div>
      
      {hasTies ? (
        <div className="space-y-3">
          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-full bg-warning/20 text-warning mt-0.5">
                <DollarSign className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <p className="font-medium text-foreground">Potential Connection Found</p>
                <p className="text-sm text-muted-foreground">{ties}</p>
              </div>
            </div>
          </div>
          {source && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ExternalLink className="w-4 h-4" />
              <span>Source: {source}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-lg">
          <CheckCircle className="w-5 h-5 text-success" />
          <p className="text-muted-foreground">No direct financial relationships identified between the publication and mentioned brands.</p>
        </div>
      )}
    </div>
  );
}
