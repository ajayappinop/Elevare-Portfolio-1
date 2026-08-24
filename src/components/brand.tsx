import { Link } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

/* Layout */
export const pageShellClass =
  "bg-[var(--navy)] text-[var(--cream)] min-h-dvh min-w-0 overflow-x-clip pt-24 selection:bg-[var(--gold)]/30 selection:text-[var(--cream)]";

export const sectionClass = "py-16 sm:py-24 md:py-32";

export const containerClass =
  "mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-6";

export const narrowContainerClass =
  "mx-auto w-full min-w-0 max-w-4xl px-4 sm:px-6";

/* Typography */
export const eyebrowClass =
  "text-[11px] font-sans font-bold uppercase tracking-[0.14em] sm:tracking-[0.2em] text-[var(--gold)]";

export const h1Class =
  "font-serif text-[clamp(2rem,7vw,4rem)] font-light leading-[1.05] tracking-tight text-[var(--cream)] text-balance";

export const h2Class =
  "font-serif text-[clamp(1.75rem,5vw,2.5rem)] font-light leading-[1.1] text-[var(--cream)] text-balance";

export const h2CreamClass =
  "font-serif text-[clamp(1.75rem,5vw,2.5rem)] font-light leading-[1.1] text-[var(--cream-section-foreground)] text-balance";

export const leadClass = "text-xl font-light text-[var(--cream)]/60";

export const bodyClass =
  "text-[14px] md:text-[15px] font-light leading-relaxed text-[var(--cream)]/75";

export const bodyMutedClass =
  "text-[14px] md:text-[15px] font-light leading-relaxed text-[var(--cream)]/70";

export const creamSectionClass =
  "bg-[var(--cream-section)] text-[var(--cream-section-foreground)]";

export const creamBodyClass =
  "text-[14px] md:text-[15px] font-light leading-relaxed text-[var(--cream-section-muted)]";

/* Motion */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn(eyebrowClass, className)}>{children}</p>;
}

export function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div className={cn(containerClass, className)}>
      <div className="gold-rule" />
    </div>
  );
}

export function SectionContainer({
  children,
  className = "",
  narrow = false,
}: {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div className={cn(narrow ? narrowContainerClass : containerClass, className)}>
      {children}
    </div>
  );
}

export function PrimaryCTA({
  href,
  children = "Book a Qualifying Call",
  className = "",
}: {
  href: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex w-full max-w-full items-center justify-center gap-3 bg-[var(--gold)] px-5 py-4 text-center text-xs font-mono font-bold uppercase tracking-[0.08em] text-[var(--navy-deep)] transition-all duration-300 hover:bg-[var(--gold-soft)] sm:w-auto sm:px-8 sm:tracking-[0.18em]",
        className,
      )}
      referrerPolicy="no-referrer"
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

export function SecondaryCTA({
  to,
  children,
  className = "",
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex w-full max-w-full items-center justify-center gap-2 border border-[var(--cream)]/15 bg-[var(--navy)]/40 px-5 py-4 text-center text-xs font-mono uppercase tracking-[0.08em] text-[var(--cream)] backdrop-blur-sm transition-colors hover:border-[var(--gold)]/40 hover:text-[var(--gold)] sm:w-auto sm:px-8 sm:tracking-[0.18em]",
        className,
      )}
    >
      {children}
    </Link>
  );
}
