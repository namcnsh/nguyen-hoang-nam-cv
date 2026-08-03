"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useI18n } from "./i18n-provider";

const languageOptions = [
  { locale: "vi", label: "VI" },
  { locale: "en", label: "EN" },
];

function LanguageToggle({ activeLocale, label, setLocale }) {
  return (
    <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1 text-xs" role="group" aria-label={label}>
      {languageOptions.map((item) => (
        <button
          key={item.locale}
          type="button"
          onClick={() => setLocale(item.locale)}
          aria-pressed={activeLocale === item.locale}
          className="rounded-full px-3 py-2 text-white outline-none transition-colors hover:text-blue-200 focus-visible:ring-2 focus-visible:ring-blue-400/60 aria-pressed:bg-white/10 aria-pressed:text-blue-200"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { dictionary, locale, setLocale } = useI18n();
  const navItems = dictionary.nav.items;
  const nav = dictionary.nav;

  return (
    <nav className="relative z-[99] bg-transparent">
      <div className="py-5">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="w-fit rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
            aria-label={nav.homeAriaLabel}
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src="/logoseilybvn.png"
              alt="Logo"
              width={160}
              height={80}
              className="h-14 w-auto sm:h-20"
              priority
            />
          </Link>

          <div className="flex items-center gap-2 md:order-3">
            <LanguageToggle activeLocale={locale} label={nav.languageLabel} setLocale={setLocale} />

            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              aria-label={isMenuOpen ? nav.closeMenuAriaLabel : nav.openMenuAriaLabel}
              aria-expanded={isMenuOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white outline-none transition focus-visible:ring-2 focus-visible:ring-blue-400/60 md:hidden"
            >
              {isMenuOpen ? <FiX size={22} aria-hidden="true" /> : <FiMenu size={22} aria-hidden="true" />}
            </button>
          </div>

          <ul className="hidden gap-2 rounded-full border border-white/10 bg-white/[0.03] p-2 text-sm md:flex md:flex-wrap md:justify-end">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="block rounded-full px-4 py-2 text-white no-underline outline-none transition-colors hover:text-blue-200 hover:no-underline focus-visible:ring-2 focus-visible:ring-blue-400/60"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {isMenuOpen ? (
          <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-[#070913]/95 p-3 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur md:hidden">
            <ul className="grid gap-2 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    className="block rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white no-underline outline-none transition-colors hover:text-blue-200 hover:no-underline focus-visible:ring-2 focus-visible:ring-blue-400/60"
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
