import { cn } from "@/lib/utils";

interface SectionTagProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionTag({ children, className }: SectionTagProps) {
  return (
    <span
      className={cn(
        "mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-[linear-gradient(135deg,rgba(42,122,232,0.12)_0%,rgba(20,86,168,0.06)_45%,rgba(255,255,255,0.4)_100%)] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_1px_2px_rgba(20,86,168,0.06)] backdrop-blur-sm sm:mb-4 sm:gap-2.5 sm:px-4 sm:py-1.5 sm:text-[11px] sm:tracking-[0.2em]",
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden>
        <span className="absolute inset-0 animate-ping rounded-full bg-primary-light/55" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-primary-light shadow-[0_0_10px_rgba(42,122,232,0.7)]" />
      </span>
      {children}
    </span>
  );
}
