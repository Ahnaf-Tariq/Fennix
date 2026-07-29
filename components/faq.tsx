"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqData = [
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
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between gap-10">
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary-gradient">
                Common Questions
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-900 mb-4 tracking-tight">
              Frequently asked <span className="text-primary-gradient">questions</span>
            </h2>
          </div>
          <div className="w-80 rounded-3xl bg-gray-50 p-4 sm:p-6 border border-gray-100 shadow-xl shadow-black/5 font-sans flex flex-col items-start gap-6">
            <div className="h-10 w-10 rounded-full bg-[#FF4500] shadow-lg shadow-orange-500/40"></div>
            <div className="space-y-2.5">
              <h2 className="text-xl font-bold tracking-tight text-gray-900">
                Can't find your answer?
              </h2>

              <button className="cursor-pointer w-full rounded-full bg-[#000000] py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 shadow-lg shadow-black/20">
                Contact us
              </button>
            </div>{" "}
          </div>
        </div>

        <div className="space-y-2 flex-1">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer, isOpen, onClick }: any) => {
  return (
    <div
      className={`border rounded-2xl transition-all duration-300 ${
        isOpen ? "border-primary/20 bg-blue-50/30" : "border-zinc-100 bg-white"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-2 md:p-4 text-left"
      >
        <span className="text-lg font-semibold text-zinc-900 pr-8 leading-snug">
          {question}
        </span>
        <div
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isOpen ? "bg-primary-gradient text-white" : "bg-zinc-100 text-zinc-500"
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-2 md:px-4 pb-4">
              <div className="h-px w-full bg-zinc-100 mb-6" />
              <p className="text-zinc-600 leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQ;
