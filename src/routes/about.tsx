import { Navbar } from "@/components/Navbar";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Target,
  Sparkles,
  TrendingUp,
  Activity,
  Layers,
  ChevronRight,
} from "lucide-react";

const founderImg = "/assets/founder-portrait.png";
const property1 = "/assets/property-1.png";
const logo = "/assets/logo.png";

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
    <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--gold)] uppercase block mb-3 font-semibold">
      {children}
    </span>
  );
}

function SectionDivider() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="h-[1px] bg-[var(--gold)]/15 w-full" />
    </div>
  );
}

function AboutPage() {
  return (
    <main className="bg-[var(--navy)] text-[var(--cream)] min-h-screen pt-24 selection:bg-[var(--gold)]/30 selection:text-white overflow-hidden">
      <Navbar />

      {/* SECTION 1 - HEADER */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20 bg-[var(--navy-deep)]">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
          <Reveal>
            <Eyebrow>ABOUT ELEVARE</Eyebrow>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="font-serif text-[48px] sm:text-[64px] leading-[1.05] tracking-tight text-white font-light">
              Built for investors with <br />
              <span className="italic text-[var(--gold)]">portfolio ambition.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="text-xl text-[var(--cream)]/60 font-light mt-4">
              Why Elevare exists, and how we work.
            </p>
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      {/* SECTION 2 - THE PROBLEM */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-[var(--navy)]">
        {/* Fine gold lines for background depth */}
        <div className="absolute -left-64 top-1/2 w-96 h-[1px] bg-[var(--gold)]/10 rotate-45 select-none pointer-events-none" />
        <div className="absolute -right-64 top-1/3 w-96 h-[1px] bg-[var(--gold)]/10 -rotate-45 select-none pointer-events-none" />

        <div className="mx-auto max-w-5xl px-6 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Editorial Pillar info */}
            <div className="md:col-span-4 space-y-4 md:sticky md:top-28">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--gold)]/5 border border-[var(--gold)]/15 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                <span className="text-[9px] tracking-widest font-mono text-[var(--gold)] uppercase font-semibold">
                  The Problem
                </span>
              </span>
              <h3 className="font-serif text-[28px] md:text-[34px] leading-tight text-white font-light">
                The Accumulation <br />
                <span className="italic text-[var(--gold)]">Paradox.</span>
              </h3>
            </div>

            {/* Right Main Narrative Block */}
            <div className="md:col-span-8 space-y-8">
              <Reveal>
                <h2 className="font-serif text-[36px] leading-[1.2] text-[var(--gold)] tracking-tight font-light">
                  Property investing without strategy isn't investing — it's{" "}
                  <span className="italic font-light">accumulation.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-[14px] text-[var(--cream)]/80 leading-relaxed font-light">
                  Most investors are sold a property, not a plan. A generic buyers agent presents a
                  property; a generic strategist hands over a PDF and disappears. Neither model is
                  built for the investor who wants to scale a portfolio to seven figures and beyond.
                </p>
              </Reveal>

              <Reveal delay={0.35}>
                <div className="border-l-2 border-[var(--gold)]/30 pl-6 py-1.5 bg-[#051c36]/40 p-6 rounded-r-lg border border-y-0 border-r-0">
                  <p className="text-[15px] sm:text-[16px] italic text-[var(--cream)] leading-relaxed font-light">
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
      <section className="py-24 md:py-36 relative overflow-hidden bg-[#f6f1e9]">
        {/* Subtle grid watermark */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(var(--gold) 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content Block */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Eyebrow>OUR METHODOLOGY</Eyebrow>
                <h2 className="font-serif text-[36px] md:text-[42px] leading-[1.1] text-stone-900 font-light">
                  Strategy first. <br className="hidden lg:block"/>
                  <span className="italic text-[var(--gold)]">Then acquisition.</span>
                </h2>
                <div className="w-16 h-[1px] bg-[var(--gold)]/30 mt-6" />
              </div>

              <div className="space-y-6">
                <Reveal delay={0.1}>
                  <p className="text-[15px] sm:text-[16px] text-stone-700 leading-relaxed font-light">
                    Every Elevare engagement starts with a Portfolio Blueprint — a documented strategy
                    that defines what you're building, your borrowing capacity, your suburb shortlist,
                    your stage plan, your risk profile, and your 90-day action map. The Blueprint isn't
                    optional. It's the foundation of every property we buy together.
                  </p>
                </Reveal>

                <Reveal delay={0.25}>
                  <p className="text-[15px] sm:text-[16px] text-stone-700 leading-relaxed font-light">
                    Once the Blueprint is built, we execute. The same team that wrote your strategy runs
                    the search, the due diligence, the negotiation, and the contract. Finance is
                    structured in parallel through Mortgage Only — our specialist investor finance arm.
                    Settlement is the start of the next plan revision, not the end of the relationship.
                  </p>
                </Reveal>
              </div>
            </div>

            {/* Right Image Block */}
            <Reveal delay={0.3} className="relative aspect-[4/5] md:aspect-[4/4] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-8 border-r-8 border-[#2596be] rounded-tr-3xl z-0" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-8 border-l-8 border-[#f59e0b] rounded-bl-3xl z-0" />
              <img
                src="/assets/blueprint-abstract.png"
                alt="Elevare Methodology Strategy Execution"
                className="w-full h-full object-cover scale-105"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-stone-900/10 pointer-events-none" />
            </Reveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* SECTION 4 - TARUN SANGHI (FOUNDER) */}
      <section className="py-24 md:py-36 relative overflow-hidden bg-[var(--navy)]">
        {/* Subtle geometric framing vector background */}
        <div className="absolute -top-[10%] -left-[10%] w-[45%] aspect-square rounded-full border border-[var(--gold)]-[0.03] pointer-events-none" />

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Portrait Container with premium metrics framing */}
            <div className="md:col-span-5 flex justify-center md:sticky md:top-24">
              <Reveal className="relative w-full max-w-[380px] aspect-[4/5] p-3 border border-[var(--gold)]/20 shadow-2xl bg-[var(--navy-deep)] rounded">
                {/* Micro engineering corner brackets */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[var(--gold)]/40 rounded-tl" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[var(--gold)]/40 rounded-tr" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[var(--gold)]/40 rounded-bl" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[var(--gold)]/40 rounded-br" />

                <div className="relative w-full h-full overflow-hidden bg-[var(--navy)]">
                  {founderImg ? (
                    <img
                      src={founderImg}
                      alt="Tarun Sanghi, Founder of Elevare Portfolio"
                      className="w-full h-full object-cover grayscale brightness-[0.8] hover:grayscale-0 hover:brightness-100 transition-all duration-700"
                      onError={(e) => {
                        // Fallback in case portrait doesn't load
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : null}

                  {/* Geometric watermark layout overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)]/90 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 left-4 font-mono text-[8px] text-[var(--gold)]/30 uppercase tracking-[0.2em]">
                    DESIGN SYSTEM ID: ELV-FND
                  </div>

                  {/* Text on Portrait */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-serif text-xl text-[var(--cream)] tracking-tight font-medium">
                      Tarun Sanghi
                    </p>
                    <p className="text-[10px] uppercase tracking-widest font-mono text-[var(--gold)] mt-0.5">
                      Founder & Allocator
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Confident, method-led Bio */}
            <div className="md:col-span-7 space-y-8 md:pl-4">
              <div className="space-y-3">
                <Eyebrow>THE FOUNDER</Eyebrow>
                <h2 className="font-serif text-[36px] leading-tight text-white font-light">
                  Tarun Sanghi,{" "}
                  <span className="italic text-[var(--gold)] font-light">Founder.</span>
                </h2>
                <div className="w-12 h-[1px] bg-[var(--gold)]/40 mt-4" />
              </div>

              {/* Prose bio styled for elite wealth advisory readability */}
              <div className="space-y-6 text-[14px] text-[var(--cream)]/80 leading-relaxed font-light">
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

              {/* Sleek footer linear accent */}
              <div className="pt-6 flex items-center gap-6">
                <svg
                  className="w-20 h-auto text-[var(--gold)]/60"
                  viewBox="0 0 100 30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path
                    d="M10,20 C25,12 35,4 48,18 C58,28 68,6 74,15 C80,24 86,18 94,10"
                    strokeLinecap="round"
                  />
                  <path d="M12,14 C32,13 40,16 65,10" strokeLinecap="round" />
                </svg>
                <div className="h-5 w-[1px] bg-[var(--gold)]/20" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--cream)]/40 font-semibold">
                  Tarun Sanghi — Principal
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* SECTION 5 - WHAT MAKES US DIFFERENT */}
      <section className="py-24 md:py-36 relative overflow-hidden bg-[#f6f1e9]">
        {/* Subtle grid watermark */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(var(--gold) 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="relative py-8 px-4 sm:px-8 rounded-2xl">
            {/* Background Image & Overlay */}
            <div className="absolute inset-x-0 top-0 bottom-40 md:bottom-28 rounded-2xl overflow-hidden shadow-2xl">
              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-24 h-24 border-t-8 border-l-8 border-[#2596be] rounded-tl-3xl z-0" />
              <div className="absolute -top-2 -right-2 w-24 h-24 border-t-8 border-r-8 border-[#2596be] rounded-tr-3xl z-0" />

              <img
                src="/images/why_choose_us_bg.png"
                alt="Architecture"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Header Content */}
            <div className="relative z-10 text-center max-w-3xl mx-auto text-white space-y-4 mb-20 md:mb-24 drop-shadow-md">
              <h2 className="font-serif text-[36px] leading-[1.1] text-white font-medium">
                What Makes Us Different
              </h2>
              <p className="text-[14px] text-white/90 leading-relaxed font-light max-w-2xl mx-auto drop-shadow">
                Three things you won't find at most buyers agencies. We separate research,
                execution, and finance to ensure an uncompromising standard of service.
              </p>
            </div>

            {/* Cards */}
            <div className="relative z-20 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto transform translate-y-24 md:translate-y-16">
              {/* Custom card 1 */}
              <Reveal delay={0.05} className="flex flex-col h-full">
                <div className="bg-white rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] p-8 text-center flex flex-col items-center h-full transition-transform hover:-translate-y-2 duration-300">
                  <div className="mb-6">
                    <FileText className="w-12 h-12 text-[#259b9a]" />
                  </div>
                  <h3 className="font-serif text-[18px] tracking-tight text-stone-900 mb-4 font-semibold">
                    The Portfolio Blueprint
                  </h3>
                  <p className="text-[14px] text-stone-500 leading-relaxed font-light mb-8">
                    The Portfolio Blueprint is the foundation of every engagement — documented
                    strategy first, acquisition second.
                  </p>
                </div>
              </Reveal>

              {/* Custom card 2 */}
              <Reveal delay={0.2} className="flex flex-col h-full">
                <div className="bg-white rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] p-8 text-center flex flex-col items-center h-full transition-transform hover:-translate-y-2 duration-300">
                  <div className="mb-6">
                    <Target className="w-12 h-12 text-[#f59e0b]" />
                  </div>
                  <h3 className="font-serif text-[18px] tracking-tight text-stone-900 mb-4 font-semibold">
                    HTAG-Powered Data
                  </h3>
                  <p className="text-[14px] text-stone-500 leading-relaxed font-light mb-8">
                    HTAG-powered data — every suburb shortlist is backed by institutional-grade
                    analytics, not gut feel or an outdated median.
                  </p>
                </div>
              </Reveal>

              {/* Custom card 3 */}
              <Reveal delay={0.35} className="flex flex-col h-full">
                <div className="bg-white rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] p-8 text-center flex flex-col items-center h-full transition-transform hover:-translate-y-2 duration-300">
                  <div className="mb-6">
                    <TrendingUp className="w-12 h-12 text-[#10b981]" />
                  </div>
                  <h3 className="font-serif text-[18px] tracking-tight text-stone-900 mb-4 font-semibold">
                    Integrated Finance
                  </h3>
                  <p className="text-[14px] text-stone-500 leading-relaxed font-light mb-8">
                    Integrated finance through Mortgage Only — borrowing capacity and equity
                    strategy sit inside the engagement, not outside it.
                  </p>
                </div>
              </Reveal>
            </div>
            {/* spacer to account for translated cards */}
            <div className="h-16 md:h-8" />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* SECTION 6 - THE ECOSYSTEM */}
      <section className="py-24 md:py-36 relative overflow-hidden bg-[var(--navy)]">
        {/* Real background overlay integration */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          {property1 ? (
            <img
              src={property1}
              alt="Abstract background"
              className="w-full h-full object-cover scale-105 opacity-60 mix-blend-overlay"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy)]/80 via-[var(--navy-deep)]/80 to-[var(--navy)]/90" />
        </div>

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <div className="border border-[var(--gold)]/15 bg-[var(--navy-deep)]/50 backdrop-blur-lg rounded-2xl overflow-hidden grid lg:grid-cols-12 shadow-2xl">
            {/* Left Narrative Block */}
            <div className="lg:col-span-6 p-8 md:p-12 lg:p-16 flex flex-col justify-between space-y-8 bg-[var(--navy-deep)]/30 border-r border-[var(--gold)]/10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[var(--gold)] animate-pulse" />
                  <span className="text-[10px] tracking-[0.25em] font-mono uppercase text-[var(--gold)] font-bold">
                    THE ECOSYSTEM
                  </span>
                </div>

                <h2 className="font-serif text-[36px] leading-[1.15] text-white font-light">
                  Part of a broader <br />
                  <span className="italic text-[var(--gold)] font-light">
                    wealth-creation ecosystem.
                  </span>
                </h2>

                <div className="w-12 h-[1px] bg-[var(--gold)]/30" />

                <p className="text-[13.5px] text-[var(--cream)]/80 leading-relaxed font-light">
                  Elevare sits inside a wealth-creation ecosystem led by Tarun Sanghi. Mortgage Only
                  — the specialist investor finance arm — powers every Blueprint engagement.
                  Together they answer the two questions every serious investor has: what should I
                  do, and how do I structure and fund it?
                </p>
              </div>

              <div className="pt-6">
                <a
                  href="https://mortgageonly.com.au"
                  className="group inline-flex items-center gap-4 text-[11px] tracking-[0.2em] font-mono uppercase text-[var(--gold)] pb-1.5 border-b border-[var(--gold)]/20 hover:border-[var(--gold)] transition-all duration-300"
                  referrerPolicy="no-referrer"
                >
                  <span>MORTGAGE ONLY SPECIALIST</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </a>
              </div>
            </div>

            {/* Right Interactive Ecosystem Graphic representation */}
            <div className="lg:col-span-6 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-[#071629]/70 relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-[var(--gold)]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6 relative z-10">
                {/* Node 1 */}
                <div className="p-5 bg-[var(--navy)]/80 border border-[var(--gold)]/15 rounded-xl flex items-center gap-4 shadow-lg hover:border-[var(--gold)]/35 transition-colors duration-300">
                  <div className="p-3 bg-[var(--gold)]/10 rounded border border-[var(--gold)]/20 text-[var(--gold)] shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-[16px] text-white">Elevare Portfolio</h4>
                    <p className="text-[10px] font-mono text-[var(--gold)] tracking-widest uppercase">
                      WHAT SHOULD I DO?
                    </p>
                    <p className="text-[11.5px] text-[var(--cream)]/60 font-light mt-1">
                      Asset brief definition, geographic shortlisting, surgical negotiation.
                    </p>
                  </div>
                </div>

                {/* Vertical sync line */}
                <div className="flex justify-center my-1.5 home-divider-y">
                  <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--gold)]/80 to-[var(--gold)]/15 relative">
                    <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-1.5 w-1.5 bg-[var(--gold)] rounded-full animate-ping" />
                  </div>
                </div>

                {/* Node 2 */}
                <div className="p-5 bg-[var(--navy)]/80 border border-[var(--gold)]/15 rounded-xl flex items-center gap-4 shadow-lg hover:border-[var(--gold)]/35 transition-colors duration-300">
                  <div className="p-3 bg-[var(--gold)]/10 rounded border border-[var(--gold)]/20 text-[var(--gold)] shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-[16px] text-white">Mortgage Only</h4>
                    <p className="text-[10px] font-mono text-[var(--gold)] tracking-widest uppercase">
                      HOW DO I STRUCTURE & FUND IT?
                    </p>
                    <p className="text-[11.5px] text-[var(--cream)]/60 font-light mt-1">
                      Custom structural debt strategy, borrowing capacity maximization, tier-1
                      lending.
                    </p>
                  </div>
                </div>
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
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[var(--gold)]/5 rounded-full border border-[var(--gold)]/15">
              <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span className="text-[9px] tracking-widest font-mono text-[var(--gold)] uppercase font-semibold">
                GET STARTED
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h2 className="font-serif text-[36px] leading-tight text-white font-light">
              Begin your portfolio masterplan
              <span className="block italic text-[var(--gold)] mt-1 font-light">
                with total alignment.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-6 text-[14px] text-[var(--cream)]/75 leading-relaxed max-w-lg mx-auto font-light">
              Book your qualifying call directly with our team. We will review your current
              investment positions, pinpoint immediate borrowing bottlenecks, and outline the exact
              roadmap to a Portfolio Blueprint.
            </p>
          </Reveal>

          <Reveal
            delay={0.4}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto"
          >
            <a
              href="https://calendly.com/elevare"
              className="inline-flex items-center justify-center gap-3 bg-[var(--gold)] text-[var(--navy-deep)] px-5 py-4 text-xs font-mono tracking-[0.18em] uppercase font-bold hover:bg-[var(--gold-soft)] transition-colors rounded shadow-md group"
              referrerPolicy="no-referrer"
            >
              <span>Book a Qualifying Call</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-[var(--cream)] px-8 py-4 text-xs font-mono tracking-[0.18em] uppercase font-bold transition-colors rounded"
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
              <Link to="/" className="font-serif text-xl text-white flex items-center gap-2">
                <img src={logo} alt="Elevare logo" className="w-[32px] h-[55px] object-contain" />
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
              <h4 className="text-[var(--gold)] uppercase tracking-widest text-[10px] font-bold mb-4 font-mono">
                Resources
              </h4>
              <ul className="space-y-2 text-sm text-[var(--cream)]/60 font-light">
                <li>
                  <Link to="/blueprint" className="hover:text-white transition-colors">
                    Blueprint Process
                  </Link>
                </li>
                <li>
                  <a
                    href="https://mortgageonly.com.au"
                    className="hover:text-white transition-colors"
                  >
                    Finance Hub
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[var(--gold)] uppercase tracking-widest text-[10px] font-bold mb-4 font-mono">
                Support
              </h4>
              <ul className="space-y-2 text-sm text-[var(--cream)]/60 font-light">
                <li>
                  <Link to="/about" hash="booking" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
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
