# FinKit Project Constitution

Last amended: 2026-06-23

**This file is the highest-priority project rulebook.** Every future task must read this file first. Nothing in this file may be changed automatically. Only the project owner may modify it.

---

## I. PROJECT IDENTITY

**Product Name:** FinKit

**Product Type:** Home Affordability Decision Assistant

**Product Mission:** Help ordinary households make safer housing decisions. Reduce uncertainty. Improve financial confidence. Provide simple decision support.

### Product Principles

1. Lightweight — no unnecessary complexity
2. Privacy-first — no account required, no server-side storage of financial data
3. Local-first calculations — everything runs in the browser
4. Simple UX — easy to understand, fast to use
5. Fast loading — static generation, self-hosted fonts
6. Decisions, not just numbers — every result includes a plain-English recommendation

### Voice & Tone

- Lead with the user's fear: "Will you become house poor?"
- Never talk down to users. Explain concepts plainly.
- Every recommendation comes with a "why" — no black boxes.
- Privacy is a feature, not a footnote. Lead with it.

---

## II. TARGET MARKET

### Primary Market (Current Focus)

**United States** only.

All defaults, examples, and calculations assume US mortgage conventions (30-year fixed, property tax rates, FICO-adjacent DTI thresholds, USD).

### Future Markets (Not Yet Implemented)

- Canada
- United Kingdom
- Australia

These markets must not be targeted in code, content, or SEO until explicitly approved. Do not add multi-currency, multi-language, or region-specific tax rules without owner approval.

### Primary User

- **Age:** 35-50
- **Profile:** Middle-income households
- **Context:** People considering home purchases, managing mortgage decisions, families concerned about affordability
- **Technical level:** Not financially sophisticated. Needs clear answers, not raw numbers.

---

## III. CORE USER QUESTIONS

Every feature must answer at least one of these:

1. Can I afford this house?
2. Can I safely afford this mortgage?
3. What is my true monthly housing cost?
4. Will this mortgage create financial stress?
5. Should I buy now or wait?

### Core User Pain Points

- High mortgage rates
- Housing affordability concerns
- Monthly payment anxiety
- Hidden housing costs (taxes, insurance, maintenance)
- Financial uncertainty
- Budget pressure

---

## IV. NON-GOALS

FinKit must **never** become:

- Investment platform
- Retirement planning platform
- Financial advisor / robo-advisor
- Trading platform
- Large SaaS
- CRM
- Social network

Features that drift toward these non-goals must be questioned before implementation.

---

## V. SEO STRATEGY

### Primary SEO Topics

- Home affordability
- Mortgage affordability
- Mortgage stress / house poor
- Housing costs
- Buy vs Rent
- Home buying decisions
- Mortgage comparison

### SEO Topics to Avoid

The following topics must not be primary SEO targets. Existing content on these topics should not be expanded:

- Retirement planning
- FIRE movement (Financial Independence Retire Early)
- Investment portfolio tracking
- Stock investing
- Crypto investing

Existing FIRE-related content (calculators, guides, blog articles) is grandfathered but must not be expanded or promoted as primary SEO targets. New content should focus on housing affordability.

---

## VI. CORE MODULES

### Decision Engines

- `MortgageDecisionEngine` — Affordability risk scoring and recommendation
- `RentVsBuyEngine` — 5-year rent vs buy comparison
- `MarketTimingEngine` — Market timing analysis
- `MortgageVsInvestEngine` — Pay off mortgage vs invest comparison

### Calculator Tools

- `DebtPayoffPlanner` — Snowball vs avalanche debt payoff
- `LoanCompare` / `LoanComparisonMatrix` — Loan comparison

### Planned / Future

- `AffordabilityScore` — Standalone affordability score widget
- `BuyVsRent` — Simplified buy vs rent decision tool
- `HousingCostAnalysis` — Total cost of ownership breakdown

---

## VII. PROTECTED MODULES

These modules **must not be rewritten** without explicit project-owner approval:

- Deployment configuration (`vercel.json`, `next.config.js`)
- Authentication system (`AuthCard`, `/auth` route)
- Theme system (`ThemeProvider`, `DarkModeToggle`, dark mode infrastructure)
- Core calculations (`lib/debt-math.ts`, `lib/fire-math.ts`, `lib/loan-math.ts`)

Modifications that fix bugs or improve performance are allowed. Architectural rewrites or replacements require approval.

---

## VIII. ARCHITECTURE

### Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v3 (class-based dark mode) |
| Icons | lucide-react |
| Testing | Vitest v4 + React Testing Library (jsdom) |
| Deployment | Vercel (static export compatible) |
| Analytics | Plausible (privacy-first, no cookies) |
| Fonts | Inter + JetBrains Mono (self-hosted via next/font) |

### Directory Structure

```
app/            # Next.js App Router — 39 static routes
  layout.tsx    # Root layout: metadata, fonts, ThemeProvider, Sidebar, Footer
  page.tsx      # Landing page (hero, decision cards, MiniWealthVisualizer)
  globals.css   # Tailwind directives + hero slider overrides
  decision/     # 4 interactive decision engines
  dashboard/    # 4 interactive calculator tools
  guides/       # 7 educational guide pages
  blog/         # Blog index
  terms/        # Terms of Service
  privacy/      # Privacy Policy
  auth/         # Authentication (placeholder)
  debug/        # Diagnostic page (excluded from robots/sitemap)
components/     # Single flat directory — all UI components
lib/            # Pure math modules (single source of truth)
  debt-math.ts  # Debt payoff simulation (snowball/avalanche)
  fire-math.ts  # FIRE number, years-to-FIRE, Coast FIRE, compounding
  loan-math.ts  # PMT amortization, loan comparison
hooks/          # Custom React hooks
  useLocalStorage.ts   # SSR-safe localStorage wrapper
  useSavedAnalyses.ts  # CRUD for saved decision results
  useAutoSave.ts       # Debounced auto-save for engines
__tests__/      # Test files (mirrors lib/ + hooks/ structure)
api/            # Vercel serverless functions
public/         # Static assets (og-image.png)
.ai/            # Project governance (this file, task definitions)
```

### Component Architecture

The `components/` directory is a **single flat directory**. No subdirectories, no barrel files, no index.ts re-exports. Every component is a self-contained `.tsx` file imported directly.

**Shared UI:**
`Sidebar`, `Footer`, `Logo`, `DonateButton`, `DarkModeToggle`, `ThemeProvider`, `RelatedArticles`, `ResumeCard`, `EmailCapture`, `SaveResultButton`, `MiniWealthVisualizer`

**Engine Components** (interactive, 400-510 lines each):
`MortgageDecisionEngine`, `RentVsBuyEngine`, `MarketTimingEngine`, `MortgageVsInvestEngine`

**Tool Components:**
`DebtPayoffPlanner`, `FIRECalculator`, `LoanCompare`, `LoanComparisonMatrix`

---

## IX. CODE CONVENTIONS

### TypeScript

- Strict mode enabled. No `any` without explicit justification.
- Exported types use `interface` (not `type`) for objects.
- Union types use `type` (e.g., `type Strategy = "snowball" | "avalanche"`).
- Function parameters use inline object types when the interface is single-use.
- Never use `as` casts to bypass type errors. Fix the types.

### Imports

- `@/` path alias for all internal imports. No relative paths above one level.
- Import order: React/hooks → third-party → `@/components/` → `@/lib/` → `@/hooks/`.
- Use `import type` for type-only imports.

### React Components

- All interactive components use `"use client"` directive.
- Content-only pages (SEO, blog, guides) are server components (no directive).
- State management: `useState` for local state, `useLocalStorage` for persistence.
- Derived state: `useMemo` (no `useCallback` unless passing to memo'd children).
- Components with 5+ `useState` calls should be refactored.

### Styling

- Tailwind classes only. No inline styles, no CSS modules, no styled-components.
- Color palette: `zinc` (primary), `emerald`/`amber`/`red`/`blue`/`purple` (accents by domain).
- All components support dark mode via `dark:` variant classes.
- Responsive: `md:` breakpoint for desktop/mobile split.
- Custom CSS in `globals.css` only for Tailwind layer directives and cross-browser slider styling.

### Naming

- Components: PascalCase, one component per file, filename matches default export.
- Functions: camelCase. Math functions use descriptive names (`calcPMT`, `simulatePayoff`).
- Files: kebab-case for pages, PascalCase for components.
- Props: descriptive names. No single-letter props except `n` in pure math functions.

---

## X. THE SINGLE SOURCE OF TRUTH DOCTRINE

> **Every business-logic function must exist exactly once.**

The `lib/` directory is the single source of truth for all mathematical computation. Interactive components **must not** contain their own implementations of:

- PMT amortization → use `lib/loan-math.ts` `calcPMT`
- Debt payoff simulation → use `lib/debt-math.ts` `simulatePayoff`
- FIRE number / years-to-FIRE → use `lib/fire-math.ts`
- Compound interest → use `lib/fire-math.ts` `compound`

When a component needs math it imports from `lib/`. If the lib doesn't return a field the component needs, **compute it from the lib's return value** — do not duplicate the function.

Each lib module has a corresponding test file in `__tests__/`. Tests cover the lib, not the component's rendering.

New math functions:
1. Write the function in the appropriate `lib/` module
2. Write tests in the corresponding `__tests__/` file
3. Import and use in the component

---

## XI. ROUTING & SEO

### Route Organization

- **`/`** — Landing page (hero + 5 decision cards)
- **`/decision/*`** — Interactive decision engines (mortgage affordability, rent vs buy, market timing, mortgage vs invest)
- **`/dashboard/*`** — Interactive tools
- **`/guides/*`** — Educational long-form content (7 pages)
- **`/` (root-level)** — Blog articles (11 pages)
- **`/should-i-buy-a-house`**, etc. — SEO landing pages (6 pages)

### Metadata

- Every route exports its own `Metadata` with unique `title` and `description`.
- Global metadata in `layout.tsx` provides defaults: title template `%s · FinKit`, OG/Twitter cards, canonical URL.
- FAQ schema (JSON-LD) on tool pages where appropriate.

### Internal Link Graph

- Every content page (blog articles, guides, SEO landing pages) must include `<RelatedArticles category="..."/>` at the bottom.
- Categories: `debt`, `fire`, `investing`, `mortgage`.
- Each category has 3 related articles defined in `RelatedArticles.tsx`.
- Adding a new content page → add it to `RelatedArticles` and add `RelatedArticles` to the new page.

### Sitemap & Robots

- Dynamic `sitemap.ts` — all public routes with priorities (1.0 → 0.3) and change frequencies.
- Dynamic `robots.ts` — allows all, disallows `/api/`, `/auth/`, `/debug`.
- New routes must be added to the sitemap before merge.

---

## XII. DARK MODE

- Tailwind `darkMode: "class"` — toggled by adding/removing `dark` class on `<html>`.
- Theme state persisted in `localStorage` key `finkit-theme`.
- `ThemeProvider` wraps the app; `DarkModeToggle` sits in the Sidebar.
- FOUC prevention: inline `<script>` in `<head>` reads theme before first paint.
- All components use `dark:` variants. New components must support dark mode from day one.

---

## XIII. TESTING STANDARDS

### What Must Be Tested

1. **All `lib/` functions** — unit tests for every exported function. Edge cases required.
2. **All `hooks/`** — unit tests via `renderHook`. SSR safety, persistence, edge cases.
3. **Engine `analyze` functions** — unit tests for core decision logic (export `analyze` if not already).
4. **Component rendering** — smoke test (renders without error), key metrics present.

### Test Conventions

- File: `__tests__/<ModuleName>.test.ts`
- Framework: Vitest (`describe`/`it`/`expect`), React Testing Library for components
- Environment: `jsdom` (configured in `vitest.config.ts`)
- Run before every commit: `npx vitest run` (must pass 100%)

---

## XIV. GIT WORKFLOW

- Branch prefix: `codex/` for feature branches.
- Commit messages: [Conventional Commits](https://www.conventionalcommits.org/) format.
  - `feat:` — new feature or page
  - `fix:` — bug fix
  - `refactor:` — code change with no behavioral change
  - `chore:` — cleanup, dependency updates
  - `perf:` — performance improvement
  - `docs:` — documentation changes
- Never amend commits unless explicitly requested.
- Never `git reset --hard` or `git checkout --` unless explicitly requested.
- Preserve existing Git history. Never force-push to main.

---

## XV. BANNED PATTERNS

These are **never** allowed in the codebase:

- Duplicate business logic (see Section X)
- Barrel files (`index.ts` re-exports) — import directly from the source file
- Component subdirectories in `components/` — flat directory only
- `any` types without explicit justification comment
- Inline styles or CSS modules — Tailwind only
- Relative imports beyond one level — use `@/` alias
- `console.log` in production code
- Hardcoded URLs that should be environment variables
- `file://` URIs in links
- Purple-on-white default color schemes — use zinc palette
- Rebuilding the project from scratch
- Scanning the entire repository unless explicitly requested

---

## XVI. DEVELOPMENT RULES

1. Reuse existing code whenever possible.
2. Prefer modification over replacement.
3. Never rebuild the project from scratch.
4. Never scan the entire repository unless explicitly requested.
5. Read PROJECT_CONSTITUTION.md first for every task.
6. Read only task-related files.
7. Minimize token usage.
8. Preserve deployment configuration.
9. Preserve SEO assets whenever possible.
10. Preserve existing Git history.

---

## XVII. AI EXECUTION RULE

For every future task:

**Step 1:** Load PROJECT_CONSTITUTION.md

**Step 2:** Load TASK.md (if one exists for the task)

**Step 3:** Inspect only relevant files

**Step 4:** Generate minimal changes

**Step 5:** Update CHANGELOG.md with the change description

---

## XVIII. SUCCESS METRIC

Every future feature must answer at least one of these questions:

- Can I afford this house?
- Can I safely afford this mortgage?
- What is my real monthly housing cost?
- Should I buy or wait?

If a feature does not support these goals, it should be questioned before implementation.

---

## XIX. AMENDMENT PROCESS

This constitution is amended only by the project owner:

1. Proposing the change with rationale
2. Updating this document
3. Committing with message: `docs: amend constitution — <summary>`
4. All subsequent work must respect the amended constitution

Amendments that contradict established architecture require refactoring existing code to match before the amendment is considered complete.

---

**END OF CONSTITUTION**

This document is the permanent source of truth for the project.
