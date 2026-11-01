# Clarity AI Insights

An experimental article-analysis interface built for a clearer editorial research workflow.

**Status: prototype.** The application accepts an article URL, shows analysis progress and displays structured results. Recent/example articles are supplied through a demo-data module. Demonstration content and generated analysis must not be presented as independently verified reporting.

## Workflow

1. Enter an article URL or choose a recent example.
2. The page calls the analysis service and displays a loading state.
3. Successful results open in the analysis-results interface; failures return an error message.
4. Return to the input screen to analyze another article.

## Stack

React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui · Supabase

## Local development

Install Node.js and npm:

```sh
git clone https://github.com/YJush/clarity-ai-insights.git
cd clarity-ai-insights
npm ci
npm run dev
```

Configure your own Supabase project with these client-facing values in a local `.env` file:

```dotenv
VITE_SUPABASE_PROJECT_ID=your-project-id
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Use only a publishable key in browser configuration. Provider secrets and service-role keys belong in the backend's secret store. Frontend startup alone does not confirm that the backend analysis service is configured or available.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite |
| `npm run build` | Build the frontend |
| `npm run preview` | Preview the built frontend |
| `npm run lint` | Run ESLint |

## Project structure

| Path | Responsibility |
| --- | --- |
| `src/pages/Index.tsx` | Input/loading/results state and error handling |
| `src/components/` | URL entry, recent analyses, loading and result views |
| `src/data/` | Demonstration article data and result types |
| `src/services/` | Analysis-service integration |
| `src/integrations/supabase/` | Supabase client integration |
| `supabase/` | Backend project files |

## Validation and limitations

No automated test suite, documented accuracy benchmark or production-readiness assessment is currently included. Verify the backend service and each claimed analysis capability before relying on results. Distinguish model interpretation from sourced evidence, and demo records from newly generated results.

The current page marks certain well-known publisher domains as demo content. That URL heuristic should be replaced with an explicit service response or demo flag; a domain alone does not establish provenance. Add tests for invalid input, inaccessible articles, missing configuration, malformed responses and state transitions.

## Security and privacy

Use public article URLs and synthetic demonstrations. A URL or article can contain confidential information; review the service's data flow before submitting such content. Review backend authorization, abuse controls, input validation, dependencies, Git history and deployment settings before public release. Client-facing Supabase configuration is not a substitute for database access policies.

## Contributing and license

Include the expected behavior and validation performed with a proposed change. Keep secrets and real research/contact exports out of commits and issues. No project license is currently included; external services and dependencies retain their own terms.
