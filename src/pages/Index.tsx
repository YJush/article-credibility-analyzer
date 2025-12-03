import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { URLInput } from "@/components/URLInput";
import { RecentAnalyses } from "@/components/RecentAnalyses";
import { LoadingAnalysis } from "@/components/LoadingAnalysis";
import { AnalysisResults } from "@/components/AnalysisResults";
import { findDemoArticle, getRecentAnalyses, type AnalysisResult } from "@/data/demoArticles";
import { toast } from "sonner";

type AppState = "input" | "loading" | "results";

const Index = () => {
  const [state, setState] = useState<AppState>("input");
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  const handleAnalyze = async (url: string) => {
    setState("loading");
    
    // Check if it's a demo URL
    const demoResult = findDemoArticle(url);
    
    if (demoResult) {
      setIsDemo(true);
      // Simulate quick loading for demo
      setTimeout(() => {
        setCurrentResult(demoResult);
        setState("results");
      }, 2000);
    } else {
      setIsDemo(false);
      // For non-demo URLs, show a message that full analysis requires backend
      setTimeout(() => {
        toast.error("This URL is not in our demo database. Try one of the example articles!", {
          description: "Full analysis requires backend integration.",
        });
        setState("input");
      }, 3000);
    }
  };

  const handleBack = () => {
    setState("input");
    setCurrentResult(null);
  };

  const handleSelectRecent = (url: string) => {
    handleAnalyze(url);
  };

  return (
    <main className="min-h-screen bg-background">
      {state === "input" && (
        <div className="max-w-2xl mx-auto px-4 py-16 space-y-12 fade-in">
          <Header />
          <URLInput onAnalyze={handleAnalyze} isLoading={false} />
          <RecentAnalyses 
            analyses={getRecentAnalyses()} 
            onSelect={handleSelectRecent} 
          />
        </div>
      )}

      {state === "loading" && (
        <div className="max-w-2xl mx-auto px-4 py-16">
          <LoadingAnalysis isDemo={isDemo} />
        </div>
      )}

      {state === "results" && currentResult && (
        <AnalysisResults result={currentResult} onBack={handleBack} />
      )}
    </main>
  );
};

export default Index;
