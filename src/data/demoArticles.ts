export interface BrandMention {
  name: string;
  count: number;
  context: string;
}

export interface RedFlag {
  type: "superlative" | "undisclosed" | "biased";
  text: string;
  explanation: string;
}

export interface AnalysisResult {
  url: string;
  title: string;
  publication: string;
  author?: string;
  publishDate?: string;
  score: number;
  confidence: "high" | "medium" | "low";
  verdict: "Should trust" | "Be skeptical" | "Likely marketing";
  brands: BrandMention[];
  redFlags: RedFlag[];
  financialTies: string | null;
  financialSource?: string;
  toneAnalysis: string;
  analyzedAt: Date;
}

export const DEMO_ARTICLES: AnalysisResult[] = [
  {
    url: "https://forbes.com/advisor/business/best-crm-software",
    title: "10 Best CRM Software of 2024",
    publication: "Forbes",
    author: "Kelly Main",
    publishDate: "November 2024",
    score: 87,
    confidence: "high",
    verdict: "Likely marketing",
    brands: [
      { name: "Salesforce", count: 12, context: "\"industry-leading CRM solution that transforms how businesses connect with customers\"" },
      { name: "HubSpot", count: 8, context: "\"powerful all-in-one marketing automation platform\"" },
      { name: "Zoho CRM", count: 3, context: "\"affordable option for small businesses\"" },
    ],
    redFlags: [
      { type: "superlative", text: "best solution on the market", explanation: "Unsubstantiated superlative claim without comparative data" },
      { type: "superlative", text: "industry-leading", explanation: "Used 4 times without defining metrics for leadership" },
      { type: "biased", text: "No competing products critically analyzed", explanation: "All mentioned products receive only positive coverage" },
      { type: "undisclosed", text: "Statistics cited without sources", explanation: "Claims like '300% ROI' lack verification" },
    ],
    financialTies: "Forbes Advisor receives compensation from companies featured in rankings. Salesforce is a documented advertising partner.",
    financialSource: "Forbes Affiliate Disclosure (footer)",
    toneAnalysis: "This article uses persuasive language typical of content marketing. Multiple products are mentioned but Salesforce receives disproportionate positive coverage without critical analysis. The author does not disclose any affiliate relationships within the article body, though a disclosure exists in the footer. The ranking methodology is not transparent.",
    analyzedAt: new Date(),
  },
  {
    url: "https://techcrunch.com/2024/startup-ai-revolution",
    title: "How AI Startups Are Revolutionizing Enterprise Software",
    publication: "TechCrunch",
    author: "Sarah Chen",
    publishDate: "October 2024",
    score: 62,
    confidence: "medium",
    verdict: "Be skeptical",
    brands: [
      { name: "OpenAI", count: 6, context: "\"leading the charge in generative AI capabilities\"" },
      { name: "Anthropic", count: 4, context: "\"safety-focused approach to AI development\"" },
      { name: "Notion", count: 3, context: "\"seamlessly integrating AI into workflows\"" },
    ],
    redFlags: [
      { type: "biased", text: "Only positive outcomes mentioned", explanation: "No coverage of AI failures or limitations" },
      { type: "superlative", text: "revolutionary", explanation: "Buzzword used without concrete evidence" },
      { type: "undisclosed", text: "Author's previous employment", explanation: "Author previously worked at a featured company" },
    ],
    financialTies: null,
    toneAnalysis: "The article maintains a positive tone throughout, focusing exclusively on success stories. While not overtly promotional, the lack of critical analysis and exclusive focus on benefits suggests potential bias. The author's connection to the AI industry is not disclosed.",
    analyzedAt: new Date(),
  },
  {
    url: "https://nytimes.com/wirecutter/reviews/best-laptop",
    title: "The Best Laptops for 2024",
    publication: "NY Times Wirecutter",
    author: "Andrew Cunningham",
    publishDate: "November 2024",
    score: 23,
    confidence: "high",
    verdict: "Should trust",
    brands: [
      { name: "Apple MacBook", count: 8, context: "\"excellent build quality but premium pricing\"" },
      { name: "Dell XPS", count: 6, context: "\"strong Windows alternative with some thermal concerns\"" },
      { name: "Lenovo ThinkPad", count: 5, context: "\"reliable business option with dated design\"" },
    ],
    redFlags: [
      { type: "undisclosed", text: "Affiliate links present", explanation: "Article contains affiliate links, though disclosed" },
    ],
    financialTies: "Wirecutter earns commission from affiliate links. This is clearly disclosed at the top of the article.",
    financialSource: "Article header disclosure",
    toneAnalysis: "This article demonstrates balanced journalism with clear pros and cons for each product. Affiliate relationships are transparently disclosed. The methodology for testing is explained, and the author acknowledges limitations. Critical analysis is present for all products including the top pick.",
    analyzedAt: new Date(),
  },
  {
    url: "https://entrepreneur.com/growing-a-business/productivity-tools",
    title: "7 Productivity Tools Every Entrepreneur Needs in 2024",
    publication: "Entrepreneur",
    author: "Jason Feifer",
    publishDate: "September 2024",
    score: 78,
    confidence: "high",
    verdict: "Likely marketing",
    brands: [
      { name: "Monday.com", count: 9, context: "\"the ultimate project management solution\"" },
      { name: "Slack", count: 5, context: "\"essential for team communication\"" },
      { name: "Asana", count: 4, context: "\"powerful task management capabilities\"" },
    ],
    redFlags: [
      { type: "superlative", text: "ultimate solution", explanation: "Extreme language without justification" },
      { type: "superlative", text: "must-have", explanation: "Creates artificial urgency" },
      { type: "biased", text: "No free alternatives mentioned", explanation: "Only paid tools featured despite free options existing" },
      { type: "undisclosed", text: "Sponsored content indicators", explanation: "Article structure matches typical sponsored content format" },
    ],
    financialTies: "Monday.com is a known advertiser on Entrepreneur.com. The article appears in a section frequently featuring sponsored content.",
    financialSource: "Ad placement analysis",
    toneAnalysis: "The article reads like a listicle designed for affiliate revenue rather than genuine advice. Superlatives are used liberally, and no critical perspective is offered. The selection criteria for included tools is not explained, and notable free alternatives are conspicuously absent.",
    analyzedAt: new Date(),
  },
  {
    url: "https://reuters.com/technology/ai-regulation-2024",
    title: "Global AI Regulation: What Companies Need to Know",
    publication: "Reuters",
    author: "Editorial Staff",
    publishDate: "November 2024",
    score: 12,
    confidence: "high",
    verdict: "Should trust",
    brands: [
      { name: "Microsoft", count: 2, context: "\"among companies lobbying for clear guidelines\"" },
      { name: "Google", count: 2, context: "\"facing regulatory scrutiny in EU\"" },
    ],
    redFlags: [],
    financialTies: null,
    toneAnalysis: "This is a straightforward news report with balanced coverage of multiple perspectives. Companies are mentioned in relevant regulatory context rather than promotional framing. Sources are cited, and the article maintains journalistic objectivity throughout.",
    analyzedAt: new Date(),
  },
  {
    url: "https://medium.com/better-marketing/email-tools-guide",
    title: "The Complete Guide to Email Marketing Tools",
    publication: "Medium",
    author: "Marketing Pro",
    publishDate: "August 2024",
    score: 91,
    confidence: "high",
    verdict: "Likely marketing",
    brands: [
      { name: "Mailchimp", count: 15, context: "\"the gold standard in email marketing\"" },
      { name: "ConvertKit", count: 3, context: "\"good for creators\"" },
      { name: "Klaviyo", count: 2, context: "\"e-commerce focused option\"" },
    ],
    redFlags: [
      { type: "superlative", text: "gold standard", explanation: "Unverified industry claim" },
      { type: "biased", text: "One product dominates coverage", explanation: "Mailchimp receives 5x more mentions than alternatives" },
      { type: "undisclosed", text: "Author affiliate status unknown", explanation: "No disclosure statement present" },
      { type: "undisclosed", text: "Referral links detected", explanation: "All product links contain tracking parameters" },
    ],
    financialTies: "Article contains affiliate tracking links. Author's bio links to a marketing consultancy.",
    financialSource: "Link analysis",
    toneAnalysis: "This appears to be affiliate marketing content disguised as a guide. One product receives overwhelming positive coverage while alternatives are mentioned only briefly. The author likely earns commission from featured products. No methodology or testing process is described.",
    analyzedAt: new Date(),
  },
  {
    url: "https://wired.com/review/iphone-16-pro",
    title: "iPhone 16 Pro Review: The Best iPhone Yet?",
    publication: "Wired",
    author: "Julian Chokkattu",
    publishDate: "September 2024",
    score: 35,
    confidence: "medium",
    verdict: "Be skeptical",
    brands: [
      { name: "Apple", count: 18, context: "\"continues to refine its flagship device\"" },
      { name: "Samsung", count: 4, context: "\"competing Galaxy S24 offers similar features\"" },
      { name: "Google Pixel", count: 2, context: "\"Pixel 9 Pro provides alternative Android experience\"" },
    ],
    redFlags: [
      { type: "superlative", text: "best iPhone yet", explanation: "Recycled headline used for every new iPhone" },
      { type: "biased", text: "Limited competitor comparison", explanation: "Alternatives mentioned briefly at the end" },
    ],
    financialTies: null,
    toneAnalysis: "While this is a legitimate product review, it follows the predictable pattern of praising incremental improvements. Competitors are acknowledged but not given equal analytical depth. The headline uses classic marketing language. Overall, it's journalism but with a favorable lean toward the subject.",
    analyzedAt: new Date(),
  },
  {
    url: "https://hbr.org/business-transformation-2024",
    title: "Digital Transformation: Lessons from Industry Leaders",
    publication: "Harvard Business Review",
    author: "Prof. Michael Porter",
    publishDate: "October 2024",
    score: 28,
    confidence: "medium",
    verdict: "Should trust",
    brands: [
      { name: "Amazon", count: 4, context: "\"case study in operational efficiency\"" },
      { name: "Microsoft", count: 3, context: "\"successfully pivoted to cloud services\"" },
      { name: "Netflix", count: 2, context: "\"disrupted traditional media distribution\"" },
    ],
    redFlags: [
      { type: "undisclosed", text: "Corporate case studies", explanation: "Featured companies may have provided information directly" },
    ],
    financialTies: "HBR is owned by Harvard Business Publishing. No direct financial relationship with featured companies identified.",
    financialSource: "Ownership research",
    toneAnalysis: "This is academic-style business analysis using companies as illustrative examples rather than promotional subjects. The focus is on strategy and lessons learned rather than product promotion. While the tone is positive about featured companies, it serves educational rather than marketing purposes.",
    analyzedAt: new Date(),
  },
  {
    url: "https://cnet.com/tech/computing/best-vpn",
    title: "Best VPN Services of 2024: Expert Tested",
    publication: "CNET",
    author: "Attila Tomaschek",
    publishDate: "November 2024",
    score: 72,
    confidence: "high",
    verdict: "Be skeptical",
    brands: [
      { name: "ExpressVPN", count: 11, context: "\"our top pick for most users\"" },
      { name: "NordVPN", count: 8, context: "\"excellent security features\"" },
      { name: "Surfshark", count: 6, context: "\"best budget option\"" },
    ],
    redFlags: [
      { type: "undisclosed", text: "High affiliate commission category", explanation: "VPN reviews are known for lucrative affiliate programs" },
      { type: "biased", text: "Testing methodology unclear", explanation: "Specific test procedures not fully documented" },
      { type: "superlative", text: "best", explanation: "Subjective ranking presented as objective" },
    ],
    financialTies: "CNET participates in affiliate programs for all featured VPN services. Commission rates for VPN affiliates typically range from $50-100 per signup.",
    financialSource: "Industry analysis + CNET affiliate disclosure",
    toneAnalysis: "While CNET conducts legitimate testing, VPN reviews are a category where affiliate incentives are particularly strong. The top-ranked products consistently correlate with highest affiliate commissions across the industry. Readers should cross-reference with non-affiliate sources.",
    analyzedAt: new Date(),
  },
  {
    url: "https://theguardian.com/technology/ai-ethics-2024",
    title: "The Hidden Costs of AI: Workers Behind the Algorithms",
    publication: "The Guardian",
    author: "Kari Paul",
    publishDate: "October 2024",
    score: 8,
    confidence: "high",
    verdict: "Should trust",
    brands: [
      { name: "OpenAI", count: 5, context: "\"relies on content moderators earning below minimum wage\"" },
      { name: "Meta", count: 3, context: "\"contractors report psychological trauma from content review\"" },
      { name: "Amazon", count: 2, context: "\"Mechanical Turk workers lack benefits and protections\"" },
    ],
    redFlags: [],
    financialTies: null,
    toneAnalysis: "This is investigative journalism that presents a critical view of major technology companies. Sources are cited, worker testimonials are included, and companies are given opportunity to respond. The article serves public interest rather than commercial purposes. The critical framing is appropriate for the subject matter.",
    analyzedAt: new Date(),
  },
];

export function findDemoArticle(url: string): AnalysisResult | undefined {
  const normalizedUrl = url.toLowerCase().trim();
  return DEMO_ARTICLES.find(article => 
    normalizedUrl.includes(article.url.toLowerCase()) || 
    article.url.toLowerCase().includes(normalizedUrl.replace('https://', '').replace('http://', ''))
  );
}

export function getRecentAnalyses(): AnalysisResult[] {
  return DEMO_ARTICLES.slice(0, 3);
}
