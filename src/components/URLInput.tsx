import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface URLInputProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

const EXAMPLE_URLS = [
  { label: "Forbes: Best CRM", url: "https://forbes.com/advisor/business/best-crm-software" },
  { label: "TechCrunch: AI Startups", url: "https://techcrunch.com/2024/startup-ai-revolution" },
  { label: "NYT Wirecutter", url: "https://nytimes.com/wirecutter/reviews/best-laptop" },
];

export function URLInput({ onAnalyze, isLoading }: URLInputProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validateUrl = (input: string): boolean => {
    if (!input.trim()) {
      setError("Please enter a URL");
      return false;
    }
    
    try {
      const urlObj = new URL(input);
      if (!["http:", "https:"].includes(urlObj.protocol)) {
        setError("URL must start with http:// or https://");
        return false;
      }
      setError(null);
      return true;
    } catch {
      setError("Please enter a valid URL");
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateUrl(url)) {
      onAnalyze(url);
    }
  };

  const handleExampleClick = (exampleUrl: string) => {
    setUrl(exampleUrl);
    setError(null);
    onAnalyze(exampleUrl);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Paste article URL here..."
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError(null);
            }}
            className={cn(
              "pl-12 pr-4 h-14 text-lg bg-card border-border",
              error && "border-destructive focus-visible:ring-destructive"
            )}
            disabled={isLoading}
          />
        </div>
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
        <Button 
          type="submit" 
          size="lg" 
          className="w-full h-12 text-base gap-2"
          disabled={isLoading}
        >
          <Sparkles className="w-5 h-5" />
          Analyze Article
        </Button>
      </form>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground text-center">Or try these examples:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {EXAMPLE_URLS.map((example) => (
            <Button
              key={example.url}
              variant="outline"
              size="sm"
              onClick={() => handleExampleClick(example.url)}
              disabled={isLoading}
              className="text-sm"
            >
              {example.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
