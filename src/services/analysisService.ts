import { supabase } from "@/integrations/supabase/client";
import { findDemoArticle, type AnalysisResult } from "@/data/demoArticles";

export interface AnalysisResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
}

export async function analyzeArticle(url: string): Promise<AnalysisResponse> {
  // First check if it's a demo URL for instant response
  const demoResult = findDemoArticle(url);
  if (demoResult) {
    return { success: true, data: demoResult };
  }

  try {
    const { data, error } = await supabase.functions.invoke('analyze-article', {
      body: { url },
    });

    if (error) {
      console.error('Edge function error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to analyze article' 
      };
    }

    if (data.error) {
      return { 
        success: false, 
        error: data.error 
      };
    }

    // Transform the response to match our AnalysisResult type
    const result: AnalysisResult = {
      url: data.url,
      title: data.title,
      publication: data.publication,
      author: data.author,
      publishDate: data.publishDate,
      score: data.score,
      confidence: data.confidence,
      verdict: data.verdict,
      brands: data.brands || [],
      redFlags: data.redFlags || [],
      financialTies: data.financialTies,
      financialSource: data.financialSource,
      toneAnalysis: data.toneAnalysis,
      analyzedAt: new Date(data.analyzedAt),
    };

    return { success: true, data: result };
  } catch (err) {
    console.error('Analysis service error:', err);
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'An unexpected error occurred' 
    };
  }
}
