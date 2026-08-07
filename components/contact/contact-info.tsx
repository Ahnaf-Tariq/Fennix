"use client"

import {
  ArrowUpRight,
  Headphones,
  Mail,
  MapPin,
  Phone,
  BriefcaseBusiness,
} from "lucide-react"
import { SectionTag } from "@/components/ui/section-tag"
import { cn } from "@/lib/utils"

const contactCards = [
  {
    title: "Address",
    body: "5900 Balcones Drive, Suite 100, Austin, TX 78731 United States",
    href: "https://maps.google.com/?q=5900+Balcones+Drive,+Suite+100,+Austin,+TX+78731",
    icon: MapPin,
    action: "View map",
  },
  {
    title: "Phone",
    body: "+1 512 234 4807",
    href: "tel:+15122344807",
    icon: Phone,
    action: "Call now",
  },
  {
    title: "General queries",
    body: "For partnerships, collaborations, or general questions:",
    detail: "info@fennix.ai",
    href: "mailto:info@fennix.ai",
    icon: Mail,
    action: "Email us",
  },
  {
    title: "Sales & demo requests",
    body: "Interested in seeing Fennix in action?",
    detail: "sales@fennix.ai",
    href: "mailto:sales@fennix.ai",
    icon: BriefcaseBusiness,
    action: "Talk to sales",
  },
  {
    title: "Support",
    body: "Need help or technical assistance?",
    detail: "support@fennix.ai",
    href: "mailto:support@fennix.ai",
    icon: Headphones,
    action: "Get support",
  },
]

export default function ContactInfo() {
  return (
    <section className="relative bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 max-w-2xl">
          <SectionTag>Contact information</SectionTag>
          <h2 className="mb-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
            Feel free to reach out.{" "}
            <span className="text-primary-gradient">We&apos;re here to help.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactCards.map((card, index) => {
            const Icon = card.icon
            const isWide = index < 2

            return (
              <a
                key={card.title}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  card.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-[#d7e6f5] bg-white p-5 shadow-[0_1px_0_rgba(20,86,168,0.04)] transition-all duration-500",
                  "hover:-translate-y-0.5 hover:border-transparent hover:shadow-[0_24px_48px_-20px_rgba(6,27,49,0.45)]",
                  isWide && "sm:col-span-1",
                  index === 0 && "lg:col-span-2",
                )}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 z-0 h-28 w-28 rounded-full opacity-0 transition-all duration-500 ease-out group-hover:-right-[35%] group-hover:-top-[35%] group-hover:h-[210%] group-hover:w-[210%] group-hover:opacity-100"
                  style={{ background: "var(--gradient-hero)" }}
                />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/15 bg-[linear-gradient(145deg,rgba(42,122,232,0.12)_0%,rgba(255,255,255,0.9)_55%,rgba(20,86,168,0.06)_100%)] text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-[#061b31]">
                    <Icon size={18} strokeWidth={2.2} />
                  </div>

                  <h3 className="mb-1.5 text-[15px] font-semibold tracking-tight text-zinc-900 transition-colors duration-500 group-hover:text-white">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-500 transition-colors duration-500 group-hover:text-white/70">
                    {card.body}
                  </p>
                  {card.detail && (
                    <p className="mt-2 text-sm font-semibold text-primary transition-colors duration-500 group-hover:text-white">
                      {card.detail}
                    </p>
                  )}

                  <div className="mt-auto flex items-center gap-1 pt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary opacity-80 transition-all duration-500 group-hover:translate-x-0.5 group-hover:text-[#93c5fd] group-hover:opacity-100">
                    {card.action}
                    <ArrowUpRight size={12} strokeWidth={2.4} />
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
