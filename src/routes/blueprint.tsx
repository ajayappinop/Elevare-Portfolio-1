import { Navbar } from "@/components/Navbar";
import {
  bodyClass,
  containerClass,
  creamBodyClass,
  creamSectionClass,
  Eyebrow,
  h1Class,
  h2Class,
  h2CreamClass,
  pageShellClass,
  PrimaryCTA,
  Reveal,
  SecondaryCTA,
  sectionClass,
  SectionContainer,
  SectionDivider,
} from "@/components/brand";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  DollarSign,
  RefreshCw,
  BarChart,
  Target,
  ChevronLeft,
  ChevronRight,
  Plus,
  ChevronDown,
  Sparkles,
  Clock,
  Shield,
  FileText,
} from "lucide-react";

export const Route = createFileRoute("/blueprint")({
  head: () => ({
    meta: [
      { title: "The Elevare Portfolio Blueprint — Strategy-First Acquisition" },
      {
        name: "description",
        content:
          "Discover The Blueprint: A documented strategy for every acquisition, not just a property report. The operating document of your portfolio.",
      },
    ],
  }),
  component: BlueprintPage,
});

function BlueprintPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [purchasePrice, setPurchasePrice] = useState(1250000);
  const [expandedCard, setExpandedCard] = useState<string | null>("acquire"); // default open "acquire" to demonstrate the slider
  const carouselRef = useRef<HTMLDivElement>(null);

  const blueprintSections = [
    {
      title: "Investor Profile & Goals",
      desc: "Your capacity, timeline, risk tolerance, and lifestyle constraints.",
      image: "/assets/property-1.png",
      tag: "STRATEGY",
      subtitle: "CAPACITY & TIMELINE",
    },
    {
      title: "Borrowing Capacity & Finance Path",
      desc: "Structured with Mortgage Only across your full scaling arc.",
      image: "/assets/property-2.png",
      tag: "FINANCE",
      subtitle: "MORTGAGE PATHWAYS",
    },
    {
      title: "Portfolio Thesis",
      desc: "Geographic strategy, asset-type mix, and hold period logic.",
      image: "/assets/property-3.png",
      tag: "THESIS",
      subtitle: "GEOGRAPHIC STRATEGY",
    },
    {
      title: "Suburb Shortlist",
      desc: "Enterprise Grade Analysis: RCS scores, demand-depth, BBT signals.",
      image: "/assets/property-4.png",
      tag: "ANALYSIS",
      subtitle: "KEY METRICS",
    },
    {
      title: "Stage Plan",
      desc: "Your acquisition sequencing across the next 3–10 years.",
      image: "/assets/hero-architecture.png",
      tag: "TIMELINE",
      subtitle: "3-10 YEAR SEQUENCE",
    },
    {
      title: "Risk Assessment",
      desc: "Hazard, market cycle, concentration, and finance risk.",
      image: "/assets/blueprint-abstract.png",
      tag: "RISK",
      subtitle: "CYCLE & CONCENTRATION",
    },
    {
      title: "Acquisition Brief",
      desc: "For Acquisition 1: price, areas, must-haves and walk-aways.",
      image: "/assets/differentiator.png",
      tag: "BRIEF",
      subtitle: "ACQUISITION CRITERIA",
    },
    {
      title: "Action Plan",
      desc: "Your 90-day execution map.",
      image: "/assets/property-1.png",
      tag: "GOAL",
      subtitle: "90-DAY ACTIONS",
    },
  ];

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const card = container.children[index] as HTMLElement;
    if (card) {
      container.scrollTo({
        left: card.offsetLeft - 24,
        behavior: "smooth",
      });
    }
  };

  const nextSlide = () => {
    const nextIdx = (activeIdx + 1) % blueprintSections.length;
    setActiveIdx(nextIdx);
    scrollToIndex(nextIdx);
  };

  const prevSlide = () => {
    const prevIdx = (activeIdx - 1 + blueprintSections.length) % blueprintSections.length;
    setActiveIdx(prevIdx);
    scrollToIndex(prevIdx);
  };

  // Autoplay loop timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      const nextIdx = (activeIdx + 1) % blueprintSections.length;
      setActiveIdx(nextIdx);
      scrollToIndex(nextIdx);
    }, 4500);
    return () => clearInterval(interval);
  }, [activeIdx, isPaused, blueprintSections.length]);

  return (
    <main className={`${pageShellClass} selection:text-[var(--cream)]`}>
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
            <h2 className="font-serif text-[36px] text-[var(--cream)] font-light leading-snug">
              Not a property report.{" "}
              <span className="italic text-[var(--gold)]">A portfolio plan.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-[14px] text-center text-[var(--cream)]/75 leading-relaxed font-light">
              The Elevare Portfolio Blueprint is the documented strategy that directs every property
              you buy through us. It is not a market report, not a suburb suggestion, not a PDF you
              read once and shelve. It is your portfolio's operating document — used to brief every
              acquisition, revised before every new purchase, and updated as your capacity and
              market conditions evolve.
            </p>
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      {/* SECTION 3 - WHAT'S INSIDE */}
      <section className="py-24 md:py-32 bg-[var(--cream-section)] overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          {/* Top block layout from screenshot */}
          <div className="flex flex-col sm:flex-row items-stretch gap-6 lg:gap-10 relative mb-16 h-[400px]">
            {/* Rotated Left Label */}
            <div className="hidden md:flex flex-col items-center justify-center [writing-mode:vertical-lr] rotate-180 select-none text-[var(--gold)] font-sans font-bold text-[10px] tracking-[0.4em] uppercase border-r border-[var(--gold)]/10 pr-6 h-full min-h-[300px]">
              PORTFOLIO BLUEPRINT
            </div>

            {/* Banner Image Frame with overlapping block */}
            <div className="relative flex-1 aspect-[21/9] min-h-[220px] md:min-h-[320px] overflow-hidden rounded-lg border border-[var(--cream-section-subtle)]/25/50">
              <img
                src="/assets/hero-architecture.png"
                alt="Elevare Blueprint architecture overview"
                className="w-full h-full object-cover grayscale opacity-80"
              />
              <div className="absolute inset-0 bg-[var(--cream-section-foreground)]/10" />

              {/* Overlapping Gold Box heading on the right */}
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-10 bg-[var(--gold)] border border-[var(--gold)]/20 shadow-2xl rounded-l border-r-0 max-w-full"
                style={{
                  width: "400px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  paddingTop: "40px",
                  paddingBottom: "40px",
                }}
              >
                <div className="font-serif font-bold text-[36px] md:text-[40px] tracking-tight text-[var(--navy-deep)] leading-[1.1] select-none">
                  Eight sections. <br />
                  Every Blueprint.
                </div>
              </div>
            </div>
          </div>

          {/* Bottom layout: Left Dynamic Panel + Right Slider Carousel */}
          <div className="grid lg:grid-cols-12 gap-12 items-start mt-12">
            {/* Left Frame: Selected Index text description & Arrow controls */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-8 lg:min-h-[400px]">
              <div className="space-y-6">
                <Eyebrow>BLUEPRINT ANATOMY</Eyebrow>

                <div className="text-[var(--gold)] font-mono font-bold text-sm tracking-wider">
                  SECTION 0{activeIdx + 1}
                </div>

                {/* Animated active state description wrapper */}
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-4"
                >
                  <h4 className="font-serif text-[28px] md:text-[32px] text-[var(--cream-section-foreground)] leading-snug">
                    {blueprintSections[activeIdx].title}
                  </h4>
                  <p className="text-[15px] sm:text-[16px] leading-relaxed text-[var(--cream-section-muted)] font-light">
                    {blueprintSections[activeIdx].desc}
                  </p>
                </motion.div>
              </div>

              {/* Action buttons as requested */}
              <div className="space-y-6 pt-6 border-t border-[var(--gold)]/10">
                {/* Left/Right controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-colors cursor-pointer"
                    aria-label="Previous section"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-colors cursor-pointer"
                    aria-label="Next section"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono text-[var(--cream-section-subtle)] ml-4 font-medium tracking-widest">
                    0{activeIdx + 1} <span className="text-[var(--gold)]">/</span> 08
                  </span>
                </div>
              </div>
            </div>

            {/* Right Frame: Horizontal Carousel Slider */}
            <div
              className="lg:col-span-8 w-full relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                ref={carouselRef}
                className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: "none" }}
              >
                {blueprintSections.map((section, idx) => {
                  const isHoveredActive = activeIdx === idx;
                  return (
                    <div
                      key={idx}
                      className="w-[280px] md:w-[325px] shrink-0 aspect-[4/5] relative rounded-lg overflow-hidden border border-[var(--cream-section-subtle)]/25 shadow-md group cursor-pointer snap-start transition-all duration-300"
                      onMouseEnter={() => setActiveIdx(idx)}
                    >
                      {/* Section Image */}
                      <img
                        src={section.image}
                        alt={section.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Default overlay cover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 duration-300 group-hover:opacity-0" />

                      {/* Standard Title Label */}
                      <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col justify-end h-1/2 duration-300 group-hover:opacity-0">
                        <span className="text-[10px] font-mono text-[var(--gold)] tracking-widest uppercase mb-1">
                          SECTION 0{idx + 1}
                        </span>
                        <h5 className="font-sans text-[15px] md:text-[18px] text-[var(--cream)] font-semibold leading-snug">
                          {section.title}
                        </h5>
                      </div>

                      {/* Custom Blank Light Overlay Mode */}
                      <div className="absolute inset-0 bg-[var(--overlay-navy)] backdrop-blur flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        {/* Status Label */}
                        <div className="text-center font-mono text-[10px] tracking-widest text-[var(--gold)]/80 uppercase mt-2">
                          ACTIVE // STRATEGY
                        </div>

                        {/* Centered Heading */}
                        <div className="text-center space-y-2.5 my-auto">
                          <h4 className="font-serif font-normal text-[16px] md:text-[18px] text-[var(--cream)] uppercase leading-snug px-3 tracking-wider">
                            {section.title}
                          </h4>
                          <p className="text-[10px] font-mono tracking-widest text-[var(--gold)]/90 uppercase">
                            {section.subtitle}
                          </p>
                        </div>

                        {/* Plus cursor icon equivalent (circle) */}
                        <div className="flex justify-center pb-2">
                          <div className="w-11 h-11 rounded-full border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)] group-hover:border-[var(--gold)] group-hover:text-[var(--gold)] transition-all duration-300">
                            <Plus className="w-4.5 h-4.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* SECTION 4 - HOW IT'S DELIVERED */}
      <section className="py-24 md:py-32 bg-[var(--navy-deep)] border-t border-[var(--gold)]/10 relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <Reveal>
            <Eyebrow>DELIVERY FRAMEWORK</Eyebrow>
          </Reveal>

          <div className="mt-10 grid lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            {/* Left: stats grid + heading + body */}
            <div className="lg:col-span-5 flex flex-col">
              <Reveal delay={0.05}>
                <h2 className="font-serif text-[32px] md:text-[36px] text-[var(--cream)] font-light leading-snug mb-8">
                  25 pages. <br />
                  90-minute walkthrough. <br />
                  <span className="italic text-[var(--gold)]">Yours to keep.</span>
                </h2>
              </Reveal>

              <div className="grid grid-cols-2 border border-[var(--gold)]/15">
                {[
                  {
                    stat: "25",
                    subtitle: "STRATEGY BRIEF",
                    label: "25-Page Strategic Blueprint",
                  },
                  {
                    stat: "90",
                    subtitle: "DIRECT REVIEW",
                    label: "90-Min Strategy Walkthrough",
                  },
                  {
                    stat: "100%",
                    subtitle: "PORTABLE ASSET",
                    label: "Yours to Keep",
                  },
                  {
                    stat: "2–3",
                    subtitle: "FINANCE HANDOFF",
                    label: "Mortgage Only introduction",
                  },
                ].map((item, idx) => (
                  <Reveal key={item.label} delay={0.1 + idx * 0.05}>
                    <div
                      className={`flex flex-col justify-center p-5 md:p-6 ${
                        idx % 2 === 0 ? "border-r border-[var(--gold)]/15" : ""
                      } ${idx < 2 ? "border-b border-[var(--gold)]/15" : ""}`}
                    >
                      <p className="font-sans text-[32px] md:text-[36px] font-semibold leading-none text-[var(--cream)]">
                        {item.stat}
                      </p>
                      <p className="mt-2 text-[9px] font-mono uppercase tracking-[0.14em] text-[var(--gold)]">
                        {item.subtitle}
                      </p>
                      <p className="mt-1 text-[11px] font-medium text-[var(--cream)]/70">
                        {item.label}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.35} className="mt-8">
                <p className="font-sans text-[14px] text-[var(--cream)]/80 leading-relaxed font-light max-w-md">
                  We build your Blueprint over a structured 2–3 week engagement. You receive the
                  full document, a 90-minute strategy walkthrough with Tarun, and direct lines into
                  Mortgage Only for finance structuring questions. The Blueprint is yours — to read,
                  share with your accountant, and use as the operating document of your portfolio.
                </p>
              </Reveal>
            </div>

            {/* Right: staggered imagery + CTA */}
            <div className="lg:col-span-7">
              <Reveal delay={0.15} className="grid h-full grid-cols-12 gap-4 md:gap-5">
                <div className="col-span-12 sm:col-span-6 flex flex-col gap-4 md:gap-5">
                  <div className="relative overflow-hidden aspect-[4/5] w-full bg-[var(--navy)]">
                    <img
                      src="/assets/hero-architecture.png"
                      alt="Luxury architecture and investment property"
                      className="h-full w-full object-cover opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)]/40 to-transparent" />
                  </div>
                  <Link
                    to="/booking"
                    className="inline-flex w-full items-center justify-between bg-[var(--cream)] px-6 py-4 text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--navy-deep)] transition-colors hover:bg-[var(--gold-soft)]"
                  >
                    <span>Book a Qualifying Call</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="col-span-12 sm:col-span-6 sm:pt-16 md:pt-24">
                  <div className="relative overflow-hidden aspect-[4/5] w-full bg-[var(--navy)]">
                    <img
                      src="/assets/property-3.png"
                      alt="Premium investment property architecture"
                      className="h-full w-full object-cover opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)]/35 to-transparent" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* SECTION 5 - INVESTMENT */}
      <section
        className="py-24 md:py-32 bg-[var(--navy)] relative overflow-hidden"
        id="investment-section"
      >
        {/* Subtle decorative grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#c99d4e08_1px,transparent_1px),linear-gradient(to_bottom,#c99d4e08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none select-none" />

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--gold)] uppercase block mb-3">
              INVESTMENT STRUCTURE
            </span>
            <h2 className="font-serif text-[36px] text-[var(--cream)] font-light leading-snug">
              Flat-fee. <span className="italic text-[var(--gold)]">Transparent.</span>
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-[var(--cream)]/60 font-light max-w-xl mx-auto">
              Clear, published fees. No vendor kickbacks and no hidden percentages.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Fee Pillars */}
            <div className="lg:col-span-7 space-y-8">
              {/* Pillar 1: ENGAGEMENT FEE */}
              <Reveal delay={0.05}>
                <div className="group border border-[var(--gold)]/10 hover:border-[var(--gold)]/25 bg-[var(--navy-deep)]/40 p-8 rounded-xl backdrop-blur-md transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--gold)]/15 group-hover:bg-[var(--gold)]/35 transition-colors duration-300" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pl-2">
                    <div>
                      <span className="text-[10px] font-mono text-[var(--gold)] tracking-widest uppercase block mb-1">
                        PILLAR 01
                      </span>
                      <h3 className="font-serif text-[22px] text-[var(--cream)] font-medium">
                        Engagement Fee
                      </h3>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-3xl font-sans font-bold text-[var(--cream)] block">$3,000</span>
                      <span className="text-[10px] font-mono text-[var(--gold)] bg-[var(--gold)]/10 border border-[var(--gold)]/20 px-2 py-0.5 rounded">
                        PAID UPFRONT ON SIGNING
                      </span>
                    </div>
                  </div>
                  <p className="text-[13.5px] text-[var(--cream)]/85 pl-2 leading-relaxed mb-6 font-light">
                    $3,000 retainer to engage. Paid upfront on signing. Covers your Portfolio
                    Blueprint engagement.
                  </p>

                  {/* Subtle checklist */}
                  <div className="grid sm:grid-cols-2 gap-3 pl-2 pt-4 border-t border-[var(--gold)]/10">
                    {[
                      "Suburb modelling & Enterprise Grade Analysis",
                      "Borrowing capacity & finance pathway",
                      "Formal Acquisition Brief",
                      "90-minute strategy walkthrough",
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-2 text-[12px] text-[var(--cream)]/70 font-light"
                      >
                        <span className="text-[var(--gold)] shrink-0 font-medium">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Pillar 2: ACQUISITION FEE */}
              <Reveal delay={0.1}>
                <div className="group border border-[var(--gold)]/20 hover:border-[var(--gold)]/35 bg-[var(--navy-deep)]/50 p-8 rounded-xl backdrop-blur-md transition-all duration-300 relative overflow-hidden ring-1 ring-[var(--gold)]/5">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--gold)]/30 group-hover:bg-[var(--gold)]/60 transition-colors duration-300" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pl-2">
                    <div>
                      <span className="text-[10px] font-mono text-[var(--gold)] tracking-widest uppercase block mb-1">
                        PILLAR 02 • MAIN ENGAGEMENT
                      </span>
                      <h3 className="font-serif text-[22px] text-[var(--cream)] font-medium">
                        Acquisition Fee
                      </h3>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-3xl font-sans font-bold text-[var(--cream)] block">
                        2% / $15k Min
                      </span>
                      <span className="text-[10px] font-mono text-[var(--gold)] bg-[var(--gold)]/15 border border-[var(--gold)]/25 px-2 py-0.5 rounded">
                        CREDITED Retainer
                      </span>
                    </div>
                  </div>
                  <p className="text-[13.5px] text-[var(--cream)]/85 pl-2 leading-relaxed mb-6 font-light">
                    The greater of 2% of purchase price or $15,000 per acquisition. The initial
                    engagement retainer is credited against this fee. Balance paid on unconditional
                    contract.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 pl-2 pt-4 border-t border-[var(--gold)]/10">
                    {[
                      "Property search against your Acquisition Brief",
                      "Due diligence",
                      "Negotiation and contract",
                      "Finance structured in parallel with Mortgage Only",
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-2 text-[12px] text-[var(--cream)]/70 font-light"
                      >
                        <span className="text-[var(--gold)] shrink-0">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Pillar 3: BLUEPRINT REVISION */}
              <Reveal delay={0.15}>
                <div className="group border border-[var(--gold)]/10 hover:border-[var(--gold)]/25 bg-[var(--navy-deep)]/40 p-8 rounded-xl backdrop-blur-md transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--gold)]/15 group-hover:bg-[var(--gold)]/35 transition-colors duration-300" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pl-2">
                    <div>
                      <span className="text-[10px] font-mono text-[var(--gold)] tracking-widest uppercase block mb-1">
                        PILLAR 03 • ROADMAP EVOLUTION
                      </span>
                      <h3 className="font-serif text-[22px] text-[var(--cream)] font-medium">
                        Blueprint Revision
                      </h3>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-3xl font-sans font-bold text-[var(--cream)] block">
                        Included
                      </span>
                      <span className="text-[10px] font-mono text-[var(--gold)] bg-[var(--gold)]/10 border border-[var(--gold)]/20 px-2 py-0.5 rounded">
                        NO SEPARATE CHARGE
                      </span>
                    </div>
                  </div>
                  <p className="text-[13.5px] text-[var(--cream)]/85 pl-2 leading-relaxed font-light mb-6">
                    Before each subsequent acquisition, your Blueprint is reviewed and revised
                    against new capacity and market conditions. Bundled into the next acquisition
                    fee — no separate charge.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 pl-2 pt-4 border-t border-[var(--gold)]/10">
                    {[
                      "Revised against new borrowing capacity",
                      "Updated for current market conditions",
                      "Portfolio thesis review before each acquisition",
                      "Included with your next acquisition fee",
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-2 text-[12px] text-[var(--cream)]/70 font-light"
                      >
                        <span className="text-[var(--gold)] shrink-0">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Dynamic Fee Illustrator Widget */}
            <div className="lg:col-span-5">
              <Reveal delay={0.2}>
                <div className="border border-[var(--gold)]/25 bg-[#051c36]/90 shadow-[0_0_50px_rgba(201,157,78,0.06)] rounded-xl p-8 sticky top-28 overflow-hidden group">
                  {/* Blueprint glowing effect at top to look polished */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-[var(--gold)]/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2.5 mb-6">
                      <div className="p-2.5 bg-[var(--gold)]/10 rounded border border-[var(--gold)]/15 text-[var(--gold)]">
                        <Target className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif font-semibold text-[18px] text-[var(--cream)]">
                          Fee Illustrator
                        </h4>
                        <p className="text-[11px] font-mono text-[var(--gold)] uppercase tracking-wider">
                          Interactive Pricing Tool
                        </p>
                      </div>
                    </div>

                    <p className="text-[13px] text-[var(--cream)]/70 mb-6 font-light leading-relaxed">
                      Slide or select a property target value to model the flat-fee architecture and
                      see your engagement retainer applied.
                    </p>

                    {/* Quick Selection Buttons */}
                    <div className="space-y-1.5 mb-6">
                      <label className="text-[10px] font-mono text-[var(--gold)] uppercase tracking-wider">
                        PRESET PURCHASE TIERS
                      </label>
                      <div className="grid grid-cols-4 gap-1.5 pt-1">
                        {[
                          { val: 650000, label: "$650k" },
                          { val: 1250000, label: "$1.25M" },
                          { val: 2000000, label: "$2.0M" },
                          { val: 3000000, label: "$3.0M" },
                        ].map((tier) => (
                          <button
                            key={tier.val}
                            onClick={() => setPurchasePrice(tier.val)}
                            className={`py-1.5 px-1 rounded font-mono text-[11px] border transition-all duration-200 text-center ${
                              purchasePrice === tier.val
                                ? "bg-[var(--gold)] text-[var(--navy-deep)] border-[var(--gold)] font-bold shadow-md"
                                : "bg-[var(--navy)]/50 hover:bg-[var(--navy)]/80 text-[var(--cream)]/80 border-[var(--gold)]/10 hover:border-[var(--gold)]/30"
                            }`}
                          >
                            {tier.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Slider Input */}
                    <div className="space-y-3 mb-8">
                      <div className="flex justify-between items-center bg-[var(--navy-deep)]/45 p-3.5 rounded border border-[var(--gold)]/10">
                        <span className="text-[11px] font-mono text-[var(--cream)]/50 uppercase">
                          TARGET ASSET PRICE
                        </span>
                        <span className="font-sans font-bold text-[18px] text-[var(--cream)] text-right">
                          {new Intl.NumberFormat("en-AU", {
                            style: "currency",
                            currency: "AUD",
                            maximumFractionDigits: 0,
                          }).format(purchasePrice)}
                        </span>
                      </div>

                      <div className="pt-2">
                        <input
                          type="range"
                          min="500000"
                          max="4000000"
                          step="50000"
                          value={purchasePrice}
                          onChange={(e) => setPurchasePrice(Number(e.target.value))}
                          className="w-full h-1.5 bg-[var(--navy)] rounded-lg appearance-none cursor-pointer accent-[var(--gold)] focus:outline-none"
                          style={{
                            background: `linear-gradient(to right, var(--gold) 0%, var(--gold) ${
                              ((purchasePrice - 500000) / (4000000 - 500000)) * 100
                            }%, rgba(201, 157, 78, 0.1) ${
                              ((purchasePrice - 500000) / (4000000 - 500000)) * 100
                            }%, rgba(201, 157, 78, 0.1) 100%)`,
                          }}
                        />
                        <div className="flex justify-between text-[9px] font-mono text-[var(--cream)]/40 pt-1.5">
                          <span>$500k min</span>
                          <span>$4.0M max</span>
                        </div>
                      </div>
                    </div>

                    {/* Receipt Breakdown */}
                    <div className="bg-[var(--navy)]/80 rounded-lg p-5 border border-[var(--gold)]/15 space-y-3 mb-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--gold)]/5 rounded-bl-full pointer-events-none" />

                      <div className="flex justify-between items-center text-[12px] text-[var(--cream)]/70">
                        <span className="font-light">Gross Acquisition Fee (2%)</span>
                        <span className="font-mono text-[var(--cream)] text-right font-medium">
                          {new Intl.NumberFormat("en-AU", {
                            style: "currency",
                            currency: "AUD",
                            maximumFractionDigits: 0,
                          }).format(Math.max(15000, purchasePrice * 0.02))}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-[12px] text-[var(--cream)]/70">
                        <span className="font-light">Less Engagement Retainer Applied</span>
                        <span className="font-mono text-[var(--gold)] text-right font-medium">
                          -$3,000
                        </span>
                      </div>

                      <div className="border-t border-[var(--gold)]/15 my-2 pt-2" />

                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[13px] font-medium text-[var(--cream)] block">
                            Balance Due on Unconditional
                          </span>
                          <span className="text-[9px] font-mono text-[var(--cream)]/50 uppercase block">
                            ON CONTRACT EXCHANGE
                          </span>
                        </div>
                        <span className="text-xl font-sans font-bold text-[var(--gold)] text-right self-center">
                          {new Intl.NumberFormat("en-AU", {
                            style: "currency",
                            currency: "AUD",
                            maximumFractionDigits: 0,
                          }).format(Math.max(15000, purchasePrice * 0.02) - 3000)}
                        </span>
                      </div>
                    </div>

                    {/* Percentage Bar */}
                    <div className="bg-[#042240] p-3 rounded-lg border border-[var(--gold)]/5 flex justify-between items-center text-[10.5px] font-mono">
                      <span className="text-[var(--cream)]/60">Actual cost of acquisition:</span>
                      <span className="text-[var(--gold)] font-bold">
                        {((Math.max(15000, purchasePrice * 0.02) / purchasePrice) * 100).toFixed(2)}
                        %{" "}
                        <span className="text-[9px] text-[var(--cream)]/45 font-light">
                          of asset value
                        </span>
                      </span>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[var(--gold)]/10 text-center">
                      <p className="text-[10px] font-mono text-[var(--cream)]/45 leading-relaxed">
                        *All fees correspond directly to independent representation. Strictly zero
                        supplier, builder, or vendor commission splits.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* SECTION 5 - WHY IT WORKS */}
      <section className="py-24 md:py-32 bg-[var(--navy-deep)] border-t border-[var(--gold)]/10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            {/* Left Column: Heading & Redesigned List */}
            <div className="lg:col-span-7 space-y-12">
              <Reveal>
                <div className="space-y-4">
                  <Eyebrow>COMPARED TO TRADITIONAL ACQUISITION</Eyebrow>
                  <h2 className="font-serif text-[36px] leading-tight text-[var(--cream)]">
                    Why a documented strategy outperforms <br className="hidden md:inline" />{" "}
                    property-by-property approach.
                  </h2>
                </div>
              </Reveal>

              <ul className="divide-y divide-[var(--cream)]/10 border-y border-[var(--cream)]/10">
                {[
                  {
                    title: "Accountability",
                    desc: "When strategy and acquisition sit with one team, there's no hand-off and no hiding.",
                  },
                  {
                    title: "Intentionality",
                    desc: "Every property is bought to a brief, not a feeling.",
                  },
                  {
                    title: "Continuity",
                    desc: "The Blueprint compounds across acquisitions instead of restarting.",
                  },
                  {
                    title: "Finance Alignment",
                    desc: "Equity strategy is part of the plan, not an afterthought.",
                  },
                ].map((point, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <li className="flex items-start gap-6 py-6 md:py-8 group">
                      {/* Circle Number Badge */}
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-[var(--gold)]/10 border border-[var(--gold)]/20 text-[var(--gold)] font-sans text-sm md:text-md font-semibold shrink-0 transition-colors duration-300 group-hover:bg-[var(--gold)]/20 group-hover:border-[var(--gold)]/35">
                        0{i + 1}
                      </div>

                      {/* Text Column */}
                      <div className="space-y-1 md:space-y-2">
                        <h3 className="font-sans text-[18px] text-[var(--cream)] font-semibold transition-colors duration-300 group-hover:text-[var(--gold)]">
                          {point.title}
                        </h3>
                        <p className="font-sans text-[14px] leading-relaxed text-[var(--cream)]/60 font-light">
                          {point.desc}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>

            {/* Right Column: Stunning Architectural Frame */}
            <div className="lg:col-span-5 w-full flex flex-col">
              <Reveal delay={0.2} className="h-full flex flex-col">
                <div className="relative group overflow-hidden rounded-lg border border-[var(--gold)]/15 shadow-2xl h-full w-full min-h-[400px] lg:min-h-0 flex-1">
                  <img
                    src="/assets/property-4.png"
                    alt="Elevare luxury architectural portfolio property"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-500" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 - CTA */}
      <section
        id="booking"
        className="relative overflow-hidden border-t border-[var(--gold)]/10 bg-[var(--navy-deep)] py-24 md:py-32"
      >
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="/assets/hero-architecture.png"
            alt=""
            aria-hidden
            className="h-full w-full object-cover opacity-20 brightness-[0.55] contrast-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy-deep)] via-[var(--navy-deep)]/92 to-[var(--navy-deep)]/75" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(194,162,75,0.12)_0%,_transparent_65%)]" />
        </div>

        <div className="absolute inset-x-0 top-0 z-10 mx-auto max-w-6xl px-6">
          <div className="gold-rule" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/20 bg-[var(--gold)]/5 px-4 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[var(--gold)]" />
                <span className="text-[9px] font-mono font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                  Next Step
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-serif text-[40px] leading-[1.05] text-[var(--cream)] md:text-[52px]">
                Begin your
                <span className="block italic text-[var(--gold)]">Blueprint engagement.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-xl text-[14px] font-light leading-relaxed text-[var(--cream)]/75">
                Book a free 30-minute Qualifying Call. We&apos;ll assess fit, answer your questions,
                and walk you through how the Blueprint engagement works.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] font-mono uppercase tracking-[0.14em] text-[var(--cream)]/55">
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-[var(--gold)]" />
                  30 minutes
                </span>
                <span className="inline-flex items-center gap-2">
                  <Shield className="h-3.5 w-3.5 text-[var(--gold)]" />
                  No obligation
                </span>
                <span className="inline-flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-[var(--gold)]" />
                  Strategy walkthrough
                </span>
              </div>
            </Reveal>

            <Reveal
              delay={0.4}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <a
                href="/booking"
                className="group inline-flex min-w-[260px] items-center justify-center gap-3 bg-[var(--gold)] px-8 py-4 text-xs font-mono font-bold uppercase tracking-[0.18em] text-[var(--navy-deep)] shadow-[0_12px_40px_rgba(194,162,75,0.25)] transition-all duration-300 hover:scale-[1.02] hover:bg-[var(--gold-soft)]"
                referrerPolicy="no-referrer"
              >
                <span>Book a Qualifying Call</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                to="/booking"
                className="inline-flex min-w-[260px] items-center justify-center gap-2 border border-[var(--cream)]/15 bg-[var(--navy)]/40 px-8 py-4 text-xs font-mono uppercase tracking-[0.18em] text-[var(--cream)] backdrop-blur-sm transition-colors hover:border-[var(--gold)]/40 hover:text-[var(--gold)]"
              >
                View booking details
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

    </main>
  );
}
