import { useState } from "react";
import { Header } from "@/components/Header";
import { URLInput } from "@/components/URLInput";
import { RecentAnalyses } from "@/components/RecentAnalyses";
import { LoadingAnalysis } from "@/components/LoadingAnalysis";
import { AnalysisResults } from "@/components/AnalysisResults";
import { getRecentAnalyses, type AnalysisResult } from "@/data/demoArticles";
import { analyzeArticle } from "@/services/analysisService";
import { toast } from "sonner";

type AppState = "input" | "loading" | "results";

const Index = () => {
  const [state, setState] = useState<AppState>("input");
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  const handleAnalyze = async (url: string) => {
    setState("loading");
    setIsDemo(false);
    
    try {
      const response = await analyzeArticle(url);
      
      if (response.success && response.data) {
        setCurrentResult(response.data);
        setState("results");
        
        // Check if it was a demo article for faster animation
        if (response.data.url.includes('forbes.com') || 
            response.data.url.includes('techcrunch.com') ||
            response.data.url.includes('nytimes.com')) {
          setIsDemo(true);
        }
      } else {
        toast.error(response.error || "Failed to analyze article", {
          description: "Please try a different URL or check if the site allows scraping.",
        });
        setState("input");
      }
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error("An error occurred while analyzing", {
        description: "Please try again or use one of the example articles.",
      });
      setState("input");
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
