# FinKit — Product Positioning Definition

Last updated: 2026-06-23

**This document is the permanent business and product positioning reference.** It defines what FinKit is, who it serves, how it competes, and what it must never become. Read alongside [PROJECT_CONSTITUTION.md](./PROJECT_CONSTITUTION.md) for governance rules.

---

## 1. PRODUCT IDENTITY

**Product Name:** FinKit

**Product Category:** Home Affordability Decision Assistant

**Product Mission:** Help ordinary households make smarter, safer home-buying decisions. Reduce uncertainty. Improve confidence. Provide clear, simple decision support — not raw numbers.

### What FinKit Is

A focused decision-support tool for one high-stakes financial question: **can I afford this home, and will it create financial stress?**

FinKit distills complex housing-finance math (mortgage amortization, property tax, insurance, maintenance, opportunity cost, market timing) into plain-English recommendations backed by transparent calculations. Every result includes a "why."

### What FinKit Is Not

FinKit is not a financial-freedom platform, a retirement planner, or an investment manager. It does not track net worth, project portfolio returns, or optimize asset allocation. It intentionally avoids scope creep into general personal finance.

**Explicitly not:**
- Financial Freedom / FIRE platform
- Retirement planning platform
- Investment management platform
- Trading platform
- Portfolio tracker
- Budgeting app
- CRM or social network

---

## 2. TARGET MARKET

### Primary Market (Current)

**United States only.**

All defaults, examples, calculations, and content assume US mortgage conventions:
- 30-year fixed-rate mortgages
- US property tax norms
- FICO-adjacent DTI thresholds
- US dollar (USD)

### Future Expansion Markets (Not Yet Active)

These are identified for future consideration only. No code, content, or SEO targeting should be added for these markets without explicit owner approval:

- Canada
- United Kingdom
- Australia

---

## 3. TARGET USERS

### Primary Persona

| Dimension | Description |
|---|---|
| Age | 35-50 |
| Income | Middle-income households |
| Context | Considering a home purchase, managing mortgage decisions, or evaluating housing affordability |
| Financial literacy | Not sophisticated — needs clear answers, not raw math |
| Emotional state | Anxious about rates, afraid of making the wrong call, uncertain about hidden costs |

### Secondary Audiences

- First-time home buyers (nervous, information-seeking)
- Existing homeowners evaluating a move-up or refinance decision
- Renters weighing buy-vs-rent tradeoffs
- Spouses/partners building confidence in a joint housing decision

---

## 4. CORE USER PAIN POINTS

1. **High mortgage rates** — fear of locking in at the wrong time
2. **Housing affordability concerns** — "Can I actually afford this?"
3. **Monthly payment anxiety** — "What will my real monthly cost be?"
4. **Hidden housing costs** — property tax, insurance, maintenance, HOA
5. **Financial uncertainty** — income vs. expenses under different scenarios
6. **Budget pressure** — how much house before things get tight
7. **Fear of making the wrong housing decision** — paralysis from too many variables

---

## 5. CORE USER QUESTIONS

Every feature, page, calculator, and article must help answer at least one of these:

1. Can I afford this house?
2. Can I safely afford this mortgage?
3. What is my true monthly housing cost?
4. Should I buy now or wait?
5. How much financial stress will this mortgage create?

---

## 6. PRODUCT VALUES

| Value | What It Means |
|---|---|
| **Simple** | No unnecessary complexity. Easy to understand, fast to use. |
| **Practical** | Actionable recommendations, not academic analysis. |
| **Trustworthy** | Transparent math. Every recommendation comes with a "why." |
| **Privacy-first** | No account required. No server-side storage of financial data. Local-first calculations. |
| **Fast** | Static generation, self-hosted fonts, sub-second loads. |
| **Transparent** | No black boxes. Users can inspect the math behind every result. |

---

## 7. PRODUCT DIFFERENTIATION

### How FinKit Stands Apart

Most personal-finance tools try to do everything: budgeting, net-worth tracking, retirement projections, investment dashboards. FinKit takes the opposite approach.

**FinKit focuses on a single high-value decision:** housing affordability and mortgage confidence.

The product helps users understand the real financial impact of a housing purchase before they commit — not after. It answers the emotional question ("Will I become house poor?") with mathematical rigor presented in plain language.

### Competitive Positioning

- vs. **Zillow/Redfin calculators** — FinKit is more comprehensive (stress testing, hidden costs, buy-vs-rent, market timing) and privacy-first (no lead-gen, no data sharing)
- vs. **NerdWallet/Bankrate calculators** — FinKit is faster, simpler, and ad-free
- vs. **General personal-finance apps (Mint, YNAB, Monarch)** — FinKit doesn't compete; it's focused on the housing decision, not ongoing money management

---

## 8. CORE FEATURES

### Decision Engines (Interactive)

1. **Mortgage Stress Test** — evaluates whether a mortgage will create financial strain at current income and expense levels
2. **House Affordability Score** — rates affordability on a clear scale with risk factors
3. **Buy vs Rent Analysis** — 5-year total-cost comparison with break-even
4. **Market Timing Analysis** — evaluates whether current market conditions favor buying or waiting

### Calculator Tools

5. **Monthly Housing Cost Calculator** — true cost including taxes, insurance, maintenance, HOA
6. **Debt Payoff Planner** — snowball vs. avalanche comparison
7. **Loan Comparison Matrix** — side-by-side mortgage offer comparison

### Planned (Not Yet Built)

- Standalone Affordability Score widget
- Simplified Buy vs Rent tool
- Total Cost of Ownership breakdown

---

## 9. VOICE & TONE

### How FinKit Communicates

- **Lead with the user's fear:** "Will you become house poor?"
- **Never talk down to users.** Explain concepts in plain English. No finance jargon without a clear definition.
- **Every recommendation includes a "why."** Users should understand the reasoning, not just the output.
- **Privacy is a feature, not a footnote.** Lead with the privacy promise where it matters.

### Emotional Positioning

FinKit meets users where they are: anxious, uncertain, and facing one of the biggest financial decisions of their lives. The tone is calm, confident, and reassuring — not alarmist, not salesy.

---

## 10. SEO POSITIONING

### Primary SEO Topics

- Home affordability
- Mortgage affordability
- Mortgage stress / "house poor"
- Housing costs
- Buy vs Rent
- Monthly housing expenses
- Home-buying decisions
- Mortgage comparison

### Topics to Avoid

These topics must not be primary SEO targets. Existing content on these topics should not be expanded:

- Retirement planning
- FIRE movement (Financial Independence Retire Early)
- Investment portfolio tracking
- Stock investing
- Crypto investing
- Trading tools

Existing FIRE-related content is grandfathered but must not be promoted or expanded as a primary SEO target.

---

## 11. MONETIZATION STRATEGY

### Current: Donation-Based

- Buy Me a Coffee integration (sidebar + footer `DonateButton`)
- No subscriptions, no paywall, no memberships
- 100% free to use

### Future: Premium Tools (Not Yet Active)

- Premium decision-support tools
- Advanced scenario reports
- Multi-scenario comparison
- Enhanced calculators with deeper analysis

These must remain aligned with the product's focus on housing affordability — not drift into general financial planning.

---

## 12. SUCCESS METRIC

**Every feature, page, article, calculator, and SEO landing page must help answer at least one core question.** If a proposed feature doesn't support the housing-affordability mission, it should be questioned before implementation.

The core questions:

1. Can I afford this house?
2. Can I safely afford this mortgage?
3. What is my true monthly housing cost?
4. Should I buy now or wait?

---

## 13. DEVELOPMENT CONSTRAINTS

All features must respect these constraints from [PROJECT_CONSTITUTION.md](./PROJECT_CONSTITUTION.md):

- Client-side calculations (no server-side storage of financial data)
- Static generation for fast loading
- Mobile-first experience (320px-414px verified)
- Dark mode support from day one
- No duplicate business logic (single source of truth in `lib/`)
- No barrel files, no component subdirectories

---

## 14. RELATIONSHIP TO OTHER .AI DOCUMENTS

| Document | Purpose |
|---|---|
| [PROJECT_CONSTITUTION.md](./PROJECT_CONSTITUTION.md) | Highest-priority rulebook — architecture, conventions, governance |
| **PROJECT_POSITIONING.md** (this file) | Business and product positioning — who, what, why |
| PROJECT_MEMORY.md (future) | Session-to-session context and learnings |
| TASK.md (per-task) | Individual task specifications |

When conflict arises, PROJECT_CONSTITUTION.md takes precedence over this document.

---

**END OF POSITIONING DEFINITION**
