import { ArrowLeft, Share2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScoreGauge } from "./ScoreGauge";
import { VerdictBadge } from "./VerdictBadge";
import { BrandMentions } from "./BrandMentions";
import { RedFlags } from "./RedFlags";
import { FinancialTies } from "./FinancialTies";
import { AIAnalysis } from "./AIAnalysis";
import type { AnalysisResult } from "@/data/demoArticles";
import { toast } from "sonner";

interface AnalysisResultsProps {
  result: AnalysisResult;
  onBack: () => void;
}

export function AnalysisResults({ result, onBack }: AnalysisResultsProps) {
  const handleShare = async () => {
    const shareText = `I analyzed "${result.title}" with Clarity AI - Marketing Score: ${result.score}/100 ${result.score > 60 ? "🚨" : result.score > 30 ? "⚠️" : "✅"}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Clarity AI Analysis",
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast.success("Copied to clipboard!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button variant="outline" onClick={handleShare} className="gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>

      {/* Article Info */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{result.title}</h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{result.publication}</span>
          {result.author && <span>• {result.author}</span>}
          {result.publishDate && <span>• {result.publishDate}</span>}
        </div>
        <a 
          href={result.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
        >
          View original article
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Score Card */}
      <div className="analysis-card flex flex-col items-center py-8">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
          Marketing Intent Score
        </h2>
        <ScoreGauge score={result.score} />
        <div className="mt-6">
          <VerdictBadge verdict={result.verdict} />
        </div>
        <p className="mt-4 text-center text-muted-foreground max-w-md">
          {result.score > 60 
            ? "This article likely exists to promote products or services."
            : result.score > 30
            ? "This article shows some marketing characteristics. Read with awareness."
            : "This article appears to be primarily informational content."
          }
        </p>
      </div>

      {/* Detailed Analysis */}
      <div className="space-y-4">
        <BrandMentions brands={result.brands} />
        <RedFlags flags={result.redFlags} />
        <FinancialTies ties={result.financialTies} source={result.financialSource} />
        <AIAnalysis analysis={result.toneAnalysis} />
      </div>

      {/* CTA */}
      <div className="flex justify-center pt-4">
        <Button onClick={onBack} size="lg">
          Analyze Another Article
        </Button>
      </div>
    </div>
  );
}
