import { BarChart3, ShieldCheck, UserStar, Users } from "lucide-react";

function FounderIconCard({
  icon: Icon,
  variant = "default",
}: {
  icon: typeof UserStar;
  variant?: "default" | "minimal";
}) {
  const isMinimal = variant === "minimal";

  return (
    <div
      className={`flex h-full min-h-0 flex-col items-center justify-center rounded-xl border border-[var(--gold)]/[0.12] px-2 py-3 ${
        isMinimal
          ? "bg-transparent"
          : "bg-[#081528] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
      }`}
    >
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[var(--gold)]/75 sm:h-16 sm:w-16"
        style={{
          boxShadow:
            "0 0 20px rgba(194, 162, 75, 0.16), inset 0 0 14px rgba(194, 162, 75, 0.05)",
        }}
      >
        <Icon
          className="h-7 w-7 text-[var(--gold)] sm:h-8 sm:w-8"
          strokeWidth={1.25}
          style={{ filter: "drop-shadow(0 0 5px rgba(194, 162, 75, 0.7))" }}
        />
      </div>

      <div
        className={`mt-3 h-[2px] w-9 shrink-0 rounded-full bg-gradient-to-r sm:mt-3.5 sm:w-10 ${
          isMinimal
            ? "from-[var(--navy)] via-[var(--gold)] to-[var(--navy)]"
            : "from-[#081528] via-[var(--gold)] to-[#081528]"
        }`}
        style={{ boxShadow: "0 0 6px rgba(194, 162, 75, 0.4)" }}
      />
    </div>
  );
}

function FounderGridAccent({ position = "left" }: { position?: "left" | "right" }) {
  const marginClass =
    position === "left"
      ? "relative -ml-1.5 w-3 shrink-0 self-stretch sm:-ml-2"
      : "relative -ml-1.5 -mr-1.5 w-3 shrink-0 self-stretch sm:-ml-2 sm:-mr-2";

  return (
    <div className={marginClass}>
      <div
        className="absolute top-2 bottom-2 left-1/2 w-px -translate-x-1/2"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, color-mix(in oklch, var(--gold) 50%, transparent) 16%, color-mix(in oklch, var(--gold) 50%, transparent) 84%, transparent 100%)",
        }}
      />
      <div className="absolute top-1/2 left-1/2 z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[var(--gold)] bg-transparent" />
    </div>
  );
}

export function FounderIconGrid({
  variant = "default",
  accentPosition = "left",
}: {
  variant?: "default" | "minimal";
  accentPosition?: "left" | "right";
}) {
  const items = [
    { icon: UserStar, label: "Expert leadership" },
    { icon: ShieldCheck, label: "Trusted guidance" },
    { icon: BarChart3, label: "Portfolio growth" },
    { icon: Users, label: "Investor focus" },
  ] as const;

  const grid = (
    <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-2 sm:gap-2.5">
      {items.map(({ icon, label }) => (
        <FounderIconCard key={label} icon={icon} variant={variant} />
      ))}
    </div>
  );

  const accent = <FounderGridAccent position={accentPosition} />;

  return (
    <div className="flex h-full min-h-0 gap-2.5 p-3 sm:gap-3 sm:p-4">
      {accentPosition === "left" ? (
        <>
          {accent}
          {grid}
        </>
      ) : (
        <>
          {grid}
          {accent}
        </>
      )}
    </div>
  );
}
