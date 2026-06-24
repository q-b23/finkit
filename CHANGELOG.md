# Changelog

All notable changes to FinKit are documented here.

---

## 2026-06-23 — Phase 2: Core Decision Engines (85% → 92%)

### Added

- **HOA input** to Mortgage Stress Test — HOA dues now factored into total housing cost, DTI, and safe price calculations
- **Down Payment Scenario Comparison** — interactive table comparing 5%, 10%, and 20% down payment outcomes: monthly P&I, total interest, and stress level
- **20% down savings callout** — when current down payment is below 20%, shows exact monthly and lifetime savings from reaching 20%
- **`StickyCTA` component** — scroll-triggered fixed bottom bar with "Check My Affordability" primary CTA (mobile-first, dark mode, backdrop blur)

### Changed

- **UI labels** updated from "Risk Score" to "Stress Score" / "Stress Level" throughout mortgage engine
- **Recommendation messaging** — "Regret risk" replaced with plain financial stress framing; safety zone message made more concrete
- **Homepage decision card** — mortgage card reframed as "Will this mortgage create financial stress?" with 60-second test language
- **Decision page metadata** — `/decision/mortgage` now positioned as "Mortgage Stress Test"
- **Auto-save label** — "Affordability Check" → "Stress Test"

### Fixed

- `tsconfig.json` `jsx` reverted from `"preserve"` to `"react-jsx"` (preserve mode breaks vitest import analysis)

---




## 2026-06-23 — Launch Sprint (89 → 95+)

### Added

- **`/contact` page** — dedicated contact page with email (hello@getfinkit.com), privacy request instructions, and donation CTA
- **Custom 404 page** (`not-found.tsx`) — branded 404 with housing-themed messaging and direct links to Stress Test, Rent vs Buy, and Hidden Costs tools
- **`llms.txt`** — AI crawler discoverability file listing all 30+ routes with one-line descriptions at `/llms.txt`
- **`llms-full.txt`** — extended LLM context document with full page descriptions, product identity, architecture summary, and privacy/monetization details at `/llms-full.txt`
- **Organization schema** — JSON-LD structured data in layout.tsx with name, URL, description, and sameAs links
- **FAQ schema** — added JSON-LD FAQPage structured data to 4 priority pages: `/affordability-score`, `/house-poor-calculator`, `/mortgage-stress-test-guide`, `/hidden-housing-costs` (3 Q&A each)

### Changed

- **Footer** — added Contact link (Contact / Terms / Privacy / GitHub / Donate)
- **Privacy policy** — added explicit contact mechanism: hello@getfinkit.com and /contact
- **Sitemap** — added `/contact` route at priority 0.5

## 2026-06-23 — Phase 3B: SEO Landing Pages & Decision Support (94% → 97%)

### Added

- **`/affordability-score`** — standalone Affordability Score page embedding `MortgageDecisionEngine` directly. Users get a full stress test without leaving the page. Targets "home affordability calculator", "house affordability score", "can I afford this house"
- **`/house-poor-calculator`** — educational SEO landing page: definition of house poor, 4 warning signs with numbered cards, budget reality check table (mortgage vs true cost), and direct links to all 4 housing tools (Stress Test, Affordability Score, Hidden Costs, Rent vs Buy)
- **`/mortgage-stress-test-guide`** — educational SEO landing page: what a mortgage stress test is, how it works (3-step flow), stress level framework (Safe/Cautious/Risky/Avoid with descriptions), 3-question decision framework, CTA to the Stress Test tool

### Changed

- **`/should-i-buy-a-house`** — added cross-links to Hidden Housing Costs and Rent vs Buy Comparison below the main CTA
- **Sitemap** — added 3 new routes: `/affordability-score` (0.9), `/house-poor-calculator` (0.9), `/mortgage-stress-test-guide` (0.85)

### SEO Coverage Complete

All 5 core user questions now have dedicated landing pages:
1. Can I afford this house? → `/affordability-score`, `/can-i-afford-a-house`
2. Will this mortgage create financial stress? → `/decision/mortgage`, `/mortgage-stress-test-guide`
3. Should I buy or rent? → `/decision/rent-vs-buy`, `/rent-vs-buy-decision`
4. Am I underestimating housing costs? → `/hidden-housing-costs`
5. Should I buy a house right now? → `/should-i-buy-a-house`, `/house-poor-calculator`


## 2026-06-23 — Phase 3A: Decision Support & Comparison (90% → 94%)

### Added

- **Hidden Cost Analyzer** (`HiddenCostAnalyzer`) — interactive calculator revealing true monthly homeownership costs beyond the mortgage. Inputs: property tax, insurance, HOA, maintenance %, utilities. Outputs: stacked cost breakdown bar, hidden cost ratio (with severity callout), annual/5yr/30yr projection table
- **`/hidden-housing-costs` SEO route** — dedicated landing page targeting "hidden housing costs" keyword cluster with OG metadata
- **5/10-year comparison table** in Rent vs Buy engine — side-by-side cost breakdown showing how the recommendation changes with longer timelines

### Changed

- **Rent vs Buy engine** — added HOA input support (backward-compatible, defaults to 0)
- **Rent vs Buy winner labels** — updated from "Buying/Renting saves you $X" to "Likely Better to Buy" / "Likely Better to Rent" / "Too Close to Call" (tossup within 5% of home price)
- **RelatedArticles mortgage category** — replaced FIRE cross-link (`/how-long-to-retire`) with housing-only articles (`/hidden-housing-costs`, `/should-i-buy-a-house`)
- **Sitemap** — added `/hidden-housing-costs` at priority 0.9


## 2026-06-23 — Phase 1: Foundation & Conversion (72% → 85%)

### Changed

- **Global SEO metadata** (`layout.tsx`) — keywords switched from FIRE/retirement/investing to housing affordability terms
- **Brand tagline** — sidebar and footer updated from "Built for financial freedom" to "Make your housing decision with confidence"
- **OG image alt text** — "financial future" → "housing decisions"

### Added

- **`.ai/PROJECT_POSITIONING.md`** — permanent business and product positioning reference
- **`.ai/PRODUCT_ROADMAP.md`** — 4-phase implementation sequence (72% → 97%)
