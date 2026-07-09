"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";

const navLinks = [
  { href: "/northgate", label: "Home" },
  { href: "/northgate/about", label: "About us" },
  { href: "/northgate/projects", label: "Projects" },
  { href: "/northgate/contact", label: "Contact us" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/northgate" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#6B4C2F] rounded-sm transform rotate-45 group-hover:rotate-[225deg] transition-transform duration-700 ease-in-out" />
              <span className="relative text-white font-bold text-lg z-10">N</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-lg tracking-tight leading-tight transition-colors duration-300 ${scrolled ? "text-[#1a1a1a]" : "text-white"}`}>
                NORTHGATE
              </span>
              <span className={`text-[10px] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? "text-[#6B4C2F]" : "text-white/80"}`}>
                Construction Company
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 group ${
                  pathname === link.href
                    ? (scrolled ? "text-[#6B4C2F]" : "text-white")
                    : (scrolled ? "text-[#4a4a4a] hover:text-[#6B4C2F]" : "text-white/90 hover:text-white")
                }`}>
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#6B4C2F] transition-all duration-300 ${pathname === link.href ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            ))}
          </nav>

          <button onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
              scrolled ? "border-[#6B4C2F] text-[#6B4C2F]" : "border-white/60 text-white"
            }`}>
            <Menu size={18} />
            <span className="text-sm font-medium uppercase tracking-wider">Menu</span>
          </button>

          <Link href="/northgate/contact"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B4C2F] text-white text-sm font-medium rounded-full hover:bg-[#4A3420] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            Get a Quote
            <ChevronRight size={16} />
          </Link>
        </div>
      </header>

      <div className={`menu-overlay lg:hidden ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(false)} />

      <div className={`fixed top-0 right-0 h-full w-[320px] max-w-[85vw] bg-white z-[1000] transform transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] shadow-2xl lg:hidden ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-12">
            <span className="font-bold text-lg text-[#1a1a1a]">Menu</span>
            <button onClick={() => setIsOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FAF8F5] text-[#1a1a1a] hover:bg-[#6B4C2F] hover:text-white transition-all duration-300">
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link, i) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-4 py-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                  pathname === link.href ? "bg-[#6B4C2F] text-white" : "text-[#4a4a4a] hover:bg-[#FAF8F5] hover:text-[#6B4C2F]"
                }`}
                style={{ transitionDelay: `${i * 0.05}s` }}>
                {link.label}
                <ChevronRight size={18} />
              </Link>
            ))}
          </nav>

          <div className="mt-12 pt-8 border-t border-[#E8E4DF]">
            <p className="text-sm text-[#999] mb-4">Get in touch</p>
            <a href="mailto:info@northgate.com" className="text-[#6B4C2F] font-medium hover:underline">info@northgate.com</a>
          </div>
        </div>
      </div>
    </>
  );
}
