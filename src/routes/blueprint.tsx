import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { FileText, ArrowRight, Sparkles, CheckCircle2, DollarSign, RefreshCw, BarChart, Target } from "lucide-react";

export const Route = createFileRoute("/blueprint")({
  head: () => ({
    meta: [
      { title: "The Elevare Portfolio Blueprint — Strategy-First Acquisition" },
      {
        name: "description",
        content: "Discover The Blueprint: A documented strategy for every acquisition, not just a property report. The operating document of your portfolio.",
      },
    ],
  }),
  component: BlueprintPage,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function Reveal({
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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] font-medium">
      {children}
    </p>
  );
}

function SectionDivider() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="gold-rule" />
    </div>
  );
}



function BlueprintPage() {
  const blueprintSections = [
    { title: "Investor Profile & Goals", desc: "Your capacity, timeline, risk tolerance, and lifestyle constraints." },
    { title: "Borrowing Capacity & Finance Path", desc: "Structured with Mortgage Only across your full scaling arc." },
    { title: "Portfolio Thesis", desc: "Geographic strategy, asset-type mix, and hold period logic." },
    { title: "Suburb Shortlist", desc: "HTAG-backed: RCS scores, demand-depth, BBT signals." },
    { title: "Stage Plan", desc: "Your acquisition sequencing across the next 3–10 years." },
    { title: "Risk Assessment", desc: "Hazard, market cycle, concentration, and finance risk." },
    { title: "Acquisition Brief", desc: "For Acquisition 1: price, areas, must-haves and walk-aways." },
    { title: "Action Plan", desc: "Your 90-day execution map." },
  ];

  return (
    <main className="bg-[var(--navy)] text-[var(--cream)] min-h-screen pt-24 selection:bg-[var(--gold)]/30 selection:text-white">
      <Navbar />

      {/* SECTION 1 - HEADER */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20 bg-[var(--navy-deep)]">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
          <Reveal>
            <Eyebrow>THE FOUNDATION OF EVERY ENGAGEMENT</Eyebrow>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="font-serif text-[48px] sm:text-[64px] leading-[1.05] tracking-tight">
              The Elevare Portfolio <br />
              <span className="italic text-[var(--gold)]">Blueprint.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="text-xl text-[var(--cream)]/60 font-light mt-4">
              A documented strategy for every acquisition.
            </p>
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      {/* SECTION 2 - WHAT IT IS */}
      <section className="py-24 md:py-32 bg-[var(--navy)]">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <h2 className="font-serif text-[32px] md:text-[40px] text-[var(--gold)] font-light leading-snug">
              Not a property report. <span className="italic">A portfolio plan.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-[15px] md:text-[16px] text-[var(--cream)]/75 leading-relaxed font-light">
              The Elevare Portfolio Blueprint is the documented strategy that directs every property you buy through us. It is not a market report, not a suburb suggestion, not a PDF you read once and shelve. It is your portfolio's operating document — used to brief every acquisition, revised before every new purchase, and updated as your capacity and market conditions evolve.
            </p>
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      {/* SECTION 3 - WHAT'S INSIDE */}
      <section className="py-24 md:py-36 bg-[var(--navy-deep)]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-[36px] text-[var(--cream)]">Eight sections. <span className="italic text-[var(--gold)]">Every Blueprint.</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blueprintSections.map((section, idx) => (
              <Reveal key={idx} delay={idx * 0.05} className="bg-[var(--navy)]/50 border border-[var(--gold)]/10 p-6 rounded">
                <div className="text-[var(--gold)] font-mono text-sm mb-4">0{idx + 1}</div>
                <h4 className="font-serif text-base mb-3">{section.title}</h4>
                <p className="text-[13px] text-[var(--cream)]/60 font-light leading-relaxed">{section.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* SECTION 4 - INVESTMENT */}
      <section className="py-24 md:py-36 bg-[var(--navy)]">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-serif text-[32px] md:text-[40px] text-[var(--cream)] font-light text-center mb-16">
             Investment — <span className="italic text-[var(--gold)]">Flat-fee, transparent.</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-[var(--gold)]/20 p-8 rounded bg-[var(--navy-deep)]/50 backdrop-blur-sm transition-all duration-300 hover:border-[var(--gold)] hover:-translate-y-1">
               <DollarSign className="w-8 h-8 text-[var(--gold)] mb-6" />
               <h4 className="text-[var(--gold)] uppercase font-mono tracking-widest text-xs mb-2">Engage</h4>
               <p className="text-xl font-serif text-[var(--cream)] mb-2">$3,000</p>
               <p className="text-[13px] text-[var(--cream)]/60 font-light">Retainer to engage. Paid upfront on signing.</p>
            </div>
            
            <div className="border border-[var(--gold)]/20 p-8 rounded bg-[var(--navy-deep)]/50 backdrop-blur-sm transition-all duration-300 hover:border-[var(--gold)] hover:-translate-y-1">
               <Target className="w-8 h-8 text-[var(--gold)] mb-6" />
               <h4 className="text-[var(--gold)] uppercase font-mono tracking-widest text-xs mb-2">Acquire</h4>
               <p className="text-xl font-serif text-[var(--cream)] mb-2">2% / $15k min</p>
               <p className="text-[13px] text-[var(--cream)]/60 font-light">Greater of 2% purchase price or $15k. Retainer credited.</p>
            </div>
            
            <div className="border border-[var(--gold)]/20 p-8 rounded bg-[var(--navy-deep)]/50 backdrop-blur-sm transition-all duration-300 hover:border-[var(--gold)] hover:-translate-y-1">
               <RefreshCw className="w-8 h-8 text-[var(--gold)] mb-6" />
               <h4 className="text-[var(--gold)] uppercase font-mono tracking-widest text-xs mb-2">Revise</h4>
               <p className="text-xl font-serif text-[var(--cream)] mb-2">Included</p>
               <p className="text-[13px] text-[var(--cream)]/60 font-light">Bundled into acquisition fees — no separate charge.</p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* SECTION 5 - WHY IT WORKS */}
      <section className="py-24 md:py-36 bg-[var(--navy-deep)]">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-serif text-[32px] md:text-[38px] leading-tight text-[var(--cream)] mb-12">
            Why a documented strategy outperforms a <br /> property-by-property approach.
          </h2>
          <ul className="space-y-6">
            {[
              "Accountability — when strategy and acquisition sit with one team, there's no hand-off and no hiding.",
              "Intentionality — every property is bought to a brief, not a feeling.",
              "Continuity — the Blueprint compounds across acquisitions instead of restarting.",
              "Finance alignment — equity strategy is part of the plan, not an afterthought."
            ].map((point, i) => (
              <li key={i} className="flex gap-4 text-[15px] font-light text-[var(--cream)]/80">
                <CheckCircle2 className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>
      
      {/* SECTION 6 - CTA */}
      <section id="booking" className="py-24 text-center bg-[var(--navy)]">
        <div className="mx-auto max-w-lg px-6">
          <h2 className="font-serif text-[42px] leading-tight text-[var(--cream)] mb-8">
            Begin your <br /> Blueprint engagement.
          </h2>
          <a
            href="https://calendly.com/elevare"
            className="inline-flex items-center justify-center gap-3 bg-[var(--gold)] text-[var(--navy-deep)] px-8 py-4 text-sm tracking-[0.18em] uppercase font-medium hover:bg-[var(--gold-soft)] transition-colors"
            referrerPolicy="no-referrer"
          >
            Book a Qualifying Call
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="border-t border-[var(--gold)]/15 py-12 bg-[var(--navy-deep)]">
        <div className="mx-auto max-w-6xl px-6 text-center text-xs text-[var(--cream)]/40 font-mono tracking-wider">
          © {new Date().getFullYear()} Elevare Portfolio. Registered in Australia.
        </div>
      </footer>
    </main>
  );
}
