# FinKit Project Constitution

Last amended: 2026-06-23

This document governs all development on the FinKit codebase. It is the single source of truth for architecture, conventions, and standards. When in doubt, this document answers the question.

---

## I. Product Identity

FinKit is a **privacy-first personal finance decision system** for US homebuyers. Its core thesis: the most expensive financial mistake in America is buying too much house. Every feature must serve one of three purposes:

1. Help users decide whether they can afford a specific house (risk scoring)
2. Compare financial alternatives (rent vs buy, mortgage vs invest, debt strategies)
3. Educate users on personal finance concepts (guides, blog)

The product is **not** a general-purpose calculator site. Features that don't serve the homebuying decision funnel belong elsewhere.

### Voice & Tone

- Lead with the user's fear: "Will you become house poor?"
- Never talk down to users. Explain concepts plainly.
- Every recommendation comes with a "why" — no black boxes.
- Privacy is a feature, not a footnote. Lead with it.

---

## II. Architecture

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
app/            # Next.js App Router — 38 static routes
  layout.tsx    # Root layout: metadata, fonts, ThemeProvider, Sidebar, Footer
  page.tsx      # Landing page (hero, decision cards, MiniWealthVisualizer)
  globals.css   # Tailwind directives + hero slider overrides
  decision/     # 4 interactive decision engines
  dashboard/    # 4 interactive calculator tools
  guides/       # 7 educational guide pages
  blog/         # Blog index
  terms/        # Terms of Service
  privacy/      # Privacy Policy
components/     # Single flat directory — all 18 UI components
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
```

### Component Architecture

The `components/` directory is a **single flat directory**. No subdirectories, no barrel files, no index.ts re-exports. Every component is a self-contained `.tsx` file imported directly.

Components fall into three categories:

**Shared UI** (used across multiple pages):
- `Sidebar`, `Footer`, `Logo`, `DonateButton`, `DarkModeToggle`
- `RelatedArticles`, `ResumeCard`, `EmailCapture`, `SaveResultButton`

**Engine Components** (interactive decision tools, 400-510 lines each):
- `MortgageDecisionEngine`, `RentVsBuyEngine`, `MarketTimingEngine`, `MortgageVsInvestEngine`

**Tool Components** (interactive calculators):
- `DebtPayoffPlanner`, `FIRECalculator`, `LoanCompare`, `LoanComparisonMatrix`

---

## III. Code Conventions

### TypeScript

- Strict mode enabled. No `any` without explicit justification.
- Exported types use `interface` (not `type`) for objects.
- Union types use `type` (e.g., `type Strategy = "snowball" | "avalanche"`).
- Function parameters use inline object types when the interface is single-use.
- Never use `as` casts to bypass type errors. Fix the types.

### Imports

- `@/` path alias for all internal imports. No relative paths above one level.
- Import order: React/hooks → third-party → `@/components/` → `@/lib/` → `@/hooks/`.
- Use `import type` for type-only imports when the import is only used as a type.

### React Components

- All interactive components use `"use client"` directive.
- Content-only pages (SEO, blog, guides) are server components (no directive).
- State management: `useState` for local state, `useLocalStorage` for persistence.
- Derived state: `useMemo` (no `useCallback` unless passing to memo'd children).
- Components with 5+ `useState` calls should be refactored into sub-components or custom hooks.

### Styling

- Tailwind classes only. No inline styles, no CSS modules, no styled-components.
- Color palette: `zinc` (primary), `emerald`/`amber`/`red`/`blue`/`purple` (accents by domain).
- All components support dark mode via `dark:` variant classes.
- Responsive: `md:` breakpoint for desktop/mobile split. Sidebar is fixed on desktop, drawer on mobile.
- Custom CSS in `globals.css` only for Tailwind layer directives and cross-browser slider styling.

### Naming

- Components: PascalCase, one component per file, filename matches default export.
- Functions: camelCase. Math functions use descriptive names (`calcPMT`, `simulatePayoff`).
- Files: kebab-case for pages (`should-i-buy-a-house/`), PascalCase for components.
- Props: descriptive names. No single-letter props except `n` in pure math functions.

---

## IV. The Single Source of Truth Doctrine

This is the most important rule in the codebase:

> **Every business-logic function must exist exactly once.**

The `lib/` directory is the single source of truth for all mathematical computation. Interactive components **must not** contain their own implementations of:

- PMT amortization → use `lib/loan-math.ts` `calcPMT`
- Debt payoff simulation → use `lib/debt-math.ts` `simulatePayoff`
- FIRE number / years-to-FIRE → use `lib/fire-math.ts`
- Compound interest → use `lib/fire-math.ts` `compound`

When a component needs math it imports from `lib/`. If the lib doesn't return a field the component needs (e.g., `debtFreeDate`), **compute it from the lib's return value** — do not duplicate the function.

Each lib module has a corresponding test file in `__tests__/`. Tests cover the lib, not the component's rendering. Component tests cover the integration (inputs → lib → outputs in UI).

New math functions:
1. Write the function in the appropriate `lib/` module
2. Write tests in the corresponding `__tests__/` file
3. Import and use in the component

---

## V. Routing & SEO

### Route Organization

- **`/`** — Landing page (hero + 5 decision cards)
- **`/decision/*`** — Interactive decision engines (mortgage affordability, rent vs buy, market timing, mortgage vs invest)
- **`/dashboard/*`** — Interactive tools (FIRE calculator, debt planner, loan compare, loan comparison matrix)
- **`/guides/*`** — Educational long-form content (7 pages)
- **`/` (root-level)** — Blog articles (11 pages: `debt-avalanche-vs-snowball`, `pay-off-debt-faster`, etc.)
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

- Dynamic `sitemap.ts` — all routes with priorities (1.0 → 0.3) and change frequencies.
- Dynamic `robots.ts` — allows all, disallows `/api/`, `/auth/`, `/debug`.
- New routes must be added to the sitemap before merge.

---

## VI. Dark Mode

- Tailwind `darkMode: "class"` — toggled by adding/removing `dark` class on `<html>`.
- Theme state persisted in `localStorage` key `finkit-theme`.
- `ThemeProvider` wraps the app; `DarkModeToggle` sits in the Sidebar.
- FOUC prevention: inline `<script>` in `<head>` reads theme before first paint.
- All components use `dark:` variants. New components must support dark mode from day one.

---

## VII. Testing Standards

### What Must Be Tested

1. **All `lib/` functions** — unit tests for every exported function. Edge cases required (zero inputs, negative inputs, boundary conditions).
2. **All `hooks/`** — unit tests via `renderHook`. SSR safety, persistence, edge cases.
3. **Engine `analyze` functions** — unit tests for core decision logic (export `analyze` if not already).
4. **Component rendering** — at minimum: smoke test (renders without error), key metrics present, interactive elements accessible.

### Test Conventions

- File: `__tests__/<ModuleName>.test.ts`
- Framework: Vitest (`describe`/`it`/`expect`), React Testing Library for components
- Environment: `jsdom` (configured in `vitest.config.ts`)
- Run before every commit: `npx vitest run` (must pass 100%)

---

## VIII. Git Workflow

- Branch prefix: `codex/` for feature branches.
- Commit messages: [Conventional Commits](https://www.conventionalcommits.org/) format.
  - `feat:` — new feature or page
  - `fix:` — bug fix
  - `refactor:` — code change with no behavioral change
  - `chore:` — cleanup, dependency updates
  - `perf:` — performance improvement
- Never amend commits unless explicitly requested.
- Never `git reset --hard` or `git checkout --` unless explicitly requested.

---

## IX. Banned Patterns

These are **never** allowed in the codebase:

- Duplicate business logic (see Section IV)
- Barrel files (`index.ts` re-exports) — import directly from the source file
- Component subdirectories in `components/` — flat directory only
- `any` types without explicit justification comment
- Inline styles or CSS modules — Tailwind only
- Relative imports beyond one level — use `@/` alias
- `console.log` in production code — use proper logging or remove
- Hardcoded URLs that should be environment variables — use `process.env` or constants
- `file://` URIs in links — use proper HTTP URLs
- Purple-on-white default color schemes — use zinc palette

---

## X. Amendment Process

This constitution is amended by:

1. Proposing the change with rationale
2. Updating this document
3. Committing with message: `docs: amend constitution — <summary>`
4. All subsequent work must respect the amended constitution

Amendments that contradict established architecture require refactoring existing code to match before the amendment is considered complete.
