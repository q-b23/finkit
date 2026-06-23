import { Metadata } from "next";
import Link from "next/link";
import FIRECalculator from "@/components/FIRECalculator";

const BASE_URL = process.env.FINKIT_BASE_URL ?? "https://getfinkit.com";

export const metadata: Metadata = {
  title: "Free FIRE Calculator — Financial Independence, Retire Early",
  description:
    "Calculate your FIRE number, project compound growth, and discover your Coast FIRE age. Free, private, and open source — every calculation runs locally in your browser.",
  keywords: [
    "free FIRE calculator",
    "financial independence retire early calculator",
    "FIRE number calculator",
    "Coast FIRE calculator",
    "compound interest retirement calculator",
    "early retirement calculator",
  ],
  openGraph: {
    title: "Free FIRE Calculator — Financial Independence, Retire Early",
    description:
      "Project compound growth, find your FIRE number, and discover your Coast FIRE age. Free, private, open source.",
    url: `${BASE_URL}/dashboard/fire`,
  },
};

export default function FireCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"What is a FIRE number?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Your FIRE number is the total amount you need invested to retire early. It is calculated using the 4% rule: multiply your annual expenses by 25. If you spend $48,000/year, your FIRE number is $1.2 million.\"}}, {\"@type\": \"Question\", \"name\": \"What is Coast FIRE?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Coast FIRE is the point where your existing investments will grow to your FIRE number by your target retirement age, without any additional contributions. The calculator finds this milestone.\"}}, {\"@type\": \"Question\", \"name\": \"Why does the FIRE calculator use 7% return?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"The 7% figure represents the historical real return of the US stock market (S&P 500 ~10% nominal minus ~3% inflation). It is a conservative, inflation-adjusted estimate used by most FIRE calculations.\"}}]}" }}
      />

      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Free FIRE Calculator — Plan Your Path to Financial Independence
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-500">
          Adjust your monthly savings, current age, and target retirement age below. The calculator projects your nest egg using compound interest (7% annual return) and shows your Coast FIRE age — the point where you can stop contributing and let your investments grow to your target on their own.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/how-long-to-retire" className="text-sm text-amber-600 hover:text-amber-700 underline underline-offset-2">
            How long to retire →
          </Link>
          <Link href="/fire-at-40" className="text-sm text-amber-600 hover:text-amber-700 underline underline-offset-2">
            FIRE at 40: real numbers →
          </Link>
          <Link href="/coast-fire-guide" className="text-sm text-amber-600 hover:text-amber-700 underline underline-offset-2">
            Coast FIRE guide →
          </Link>
        </div>
      </section>

      <FIRECalculator />

      <section className="mt-16 border-t border-zinc-100 pt-12">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              What is a FIRE number?
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              Your FIRE number is the total amount you need invested to retire early. It is calculated using the 4% rule: multiply your annual expenses by 25. If you spend $48,000/year, your FIRE number is $1.2 million. This calculator projects how your monthly savings grow toward that target.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              What is Coast FIRE?
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              Coast FIRE is the point where your existing investments will grow to your FIRE number by your target retirement age, without any additional contributions. The calculator finds this milestone so you know exactly when you can stop saving and let compound interest do the rest.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              Why does the calculator use 7% return?
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              The 7% figure represents the historical real return of the US stock market (S&P 500 ~10% nominal minus ~3% inflation). It is a conservative, inflation-adjusted estimate used by most FIRE calculations. Your actual results will vary based on market conditions.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              How accurate is this FIRE calculator?
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              The math is exact — it uses the standard compound interest formula. Accuracy depends on your inputs. Use realistic numbers: your actual monthly savings, a conservative return rate, and your true expenses. The calculator gives you a projection, not a guarantee.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              Is my financial data safe?
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              Yes. Every calculation runs locally in your browser. Your numbers — income, savings, age — never leave your device. No accounts, no servers, no tracking. Open your browser's Network tab and you will see zero data sent out.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
