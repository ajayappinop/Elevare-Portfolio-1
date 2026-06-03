import { Navbar } from "@/components/Navbar";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Check,
  ArrowRight,
  FileText,
  Database,
  Shield,
  Flame,
  Target,
  Landmark,
  Scale,
  Cpu,
  ChevronRight,
  MessageSquareCode,
  Sparkles,
} from "lucide-react";

const founderImg = "/assets/founder-portrait.png";
const heroImg = "/assets/hero-architecture.png";
const blueprintImg = "/assets/blueprint-abstract.png";
const property1 = "/assets/property-1.png";
const property3 = "/assets/property-3.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Elevare Portfolio — Architects of Investor Portfolios" },
      {
        name: "description",
        content:
          "Discover why Elevare exists, Tarun Sanghi's background, and our strategy-first methodology.",
      },
      {
        property: "og:title",
        content: "About Elevare Portfolio — Architects of Investor Portfolios",
      },
      {
        property: "og:description",
        content: "Strategy-led acquisition. Built for portfolio scale.",
      },
    ],
  }),
  component: AboutPage,
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


function AboutPage() {
  return (
    <main className="bg-[var(--navy)] text-[var(--cream)] min-h-screen pt-24 selection:bg-[var(--gold)]/30 selection:text-white">
      <Navbar />

      {/* SECTION 1 - HEADER */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[var(--navy-deep)]">
        {/* Subtle grid and blueprint draft accent */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-[var(--navy-deep)]" />
        </div>

        <div className="mx-auto max-w-6xl px-6 relative z-10 w-full">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            {/* Left aligned title text */}
            <div className="md:col-span-8 space-y-6">
              <Reveal>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-[1px] bg-[var(--gold)]" />
                  <Eyebrow>About Elevare</Eyebrow>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <h1 className="font-serif text-[42px] sm:text-[56px] lg:text-[68px] leading-[1.1] text-[var(--cream)] tracking-tight">
                  Built for investors with <br />
                  <span className="italic text-[var(--gold)]">portfolio ambition.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.35}>
                <p className="text-lg md:text-xl text-[var(--cream)]/60 font-light max-w-xl">
                  Why Elevare exists, and how we work to construct generational wealth through
                  strategy-led property acquisition.
                </p>
              </Reveal>
            </div>

            {/* Right aligned decorative architectural asset */}
            <div className="md:col-span-4 hidden md:flex justify-end relative">
              <Reveal delay={0.5} className="relative w-72 h-72">
                <div className="absolute inset-0 border border-[var(--gold)]/10 animate-[spin_60s_linear_infinite]" />
                <div className="absolute inset-4 border border-[var(--gold)]/20 animate-[spin_40s_linear_infinite_reverse]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/assets/logo.png"
                    alt="Elevare geometric shield logo"
                    className="w-16 h-28 object-contain opacity-35"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* SECTION 2 - THE PROBLEM */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-[var(--navy)]">
        <div className="mx-auto max-w-5xl px-6 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Pillar: Theme Bold Accent and Label */}
            <div className="md:col-span-4 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--gold)]/5 rounded-full border border-[var(--gold)]/10">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                <span className="text-[10px] tracking-widest font-mono text-[var(--gold)] uppercase font-semibold">
                  The Market Reality
                </span>
              </div>
              <h3 className="font-serif text-[28px] md:text-[34px] leading-tight text-[var(--cream)] italic">
                The Accumulation <br />
                Paradox.
              </h3>
            </div>

            {/* Right Narrative: Fully formatted core copy */}
            <div className="md:col-span-8 space-y-8">
              <Reveal>
                <h2 className="font-serif text-[32px] md:text-[40px] leading-[1.2] text-[var(--gold)] tracking-tight font-light">
                  Property investing without strategy isn't investing — it's accumulation.
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="space-y-6 text-[15px] md:text-[16px] text-[var(--cream)]/75 leading-relaxed font-light">
                  <p>
                    Most investors are sold a property, not a plan. A generic buyers agent presents
                    a property; a generic strategist hands over a PDF and disappears. Neither model
                    is built for the investor who wants to scale a portfolio to seven figures and
                    beyond.
                  </p>
                  <p className="border-l-2 border-[var(--gold)]/20 pl-6 text-base italic text-[var(--cream)]">
                    "Strategy without execution is theory. Execution without strategy is gambling.
                    Elevare exists to close the gap."
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* SECTION 3 - OUR METHODOLOGY */}
      <section className="py-24 md:py-36 relative bg-[var(--navy-deep)] overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[var(--navy-deep)] pointer-events-none" />
        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <Eyebrow>OUR METHODOLOGY</Eyebrow>
            <h2 className="font-serif text-[38px] md:text-[48px] leading-tight text-[var(--cream)]">
              Strategy first. <span className="italic text-[var(--gold)]">Then acquisition.</span>
            </h2>
            <div className="w-16 h-[1px] bg-[var(--gold)]/40 mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-stretch">
            {/* Step 1: Strategy / Portfolio Blueprint Block */}
            <Reveal delay={0.1} className="flex flex-col h-full">
              <div className="bg-[var(--navy)]/40 border border-[var(--gold)]/10 hover:border-[var(--gold)]/30 rounded-lg p-8 md:p-10 flex flex-col justify-between h-full transition-all duration-300 relative group">
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--gold)]/30" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--gold)]/30" />
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-widest text-[var(--gold)] uppercase bg-[var(--gold)]/5 px-3 py-1 rounded">
                      PHASE 01
                    </span>
                    <FileText className="w-5 h-5 text-[var(--gold)] opacity-70" />
                  </div>
                  <h3 className="font-serif text-2xl text-[var(--cream)]">
                    The Portfolio Blueprint
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-[var(--cream)]/75 leading-relaxed font-light">
                    Every Elevare engagement starts with a Portfolio Blueprint — a documented
                    strategy that defines what you're building, your borrowing capacity, your suburb
                    shortlist, your stage plan, your risk profile, and your 90-day action map. The
                    Blueprint isn't optional. It's the foundation of every property we buy together.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-[var(--gold)]/5 text-[11px] font-mono tracking-widest text-[var(--gold)]">
                  DOCUMENTED SYSTEM SPECIFICATION
                </div>
              </div>
            </Reveal>

            {/* Step 2: Execution & Acquisition Block */}
            <Reveal delay={0.25} className="flex flex-col h-full">
              <div className="bg-[var(--navy)]/40 border border-[var(--gold)]/10 hover:border-[var(--gold)]/30 rounded-lg p-8 md:p-10 flex flex-col justify-between h-full transition-all duration-300 relative group">
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--gold)]/30" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--gold)]/30" />
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-widest text-[var(--gold)] uppercase bg-[var(--gold)]/5 px-3 py-1 rounded">
                      PHASE 02
                    </span>
                    <Target className="w-5 h-5 text-[var(--gold)] opacity-70" />
                  </div>
                  <h3 className="font-serif text-2xl text-[var(--cream)]">Surgical Execution</h3>
                  <p className="text-[14px] md:text-[15px] text-[var(--cream)]/75 leading-relaxed font-light">
                    Once the Blueprint is built, we execute. The same team that wrote your strategy
                    runs the search, the due diligence, the negotiation, and the contract. Finance
                    is structured in parallel through Mortgage Only — our specialist investor
                    finance arm. Settlement is the start of the next plan revision, not the end of
                    the relationship.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-[var(--gold)]/5 text-[11px] font-mono tracking-widest text-[var(--gold)]">
                  REAL ACQUISITION & FUNDING PIPELINE
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* SECTION 4 - TARUN SANGHI (FOUNDER) */}
      <section className="py-24 md:py-36 relative overflow-hidden bg-[var(--navy)]">
        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Portrait Container in premium geometric frame */}
            <div className="md:col-span-5 flex justify-center md:sticky md:top-24">
              <Reveal className="relative w-full max-w-[380px] aspect-[4/5] p-3 border border-[var(--gold)]/20 shadow-xl bg-[var(--navy-deep)]">
                {/* Corner Accents */}
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t border-l border-[var(--gold)]" />
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t border-r border-[var(--gold)]" />
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b border-l border-[var(--gold)]" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b border-r border-[var(--gold)]" />

                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={founderImg}
                    alt="Tarun Sanghi, Founder of Elevare Portfolio"
                    className="w-full h-full object-cover grayscale brightness-[0.8] hover:grayscale-0 hover:brightness-100 transition-all duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)] via-transparent to-transparent opacity-80" />
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <p className="font-serif text-lg text-[var(--cream)] tracking-tight font-medium">
                    Tarun Sanghi
                  </p>
                  <p className="text-[10px] uppercase tracking-widest font-mono text-[var(--gold)] mt-0.5">
                    Founder & Allocator
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Custom Written High Wealth Bio (3-4 Paragraphs) */}
            <div className="md:col-span-7 space-y-8 md:pl-4">
              <div className="space-y-4">
                <Eyebrow>THE FOUNDER</Eyebrow>
                <h2 className="font-serif text-[38px] md:text-[48px] leading-tight text-[var(--cream)] font-light">
                  Tarun Sanghi, <span className="italic text-[var(--gold)]">Founder.</span>
                </h2>
                <div className="w-12 h-[1px] bg-[var(--gold)]/50 mt-4" />
              </div>

              <div className="space-y-6 text-[15px] md:text-[16px] text-[var(--cream)]/75 leading-relaxed font-light">
                <p>
                  Tarun Sanghi’s career spans two decades at the intersection of complex finance
                  structures and institutional-grade property acquisition. Throughout his career, he
                  observed a persistent structural gap in the market: traditional buyer's agents
                  focused purely on a transactional search, while investment strategists delivered
                  thick theoretical reports with zero path to execution. Tarun founded Elevare to
                  dismantle this division, establishing an agency where rigorous numerical planning
                  and street-level execution coexist inside a single, integrated team.
                </p>
                <p>
                  Tarun’s conviction is that scalable wealth is designed, not stumbled into. A
                  single property purchase can be a stroke of luck, but a multi-million-dollar
                  portfolio requires disciplined, repeatable structures. He rejects the emotional
                  speculation that often dominates property discussions, insisting that successful
                  wealth creation behaves like clinical capital allocation. To Tarun, buying
                  property without a long-term borrowing and asset strategy isn’t investing; it is
                  merely accumulating disconnected liabilities.
                </p>
                <p>
                  This commitment to precision defines Elevare’s operational model. Under Tarun’s
                  leadership, the firm relies strictly on HTAG-powered quantitative telemetry and
                  real-time structural analysis rather than subjective speculation. His relationship
                  to data is built on complete transparency and accountability; every step of the
                  acquisition process is tested against the strategic milestones established in the
                  investor's Portfolio Blueprint.
                </p>
                <p>
                  Elevare works exclusively with serious, strategy-minded investors. This includes
                  high-net-worth professionals scaling multi-million-dollar portfolios,
                  mid-portfolio investors who have encountered lending or structural roadblocks, and
                  first-time buyers determined to plan their first purchase around multi-asset
                  scale. Tarun’s approach is reserved for clients who value data-driven reality,
                  architectural discipline, and are prepared to exit the transactional cycle in
                  favor of permanent wealth architecture.
                </p>
              </div>

              <div className="pt-4 flex items-center gap-6">
                <svg
                  className="w-24 h-auto text-[var(--gold)]/80"
                  viewBox="0 0 120 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M10,25 C30,10 40,3 55,22 C65,33 75,5 82,18 C88,28 95,22 105,12"
                    strokeLinecap="round"
                  />
                  <path d="M15,18 C40,16 50,20 75,12" strokeLinecap="round" />
                </svg>
                <div className="h-6 w-[1px] bg-[var(--gold)]/20" />
                <span className="text-xs font-mono tracking-widest uppercase text-[var(--cream)]/40">
                  Tarun Sanghi — Principal
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* SECTION 5 - WHAT MAKES US DIFFERENT */}
      <section className="py-24 md:py-36 relative overflow-hidden bg-[var(--navy-deep)]">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(var(--gold) 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <Eyebrow>UNCOMPROMISING SEPARATION</Eyebrow>
            <h2 className="font-serif text-[38px] md:text-[48px] leading-[1.1] text-[var(--cream)]">
              Three things you won't find <br />
              at <span className="italic text-[var(--gold)]">most buyers agencies.</span>
            </h2>
            <div className="w-16 h-[1px] bg-[var(--gold)]/40 mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {/* Differentiator 1 */}
            <Reveal delay={0.05} className="flex flex-col h-full">
              <div className="h-full bg-[var(--navy)]/30 border border-[var(--gold)]/10 hover:border-[var(--gold)]/30 p-8 rounded flex flex-col justify-between transition-all duration-300 relative group">
                <span className="font-mono text-[46px] text-[var(--gold)]/20 group-hover:text-[var(--gold)]/40 transition-colors leading-[1]">
                  01
                </span>
                <div className="space-y-4 mt-6">
                  <h3 className="font-serif text-xl tracking-tight text-[var(--cream)] font-semibold">
                    The Portfolio Blueprint
                  </h3>
                  <p className="text-[13px] text-[var(--cream)]/75 leading-relaxed font-light">
                    Documented strategy first, acquisition second. We create a hyper-precise
                    architectural master plan identifying your current borrow limits, spatial
                    pathways, and custom structural layout.
                  </p>
                </div>
                <div className="h-0.5 w-8 bg-[var(--gold)]/20 group-hover:w-full transition-all duration-300 mt-8" />
              </div>
            </Reveal>

            {/* Differentiator 2 */}
            <Reveal delay={0.2} className="flex flex-col h-full">
              <div className="h-full bg-[var(--navy)]/30 border border-[var(--gold)]/10 hover:border-[var(--gold)]/30 p-8 rounded flex flex-col justify-between transition-all duration-300 relative group">
                <span className="font-mono text-[46px] text-[var(--gold)]/20 group-hover:text-[var(--gold)]/40 transition-colors leading-[1]">
                  02
                </span>
                <div className="space-y-4 mt-6">
                  <h3 className="font-serif text-xl tracking-tight text-[var(--cream)] font-semibold">
                    HTAG-Powered Data
                  </h3>
                  <p className="text-[13px] text-[var(--cream)]/75 leading-relaxed font-light">
                    Every suburb shortlist is backed by institutional-grade analytics, not gut feel
                    or last quarter's CoreLogic median. We leverage quantitative algorithms to
                    pinpoint capital outperformance.
                  </p>
                </div>
                <div className="h-0.5 w-8 bg-[var(--gold)]/20 group-hover:w-full transition-all duration-300 mt-8" />
              </div>
            </Reveal>

            {/* Differentiator 3 */}
            <Reveal delay={0.35} className="flex flex-col h-full">
              <div className="h-full bg-[var(--navy)]/30 border border-[var(--gold)]/10 hover:border-[var(--gold)]/30 p-8 rounded flex flex-col justify-between transition-all duration-300 relative group">
                <span className="font-mono text-[46px] text-[var(--gold)]/20 group-hover:text-[var(--gold)]/40 transition-colors leading-[1]">
                  03
                </span>
                <div className="space-y-4 mt-6">
                  <h3 className="font-serif text-xl tracking-tight text-[var(--cream)] font-semibold">
                    Integrated Finance
                  </h3>
                  <p className="text-[13px] text-[var(--cream)]/75 leading-relaxed font-light">
                    Integrated finance through Mortgage Only — borrowing capacity, structuring, and
                    equity strategy sit inside the engagement, not outside it. One cohesive,
                    end-to-end framework.
                  </p>
                </div>
                <div className="h-0.5 w-8 bg-[var(--gold)]/20 group-hover:w-full transition-all duration-300 mt-8" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* SECTION 6 - THE ECOSYSTEM */}
      <section className="py-24 md:py-36 relative overflow-hidden bg-[var(--navy)]">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={property1}
            alt="Abstract architectural background"
            className="w-full h-full object-cover grayscale brightness-[0.2]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#001c3a]/92" />
        </div>

        <div className="mx-auto max-w-5xl px-6 relative z-10">
          <div className="border border-[var(--gold)]/10 bg-[var(--navy-deep)]/40 backdrop-blur rounded-lg overflow-hidden grid lg:grid-cols-12">
            {/* Left Visual Accent Column */}
            <div className="lg:col-span-5 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[var(--gold)]/10 flex flex-col justify-between bg-[var(--navy-deep)]/[0.6] relative group">
              {/* Corner Bracket Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[var(--gold)]/30" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[var(--gold)]/30" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[var(--gold)]/30" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[var(--gold)]/30" />

              <div className="space-y-6">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
                  <span className="text-[10px] tracking-[0.25em] font-mono uppercase text-[var(--gold)] font-semibold">
                    THE ECOSYSTEM
                  </span>
                </div>
                <h2 className="font-serif text-[32px] md:text-[38px] leading-[1.15] text-[var(--cream)] transition-colors duration-500">
                  Part of a broader <br />
                  <span className="italic text-[var(--gold)]">wealth-creation ecosystem.</span>
                </h2>
              </div>

              <div className="mt-12 lg:mt-24 pt-4 border-t border-[var(--gold)]/10 text-[10px] font-mono tracking-widest text-[var(--cream)]/30 uppercase">
                COHESIVE DEBT & EQUITY MODEL
              </div>
            </div>

            {/* Right Copy and Action Column */}
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between space-y-8 bg-[var(--navy)]/30">
              <div className="space-y-6">
                <div className="w-12 h-[1px] bg-[var(--gold)]/30" />
                <p className="text-[var(--cream)]/75 leading-relaxed text-[14px]">
                  Elevare sits inside a wealth-creation ecosystem led by Tarun Sanghi. Mortgage Only
                  — the specialist investor finance arm — powers every Blueprint engagement.
                  Together they answer the two questions every serious investor has: what should I
                  do, and how do I structure and fund it?
                </p>
              </div>

              <div className="pt-4">
                <a
                  href="https://mortgageonly.com.au"
                  className="group inline-flex items-center gap-6 text-sm tracking-[0.2em] font-serif uppercase text-[var(--gold)] pb-2 border-b border-[var(--gold)]/20 hover:border-[var(--gold)] transition-all duration-300"
                  referrerPolicy="no-referrer"
                >
                  <span>MORTGAGE ONLY</span>
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* SECTION 7 - CTA */}
      <section
        id="booking"
        className="py-24 text-center relative overflow-hidden bg-[var(--navy-deep)]"
      >
        <div className="mx-auto max-w-3xl px-6 relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[var(--gold)]/5 rounded-full border border-[var(--gold)]/10">
              <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span className="text-[10px] tracking-widest font-mono text-[var(--gold)] uppercase font-semibold">
                GET STARTED
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h2 className="font-serif text-[42px] sm:text-[52px] leading-tight text-[var(--cream)]">
              Begin your portfolio masterplan
              <span className="block italic text-[var(--gold)] mt-1">with total alignment.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-6 text-[14px] md:text-[15px] text-[var(--cream)]/75 leading-relaxed max-w-lg mx-auto font-light">
              Book your qualifying call directly with our team. We will review your current
              investment positions, pinpoint immediate borrowing bottlenecks, and outline the exact
              roadmap to a Portfolio Blueprint.
            </p>
          </Reveal>

          <Reveal delay={0.4} className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://calendly.com/elevare"
              className="inline-flex items-center justify-center gap-3 bg-[var(--gold)] text-[var(--navy-deep)] px-8 py-4 text-sm tracking-[0.18em] uppercase font-medium hover:bg-[var(--gold-soft)] transition-colors"
              referrerPolicy="no-referrer"
            >
              Book a Qualifying Call
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-[var(--cream)] px-8 py-4 text-sm tracking-[0.18em] uppercase font-medium transition-colors"
            >
              Back to Home
            </Link>
          </Reveal>
        </div>
      </section>

      {/* REUSED COMPLIANT FOOTER */}
      <footer className="border-t border-[var(--gold)]/15 py-16 bg-[var(--navy-deep)] relative z-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2 space-y-6">
              <Link
                to="/"
                className="font-serif text-xl text-[var(--cream)] flex items-center gap-2"
              >
                <img
                  src="/assets/logo.png"
                  alt="Elevare logo"
                  className="w-[40px] h-[73px] object-contain"
                  referrerPolicy="no-referrer"
                />
                <span>
                  Elevare Portfolio<span className="text-[var(--gold)]">.</span>
                </span>
              </Link>
              <p className="text-sm text-[var(--cream)]/50 max-w-sm font-light">
                Strategy-led acquisition for high-net-worth professionals scaling multi-million
                dollar portfolios.
              </p>
            </div>

            <div>
              <h4 className="text-[var(--gold)] uppercase tracking-widest text-xs font-bold mb-4 font-mono">
                Resources
              </h4>
              <ul className="space-y-2 text-sm text-[var(--cream)]/60 font-light">
                <li>
                  <Link to="/" hash="blueprint" className="hover:text-[var(--cream)]">
                    Blueprint Process
                  </Link>
                </li>
                <li>
                  <a href="https://mortgageonly.com.au" className="hover:text-[var(--cream)]">
                    Finance Hub
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[var(--gold)] uppercase tracking-widest text-xs font-bold mb-4 font-mono">
                Support
              </h4>
              <ul className="space-y-2 text-sm text-[var(--cream)]/60 font-light">
                <li>
                  <Link to="/about" hash="booking" className="hover:text-[var(--cream)]">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-[var(--cream)]">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[var(--cream)]/10 text-center md:text-left text-xs text-[var(--cream)]/40 font-mono tracking-wider">
            © {new Date().getFullYear()} Elevare Portfolio. All rights reserved. Registered in
            Australia.
          </div>
        </div>
      </footer>
    </main>
  );
}
