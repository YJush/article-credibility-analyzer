# Article Credibility Analyzer

[![CI](https://github.com/YJush/article-credibility-analyzer/actions/workflows/ci.yml/badge.svg)](https://github.com/YJush/article-credibility-analyzer/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-B8390D.svg)](LICENSE)

Score how promotional an article is. Paste a URL and the analyzer returns a marketing score, flagged language, brand mentions, tone analysis and a plain-language recommendation: should trust, be skeptical, or likely marketing.

Built by [Industry Contents](https://industrycontents.com).

## What you get

- **Marketing score** with a confidence level.
- **Red flags** grouped as superlatives, undisclosed relationships and biased framing, each with the quoted text and an explanation.
- **Brand mentions** with counts and context.
- **Financial ties** worth checking before you rely on the piece.
- **Verdict badge** and tone summary.

A set of example articles is bundled so the interface can be explored without an account.

## Stack

React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Supabase Edge Functions.

## Getting started

```sh
git clone https://github.com/YJush/article-credibility-analyzer.git
cd article-credibility-analyzer
cp .env.example .env   # add your own Supabase project values
npm ci
npm run dev
```

The analysis runs in the `analyze-article` Supabase Edge Function. Deploy it to your own project and keep model credentials in Supabase secrets, never in browser variables.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |

## Security

See [SECURITY.md](SECURITY.md). The edge function validates the submitted URL; apply rate limiting in your Supabase project before public use.

## License

[MIT](LICENSE) © Yajush Gupta
