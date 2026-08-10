import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { SectionTag } from "@/components/ui/section-tag";
import type { LegalDocument } from "@/lib/legal-content";

interface LegalDocumentPageProps {
  document: LegalDocument;
  tag: string;
}

function LegalBulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-sm leading-relaxed text-zinc-600 md:text-[15px]"
        >
          <span
            aria-hidden
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2a7ae8]"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function LegalParagraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <>
      {paragraphs.map((paragraph) => (
        <p
          key={paragraph}
          className="text-sm leading-relaxed text-zinc-600 md:text-[15px] md:leading-7"
        >
          {paragraph}
        </p>
      ))}
    </>
  );
}

export function LegalDocumentPage({ document, tag }: LegalDocumentPageProps) {
  return (
    <main className="min-h-screen bg-[#F8F9FA]">
      <section className="relative overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-96 opacity-80"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 0%, rgba(42,122,232,0.14) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <SectionTag>{tag}</SectionTag>
            <h1 className="mb-4 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
              {document.title}
            </h1>
            <div className="inline-flex items-center gap-2 rounded-3xl border border-[#d7e6f5] bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-500 shadow-sm">
              <CalendarDays size={14} className="text-[#2a7ae8]" />
              Last updated: {document.lastUpdated}
            </div>
          </div>

          <article className="overflow-hidden rounded-[1.75rem] border border-[#d7e6f5] bg-white shadow-[0_24px_60px_-40px_rgba(6,27,49,0.35)]">
            <div className="border-b border-[#e8f0f8] bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-6 py-5 sm:px-10 sm:py-6">
              <p className="text-sm leading-relaxed text-zinc-500 md:text-[15px]">
                This document outlines how Fennix operates, protects your data,
                and defines the terms of using our decision intelligence
                platform.
              </p>
            </div>

            <div className="divide-y divide-[#eef4fa] px-6 py-2 sm:px-10 sm:py-4">
              {document.sections.map((section) => (
                <section key={section.title} className="py-7 sm:py-8">
                  <h2 className="mb-4 text-lg font-semibold tracking-tight text-[#061b31] sm:text-xl">
                    {section.title}
                  </h2>

                  <div className="space-y-3">
                    {section.paragraphs ? (
                      <LegalParagraphs paragraphs={section.paragraphs} />
                    ) : null}
                    {section.bullets ? (
                      <LegalBulletList items={section.bullets} />
                    ) : null}
                    {section.closingParagraphs ? (
                      <LegalParagraphs paragraphs={section.closingParagraphs} />
                    ) : null}
                  </div>

                  {section.subsections?.map((subsection) => (
                    <div key={subsection.title} className="mt-6">
                      <h3 className="mb-3 text-base font-semibold text-primary-mid sm:text-[17px]">
                        {subsection.title}
                      </h3>
                      <div className="space-y-3">
                        {subsection.paragraphs ? (
                          <LegalParagraphs paragraphs={subsection.paragraphs} />
                        ) : null}
                        {subsection.bullets ? (
                          <LegalBulletList items={subsection.bullets} />
                        ) : null}
                        {subsection.closingParagraphs ? (
                          <LegalParagraphs
                            paragraphs={subsection.closingParagraphs}
                          />
                        ) : null}
                      </div>
                    </div>
                  ))}
                </section>
              ))}
            </div>

            {document.contactEmail ? (
              <div className="border-t border-[#e8f0f8] bg-[#f8fbff] px-6 py-6 sm:px-10 sm:py-7">
                <p className="text-sm text-zinc-500">
                  Questions about this document?{" "}
                  <a
                    href={`mailto:${document.contactEmail}`}
                    className="font-semibold text-[#1456A8] transition-colors hover:text-[#2a7ae8]"
                  >
                    {document.contactEmail}
                  </a>
                </p>
              </div>
            ) : null}
          </article>
        </div>
      </section>
    </main>
  );
}
