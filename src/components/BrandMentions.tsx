import { Building2 } from "lucide-react";
import type { BrandMention } from "@/data/demoArticles";

interface BrandMentionsProps {
  brands: BrandMention[];
}

export function BrandMentions({ brands }: BrandMentionsProps) {
  if (brands.length === 0) return null;

  const maxCount = Math.max(...brands.map(b => b.count));

  return (
    <div className="analysis-card fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="w-5 h-5 text-accent" />
        <h3 className="font-semibold text-lg">Brand Mentions</h3>
      </div>
      
      <div className="space-y-4">
        {brands.map((brand, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{brand.name}</span>
              <span className="text-sm text-muted-foreground">{brand.count} mentions</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{ width: `${(brand.count / maxCount) * 100}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground italic">
              {brand.context}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
