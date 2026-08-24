import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--navy-deep)]/80 backdrop-blur-md border-b border-[var(--gold)]/10"
          : "bg-transparent"
      }`}
      style={{
        paddingTop: "env(safe-area-inset-top, 0px)",
      }}
    >
      <div className="mx-auto flex w-full min-w-0 max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-6">
        <Link
          to="/"
          className="font-serif text-lg sm:text-xl tracking-wide text-[var(--cream)] flex items-center gap-2 min-w-0"
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

        <div className="flex items-center gap-3">
          <Link
            to="/booking"
            className="hidden md:inline-block text-xs tracking-[0.2em] uppercase bg-[var(--gold)] text-[var(--navy-deep)] px-5 py-2.5 hover:bg-[var(--gold-soft)] transition-colors font-medium"
          >
            Qualifying Call
          </Link>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="md:hidden p-2 -mr-2 text-[var(--cream)] hover:text-[var(--gold)] transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[var(--navy-deep)] border-[var(--gold)]/10 w-[min(20rem,calc(100%-1.5rem))] max-w-full text-[var(--cream)] [&>button]:text-[var(--cream)]"
            >
              <SheetHeader>
                <SheetTitle className="text-[var(--cream)] font-serif text-left text-xl">
                  Navigation
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col">
                {NAV_LINKS.map(({ to, label }) => (
                  <SheetClose asChild key={to}>
                    <Link to={to} className={mobileNavLinkClass}>
                      {label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    to="/booking"
                    className="mt-6 inline-block text-center text-xs tracking-[0.2em] uppercase bg-[var(--gold)] text-[var(--navy-deep)] px-5 py-3 hover:bg-[var(--gold-soft)] transition-colors font-medium"
                  >
                    Qualifying Call
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
