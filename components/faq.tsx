"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, MessageCircleQuestion, ArrowUpRight } from "lucide-react"
import { SectionTag } from "@/components/ui/section-tag"

export interface FaqItem {
  question: string
  answer: string
}

const defaultFaqData: FaqItem[] = [
  {
    question: "What is Fennix, and how is it different from BI Dashboard?",
    answer:
      "Fennix is an AI-powered Decision Intelligence Platform. While traditional BI tools show you what happened, Fennix explains why it happened, what it will cost your business, and what you should do next. It sits above your existing systems and connects every department into a single source of truth, turning data noise into clear, executive-ready decisions.",
  },
  {
    question: "Do I need to replace my existing software to use Fennix?",
    answer:
      "Not at all. Fennix is designed to integrate with your current tech stack ERP, CRM, accounting software, inventory systems, HR platforms, and more. It doesn't replace your tools; it removes the friction between them so your data finally speaks as one unified voice.",
  },
  {
    question: "Who is Fennix built for?",
    answer:
      "Fennix is designed for business leaders who make high-stakes decisions, CEOs, COOs, CFOs, Heads of Operations, and VPs. It's not just an analyst tool; it's built for executives who need clarity, not complexity, and who can't afford to act on stale or fragmented data.",
  },
  {
    question: "Can I ask Fennix questions in plain English?",
    answer: `Yes. Fennix supports natural language querying, so leaders can ask questions like "Why is cash flow tightening despite higher sales?" or "Which SKUs are at risk of stockouts in the next 14 days?" and receive structured, quantified answers with no data team required`,
  },
  {
    question: "Is my data secure?",
    answer:
      "Data security is foundational to how Fennix is built. With ISO 27001, Your data is encrypted in transit and at rest. Access controls are role-based, and your data is never shared across accounts. Fennix is designed to query your data in place where possible, minimizing data movement and reducing exposure.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most teams go from connecting their first data source to receiving their first insight within 48 hours. There is no data migration project, no warehouse setup, and no engineering team required. You connect your existing tools and start asking questions.",
  },
]

interface FAQProps {
  items?: FaqItem[]
  tag?: string
  titleStart?: string
  titleHighlight?: string
  description?: string
}

const FAQ = ({
  items = defaultFaqData,
  tag = "Common Questions",
  titleStart = "Frequently asked",
  titleHighlight = "questions",
  description = "Clear answers on how Fennix works, who it's for, and how quickly your team can go from connect to insight.",
}: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isFaqOpen = openIndex !== null

  const layoutTransition = {
    layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }

  return (
    <section id="who-its-for" className="w-full scroll-mt-28 bg-white py-24">
      <div
        className={[
          "mx-auto flex max-w-7xl flex-col gap-10 px-4 md:flex-row md:justify-between md:gap-12 md:px-6",
          isFaqOpen ? "md:items-stretch" : "md:items-start",
        ].join(" ")}
      >
        <motion.div
          layout
          transition={layoutTransition}
          className={[
            "flex w-full max-w-md shrink-0 flex-col md:w-[38%]",
            isFaqOpen ? "justify-between gap-8" : "gap-6",
          ].join(" ")}
        >
          <motion.div layout="position" transition={layoutTransition}>
            <SectionTag className="mb-4">{tag}</SectionTag>
            <h2 className="mb-3 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
              {titleStart}{" "}
              <span className="text-primary-gradient">{titleHighlight}</span>
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-zinc-500 md:text-base">
              {description}
            </p>
          </motion.div>

          <motion.div
            layout
            transition={layoutTransition}
            className="relative mt-auto overflow-hidden rounded-2xl border border-[#d7e6f5] bg-white p-4 shadow-[0_1px_0_rgba(20,86,168,0.04)] sm:p-5"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-90"
              style={{ background: "var(--gradient-hero)" }}
            />
            <div className="relative z-10 flex flex-col items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white text-primary shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                <MessageCircleQuestion size={18} strokeWidth={2.1} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold tracking-tight text-zinc-900">
                  Can&apos;t find your answer?
                </h3>
                <p className="mb-2 mt-1 text-xs leading-snug text-zinc-500">
                  We&apos;ll walk you through Fennix for your use case.
                </p>
                <a
                  href="mailto:info@fennix.ai"
                  className="btn-primary btn-glass-shimmer inline-flex shrink-0 items-center gap-1.5 px-3.5 py-2 text-xs"
                >
                  Contact
                  <ArrowUpRight size={14} strokeWidth={2.25} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="min-w-0 flex-1 space-y-2">
          {items.map((item, index) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${
        isOpen ? "border-primary/20 bg-blue-50/30" : "border-zinc-100 bg-white"
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        className="flex w-full cursor-pointer items-center justify-between p-2 text-left md:p-4"
      >
        <span className="pr-8 text-lg font-semibold leading-snug text-zinc-900">
          {question}
        </span>
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
            isOpen
              ? "bg-primary-gradient text-white"
              : "bg-zinc-100 text-zinc-500"
          }`}
        >
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-2 pb-4 md:px-4">
              <div className="mb-6 h-px w-full bg-zinc-100" />
              <p className="leading-relaxed text-zinc-600">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FAQ
