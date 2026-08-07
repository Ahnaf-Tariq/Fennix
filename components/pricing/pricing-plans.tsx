"use client"

import { ArrowRight, Check, Sparkles, X } from "lucide-react"
import { SectionTag } from "@/components/ui/section-tag"
import { cn } from "@/lib/utils"

interface PlanFeature {
  label: string
  included: boolean
}

interface PricingPlan {
  name: string
  description: string
  price: string
  priceSuffix: string
  billingNote: string
  cta: string
  featured?: boolean
  features: PlanFeature[]
}

const plans: PricingPlan[] = [
  {
    name: "Starter",
    description: "For small operators and independent CFOs.",
    price: "$99",
    priceSuffix: "/mo",
    billingNote: "Billed monthly in USD",
    cta: "Get Started",
    features: [
      { label: "1 seat", included: true },
      { label: "NLQ on 1 data source (ERP OR CRM)", included: true },
      { label: "Social sentiment on your brand", included: true },
      { label: "What / Why / So What / Now What answers", included: true },
      { label: "Self-serve setup", included: true },
      { label: "Email support, 24-hour SLA", included: true },
      { label: "30-day free Pilot", included: true },
      { label: "White-glove data connection", included: false },
      { label: "Founder working session", included: false },
      { label: "Competitor intelligence report", included: false },
    ],
  },
  {
    name: "Business",
    description: "For mid-market CFOs who can't afford blind spots.",
    price: "$499",
    priceSuffix: "/mo",
    billingNote: "Billed monthly in USD",
    cta: "Get Started",
    featured: true,
    features: [
      { label: "3 seats · Grand Slam Pilot included", included: true },
      { label: "NLQ on 3 data sources (ERP + CRM + Finance)", included: true },
      { label: "Social sentiment on brand + 5 competitors", included: true },
      { label: "Full SEO competitor intelligence", included: true },
      { label: "Industry benchmarks + macroeconomic signals", included: true },
      { label: "24-hour white-glove data connection", included: true },
      { label: "Custom Competitor Intelligence Dossier", included: true },
      { label: "90-day founder Slack/WhatsApp access", included: true },
      { label: "Founding Circle status (first 50 customers)", included: true },
      { label: "30-day free Pilot", included: true },
    ],
  },
  {
    name: "Custom",
    description: "For groups, conglomerates, and regional champions.",
    price: "Custom",
    priceSuffix: "/mo",
    billingNote: "Contact us for pricing",
    cta: "Contact Sales",
    features: [
      { label: "Unlimited seats · On-site support", included: true },
      { label: "Everything in Business", included: true },
      { label: "Custom integrations (proprietary systems)", included: true },
      { label: "Multi-entity consolidation", included: true },
      { label: "Named Customer Success Manager", included: true },
      { label: "99.5% uptime SLA, 1-hour support", included: true },
      { label: "Custom industry model training", included: true },
      { label: "Dedicated private Slack channel", included: true },
    ],
  },
]

const includedAcrossPlans = [
  "30-day free pilot with your real data",
  "No credit card required to start",
  "No annual commitment — cancel anytime",
  "Banking-grade encryption (in transit and at rest)",
  "Localized pricing available for emerging markets",
]

export default function PricingPlans() {
  return (
    <section className="relative overflow-hidden bg-[#F8F9FA] pb-20 pt-28 sm:pb-24 sm:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 0%, rgba(42,122,232,0.14) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <SectionTag>Pricing plans</SectionTag>
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
            Simple pricing.{" "}
            <span className="text-primary-gradient">No surprises.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base">
            Start with a 30-day free pilot using your real data. No credit card
            required. If Fennix doesn&apos;t surface an insight your current
            tools missed, walk away.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3 lg:gap-6 lg:pt-4">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-4xl rounded-2xl border border-[#d7e6f5] bg-white p-6 shadow-[0_1px_0_rgba(20,86,168,0.04)] sm:p-8">
          <h2 className="mb-5 text-center text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
            Every plan includes
          </h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {includedAcrossPlans.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-zinc-600"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check size={12} strokeWidth={2.75} />
                </span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-sm text-zinc-500">
            Questions about Custom or enterprise rollout? Contact{" "}
            <a
              href="mailto:info@fennix.ai"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              info@fennix.ai
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div
      className={cn(
        "relative h-full",
        plan.featured && "z-10 lg:-translate-y-2",
      )}
    >
      {plan.featured && (
        <div className="absolute -top-3.5 left-1/2 z-30 -translate-x-1/2">
          <div
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#061b31] shadow-[0_8px_22px_-6px_rgba(212,160,32,0.75),0_0_0_1px_rgba(255,255,255,0.35)_inset]"
            style={{
              background:
                "linear-gradient(135deg, #f6e27a 0%, #e8c547 45%, #d4a020 100%)",
            }}
          >
            <Sparkles size={12} strokeWidth={2.4} className="text-[#061b31]" />
            Recommended
          </div>
        </div>
      )}

      <article
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border p-6 transition-all duration-500 sm:p-7",
          plan.featured
            ? "border-white/10 shadow-[0_32px_70px_-28px_rgba(6,27,49,0.65)] ring-1 ring-primary/20"
            : "border-[#d7e6f5] bg-white shadow-[0_12px_40px_-28px_rgba(6,27,49,0.28)] hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_28px_55px_-26px_rgba(6,27,49,0.38)]",
        )}
      >
        {plan.featured ? (
          <>
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(165deg, #0d2f54 0%, #0a2745 48%, #061b31 100%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                maskImage:
                  "radial-gradient(ellipse 85% 65% at 50% 0%, black 15%, transparent 72%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40"
              style={{
                background:
                  "radial-gradient(circle, rgba(42,122,232,0.55) 0%, transparent 70%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-12 h-44 w-44 rounded-full opacity-30"
              style={{
                background:
                  "radial-gradient(circle, rgba(143,184,245,0.4) 0%, transparent 70%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-white/35 to-transparent"
            />
          </>
        ) : (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(42,122,232,0.05) 100%)",
              }}
            />
          </>
        )}

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-5">
            <p
              className={cn(
                "mb-2 text-[10px] font-semibold uppercase tracking-[0.18em]",
                plan.featured ? "text-white/45" : "text-primary/70",
              )}
            >
              {plan.featured ? "Most popular" : "Plan"}
            </p>
            <h3
              className={cn(
                "text-xl font-semibold tracking-tight sm:text-[1.35rem]",
                plan.featured ? "text-white" : "text-zinc-900",
              )}
            >
              {plan.name}
            </h3>
            <p
              className={cn(
                "mt-1.5 text-sm leading-relaxed",
                plan.featured ? "text-white/65" : "text-zinc-500",
              )}
            >
              {plan.description}
            </p>
          </div>

          <div
            className={cn(
              "mb-6 rounded-2xl border px-4 py-3.5",
              plan.featured
                ? "border-white/10 bg-white/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm"
                : "border-[#e6eef8] bg-[#f7faff] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]",
            )}
          >
            <div className="flex items-end gap-1">
              <span
                className={cn(
                  "text-4xl font-semibold tracking-tight sm:text-5xl",
                  plan.featured ? "text-white" : "text-zinc-900",
                )}
              >
                {plan.price}
              </span>
              <span
                className={cn(
                  "mb-1.5 text-sm font-medium",
                  plan.featured ? "text-white/55" : "text-zinc-400",
                )}
              >
                {plan.priceSuffix}
              </span>
            </div>
            <p
              className={cn(
                "mt-1 text-xs",
                plan.featured ? "text-white/45" : "text-zinc-400",
              )}
            >
              {plan.billingNote}
            </p>
          </div>

          <div
            className={cn(
              "mb-4 h-px w-full",
              plan.featured
                ? "bg-linear-to-r from-transparent via-white/15 to-transparent"
                : "bg-linear-to-r from-transparent via-zinc-200 to-transparent",
            )}
          />

          <ul className="mb-8 flex flex-1 flex-col gap-2.5">
            {plan.features.map((feature) => (
              <li key={feature.label} className="flex items-start gap-2.5">
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                    feature.included
                      ? plan.featured
                        ? "bg-white/15 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                        : "bg-primary/10 text-primary shadow-[0_0_0_1px_rgba(20,86,168,0.06)]"
                      : plan.featured
                        ? "bg-white/8 text-white/30"
                        : "bg-zinc-100 text-zinc-300",
                  )}
                >
                  {feature.included ? (
                    <Check size={12} strokeWidth={2.75} />
                  ) : (
                    <X size={11} strokeWidth={2.5} />
                  )}
                </span>
                <span
                  className={cn(
                    "text-sm leading-snug",
                    feature.included
                      ? plan.featured
                        ? "text-white/88"
                        : "text-zinc-600"
                      : plan.featured
                        ? "text-white/35 line-through"
                        : "text-zinc-400 line-through",
                  )}
                >
                  {feature.label}
                </span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={cn(
              "group/btn mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold transition-all duration-300",
              plan.featured
                ? "bg-white text-[#061b31] shadow-[0_14px_30px_-12px_rgba(0,0,0,0.5)] hover:bg-[#e8f2ff] hover:shadow-[0_18px_34px_-12px_rgba(0,0,0,0.55)]"
                : "btn-primary btn-glass-shimmer",
            )}
          >
            {plan.cta}
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
            />
          </button>
        </div>
      </article>
    </div>
  )
}
