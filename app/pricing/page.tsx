import type { Metadata } from "next"
import FAQ from "@/components/faq"
import PricingCta from "@/components/pricing/pricing-cta"
import PricingPlans from "@/components/pricing/pricing-plans"

export const metadata: Metadata = {
  title: "Fennix Pricing - Decision Intelligence from $99/mo",
  description:
    "Simple pricing. No surprises. Start with a 30-day free pilot using your real data. Plans from $99/mo.",
}

const pricingFaqData = [
  {
    question: "Is the 30-day pilot really free?",
    answer:
      "Yes. No credit card. No commitment. We connect your systems, you ask questions for 30 days. If it doesn't deliver value, you walk away owing nothing.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes. Start with Starter and upgrade to Business when your team needs access, or talk to us about Custom for enterprise needs. Downgrade anytime where applicable.",
  },
  {
    question: "Do you offer annual pricing?",
    answer: "Not yet. Monthly only. No long-term contracts.",
  },
  {
    question: "Is there a free tier?",
    answer:
      "No permanent free tier. The 30-day pilot is free. After that, plans start at $99/month.",
  },
  {
    question: "What's included in 'localized pricing'?",
    answer:
      "For companies in Pakistan, UAE, and other emerging markets, we offer adjusted pricing. Contact Sales@fennix.ai for details.",
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA]">
      <PricingPlans />
      <PricingCta />
      <FAQ
        items={pricingFaqData}
        tag="Pricing FAQs"
        titleStart="Frequently asked"
        titleHighlight="questions"
        description="Clear answers on pilots, plan changes, billing, and localized pricing for emerging markets."
      />
    </main>
  )
}
