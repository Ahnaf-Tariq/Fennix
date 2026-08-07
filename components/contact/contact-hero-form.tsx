"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Building2, Mail, User } from "lucide-react";
import { SectionTag } from "@/components/ui/section-tag";
import { cn } from "@/lib/utils";

export default function ContactHeroForm() {
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!fullName.trim() || !companyName.trim() || !workEmail.trim()) return;
    setIsSubmitted(true);
  }

  return (
    <section className="relative overflow-hidden bg-[#F8F9FA] pb-16 pt-28 sm:pb-20 sm:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 0%, rgba(42,122,232,0.14) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-10 px-4 lg:grid-cols-12 lg:gap-14 lg:px-6">
        <div className="flex flex-col justify-between gap-8 lg:col-span-5">
          <div>
            <SectionTag>30-day pilot</SectionTag>
            <h1 className="mb-4 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
              Get in <span className="text-primary-gradient">touch</span>
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-zinc-500 md:text-base">
              Request your pilot, book a call, or reach our team directly. We
              typically respond within 24 hours.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[#d7e6f5] bg-white p-5 shadow-[0_18px_50px_-34px_rgba(6,27,49,0.35)] sm:p-6">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-90"
              style={{ background: "var(--gradient-hero)" }}
            />
            <div className="relative z-10">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/70">
                Pilot request
              </p>
              <h2 className="mb-2 text-lg font-semibold tracking-tight text-zinc-900">
                Your Decision Intelligence Pilot
              </h2>
              <p className="text-sm leading-relaxed text-zinc-500">
                Our team will reach out to set up your 30-day pilot and show how
                better decisions drive real results.
              </p>
            </div>
          </div>
        </div>

        <div className="flex lg:col-span-7">
          <div className="relative w-full overflow-hidden rounded-3xl border border-[#d7e6f5] bg-white p-6 shadow-[0_24px_60px_-36px_rgba(6,27,49,0.4)] sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-primary/25 to-transparent"
            />

            {isSubmitted ? (
              <div className="flex min-h-80 flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Mail size={20} strokeWidth={2.2} />
                </div>
                <h3 className="mb-2 text-xl font-semibold tracking-tight text-zinc-900">
                  Request received
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-zinc-500">
                  Thanks, {fullName.split(" ")[0] || "there"}. Our team will
                  reach out shortly to set up your 30-day pilot.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-2.5 sm:space-y-4"
              >
                <Field
                  id="fullName"
                  label="Full Name"
                  icon={<User size={16} strokeWidth={2.2} />}
                  value={fullName}
                  onChange={setFullName}
                  placeholder="Jane Smith"
                  autoComplete="name"
                />
                <Field
                  id="companyName"
                  label="Company Name"
                  icon={<Building2 size={16} strokeWidth={2.2} />}
                  value={companyName}
                  onChange={setCompanyName}
                  placeholder="Acme Corp"
                  autoComplete="organization"
                />
                <Field
                  id="workEmail"
                  label="Work Email"
                  icon={<Mail size={16} strokeWidth={2.2} />}
                  value={workEmail}
                  onChange={setWorkEmail}
                  placeholder="jane@company.com"
                  type="email"
                  autoComplete="email"
                />

                <button
                  type="submit"
                  className="btn-primary btn-glass-shimmer rounded-[14px] group mt-1 inline-flex w-full items-center justify-center gap-2 py-3.5"
                >
                  Start Your 30-Day Pilot
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </button>

                <p className="text-center text-xs text-zinc-700">
                  No credit card required. We typically respond within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  icon,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  icon: ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1 block text-sm font-medium text-zinc-700">
        {label}
      </span>
      <span
        className={cn(
          "flex items-center gap-3 rounded-xl border border-[#d7e6f5] bg-[#f7faff] px-3.5 py-3 transition-all duration-300",
          "focus-within:border-primary/35 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(20,86,168,0.08)]",
        )}
      >
        <span className="text-primary/70">{icon}</span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
        />
      </span>
    </label>
  );
}
