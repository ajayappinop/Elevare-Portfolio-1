import { Link } from "@tanstack/react-router";

import { eyebrowClass } from "@/components/brand";
import { cn } from "@/lib/utils";

const logo = "/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--gold)]/15 py-16 bg-[var(--navy-deep)] relative z-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2 space-y-6">
            <Link to="/" className="font-serif text-xl text-[var(--cream)] flex items-center gap-2">
              <img src={logo} alt="Elevare logo" className="w-[32px] h-[55px] object-contain" />
              <span>
                Elevare Portfolio<span className="text-[var(--gold)]">.</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--cream)]/50 max-w-sm font-light">
              Strategy-led acquisition for high-net-worth professionals scaling multi-million dollar
              portfolios.
            </p>
          </div>

          <div>
            <h4 className={cn(eyebrowClass, "mb-4 font-mono")}>
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-[var(--cream)]/60 font-light">
              <li>
                <Link to="/blueprint" className="hover:text-[var(--cream)] transition-colors">
                  Blueprint Process
                </Link>
              </li>
              <li>
                <Link to="/process" className="hover:text-[var(--cream)] transition-colors">
                  Our Process
                </Link>
              </li>
              <li>
                <a
                  href="https://mortgageonly.com.au"
                  className="hover:text-[var(--cream)] transition-colors"
                  referrerPolicy="no-referrer"
                >
                  Finance Hub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={cn(eyebrowClass, "mb-4 font-mono")}>
              Support
            </h4>
            <ul className="space-y-2 text-sm text-[var(--cream)]/60 font-light">
              <li>
                <Link to="/booking" className="hover:text-[var(--cream)] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[var(--cream)] transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--cream)]/10 text-center md:text-left text-xs text-[var(--cream)]/40 font-mono tracking-wider">
          © {new Date().getFullYear()} Elevare Portfolio. All rights reserved. Registered in
          Australia.
        </div>
      </div>
    </footer>
  );
}
