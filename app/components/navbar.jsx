"use client";

import Link from "next/link";
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-transparent relative z-[99]">
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className="text-[#16f2b3] text-2xl sm:text-3xl font-bold">
            <img src="/logoseilybvn.png" alt="Logo" className="h-10 sm:h-12" />
          </Link>
        </div>

        {/* Hamburger button for mobile */}
        <button
          className="text-white hover:text-[#16f2b3] md:hidden focus:outline-none p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
        </button>

        {/* Navigation menu */}
        <ul className={`
          flex flex-col items-start text-sm md:flex-row md:space-x-1 md:border-0 md:opacity-100 md:h-auto md:max-h-screen md:w-auto md:relative md:bg-transparent md:p-0 md:flex
          ${isOpen 
            ? 'absolute top-full left-0 w-full bg-[#0d1224] border-b border-[#25213b] p-6 opacity-100 max-h-screen transition-all duration-300 ease-in-out' 
            : 'hidden md:flex'
          }
        `} id="navbar-default">
          <li className="w-full md:w-auto">
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#about" onClick={() => setIsOpen(false)}>
              <div className="text-sm text-white transition-colors duration-300 hover:text-[#16f2b3]">GIỚI THIỆU</div>
            </Link>
          </li>
          <li className="w-full md:w-auto">
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#experience" onClick={() => setIsOpen(false)}>
              <div className="text-sm text-white transition-colors duration-300 hover:text-[#16f2b3]">KINH NGHIỆM</div>
            </Link>
          </li>
          <li className="w-full md:w-auto">
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#skills" onClick={() => setIsOpen(false)}>
              <div className="text-sm text-white transition-colors duration-300 hover:text-[#16f2b3]">KỸ NĂNG</div>
            </Link>
          </li>
          <li className="w-full md:w-auto">
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#education" onClick={() => setIsOpen(false)}>
              <div className="text-sm text-white transition-colors duration-300 hover:text-[#16f2b3]">HỌC VẤN</div>
            </Link>
          </li>
          <li className="w-full md:w-auto">
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#projects" onClick={() => setIsOpen(false)}>
              <div className="text-sm text-white transition-colors duration-300 hover:text-[#16f2b3]">DỰ ÁN</div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;