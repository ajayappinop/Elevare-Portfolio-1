import { Navbar } from "@/components/Navbar";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles, ChevronRight, Check } from "lucide-react";

export const Route = createFileRoute("/process")({
  component: ProcessPage,
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

const steps = [
  {
    title: "Qualifying Call",
    desc: "Free, 30 minutes. We assess fit, answer your questions, and walk you through how the Blueprint engagement works. If we're not the right partner for you, we'll say so.",
  },
  {
    title: "Engagement",
    desc: "$3k retainer signed. Onboarding pack issued. Blueprint work begins. You're introduced to Mortgage Only for borrowing capacity assessment if you don't have an existing broker.",
  },
  {
    title: "Blueprint Delivered",
    desc: "Your full Portfolio Blueprint is delivered in a 90-minute strategy walkthrough with Tarun. You leave the meeting with the document, the strategy, and the brief for Acquisition 1.",
  },
  {
    title: "Acquisition",
    desc: "We execute the Acquisition Brief — search, due diligence, negotiation, contract. Mortgage Only structures finance in parallel. The acquisition balance fee is triggered on unconditional contract.",
  },
  {
    title: "Settlement & Hold",
    desc: "Settlement is the start of the next phase, not the end. We stay engaged. Mortgage Only runs your 12-month finance review. You begin building toward Acquisition 2.",
  },
  {
    title: "Blueprint Revision",
    desc: "Before each subsequent acquisition, your Blueprint is revised against new borrowing capacity, new market conditions, and any change in your portfolio thesis.",
  },
  {
    title: "Next Acquisition",
    desc: "The cycle repeats. One relationship, multiple acquisitions, one compounding plan. Most Elevare clients work with us across a 5–8 year scaling arc.",
  },
];

function ProcessPage() {
  return (
    <main className="bg-[var(--navy)] text-[var(--cream)] min-h-screen pt-24 selection:bg-[var(--gold)]/30 selection:text-white overflow-hidden">
      <Navbar />

      {/* SECTION 1 - HEADER */}
      <section className="relative py-24 sm:py-32 flex items-center justify-center bg-[var(--navy-deep)]">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
          <Reveal>
            <Eyebrow>HOW WE WORK</Eyebrow>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="font-serif text-[48px] sm:text-[64px] leading-[1.05] tracking-tight text-white font-light">
              From Qualifying Call to <br />
              <span className="italic text-[var(--gold)]">portfolio scale.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="text-xl text-[var(--cream)]/60 font-light mt-4">
              The seven-step Elevare engagement.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SECTION 2 - THE STEPS */}
      <section className="py-24 md:py-32 bg-[var(--navy)] relative">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <Eyebrow>THE PROCESS</Eyebrow>
            <h2 className="font-serif text-[40px] text-white font-light mb-16">The Steps</h2>
          </Reveal>

          <div className="space-y-12 relative">
            {/* Timeline Line */}
            <div className="absolute left-[19px] top-4 bottom-4 w-[1px] bg-white/10 hidden md:block" />

            {steps.map((step, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="relative pl-12 md:pl-20">
                  {/* Timeline Node */}
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[var(--navy)] border border-white/20 flex items-center justify-center z-10">
                    <span className="font-serif text-sm text-[var(--gold)]">0{index + 1}</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-serif text-white font-normal">{step.title}</h3>
                    <p className="text-[15px] text-[var(--cream)]/70 leading-relaxed font-light max-w-xl">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - MORTGAGE ONLY */}
      <section className="py-24 bg-[#f6f1e9] text-stone-900">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-8">
          <h2 className="font-serif text-4xl font-light">Finance woven through every stage.</h2>
          <p className="text-lg text-stone-700 leading-relaxed font-light">
            Mortgage Only — our specialist investor finance arm — is not a referral partner bolted
            on at the finance moment. They sit inside the engagement from the Qualifying Call
            onward, structuring borrowing capacity, lender selection, pre-approval, settlement, and
            the annual equity review. Existing brokers welcome — we work alongside them when needed.
          </p>
        </div>
      </section>

      {/* SECTION 4 - CTA */}
      <section className="py-24 text-center bg-[var(--navy-deep)]">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <a
              href="https://calendly.com/elevare"
              className="inline-flex items-center justify-center gap-3 bg-[var(--gold)] text-[var(--navy-deep)] px-8 py-4 text-sm font-mono tracking-[0.18em] uppercase font-bold hover:bg-[var(--gold-soft)] transition-colors rounded shadow-md group"
              referrerPolicy="no-referrer"
            >
              <span>Book a Qualifying Call</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
