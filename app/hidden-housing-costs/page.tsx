import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import HiddenCostAnalyzer from "@/components/HiddenCostAnalyzer";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title: "Hidden Housing Costs — Your Mortgage Is Only Part of the Price",
  description:
    "Property tax, insurance, HOA, maintenance, utilities — see the true monthly cost of homeownership. Most buyers forget these. Don't be one of them.",
  openGraph: {
    title: "Hidden Housing Costs Calculator — True Monthly Cost of Owning a Home",
    description:
      "Your mortgage payment is only part of the total cost. See the hidden costs most buyers forget — free, private, 60 seconds.",
  },
};

export default function HiddenHousingCostsPage() {
  return (
    <>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-600 transition-colors ml-4 mt-6 sm:ml-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to FinKit
      </Link>
      <HiddenCostAnalyzer />
      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"What hidden costs come with buying a home?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"The five biggest hidden costs are property taxes, homeowners insurance, HOA dues, maintenance (budget 1% of the home value per year), and higher utilities. These can easily add $1,000+ per month beyond your mortgage payment.\"}}, {\"@type\": \"Question\", \"name\": \"How much should I budget for home maintenance?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"The 1% rule is the standard benchmark: budget 1% of your home's value per year for maintenance. On a $450,000 home, that is $375/month. Older homes and homes in harsh climates may need more.\"}}, {\"@type\": \"Question\", \"name\": \"Why is my mortgage payment only part of the real cost?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Your mortgage payment covers principal and interest. It does not include property taxes, insurance, HOA, maintenance, or utilities \\u2014 all of which you are responsible for as a homeowner. The Hidden Cost Analyzer shows you these costs broken down monthly and annually.\"}}]}" }}
      />

      <RelatedArticles category="mortgage" />
      </div>
    </>
  );
}
