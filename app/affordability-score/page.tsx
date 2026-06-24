import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MortgageDecisionEngine from "@/components/MortgageDecisionEngine";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title: "Home Affordability Calculator — Free House Affordability Score",
  description:
    "Can you afford that house? Get your free affordability score in 60 seconds. See your stress level, monthly cost breakdown, and safe price range — all private, no accounts.",
  openGraph: {
    title: "Free Home Affordability Calculator — Get Your Score",
    description:
      "Before you make an offer, know your number. Get a personalized affordability score and see exactly where the danger zone starts.",
  },
};

export default function AffordabilityScorePage() {
  return (
    <>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-600 transition-colors ml-4 mt-6 sm:ml-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to FinKit
      </Link>
      <MortgageDecisionEngine />
      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"How is the home affordability score calculated?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"The score is based on your housing-to-income ratio, debt-to-income ratio, cashflow buffer, and current interest rate. Housing costs under 35% of take-home pay score well; over 50% triggers a high-risk warning. The math runs entirely in your browser \\u2014 no data is sent anywhere.\"}}, {\"@type\": \"Question\", \"name\": \"What is a good affordability score?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"A score under 25 (Safe) means your housing costs are well within healthy limits. 25\\u201345 (Cautious) is manageable but requires budget awareness. 45\\u201370 (Risky) means you are approaching house-poor territory. Over 70 (Avoid) means the math strongly suggests this home will create financial stress.\"}}, {\"@type\": \"Question\", \"name\": \"How much house can I afford?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"The calculator shows your safe price ceiling based on your take-home pay, debts, and current interest rates. A common rule of thumb: keep total housing costs under 35\\u201340% of your take-home pay. But every situation is different \\u2014 enter your real numbers to see your personal safe price.\"}}]}" }}
      />

      <RelatedArticles category="mortgage" />
      </div>
    </>
  );
}
