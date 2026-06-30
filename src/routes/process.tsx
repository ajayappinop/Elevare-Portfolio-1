import { Navbar } from "@/components/Navbar";
import {
  bodyMutedClass,
  creamBodyClass,
  creamSectionClass,
  Eyebrow,
  h1Class,
  h2Class,
  h2CreamClass,
  leadClass,
  pageShellClass,
  PrimaryCTA,
  Reveal,
  sectionClass,
  SectionContainer,
} from "@/components/brand";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/process")({
  component: ProcessPage,
});

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
    <main className={`${pageShellClass} overflow-hidden`}>
      <Navbar />

      <section className={`relative flex items-center justify-center bg-[var(--navy-deep)] ${sectionClass}`}>
        <SectionContainer narrow className="text-center space-y-6">
          <Reveal>
            <Eyebrow>HOW WE WORK</Eyebrow>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className={h1Class}>
              From Qualifying Call to <br />
              <span className="italic text-[var(--gold)]">portfolio scale.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.35}>
            <p className={`${leadClass} mt-4`}>The seven-step Elevare engagement.</p>
          </Reveal>
        </SectionContainer>
      </section>

      <section className={`relative bg-[var(--navy)] ${sectionClass}`}>
        <SectionContainer narrow>
          <Reveal>
            <Eyebrow>THE PROCESS</Eyebrow>
            <h2 className={`${h2Class} mb-16`}>The Steps</h2>
          </Reveal>

          <div className="relative space-y-12">
            <div className="absolute left-[19px] top-4 bottom-4 hidden w-px bg-[var(--cream)]/10 md:block" />

            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.1}>
                <div className="relative pl-12 md:pl-20">
                  <div className="absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--cream)]/20 bg-[var(--navy)]">
                    <span className="font-serif text-sm text-[var(--gold)]">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-normal text-[var(--cream)]">
                      {step.title}
                    </h3>
                    <p className={`${bodyMutedClass} max-w-xl`}>{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className={`${creamSectionClass} ${sectionClass}`}>
        <SectionContainer narrow className="space-y-8 text-center">
          <h2 className={h2CreamClass}>Finance woven through every stage.</h2>
          <p className={`${creamBodyClass} text-base md:text-lg`}>
            Mortgage Only — our specialist investor finance arm — is not a referral partner bolted
            on at the finance moment. They sit inside the engagement from the Qualifying Call
            onward, structuring borrowing capacity, lender selection, pre-approval, settlement, and
            the annual equity review. Existing brokers welcome — we work alongside them when needed.
          </p>
        </SectionContainer>
      </section>

      <section className={`border-t border-[var(--gold)]/10 bg-[var(--navy-deep)] text-center ${sectionClass}`}>
        <SectionContainer narrow>
          <Reveal>
            <PrimaryCTA href="/booking" />
          </Reveal>
        </SectionContainer>
      </section>
    </main>
  );
}
