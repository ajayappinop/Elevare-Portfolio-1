import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/blueprint", label: "Blueprint" },
  { to: "/process", label: "Process" },
  { to: "/about", label: "About" },
] as const;

const navLinkClass = "hover:text-[var(--gold)] transition-colors";

const mobileNavLinkClass =
  "block py-3 text-sm tracking-[0.25em] uppercase text-[var(--cream)]/80 hover:text-[var(--gold)] transition-colors border-b border-[var(--gold)]/10";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      className={`pointer-events-auto fixed top-0 inset-x-0 z-[10050] transition-all duration-300 ${
        scrolled
          ? "bg-[var(--navy-deep)]/80 backdrop-blur-md border-b border-[var(--gold)]/10"
          : "bg-transparent"
      }`}
      style={{
        paddingTop: "env(safe-area-inset-top, 0px)",
      }}
    >
      <div className="relative z-[101] mx-auto flex w-full min-w-0 max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-6">
        <Link
          to="/"
          className="font-serif text-lg sm:text-xl tracking-wide text-[var(--cream)] flex items-center gap-2 min-w-0"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/assets/logo.png"
            alt="Elevare logo"
            className="w-[40px] h-[40px] shrink-0 object-contain"
          />
          <span className="truncate">
            Elevare Portfolio<span className="text-[var(--gold)]">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-xs tracking-[0.25em] uppercase text-[var(--cream)]/80">
          {NAV_LINKS.map(({ to, label }) => (
            <Link key={to} to={to} className={navLinkClass}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="relative z-[102] flex items-center gap-3">
          <Link
            to="/booking"
            className="hidden md:inline-block text-xs tracking-[0.2em] uppercase bg-[var(--gold)] text-[var(--navy-deep)] px-5 py-2.5 hover:bg-[var(--gold-soft)] transition-colors font-medium"
          >
            Qualifying Call
          </Link>

          <button
            type="button"
            className="relative z-[103] inline-flex h-11 w-11 items-center justify-center text-[var(--cream)] hover:text-[var(--gold)] transition-colors md:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen
        ? createPortal(
            <div className="fixed inset-0 z-[10060] md:hidden" id="mobile-navigation">
              <button
                type="button"
                className="absolute inset-0 bg-black/70"
                aria-label="Close navigation menu"
                onClick={() => setMenuOpen(false)}
              />
              <div
                className="absolute inset-y-0 right-0 flex w-[min(20rem,calc(100%-1.5rem))] max-w-full flex-col border-l border-[var(--gold)]/10 bg-[var(--navy-deep)] p-6 pt-[max(1.5rem,env(safe-area-inset-top))] text-[var(--cream)] shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-serif text-left text-xl">Navigation</p>
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center text-[var(--cream)] hover:text-[var(--gold)]"
                    aria-label="Close navigation menu"
                    onClick={() => setMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="mt-6 flex flex-col">
                  {NAV_LINKS.map(({ to, label }) => (
                    <Link
                      key={to}
                      to={to}
                      className={mobileNavLinkClass}
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                  <Link
                    to="/booking"
                    className="mt-6 inline-block text-center text-xs tracking-[0.2em] uppercase bg-[var(--gold)] text-[var(--navy-deep)] px-5 py-3 hover:bg-[var(--gold-soft)] transition-colors font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    Qualifying Call
                  </Link>
                </nav>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
