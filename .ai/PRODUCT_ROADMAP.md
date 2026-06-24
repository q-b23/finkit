# FinKit — Product Roadmap

Last updated: 2026-06-23

**This document defines the implementation sequence for all future FinKit development.** It is the master plan for reaching 97% product-market alignment.

**Product Category:** Home Affordability Decision Assistant (per [PROJECT_POSITIONING.md](./PROJECT_POSITIONING.md)).

Read alongside [PROJECT_CONSTITUTION.md](./PROJECT_CONSTITUTION.md) and [PROJECT_POSITIONING.md](./PROJECT_POSITIONING.md).

---

## Current Alignment: 72% → Target: 97%

---

## Roadmap Principles

All phases follow these constraints:

1. Incremental development — no rewrites, no rebuilds
2. Reuse existing architecture, components, and `lib/` modules
3. Preserve SEO equity — no URL changes without redirects
4. Preserve mobile-first experience at all breakpoints (320px-414px)
5. Preserve Vercel deployment workflow (`vercel.json`, `next.config.js`)
6. No scope creep into non-goal categories (retirement, investing, FIRE)
7. Every feature must answer at least one core question

---

## Phase 1: Foundation & Conversion

**Goal:** 72% → 85%

**Focus:** Sharpen the top-of-funnel. Every visitor should immediately understand what FinKit does and why it matters.

### Features

| # | Feature | Description |
|---|---|---|
| 1.1 | Homepage redesign | Clearer hero messaging, stronger value proposition, improved CTA hierarchy |
| 1.2 | Navigation audit | Simplify sidebar, improve information architecture, ensure all routes reachable |
| 1.3 | SEO metadata review | Audit titles, descriptions, OG images across all 39 routes |
| 1.4 | Messaging consistency | Align all page copy with positioning doc voice ("Will you become house poor?") |
| 1.5 | Donation flow optimization | Reduce friction in DonateButton → Buy Me a Coffee conversion path |
| 1.6 | Landing page CTAs | Sticky CTA, scroll-triggered prompts, decision-card improvements |

### Dependencies

- None — builds on existing routes and components

### Effort: Low · Risk: Low

### Success Metrics

- Homepage bounce rate reduction
- Donation click-through rate increase
- Search console CTR improvement on primary SEO pages
- Time-to-first-decision decrease

---

## Phase 2: Core Decision Engines

**Goal:** 85% → 92%

**Focus:** Build the primary housing decision tools — the product's reason for existing.

### Features

| # | Feature | Description |
|---|---|---|
| 2.1 | Mortgage Stress Test | Interactive engine: income, debt, rate inputs → stress score + plain-English recommendation |
| 2.2 | House Affordability Score | Rated affordability scale with risk-factor breakdown |
| 2.3 | Mortgage Decision Workflow | Guided multi-step flow combining stress test + affordability into a single recommendation |
| 2.4 | Mortgage Decision Engine refinements | Improve existing `MortgageDecisionEngine` with stress-test scoring and clearer output |
| 2.5 | SEO landing pages | Dedicated landing pages for "mortgage stress test" and "house affordability" keywords |

### Dependencies

- Existing `MortgageDecisionEngine` component
- `lib/loan-math.ts` (PMT, amortization)
- Sidebar, Footer, ThemeProvider

### Effort: Medium · Risk: Medium

### Success Metrics

- Engine completion rate (start → result)
- Time-on-page for decision engines
- Organic traffic to stress-test and affordability landing pages
- Recommendation clarity score (user feedback)

---

## Phase 3: Decision Support & Comparison

**Goal:** 92% → 97%

**Focus:** Expand beyond the single-mortgage question into comparison and scenario tools.

### Features

| # | Feature | Description |
|---|---|---|
| 3.1 | Buy vs Rent Analysis | Enhanced RentVsBuyEngine with 5-year projection, break-even chart |
| 3.2 | Hidden Housing Cost Calculator | Total cost of ownership: taxes, insurance, maintenance, HOA, utilities |
| 3.3 | Decision Support pages | Long-form educational content embedded with interactive mini-calculators |
| 3.4 | Scenario Analysis | Side-by-side comparison: different homes, different rates, different down payments |
| 3.5 | SEO landing page expansion | Buy vs Rent, hidden housing costs, monthly cost breakdown pages |

### Dependencies

- Existing `RentVsBuyEngine`, `MarketTimingEngine`, `MortgageVsInvestEngine`
- `lib/loan-math.ts`, `lib/debt-math.ts`
- Phase 2 engines (stress test, affordability score)

### Effort: Medium-High · Risk: Medium

### Success Metrics

- Multi-scenario usage (users comparing 2+ scenarios)
- Buy vs Rent page organic traffic
- Hidden cost calculator completion rate
- Return visit rate

---

## Phase 4: Premium (Future)

**Goal:** Post-97% — monetization

**Focus:** Premium features for users who want deeper analysis. Do not implement until Phases 1-3 are complete and alignment is verified.

### Features

| # | Feature | Description |
|---|---|---|
| 4.1 | Premium Reports | Downloadable PDF reports with detailed scenario breakdowns |
| 4.2 | Advanced Decision Tools | Multi-variable sensitivity analysis, rate-change impact modeling |
| 4.3 | Enhanced Scenario Planning | Save and compare unlimited scenarios, shareable report links |

### Dependencies

- Phase 3 scenario analysis infrastructure
- Monetization mechanism (TBD — likely one-time purchase, not subscription)

### Effort: High · Risk: High (monetization adds complexity)

### Success Metrics

- Premium conversion rate
- Revenue per user
- Report generation volume

---

## Out of Scope (Never)

These categories are permanently out of scope per [PROJECT_POSITIONING.md](./PROJECT_POSITIONING.md):

- Retirement planning tools
- FIRE calculators (existing content grandfathered, not expanded)
- Investment portfolio tracking
- Stock/crypto tools
- Budgeting or expense tracking
- Social features

---

**END OF ROADMAP**
