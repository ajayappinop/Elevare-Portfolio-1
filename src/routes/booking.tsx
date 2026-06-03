import { Navbar } from "@/components/Navbar";
import { createFileRoute } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";

import { InlineWidget } from "react-calendly";

export const Route = createFileRoute("/booking")({
  component: BookingPage,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
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

function BookingPage() {
  return (
    <main className="bg-[var(--navy)] text-[var(--cream)] min-h-screen selection:bg-[var(--gold)]/30 selection:text-white">
      <Navbar />

      <section className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column: Content */}
            <div className="space-y-12">
              <div className="space-y-4">
                <Reveal>
                  <Eyebrow>START HERE</Eyebrow>
                </Reveal>
                <Reveal delay={0.1}>
                  <h1 className="font-serif text-[40px] md:text-[56px] leading-[1.05] tracking-tight text-white font-light">
                    Book a Qualifying Call.
                  </h1>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="text-xl text-[var(--cream)]/60 font-light">
                    30 minutes. Free. No obligation.
                  </p>
                </Reveal>
              </div>

              <div className="space-y-6 text-[var(--cream)]/70 font-light leading-relaxed">
                <Reveal delay={0.3}>
                  <p>
                    The Qualifying Call is a 30-minute conversation to assess fit and answer your
                    questions. We'll cover your portfolio goals, your current position, and how the
                    Blueprint engagement would work in your situation.
                  </p>
                </Reveal>
                <Reveal delay={0.4}>
                  <p>
                    If we're the right partner for you, we'll walk you through next steps. If we're
                    not, we'll tell you what we'd do instead. Either way, you leave the call with
                    clarity.
                  </p>
                </Reveal>
              </div>

              <div className="space-y-6">
                <h3 className="font-serif text-xl text-white">What you'll leave the call with:</h3>
                <ul className="space-y-3">
                  {[
                    "A clear understanding of how the Blueprint engagement works",
                    "An honest assessment of fit — yes, no, or “not yet”",
                    "Indicative borrowing capacity context (if Mortgage Only is brought in)",
                    "Next-step clarity, with or without us",
                  ].map((item, i) => (
                    <Reveal key={i} delay={0.5 + i * 0.1}>
                      <li className="flex items-start gap-3 text-sm font-light text-[var(--cream)]/80">
                        <span className="text-[var(--gold)] mt-1">•</span>
                        {item}
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Widget */}
            <Reveal delay={0.5}>
              <div className="bg-white rounded-lg shadow-2xl h-auto overflow-hidden">
                <InlineWidget
                  url="https://calendly.com/elevare"
                  styles={{ height: "700px" }}
                  pageSettings={{
                    backgroundColor: "ffffff",
                    hideEventTypeDetails: false,
                    hideLandingPageDetails: false,
                    primaryColor: "c99d4e",
                    textColor: "05101e",
                  }}
                />
              </div>

              <div className="mt-8 flex flex-col gap-4 text-sm font-light text-[var(--cream)]/60">
                <p>Alternatively, reach out directly:</p>
                <a
                  href="mailto:hello@elevareportfolio.com.au"
                  className="text-white hover:text-[var(--gold)] transition-colors"
                >
                  hello@elevareportfolio.com.au
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
