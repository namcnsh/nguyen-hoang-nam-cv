"use client";

import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/#about", label: "Giới thiệu" },
  { href: "/#featured-case-studies", label: "Case study" },
  { href: "/#experience", label: "Kinh nghiệm" },
  { href: "/#skills", label: "Kỹ năng" },
  { href: "/#education", label: "Học vấn" },
  { href: "/#contact", label: "Liên hệ" },
];

function Navbar() {
  return (
    <nav className="relative z-[99] bg-transparent">
      <div className="flex flex-col gap-3 py-5 md:flex-row md:items-center md:justify-between">
        <Link
          href="/"
          className="w-fit rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
          aria-label="Về đầu trang"
        >
          <Image
            src="/logoseilybvn.png"
            alt="Logo"
            width={160}
            height={80}
            className="h-16 w-auto sm:h-20"
            priority
          />
        </Link>

        <ul className="flex max-w-full gap-2 overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-2 text-sm md:flex-wrap md:justify-end md:overflow-visible">
          {navItems.map((item) => (
            <li key={item.href} className="shrink-0">
              <Link
                className="block rounded-full px-3 py-2 text-white no-underline outline-none transition-colors hover:text-blue-200 hover:no-underline focus-visible:ring-2 focus-visible:ring-blue-400/60 md:px-4"
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
