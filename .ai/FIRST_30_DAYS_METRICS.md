# FinKit — First 30 Days Metrics Framework

Last updated: 2026-06-23

**This document is the official scorecard for the first 30 days after launch.** All product decisions during this period must reference measurable data, not opinions. Review weekly against the thresholds in Section 8.

---

## 1. Primary Business Question

> Do real users have enough interest in Home Affordability Decision Assistance to justify continued investment?

Answer this question at Day 30 using the data collected below. If the answer is yes, proceed with Phase 4 (premium tools). If no, pivot SEO/content strategy before building more features.

**Mobile-First Requirement:** Per [PROJECT_CONSTITUTION.md](./PROJECT_CONSTITUTION.md) Section VI, all pages must validate at 320px, 375px, 390px, 414px, 768px, and 1024px+. Mobile experience is the primary experience. Any performance or UX metric tracked below must be assessed at mobile breakpoints first.

---

## 2. Traffic Metrics (Source: Google Search Console)

Track every Monday morning. Record in a simple spreadsheet.

| Metric | Target (Day 30) | How to Measure |
|---|---|---|
| Organic Impressions | > 100 (min), > 1,000 (strong) | GSC Performance report, filter by search type: Web |
| Organic Clicks | > 50 (strong) | GSC Performance report |
| CTR | > 2% (baseline) | Clicks ÷ Impressions, GSC average |
| Average Position | < 30 (baseline) | GSC average position for top 20 queries |
| Indexed Pages | > 10 (min), > 30 (strong) | GSC Index → Pages report |
| Top Queries | Document top 10 | GSC Queries report, sort by impressions |
| Top Landing Pages | Document top 5 | GSC Pages report, sort by clicks |

### Weekly cadence

- **Week 1:** Check indexing only — impressions will be near zero. Verify 10+ pages are indexed.
- **Week 2:** First impressions should appear. Identify which pages Google is surfacing.
- **Week 3:** CTR and position trends emerge. Compare priority pages (Section 3).
- **Week 4:** Full-month data. Answer the primary business question.

---

## 3. SEO Page Scorecard

Track these 5 pages individually each week:

| Page | Keyword Target | Impressions | Clicks | CTR | Avg Position |
|---|---|---|---|---|---|
| `/affordability-score` | home affordability calculator | | | | |
| `/house-poor-calculator` | house poor calculator | | | | |
| `/mortgage-stress-test-guide` | mortgage stress test | | | | |
| `/should-i-buy-a-house` | should i buy a house | | | | |
| `/hidden-housing-costs` | hidden housing costs | | | | |

**Interpretation:**
- Page with highest impressions: best keyword/title match — invest more in this topic
- Page with highest CTR: best meta description — apply lessons to other pages
- Page with zero impressions at Day 14: revisit keyword targeting or title

---

## 4. Tool Usage Metrics (Source: Plausible custom events)

| Event | What It Measures | Target (Day 30) |
|---|---|---|
| `tool-start` | User begins typing in any engine | > 50 (min), > 200 (strong) |
| `tool-complete` | Result renders for any engine | > 25 (min), > 100 (strong) |
| `tool-complete` (mortgage) | Stress test completions | Track separately |
| `tool-complete` (rent-vs-buy) | Rent vs buy completions | Track separately |
| `tool-complete` (hidden-cost) | Hidden cost analyzer uses | Track separately |
| Completion Rate | `tool-complete` ÷ `tool-start` | > 40% (healthy), < 20% (investigate) |

**Interpretation:**
- Completion rate below 20%: users start but abandon — UX or input friction problem
- One tool dominates: that tool's topic is the strongest user need — build around it
- Zero tool usage with traffic: disconnect between SEO promise and tool delivery

---

## 5. User Engagement (Source: Plausible dashboard)

| Metric | Baseline | Meaning |
|---|---|---|
| Pages per Session | > 1.5 | Users explore beyond landing page |
| Time on Site | > 60s | Users engage with tools or read content |
| Bounce Rate | < 70% | Landing pages hold attention |
| Returning Visitors | > 10% | Users come back (saved analyses, email capture) |

Engagement data lags traffic data by 1-2 weeks. Don't overreact to Week 1 numbers.

---

## 6. Conversion Metrics (Source: Plausible custom events)

| Event | Target (Day 30) |
|---|---|
| `email-signup` | > 5 (min), > 20 (strong) |
| `donation-click` | > 10 (baseline) |
| Buy Me a Coffee page views | Monitor via Buymeacoffee dashboard |
| Actual donations | > 1 (strong signal at this stage) |

**Interpretation:**
- Email signups but no tool usage: content resonates but tools aren't sticky — improve CTA placement
- Donation clicks but no donations: Buymeacoffee page messaging or pricing psychology issue
- Zero conversions of any kind at Day 30: valid if traffic is < 100 visits — focus on acquisition first

---

## 7. AI Discoverability

| Check | How to Verify | Target |
|---|---|---|
| Bing indexed pages | Bing Webmaster Tools → Site Explorer | > 5 |
| Google indexed pages | GSC → Index → Pages | > 10 |
| llms.txt accessible | `curl -s https://getfinkit.com/llms.txt` | Returns 200 |
| FAQ schema valid | Google Rich Results Test | 5+ pages pass |
| Organization schema valid | Schema Markup Validator | Passes |

---

## 8. Success Thresholds

### Minimum Success (Stay the course, fix basics)

- Organic Impressions > 100
- Indexed Pages > 10
- Tool Completions > 25
- Email Signups > 5

If these thresholds are met: the product has baseline viability. Optimize what exists before building new features.

### Strong Success (Accelerate, invest more)

- Organic Impressions > 1,000
- Organic Clicks > 50
- Tool Completions > 100
- Email Signups > 20

If these thresholds are met: clear product-market fit signal. Proceed to Phase 4 (premium tools) and expand SEO content.

---

## 9. Weekly Review Template

### Week 1: Is the site alive?

- What pages are indexed? (GSC Index report)
- Any crawl errors or coverage issues?
- Is Plausible recording pageviews?
- Are custom events firing?

### Week 2: Are pages attracting attention?

- Which landing pages have impressions? (GSC Queries)
- Are the 5 priority pages (Section 3) in the index?
- Any tool usage yet?

### Week 3: Is content generating engagement?

- Which page has the most clicks?
- What is the tool completion rate?
- Any email signups or donation clicks?
- Are users exploring multiple pages or bouncing?

### Week 4: What should change?

- Which page is the clear winner? Double down.
- Which page has zero traction? Fix title/description or de-prioritize.
- Is the tool completion rate acceptable? If not, audit the UX.
- Primary business question: do real users want this?

---

## 10. Decision Rules

### Rule A: Green Light (Traffic + Tool Usage Both Growing)

**IF** traffic grows week-over-week **AND** tool completion rate is > 30%
**THEN** Continue investing in Home Affordability Decision Assistant. Proceed to Phase 4.

### Rule B: Yellow Light (Traffic Exists, Tools Underused)

**IF** impressions > 500 **BUT** tool completions < 25
**THEN** Improve UX and messaging. Audit: is the CTA clear? Are inputs too complex? Does the landing page promise match the tool experience?

### Rule C: Red Light (Traffic + Usage Both Near Zero)

**IF** impressions < 50 **AND** tool completions < 10 at Day 30
**THEN** Re-evaluate SEO strategy before adding features. Check: are keywords too competitive? Is content too thin? Are there technical indexing issues? Do not build Phase 4 until traffic exists.

### Rule D: Anomaly (High Traffic, Zero Conversion)

**IF** clicks > 100 **BUT** email signups = 0 **AND** tool completions < 10
**THEN** The page promise and tool delivery are misaligned. Users arrive expecting something the tool doesn't deliver. Read the page copy from a user's perspective and fix the gap.

---

**END OF METRICS FRAMEWORK**

Review this document at every weekly check-in. Update thresholds at Day 30 based on actual data.
