import { Navbar } from "@/components/Navbar";
import {
  bodyClass,
  bodyMutedClass,
  Eyebrow,
  h1Class,
  leadClass,
  pageShellClass,
  Reveal,
  sectionClass,
  SectionContainer,
} from "@/components/brand";
import { createFileRoute } from "@tanstack/react-router";
import { InlineWidget } from "react-calendly";

export const Route = createFileRoute("/booking")({
  component: BookingPage,
});

function BookingPage() {
  return (
    <main className={pageShellClass}>
      <Navbar />

      <section className={sectionClass}>
        <SectionContainer>
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <div className="space-y-12">
              <div className="space-y-4">
                <Reveal>
                  <Eyebrow>START HERE</Eyebrow>
                </Reveal>
                <Reveal delay={0.1}>
                  <h1 className={h1Class}>Book a Qualifying Call.</h1>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className={leadClass}>30 minutes. Free. No obligation.</p>
                </Reveal>
              </div>

              <div className={`space-y-6 ${bodyMutedClass}`}>
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
                <h3 className="font-serif text-xl text-[var(--cream)]">
                  What you'll leave the call with:
                </h3>
                <ul className="space-y-3">
                  {[
                    "A clear understanding of how the Blueprint engagement works",
                    "An honest assessment of fit — yes, no, or “not yet”",
                    "Indicative borrowing capacity context (if Mortgage Only is brought in)",
                    "Next-step clarity, with or without us",
                  ].map((item, i) => (
                    <Reveal key={item} delay={0.5 + i * 0.1}>
                      <li className={`flex items-start gap-3 ${bodyClass}`}>
                        <span className="mt-1 text-[var(--gold)]">•</span>
                        {item}
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>

            <Reveal delay={0.5}>
              <div className="h-auto overflow-hidden rounded-lg bg-white shadow-2xl">
                <InlineWidget
                  url="https://calendly.com/elevare"
                  styles={{ height: "700px" }}
                  pageSettings={{
                    backgroundColor: "ffffff",
                    hideEventTypeDetails: false,
                    hideLandingPageDetails: false,
                    primaryColor: "c2a24b",
                    textColor: "0b1f3a",
                  }}
                />
              </div>

              <div className={`mt-8 flex flex-col gap-4 text-sm font-light text-[var(--cream)]/60`}>
                <p>Alternatively, reach out directly:</p>
                <a
                  href="mailto:hello@elevareportfolio.com.au"
                  className="text-[var(--cream)] transition-colors hover:text-[var(--gold)]"
                >
                  hello@elevareportfolio.com.au
                </a>
              </div>
            </Reveal>
          </div>
        </SectionContainer>
      </section>
    </main>
  );
}
