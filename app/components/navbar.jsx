"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { href: "/#about", label: "Giới thiệu" },
  { href: "/#featured-case-studies", label: "Case study" },
  { href: "/#experience", label: "Kinh nghiệm" },
  { href: "/#skills", label: "Kỹ năng" },
  { href: "/#education", label: "Học vấn" },
  { href: "/#contact", label: "Liên hệ" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative z-[99] bg-transparent">
      <div className="py-5">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="w-fit rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
            aria-label="Về đầu trang"
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

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={isMenuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white outline-none transition focus-visible:ring-2 focus-visible:ring-blue-400/60 md:hidden"
          >
            {isMenuOpen ? <FiX size={22} aria-hidden="true" /> : <FiMenu size={22} aria-hidden="true" />}
          </button>

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
