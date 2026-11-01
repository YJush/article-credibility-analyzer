import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalysisResult {
  marketing_score: number;
  confidence: "high" | "medium" | "low";
  brand_mentions: Array<{ name: string; count: number; context: string }>;
  red_flags: Array<{ type: "superlative" | "undisclosed" | "biased"; text: string; explanation: string }>;
  tone_analysis: string;
  recommendation: "Should trust" | "Be skeptical" | "Likely marketing";
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    
    let parsedUrl: URL | null = null;
    try {
      parsedUrl = typeof url === 'string' && url.length <= 2048 ? new URL(url) : null;
    } catch {
      parsedUrl = null;
    }
    if (!parsedUrl || !['http:', 'https:'].includes(parsedUrl.protocol)) {
      return new Response(JSON.stringify({ error: 'A valid http(s) article URL is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!url) {
      return new Response(JSON.stringify({ error: 'URL is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Analyzing article: ${url}`);

    // Step 1: Extract article content using Jina AI Reader
    console.log('Step 1: Extracting article content...');
    let articleText = '';
    let articleTitle = '';
    let articleMetadata: Record<string, unknown> = {};

    try {
      const jinaResponse = await fetch(`https://r.jina.ai/${url}`, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (jinaResponse.ok) {
        const jinaData = await jinaResponse.json();
        articleText = jinaData.data?.content || jinaData.content || '';
        articleTitle = jinaData.data?.title || jinaData.title || 'Unknown Title';
        articleMetadata = {
          title: articleTitle,
          description: jinaData.data?.description || '',
          author: jinaData.data?.author || '',
          publishDate: jinaData.data?.publishedTime || '',
        };
        console.log(`Extracted ${articleText.length} characters from article`);
      } else {
        // Fallback: try text format
        const textResponse = await fetch(`https://r.jina.ai/${url}`);
        if (textResponse.ok) {
          articleText = await textResponse.text();
          articleTitle = url.split('/').pop() || 'Article';
          console.log(`Extracted ${articleText.length} characters (text fallback)`);
        }
      }
    } catch (jinaError) {
      console.error('Jina AI extraction failed:', jinaError);
      return new Response(JSON.stringify({ 
        error: 'Unable to access article. The site may block scraping or require authentication.',
        details: jinaError instanceof Error ? jinaError.message : 'Unknown error'
      }), {
        status: 422,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!articleText || articleText.length < 100) {
      return new Response(JSON.stringify({ 
        error: 'Article content too short or could not be extracted. The site may be blocking access.',
      }), {
        status: 422,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Truncate if too long (keep first 15000 chars for analysis)
    const truncatedText = articleText.slice(0, 15000);

    // Step 2: Extract publication name from URL
    const urlObj = new URL(url);
    const publication = urlObj.hostname.replace('www.', '').split('.')[0];
    const publicationName = publication.charAt(0).toUpperCase() + publication.slice(1);

    // Step 3: Analyze with AI
    console.log('Step 2: Analyzing content with AI...');
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const analysisPrompt = `Analyze this article for marketing intent. You must return ONLY valid JSON with no additional text.

Return this exact JSON structure:
{
  "marketing_score": <integer 0-100, where 0 is pure journalism and 100 is pure marketing>,
  "confidence": <"high" | "medium" | "low">,
  "brand_mentions": [
    {"name": "Brand Name", "count": <integer>, "context": "a brief quote showing how the brand is mentioned"}
  ],
  "red_flags": [
    {"type": "superlative" | "undisclosed" | "biased", "text": "exact phrase from article", "explanation": "why this is suspect"}
  ],
  "tone_analysis": "A 2-3 sentence analysis of the article's persuasive techniques and objectivity",
  "recommendation": "Should trust" | "Be skeptical" | "Likely marketing"
}

Scoring guidelines:
- 0-30: Objective journalism with balanced coverage, clear sourcing, and critical analysis
- 31-60: Some marketing elements present but article has informational value
- 61-100: Heavy promotional content, biased coverage, or undisclosed relationships

Red flag types:
- "superlative": Unsubstantiated claims like "best", "leading", "revolutionary" without evidence
- "undisclosed": Missing disclosures for affiliates, sponsorships, or author conflicts
- "biased": One-sided coverage, missing critical analysis, or disproportionate positive/negative coverage

Article to analyze:
Title: ${articleTitle}
Source: ${publicationName}

${truncatedText}`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: "You are an expert media analyst specializing in detecting marketing content disguised as journalism. Always respond with valid JSON only, no markdown or explanation." 
          },
          { role: "user", content: analysisPrompt }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI gateway error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI analysis failed: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices?.[0]?.message?.content;
    
    if (!aiContent) {
      throw new Error("No response from AI");
    }

    console.log('AI response received, parsing...');

    // Parse AI response (clean any markdown)
    let analysis: AnalysisResult;
    try {
      let cleanedContent = aiContent.trim();
      // Remove markdown code blocks if present
      if (cleanedContent.startsWith('```')) {
        cleanedContent = cleanedContent.replace(/```json?\n?/g, '').replace(/```\n?/g, '');
      }
      analysis = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiContent);
      throw new Error("Failed to parse analysis results");
    }

    // Validate and sanitize response
    const result = {
      url,
      title: articleMetadata.title || articleTitle,
      publication: publicationName,
      author: articleMetadata.author || null,
      publishDate: articleMetadata.publishDate || null,
      score: Math.max(0, Math.min(100, analysis.marketing_score || 50)),
      confidence: analysis.confidence || "medium",
      verdict: analysis.recommendation || "Be skeptical",
      brands: (analysis.brand_mentions || []).slice(0, 10),
      redFlags: (analysis.red_flags || []).slice(0, 10),
      financialTies: null, // Would require additional API for financial relationship search
      toneAnalysis: analysis.tone_analysis || "Analysis not available.",
      analyzedAt: new Date().toISOString(),
    };

    console.log(`Analysis complete: Score ${result.score}/100`);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-article function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Analysis failed. Please try again.',
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
