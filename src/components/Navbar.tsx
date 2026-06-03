import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
    >
      <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
        <Link
          to="/"
          className="font-serif text-xl tracking-wide text-[var(--cream)] flex items-center gap-2"
        >
          <img
            src="/assets/logo.png"
            alt="Elevare logo"
            className="w-[40px] h-[40px] object-contain"
          />
          <span>
            Elevare Portfolio<span className="text-[var(--gold)]">.</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-xs tracking-[0.25em] uppercase text-[var(--cream)]/80">
          <Link to="/blueprint" className="hover:text-[var(--gold)] transition-colors">
            Blueprint
          </Link>
          <a href="/#process" className="hover:text-[var(--gold)] transition-colors">
            Process
          </a>
          <Link to="/about" className="hover:text-[var(--gold)] transition-colors">
            About
          </Link>
        </nav>
        <a
          href="/#contact"
          className="hidden md:inline-block text-xs tracking-[0.2em] uppercase bg-[var(--gold)] text-[var(--navy-deep)] px-5 py-2.5 hover:bg-[var(--gold-soft)] transition-colors font-medium"
        >
          Qualifying Call
        </a>
      </div>
    </header>
  );
}
