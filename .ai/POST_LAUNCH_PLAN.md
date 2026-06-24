# FinKit — Post-Launch Plan (Days 1-30)

Last updated: 2026-06-23

**This document defines the first 30 days after MVP launch.** Focus: validation, traffic acquisition, indexing, user behavior, and retention. No new feature development until the 30-day review is complete.

---

## 1. Launch Checklist

| # | Task | Owner | Verify |
|---|---|---|---|
| 1.1 | Deploy to Vercel production (`vercel --prod`) | Dev | Homepage loads, no build errors |
| 1.2 | Verify `sitemap.xml` returns 200 with all 48 routes | Dev | `curl -s https://getfinkit.com/sitemap.xml` |
| 1.3 | Verify `robots.txt` allows all, disallows `/api/` `/auth/` `/debug` | Dev | `curl -s https://getfinkit.com/robots.txt` |
| 1.4 | Mobile audit: 320px, 375px, 390px, 414px — no horizontal scroll | Dev | Chrome DevTools device toolbar |
| 1.5 | PageSpeed Insights: homepage, `/affordability-score`, `/decision/mortgage` | Dev | Target 90+ mobile, 95+ desktop |
| 1.6 | Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1 | Dev | CrUX dashboard or PageSpeed API |
| 1.7 | Verify self-hosted fonts load (Inter + JetBrains Mono, no CDN fallback) | Dev | Network tab — no Google Fonts requests |
| 1.8 | Verify Plausible analytics fires (check dashboard for pageview) | Dev | plausible.io dashboard |
| 1.9 | Verify dark mode toggle works, theme persists across refresh | Dev | Manual smoke test |
| 1.10 | Verify footer/sidebar tagline reads "Make your housing decision with confidence." | Dev | Visual check |

---

## 2. Google Search Console

### Day 1: Setup

- Add property: `getfinkit.com` (Domain property preferred — covers all subdomains)
- Verify ownership via DNS TXT record or HTML file upload to Vercel public/
- Submit sitemap: `https://getfinkit.com/sitemap.xml`

### Day 3-7: Index Monitoring

- Check Coverage report for errors, warnings, and excluded pages
- Verify all 48 routes appear as submitted
- Prioritize fixing any "Crawled — currently not indexed" pages

### Day 7-30: Performance Tracking

- Monitor Top Queries: filter by housing-affordability terms
- Track Average Position for priority pages (see Section 5)
- Monitor CTR for priority pages — target > 3% for top-10 results
- Set up email alerts for coverage drops or manual actions

---

## 3. Bing Webmaster Tools

### Day 1-3: Setup

- Add property: `getfinkit.com`
- Submit sitemap (same URL)
- Enable IndexNow for instant crawling on new content

### Ongoing

- Monitor AI Search visibility (Bing powers ChatGPT/Copilot search)
- Check that FAQ schema and structured data render correctly in Bing's inspection tool

---

## 4. Analytics: Events to Track

FinKit uses Plausible (privacy-first, no cookies). Add custom event goals:

| Event | Trigger | Why It Matters |
|---|---|---|
| `tool-start` | User begins typing in any calculator/engine | Funnel entry |
| `tool-complete` | Result renders (first interaction only) | Completion rate |
| `cta-click` | Click on "Check My Affordability" / "Take the Stress Test" | CTA performance |
| `donation-click` | Click on Buy Me a Coffee button (sidebar or footer) | Donation conversion |
| `email-signup` | EmailCapture form submitted | Lead capture rate |
| `scenario-compare` | User views down payment scenario table | Feature validation |

### Funnel to Watch

```
Page Load → tool-start → tool-complete → email-signup
```

Biggest drop-off location determines the next optimization priority.

---

## 5. SEO Monitoring: Priority Pages

Monitor these 5 pages weekly in Google Search Console:

| Page | Primary Keyword Target | Success Metric |
|---|---|---|
| `/affordability-score` | home affordability calculator | Impressions > 1K/mo by day 30 |
| `/mortgage-stress-test-guide` | mortgage stress test | Clicks > 50/mo by day 30 |
| `/house-poor-calculator` | house poor calculator | Clicks > 50/mo by day 30 |
| `/should-i-buy-a-house` | should i buy a house | Impressions > 5K/mo by day 30 |
| `/hidden-housing-costs` | hidden housing costs | Impressions > 1K/mo by day 30 |

For each page track: Impressions → Clicks → CTR → Average Position.

---

## 6. AI Search Optimization (AEO)

### Actions (Day 1-7)

- **FAQ Schema audit** — verify JSON-LD renders correctly on `/decision/mortgage`, `/dashboard/debt`, `/affordability-score`
- **Question-based content** — confirm all 5 pages from Section 5 open with a direct-answer paragraph (AI/SGE scraper-friendly)
- **Internal linking** — verify RelatedArticles links all 5 priority pages in a connected graph
- **Structured data** — test with Google Rich Results Test and Schema Markup Validator

### Future (Post Day-30)

- Evaluate creating `llms.txt` for AI crawler discoverability
- Consider `llms-full.txt` with page summaries for LLM context windows

---

## 7. User Validation: Questions to Answer

By day 30, answer these from analytics:

1. Which page gets the most traffic? (Expect: `/should-i-buy-a-house` or `/decision/mortgage`)
2. Which calculator gets used most? (Expect: Mortgage Stress Test)
3. Where do users drop off? (Check `tool-start` → `tool-complete` funnel)
4. Which CTA performs best? (Compare homepage "Check My Affordability" vs sticky CTA)
5. What pages attract organic traffic? (Filter GSC queries by non-brand terms)

### Behavioral Signals to Watch

- Do users interact with the scenario comparison table?
- Do users click through from educational pages (`/house-poor-calculator`) to tools?
- Does the sticky CTA get clicks or does it annoy users?

---

## 8. Retention Strategy

### Current

- **EmailCapture** — shown below decision engines: "Rates change. Should your decision?"
- **SaveResultButton** — saves analysis locally with auto-save via `useAutoSave`
- **ResumeCard** — shown on homepage for return visitors with saved analyses

### Day 14-30: Optional Enhancements

- **Housing Decision Checklist PDF** — downloadable 1-page checklist: "Before You Buy: 7 Numbers to Check"
- **Follow-up email sequence** — if email capture gets traction: 3-email drip (Day 1: your score recap, Day 7: hidden costs reminder, Day 30: market update)
- **Newsletter concept** — monthly housing affordability digest: rate changes, market trends, calculator updates

Hold all retention enhancements until email capture has 30+ signups and baseline CTR data exists.

---

## 9. Donation Validation

### Current Setup

- **Buy Me a Coffee** — `buymeacoffee.com/finkit`
- Button placements: sidebar (compact link), footer (prominent amber pill)
- No paywall, no subscription, no membership

### Validation (Day 7-30)

- Track `donation-click` event volume
- If < 10 clicks in first 14 days: test footer placement (move above the fold?)
- If clicks but no donations: review Buy Me a Coffee page messaging
- Goal: 1-2 donations by day 30 (early stage, organic traffic still building)

---

## 10. 30-Day Review

### Metrics to Collect

| Category | Metric | Source |
|---|---|---|
| Traffic | Total pageviews, unique visitors | Plausible |
| SEO | Total impressions, clicks, avg CTR, avg position | GSC |
| Engagement | Tool completion rate, time on page | Plausible |
| Conversion | Email signups, donation clicks | Plausible |
| Technical | PageSpeed score, Core Web Vitals, uptime | Vercel + PageSpeed |

### Review Questions

1. **Wins:** What worked better than expected?
2. **Failures:** What got zero traction?
3. **Surprises:** Any unexpected user behavior?
4. **MVP pages:** Which of the 5 priority SEO pages performed best?
5. **Features:** Which tool got the most completions?
6. **Next:** What is the single highest-impact thing to build or fix in month 2?

### Decision Gates

- If organic traffic is > 500 visits/mo → continue SEO content strategy
- If tool completion rate is < 20% → UX audit on input forms
- If email signups are > 20 → build follow-up sequence
- If donations are $0 → test different placement or messaging
- If any page has < 10 impressions at day 30 → revisit keyword targeting

---

**END OF POST-LAUNCH PLAN**

This document should be reviewed and updated at the 30-day mark.
