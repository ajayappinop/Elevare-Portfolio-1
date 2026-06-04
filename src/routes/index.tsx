import { Navbar } from "@/components/Navbar";
import { Eyebrow, pageShellClass, Reveal, SectionDivider } from "@/components/brand";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroImg = "/assets/hero-architecture.png";
const founderImg = "/assets/founder-portrait.png";
const blueprintImg = "/assets/blueprint-abstract.png";
const property1 = "/assets/property-1.png";
const property2 = "/assets/property-2.png";
const property3 = "/assets/property-3.png";
const property4 = "/assets/property-4.png";
const logo = "/assets/logo.png";
const differentiator = "/assets/differentiator.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elevare Portfolio — Architects of Investor Portfolios" },
      {
        name: "description",
        content:
          "Strategy-led buyers agency for investors building and scaling property portfolios. Every acquisition is driven by your Portfolio Blueprint.",
      },
      { property: "og:title", content: "Elevare Portfolio — Architects of Investor Portfolios" },
      {
        property: "og:description",
        content: "Strategy-led acquisition. Built for portfolio scale.",
      },
    ],
  }),
  component: Index,
});

const CTA_LABEL = "Book a Qualifying Call";

function CTAButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="#contact"
      className={`inline-flex items-center gap-3 bg-[var(--gold)] text-[var(--navy-deep)] px-8 py-4 text-sm tracking-[0.18em] uppercase font-medium hover:bg-[var(--gold-soft)] transition-colors ${className}`}
    >
      {CTA_LABEL}
      <span aria-hidden>→</span>
    </a>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [current, setCurrent] = useState(0);

  const slides = [
    { img: heroImg, caption: "Signature Architectural Acquisition" },
    { img: property1, caption: "Infill Scarcity · Brunswick, VIC" },
    { img: property2, caption: "Inner-City Renter Pool · West End, QLD" },
    { img: property3, caption: "Coastal Capital Growth · North Fremantle, WA" },
    { img: property4, caption: "Heritage Stock Constraints · Newtown, NSW" },
  ];

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Auto-play the slider every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === 4 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background Slides with Framer Motion AnimatePresence cross-fade */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <AnimatePresence mode="popLayout">
          <motion.img
            key={current}
            src={slides[current].img}
            alt="Elevare luxury architecture background"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy-deep)]/90 via-[var(--navy-deep)]/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(194,162,123,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      </motion.div>

      {/* Slide Caption - Bottom Left */}
      <div className="absolute bottom-8 left-6 sm:left-12 z-20 flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
        <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-[var(--cream)]/60">
          Background: {slides[current].caption}
        </span>
      </div>

      {/* Right Vertical Slider Navigation */}
      <div className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-20">
        {/* Dynamic Indicator Number */}
        <div className="text-[11px] font-mono tracking-[0.2em] text-[var(--gold)]">
          0{current + 1}
        </div>

        {/* Vertical Progress Line with Active Notch */}
        <div className="relative w-[1px] h-24 bg-[var(--gold)]/20 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-[1px] bg-[var(--gold)]"
            initial={false}
            animate={{
              height: `${100 / slides.length}%`,
              y: `${current * ((24 / (slides.length - 1)) * 3)}px`, // scaled position
            }}
            style={{
              height: `${100 / slides.length}%`,
              transform: `translateY(${current * 100}%)`,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        <div className="text-[11px] font-mono tracking-[0.2em] text-[var(--cream)]/40">
          0{slides.length}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="w-10 h-10 rounded-full border border-[var(--gold)]/20 hover:border-[var(--gold)] text-[var(--cream)]/75 hover:text-[var(--gold)] flex items-center justify-center transition-all bg-[var(--navy-deep)]/40 backdrop-blur-md active:scale-95 group cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="w-10 h-10 rounded-full border border-[var(--gold)]/20 hover:border-[var(--gold)] text-[var(--cream)]/75 hover:text-[var(--gold)] flex items-center justify-center transition-all bg-[var(--navy-deep)]/40 backdrop-blur-md active:scale-95 group cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      <motion.div
        style={{ opacity }}
        className="relative mx-auto max-w-7xl px-6 sm:px-12 pt-32 pb-20 w-full z-10"
      >
        <div className="relative w-full max-w-full mx-auto p-6 md:p-12 flex flex-col items-center justify-center text-center">
          {/* Background Outline Frame */}
          <div className="absolute inset-0 border border-[var(--cream)]/15 -z-10" />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] font-medium">
              Strategy-led Buyers Agency
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="font-cormorant font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-[var(--cream)] tracking-tight mb-0 text-center"
          >
            Architects of investor portfolios.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-serif italic text-[36px] text-[var(--gold)] mt-6 text-center"
          >
            Strategy. Acquisition. Scale.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base md:text-lg text-[var(--cream)]/70 mt-6 leading-relaxed max-w-xl font-light text-center mx-auto"
          >
            Elevare is a strategy-led buyers agency for investors building and scaling property
            portfolios. Every acquisition is driven by your Portfolio Blueprint — strategy and
            execution under one engagement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10"
          >
            <CTAButton className="!px-8 !py-4 font-bold !tracking-wide hover:!bg-[var(--gold-soft)]" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Differentiator() {
  return (
    <section className="py-28 md:py-40 bg-[var(--cream)] text-[var(--navy-deep)]">
      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-12 gap-12 md:gap-16 items-center">
        {/* Left Side: Modern Sketch Blueprint & House Image */}
        <Reveal className="lg:col-span-5 relative group">
          <div className="relative w-full">
            <motion.img
              src={differentiator}
              alt="Elevare Blueprint & Portfolio Architecture sketch"
              className="w-full h-auto"
              loading="lazy"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>
        </Reveal>

        {/* Right Side: Content Block */}
        <Reveal delay={0.15} className="lg:col-span-7 space-y-8">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--navy)] font-medium opacity-70">
              The Differentiator
            </p>
            <h2 className="font-serif text-[36px] leading-[1.2] mt-6 text-[var(--navy-deep)] tracking-tight">
              <span className="block">Most buyers agents find you a property.</span>
              <span className="block text-[var(--gold)] italic mt-3">
                We build you a portfolio.
              </span>
            </h2>
          </div>
          <div className="space-y-6 text-[var(--navy-deep)]/80 leading-relaxed text-[14px]">
            <p className="text-[14px]">
              The difference between investing and accumulation is strategy. Generic buyers agents
              will find you a property that meets a brief. Strategy-led acquisition means every
              property is bought against a documented Portfolio Blueprint — a plan that defines what
              you're building, why this property, why now, and how it fits a 10-year scaling arc.
            </p>
            <p className="text-[14px]">
              We sit in one chair, not two. The same team that builds your strategy executes the
              acquisition. That makes the strategy accountable, and it makes every acquisition
              intentional.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Blueprint() {
  return (
    <section
      id="blueprint"
      className="relative py-28 md:py-40 bg-[var(--navy-deep)] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20">
        <img src={blueprintImg} alt="" className="w-full h-full object-cover object-center" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <Eyebrow>Where every engagement starts</Eyebrow>
            <h2 className="font-serif text-[36px] leading-[1.05] mt-6 text-[var(--cream)]">
              The Elevare Portfolio <span className="italic text-[var(--gold)]">Blueprint.</span>
            </h2>
            <div className="mt-10 space-y-6 text-[var(--cream)]/75 leading-relaxed max-w-2xl text-[14px]">
              <p>
                Your Blueprint is a documented strategy for building and scaling your property
                portfolio. Eight sections, 25 pages, delivered through a 90-minute strategy
                walkthrough. It defines your portfolio thesis, capacity, geographic strategy, suburb
                shortlist, stage plan, risk profile, finance structuring, and a 90-day action plan.
              </p>
              <p>
                It is the single most important document an investor can own. It directs every
                acquisition we run together — and is revised before each subsequent purchase.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 mt-10 text-sm tracking-[0.2em] uppercase text-[var(--gold)] border-b border-[var(--gold)]/40 pb-2 hover:border-[var(--gold)] transition"
            >
              Learn more about the Blueprint →
            </a>
          </div>
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="border border-[var(--gold)]/30 bg-[var(--navy)]/60 backdrop-blur p-8 md:p-10"
            >
              <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-6">
                Eight Sections
              </p>
              <ul className="space-y-4 text-[var(--cream)]/80 text-sm">
                {[
                  "Investor Profile & Goals",
                  "Borrowing Capacity & Finance Path",
                  "Portfolio Thesis",
                  "Suburb Shortlist (HTAG-backed)",
                  "Stage Plan & Sequencing",
                  "Risk Profile & Mitigation",
                  "Finance Structuring",
                  "90-Day Action Plan",
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
                    className="flex gap-4 border-b border-[var(--gold)]/10 pb-4 last:border-0 last:pb-0 hover:text-[var(--gold)] transition-colors"
                  >
                    <span className="font-serif text-[var(--gold)] text-lg leading-none w-6">
                      0{i + 1}
                    </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const steps = [
    {
      n: "01",
      phase: "Step I",
      title: "Strategy",
      subtitle: "STRATEGY",
      body: "We construct your bespoke Portfolio Blueprint. A documented, mathematically modeled masterplan of what you are scaling, why, and how, aligned with your long-term wealth horizon.",
    },
    {
      n: "02",
      phase: "Step II",
      title: "Acquisition",
      subtitle: "ACQUISITION",
      body: "We execute seamlessly against your Blueprint. This involves sourcing off-market assets, conducting stringent physical and financial due diligence, and acquiring the property under superior terms while Mortgage Only structures the multi-tier lending.",
    },
    {
      n: "03",
      phase: "Step III",
      title: "Scale",
      subtitle: "SCALE",
      body: "Your Blueprint is audited and revised before each subsequent purchase. This continuous feedback loop of equity extraction, market analysis, and risk mitigation guarantees you scale efficiently without structural dead-ends.",
    },
  ];

  return (
    <section
      id="process"
      className="py-28 md:py-40 bg-[var(--navy-deep)] border-t border-[var(--gold)]/10 relative overflow-hidden"
    >
      {/* Background drafting circle accent */}
      <div
        className="absolute right-0 top-1/4 w-[400px] h-[400px] rounded-full border border-[var(--gold)]/5 pointer-events-none -mr-48 animate-pulse"
        style={{ animationDuration: "12s" }}
      />
      <div className="absolute left-10 bottom-10 w-[200px] h-[200px] rounded-full border border-[var(--gold)]/5 pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Sticky Section Headings */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
            <div>
              <Eyebrow>How we work</Eyebrow>
              <h2 className="font-serif text-[42px] leading-[1.1] mt-6 text-[var(--cream)] tracking-tight">
                From strategy to <span className="italic text-[var(--gold)]">scale.</span>
              </h2>
              <p className="mt-6 text-sm text-[var(--cream)]/60 leading-relaxed font-light">
                Our three-stage methodology takes you from tactical accumulation to modern
                institutional performance. We don't search for properties until we've engineered
                your portfolio's complete financial architecture.
              </p>
            </div>

            {/* Interactive Timeline Indicators for Desktop */}
            <div className="hidden lg:block space-y-4 pt-6 border-t border-[var(--gold)]/10">
              {steps.map((s, idx) => (
                <div
                  key={s.n}
                  className="flex items-center gap-4 transition-all duration-300"
                  style={{ opacity: hoveredIdx === null || hoveredIdx === idx ? 1 : 0.4 }}
                >
                  <span
                    className={`font-mono text-xs ${hoveredIdx === idx ? "text-[var(--gold)] font-bold" : "text-[var(--cream)]/45"}`}
                  >
                    {s.n}
                  </span>
                  <div
                    className={`h-[1px] transition-all duration-300 ${hoveredIdx === idx ? "w-8 bg-[var(--gold)]" : "w-4 bg-[var(--cream)]/20"}`}
                  />
                  <span
                    className={`text-[11px] tracking-widest uppercase transition-colors duration-300 ${hoveredIdx === idx ? "text-[var(--cream)] font-semibold" : "text-[var(--cream)]/45"}`}
                  >
                    {s.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[var(--gold)] border-b border-[var(--gold)]/30 pb-1 hover:border-[var(--gold)] transition"
              >
                Inquire about our process →
              </a>
            </div>
          </div>

          {/* Right Column: Redesigned Steps Timeline */}
          <div className="lg:col-span-8 relative pl-8 md:pl-16">
            {/* The Vertical Connection Line */}
            <div className="absolute left-[16px] md:left-[32px] top-10 bottom-10 w-[1px] bg-gradient-to-b from-[var(--gold)]/40 via-[var(--gold)]/15 to-[var(--gold)]/5" />

            <div className="space-y-12 md:space-y-16">
              {steps.map((s, idx) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: idx * 0.15 }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="relative group cursor-default"
                >
                  {/* Timeline Node Point */}
                  <div className="absolute left-[-16px] -translate-x-1/2 md:left-[-32px] md:-translate-x-1/2 top-3 w-3 h-3 rounded-full bg-[var(--gold)] border border-[var(--navy-deep)] flex items-center justify-center transition-all duration-300 group-hover:scale-120 group-hover:bg-[var(--cream)] z-10">
                    <div
                      className="absolute w-[20px] h-[20px] rounded-full border border-[var(--gold)]/0 group-hover:border-[var(--gold)]/40 animate-ping opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ animationDuration: "1.5s" }}
                    />
                  </div>

                  <div className="bg-[var(--navy)]/35 border border-[var(--cream)]/5 p-8 md:p-10 rounded-sm hover:border-[var(--gold)]/20 transition-all duration-300 shadow-xl relative overflow-hidden backdrop-blur-sm">
                    {/* Corner golden accent that shows on hover */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-t-[8px] border-r-[8px] border-t-transparent border-r-transparent group-hover:border-t-[var(--gold)]/40 group-hover:border-r-[var(--gold)]/40 transition-all duration-300" />

                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-6">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs tracking-widest text-[var(--gold)] uppercase bg-[var(--gold)]/5 px-2.5 py-1 rounded-sm border border-[var(--gold)]/15 font-bold">
                          {s.phase}
                        </span>
                      </div>
                      <div className="font-serif text-[var(--gold)]/15 text-3xl md:text-4xl pr-2 tracking-tighter hover:text-[var(--gold)]/30 transition-colors">
                        {s.n}
                      </div>
                    </div>

                    <h3 className="font-serif text-[24px] text-[var(--cream)] mb-4 tracking-tight group-hover:text-[var(--gold)] transition-colors duration-350">
                      {s.title}
                    </h3>

                    <p className="text-[var(--cream)]/70 leading-relaxed text-[13.5px] font-light max-w-2xl">
                      {s.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Audience() {
  return (
    <section className="py-24 md:py-32 bg-[var(--cream)] text-[var(--navy-deep)] overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Asymmetrical Collage */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 md:gap-6 relative">
            {/* Tall Vertical Column (Left) */}
            <div className="pt-16 md:pt-20 select-none">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative overflow-hidden rounded-sm shadow-lg group"
              >
                <img
                  src={property4}
                  alt="Modern interior architecture vertical view"
                  className="w-full h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </motion.div>
            </div>

            {/* Right Column of Collage */}
            <div className="space-y-4 md:space-y-6">
              {/* Burnt Orange Phone Panel */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[var(--gold)] text-[var(--navy-deep)] p-3 rounded-sm shadow-md flex items-center gap-4 group hover:bg-[var(--gold-soft)] transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--navy-deep)]/10 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-[var(--navy-deep)] fill-[var(--navy-deep)]"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27 11.72 11.72 0 003.79.6 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.6 3.79 1 1 0 01-.27 1.11l-2.2 2.2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-wider uppercase text-[var(--navy-deep)]/80 shrink-0">
                    Call to Anytime
                  </p>
                  <p className="text-sm md:text-md font-serif font-semibold tracking-tight whitespace-nowrap mt-1">
                    +92 3800 8060
                  </p>
                </div>
              </motion.div>

              {/* Top Image: Skyscraper */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="relative overflow-hidden rounded-sm shadow-lg group"
              >
                <img
                  src={property1}
                  alt="Modern skyscraper exterior"
                  className="w-full h-[220px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </motion.div>

              {/* Bottom Image: Curved Interior Scenery */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative overflow-hidden rounded-sm shadow-lg group"
              >
                <img
                  src={property3}
                  alt="Elegant interior lounge with wooden ceiling arches"
                  className="w-full h-[220px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </motion.div>
            </div>
          </div>

          {/* Right Column: About Us Copy + Interactive list */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-[1px] bg-[var(--gold)]" />
                  <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--gold)] font-semibold">
                    Audience block
                  </span>
                </div>
                <h2 className="font-serif text-[38px] md:text-[46px] leading-[1.15] text-[var(--navy-deep)] tracking-tight">
                  Built for investors with <br className="hidden md:inline" />
                  portfolio ambition.
                </h2>
                <p className="text-[14px] leading-relaxed text-[var(--navy-deep)]/75 mt-4 max-w-xl">
                  Elevare is for serious investors — first-time buyers ready to plan beyond one
                  property, mid-portfolio investors who have hit a structural wall, and
                  high-net-worth professionals scaling to a multi-million dollar portfolio. If you
                  are buying property without a documented plan, you are not investing — you are
                  accumulating.
                </p>
              </div>
            </Reveal>

            {/* Stamp + Diamond Bullets Row */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-8 md:gap-10">
              {/* Badge Group */}
              <div className="flex items-center justify-center shrink-0 bg-[#001c3a] p-4 rounded-xl border border-[var(--gold)]/20 shadow-md">
                {/* Vintage Circular Text Path Badge */}
                <div className="relative w-20 h-20 shrink-0">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full select-none animate-[spin_20s_linear_infinite] origin-center"
                    style={{ transformOrigin: "center" }}
                  >
                    <path
                      id="stampTextPath"
                      d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                      fill="none"
                    />
                    <text className="text-[8.5px] font-sans uppercase fill-[var(--cream)] tracking-[0.14em] font-semibold">
                      <textPath href="#stampTextPath" startOffset="0%">
                        • ELEVARE PORTFOLIO • STRATEGY • SCALE
                      </textPath>
                    </text>
                  </svg>
                  {/* Central company logo image */}
                  <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center p-1">
                    <img
                      src={logo}
                      alt="Elevare Portfolio logo"
                      className="w-8 h-8 object-contain rounded-full shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Vertical divider on screen sizes >= sm */}
              <div className="hidden sm:block w-[1px] h-16 bg-black/10" />

              {/* Core Features Diamonds list */}
              <ul className="space-y-3.5 text-left text-[14px] text-[var(--navy-deep)]/85 font-medium tracking-tight">
                <li className="flex items-center gap-3">
                  <span className="text-[var(--gold)] font-semibold text-xs animate-pulse select-none">
                    ◆
                  </span>
                  <span>Trusted Market Expertise</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[var(--gold)] font-semibold text-xs animate-pulse select-none">
                    ◆
                  </span>
                  <span>Regional Market Knowledge</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[var(--gold)] font-semibold text-xs animate-pulse select-none">
                    ◆
                  </span>
                  <span>Clear Pricing & Documentation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ecosystem() {
  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      {/* Background Image Wrapper */}
      <div className="absolute inset-0 z-0">
        <img
          src={property1}
          alt="Abstract architectural background"
          className="w-full h-full object-cover"
        />
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-[#001c3a]/85" />
      </div>

      <div className="mx-auto max-w-5xl px-6 relative z-10">
        <div className="border border-[var(--gold)]/10 bg-[var(--navy-deep)]/40 backdrop-blur rounded-lg overflow-hidden grid lg:grid-cols-12">
          {/* Left Visual Accent Column */}
          <div className="lg:col-span-5 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[var(--gold)]/10 flex flex-col justify-between bg-[var(--navy-deep)]/[0.6] relative group">
            {/* Corner Bracket Accents for architectural blueprint aesthetic */}
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
              <h2 className="font-serif text-[32px] md:text-[38px] leading-[1.15] text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors duration-500">
                Finance powered by <br />
                <span className="italic text-[var(--gold)] group-hover:text-[var(--cream)] transition-colors duration-500">
                  Mortgage Only.
                </span>
              </h2>
            </div>

            <div className="mt-12 lg:mt-24 pt-4 border-t border-[var(--gold)]/10 text-[10px] font-mono tracking-widest text-[var(--cream)]/30 uppercase">
              STRATEGY-LED BORROWING
            </div>
          </div>

          {/* Right Copy and Action Column */}
          <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between space-y-8 bg-[var(--navy)]/30">
            <div className="space-y-6">
              {/* Decorative design line */}
              <div className="w-12 h-[1px] bg-[var(--gold)]/30" />
              <p className="text-[var(--cream)]/75 leading-relaxed text-[14px]">
                Every Blueprint is structured against a real finance path. Mortgage Only — our
                specialist investor finance arm — sits inside every engagement, structuring
                borrowing capacity, lender strategy, and equity extraction across the full
                portfolio. Existing brokers are welcome; we'll work alongside them.
              </p>
            </div>

            <div className="pt-4">
              <a
                href="https://mortgageonly.com.au"
                className="group inline-flex items-center gap-6 text-sm tracking-[0.2em] font-serif uppercase text-[var(--gold)] pb-2 border-b border-[var(--gold)]/20 hover:border-[var(--gold)] transition-all duration-300"
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
  );
}

function Founder() {
  return (
    <section id="founder" className="py-28 md:py-40 bg-[var(--navy-deep)]">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative aspect-[4/5] overflow-hidden group"
          >
            <motion.img
              src={founderImg}
              alt="Tarun Sanghi, Founder of Elevare Portfolio"
              className="w-full h-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)]/60 via-transparent to-transparent" />
            <div className="absolute inset-0 ring-1 ring-[var(--gold)]/20" />
            <div className="absolute -bottom-px -right-px w-20 h-20 border-b-2 border-r-2 border-[var(--gold)]" />
          </motion.div>
        </div>
        <div className="md:col-span-7 md:pl-8">
          <Eyebrow>Founder</Eyebrow>
          <h2 className="font-serif text-[36px] leading-[1.1] mt-6 text-[var(--cream)]">
            Led by <span className="italic text-[var(--gold)]">Tarun Sanghi.</span>
          </h2>
          <p className="mt-8 text-[var(--cream)]/75 leading-relaxed text-[14px]">
            Tarun is the founder of Elevare Portfolio and Mortgage Only — building an ecosystem that
            helps Australians create generational wealth through property. Two decades across
            finance and acquisition, structured around one conviction: portfolios are designed, not
            stumbled into.
          </p>
          <a
            href="/about"
            className="inline-block mt-10 text-sm tracking-[0.2em] uppercase text-[var(--gold)] border-b border-[var(--gold)]/40 pb-2 hover:border-[var(--gold)]"
          >
            About Tarun →
          </a>
        </div>
      </div>
    </section>
  );
}

function FooterCTA() {
  return (
    <section id="contact" className="py-10 text-center relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 mx-auto max-w-6xl px-6">
        <div className="gold-rule" />
      </div>
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="font-serif text-[48px] leading-[1.05] mt-6 text-[var(--cream)]">
          Ready to scale your portfolio
          <span className="block italic text-[var(--gold)]">with intent?</span>
        </h2>
        <p className="mt-8 text-[14px] text-[var(--cream)]/75 leading-relaxed max-w-lg mx-auto">
          Book a free 30-minute Qualifying Call. We'll assess fit, answer your questions, and walk
          you through how the Blueprint engagement works.
        </p>
        <div className="mt-12 flex justify-center">
          <CTAButton />
        </div>
      </div>
    </section>
  );
}

function MarqueeStrip() {
  const items = [
    "Strategy-led",
    "Portfolio Blueprint",
    "HTAG-backed data",
    "Integrated finance",
    "10-year scaling arc",
    "Accountable execution",
  ];
  const loop = [...items, ...items, ...items];
  return (
    <section
      aria-hidden
      className="py-10 border-y border-[var(--gold)]/15 overflow-hidden bg-[var(--navy-deep)]"
    >
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((t, i) => (
          <span
            key={i}
            className="font-serif italic text-2xl md:text-4xl text-[var(--cream)]/80 flex items-center gap-16"
          >
            {t}
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--gold)]" />
          </span>
        ))}
      </motion.div>
    </section>
  );
}

function Index() {
  return (
    <main className={`${pageShellClass} min-h-screen`}>
      <Navbar />
      <Hero />
      <SectionDivider />
      <Differentiator />
      <Blueprint />
      <Process />
      <Audience />
      <Ecosystem />
      <Founder />
      <FooterCTA />
    </main>
  );
}
