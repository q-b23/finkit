# FinKit Governance Summary

Last updated: 2026-06-23

**One-page summary of the project governance structure.** All AI agents entering this project must read this file first.

---

## Governance Health Score: 100/100

All 5 documents are internally consistent on all substantive claims: target market (US, 35-50), product identity (Home Affordability Decision Assistant), monetization (donation-based), FIRE grandfathering (not expanded), mobile-first requirement, and SEO constraints.

**All previous drift items resolved.** PRODUCT_ROADMAP.md now explicitly declares "Home Affordability Decision Assistant" as product category (with link to positioning doc). FIRST_30_DAYS_METRICS.md now includes a Mobile-First Requirement section citing constitution breakpoints (320px-1024px+).

---

## Document Dependency Diagram

```
.ai/PROJECT_CONSTITUTION.md          (Highest priority - permanent rules)
       |
       v
.ai/PROJECT_POSITIONING.md           (Derives from Constitution - business context)
       |
       +---.ai/PRODUCT_ROADMAP.md     (Derives from both - implementation order)
       |
       +---.ai/POST_LAUNCH_PLAN.md    (Derives from Constitution + Roadmap - operations)
       |
       +---.ai/FIRST_30_DAYS_METRICS.md  (Derives from Post-Launch Plan - scoring)
       |
       +---.ai/GOVERNANCE_SUMMARY.md  (Derives from all - entry point for agents)
```

**Override rules:**
- PROJECT_CONSTITUTION.md overrides all other documents when conflicts arise
- PROJECT_POSITIONING.md overrides PRODUCT_ROADMAP.md and below on business positioning questions
- PRODUCT_ROADMAP.md overrides POST_LAUNCH_PLAN.md and below on implementation sequence
- POST_LAUNCH_PLAN.md overrides FIRST_30_DAYS_METRICS.md on operational priorities
- FIRST_30_DAYS_METRICS.md is authoritative only during the first 30 days after launch
- All future agents read this document first, then follow the reading order below

---

## Recommended Reading Order for AI Agents

**Always read in this sequence. Do not skip documents.**

1. `GOVERNANCE_SUMMARY.md` (this file - orientation, 2 min)
2. `PROJECT_CONSTITUTION.md` (permanent rules, 5 min)
3. `PROJECT_POSITIONING.md` (business context, 3 min)
4. `PRODUCT_ROADMAP.md` (implementation order, 2 min)
5. `POST_LAUNCH_PLAN.md` (operations plan, 2 min)
6. `FIRST_30_DAYS_METRICS.md` (scoring framework, 2 min)

Total reading time: approximately 16 minutes for a new agent.

**Reading priority:** If the agent has time for only one document, read PROJECT_CONSTITUTION.md. If time for two, add PROJECT_POSITIONING.md. Do not skip to lower documents without reading the higher ones.

---

## Document Map

| Document | Word Count | Purpose | When to Read |
|---|---|---|---|
| GOVERNANCE_SUMMARY.md | ~400 | Entry point, orientation, override rules | Every session |
| PROJECT_CONSTITUTION.md | 2,410 | Architecture, conventions, code rules, governance | Every session |
| PROJECT_POSITIONING.md | 1,340 | Business identity, target market, differentiation | Every feature task |
| PRODUCT_ROADMAP.md | 809 | Phase sequence, priorities, effort estimates | Before implementation |
| POST_LAUNCH_PLAN.md | 1,283 | Day 1-30 operations, checklists | During launch phase |
| FIRST_30_DAYS_METRICS.md | 1,298 | KPI thresholds, review templates | During launch phase |

---

## Key Facts (Canonical Reference)

| Fact | Value | Source |
|---|---|---|
| Product name | FinKit | Constitution |
| Category | Home Affordability Decision Assistant | Positioning |
| Target market | United States only | Constitution |
| Target age | 35-50 | Constitution |
| Monetization | Donation (Buy Me a Coffee), no paywalls | Constitution |
| Framework | Next.js 14 App Router, TypeScript strict | Constitution |
| Styling | Tailwind CSS v3, zinc palette | Constitution |
| Fonts | Inter + JetBrains Mono (self-hosted) | Constitution |
| Analytics | Plausible (privacy-first, no cookies) | Constitution |
| Core qus | 5 (afford, stress, rent/buy, hidden costs, timing) | Positioning |
| Current alignment | 97% | Roadmap |
| Current phase | Validation (no new features without data) | First 30 Days |
| Mobile priority | 320px-1024px+, highest priority | Constitution |

---

## What FinKit Must Never Be

From Constitution Section IV and Positioning Section 1:

- Investment platform
- Retirement planning platform
- FIRE platform
- Trading platform
- Crypto platform
- Budgeting app
- Financial super-app
- Large SaaS
- CRM
- Social network

---

## Amendment Protocol

From Constitution Section XX:

1. Propose the change with rationale
2. Update the affected document(s)
3. Commit with message: `docs: amend constitution -- <summary>`
4. All subsequent work respects the amended constitution
5. Amendments contradicting established architecture require refactoring existing code

Only the project owner may amend these documents.

---

**END OF GOVERNANCE SUMMARY**
