import { Navbar } from "@/components/Navbar";
import { VexurWidget } from "@/components/VexurWidget";
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
  SectionDivider,
} from "@/components/brand";
import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { VEXUR_CALENDAR_PARAMS } from "@/lib/vexur";

export const Route = createFileRoute("/booking")({
  component: BookingPage,
});

const outcomes = [
  "A clear understanding of how the Blueprint engagement works",
  "An honest assessment of fit — yes, no, or “not yet”",
  "Indicative borrowing capacity context (if Mortgage Only is brought in)",
  "Next-step clarity, with or without us",
];

function BookingPage() {
  return (
    <main className={pageShellClass}>
      <Navbar />

      <section className="relative overflow-hidden bg-[var(--navy-deep)] pb-16 pt-8 md:pb-20">
        <div className="pointer-events-none absolute inset-0 select-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(194,162,75,0.14)_0%,_transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(11,31,58,0.4)_0%,_transparent_60%)]" />
        </div>

        <SectionContainer className="relative z-10">
          <SectionDivider className="mb-12 px-0" />
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow>START HERE</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className={`${h1Class} mt-4`}>
                Book a Qualifying Call
                <span className="mt-2 block font-serif text-[28px] italic text-[var(--gold)] sm:text-[34px]">
                  30 minutes. Free. No obligation.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className={`${leadClass} mx-auto mt-6 max-w-2xl`}>
                A focused conversation to assess fit, answer your questions, and outline how the
                Blueprint engagement would work in your situation.
              </p>
            </Reveal>
          </div>
        </SectionContainer>
      </section>

      <section className={`${sectionClass} -mt-2`}>
        <SectionContainer>
          <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(340px,480px)] xl:gap-12">
            <div className="space-y-10">
              <div className={`space-y-6 ${bodyMutedClass}`}>
                <Reveal>
                  <p>
                    The Qualifying Call is a 30-minute conversation to assess fit and answer your
                    questions. We&apos;ll cover your portfolio goals, your current position, and how
                    the Blueprint engagement would work in your situation.
                  </p>
                </Reveal>
                <Reveal delay={0.1}>
                  <p>
                    If we&apos;re the right partner for you, we&apos;ll walk you through next steps.
                    If we&apos;re not, we&apos;ll tell you what we&apos;d do instead. Either way,
                    you leave the call with clarity.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={0.2}>
                <div className="rounded-2xl border border-[var(--gold)]/15 bg-[var(--navy-deep)]/50 p-6 backdrop-blur-sm md:p-8">
                  <h3 className="font-serif text-xl text-[var(--cream)]">
                    What you&apos;ll leave the call with
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {outcomes.map((item, i) => (
                      <li key={item} className={`flex items-start gap-3 ${bodyClass}`}>
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10">
                          <Check className="h-3 w-3 text-[var(--gold)]" aria-hidden />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="xl:sticky xl:top-28">
              <VexurWidget params={VEXUR_CALENDAR_PARAMS} className="booking-vexur-embed" />
            </Reveal>
          </div>
        </SectionContainer>
      </section>
    </main>
  );
}
