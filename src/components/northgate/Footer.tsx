"use client";

import Link from "next/link";
import React from "react";

type SocialLink = {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
  label: string;
};

const footerLinks = {
  company: [
    { label: "Home", href: "/northgate" },
    { label: "About us", href: "/northgate/about" },
    { label: "Projects", href: "/northgate/projects" },
    { label: "Contact us", href: "/northgate/contact" },
    { label: "Articles", href: "#" },
  ],
  projects: [
    { label: "Residential projects", href: "#" },
    { label: "Commercial projects", href: "#" },
    { label: "Residential projects", href: "#" },
    { label: "Landmark projects", href: "#" },
  ],
  services: [
    { label: "Construction company profile", href: "#" },
    { label: "Construction Lagos", href: "#" },
    { label: "Construction Nigeria", href: "#" },
  ],
};

const socialLinks: SocialLink[] = [
  {
    icon: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9.05 9.05 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2.03-4.52 4.53 0 .35.04.7.11 1.03A12.94 12.94 0 0 1 1.64 1.15a4.52 4.52 0 0 0-.61 2.28c0 1.57.8 2.95 2.02 3.76A4.5 4.5 0 0 1 .96 6v.06c0 2.19 1.56 4.02 3.63 4.44a4.52 4.52 0 0 1-2.05.08c.58 1.82 2.26 3.15 4.25 3.19A9.05 9.05 0 0 1 0 19.54 12.77 12.77 0 0 0 6.92 21c8.3 0 12.84-6.88 12.84-12.84l-.01-.58A9.22 9.22 0 0 0 23 3z" fill="currentColor"/>
      </svg>
    ),
    href: "#",
    label: "Twitter",
  },
  {
    icon: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75c.97 0 1.75.78 1.75 1.75s-.78 1.76-1.75 1.76zm13.5 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.38v4.59h-3v-9h2.88v1.23h.04c.4-.76 1.36-1.56 2.8-1.56 2.99 0 3.54 1.97 3.54 4.53v5.8z" fill="currentColor"/>
      </svg>
    ),
    href: "#",
    label: "LinkedIn",
  },
  {
    icon: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.055 1.8.24 2.223.4.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.345 1.05.4 2.22.058 1.27.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.24 1.8-.4 2.223-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.345-2.22.4-1.27.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.055-1.8-.24-2.223-.4-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.345-1.05-.4-2.22C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.055-1.17.24-1.8.4-2.223.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.345 2.22-.4C8.416 2.212 8.8 2.2 12 2.2zm0 1.8c-3.16 0-3.528.012-4.776.069-1.025.05-1.58.226-1.95.376-.5.2-.86.44-1.24.82-.38.38-.62.74-.82 1.24-.15.37-.326.925-.376 1.95C2.012 8.472 2 8.84 2 12s.012 3.528.069 4.776c.05 1.025.226 1.58.376 1.95.2.5.44.86.82 1.24.38.38.74.62 1.24.82.37.15.925.326 1.95.376 1.248.057 1.616.069 4.776.069s3.528-.012 4.776-.069c1.025-.05 1.58-.226 1.95-.376.5-.2.86-.44 1.24-.82.38-.38.62-.74.82-1.24.15-.37.326-.925.376-1.95.057-1.248.069-1.616.069-4.776s-.012-3.528-.069-4.776c-.05-1.025-.226-1.58-.376-1.95-.2-.5-.44-.86-.82-1.24-.38-.38-.74-.62-1.24-.82-.37-.15-.925-.326-1.95-.376C15.528 4.012 15.16 4 12 4z" fill="currentColor"/>
        <circle cx="12" cy="12" r="3.2" fill="currentColor"/>
      </svg>
    ),
    href: "#",
    label: "Instagram",
  },
  {
    icon: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23 7l-7 5 7 5V7zM1 5h14v14H1z" fill="currentColor"/>
      </svg>
    ),
    href: "#",
    label: "YouTube",
  },
];

const locations = [
  "Engineering", "Rivers State", "Oyo", "Ghana", "Kaduna", "Architectural",
  "Abuja", "Senegal", "Lagos", "Port Harcourt", "Accra", "Steel", "Ogun",
];

export function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link href="/northgate" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-[#6B4C2F] rounded-sm transform rotate-45">
                <span className="relative text-white font-bold text-lg z-10 -rotate-45">N</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight leading-tight text-white">NORTHGATE</span>
                <span className="text-[10px] tracking-[3px] uppercase text-[#B8956A]">Construction Company</span>
              </div>
            </Link>
          </div>

          <div>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#b0b0b0] hover:text-[#B8956A] transition-colors duration-300">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ul className="space-y-3">
              {footerLinks.projects.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#b0b0b0] hover:text-[#B8956A] transition-colors duration-300">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#b0b0b0] hover:text-[#B8956A] transition-colors duration-300">{link.label}</Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 mt-8">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-[#555] text-[#b0b0b0] hover:border-[#B8956A] hover:text-[#B8956A] hover:bg-[#B8956A]/10 transition-all duration-300"
                  aria-label={social.label}>
                  <social.icon size={16} />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-6">
              <div className="w-14 h-14 rounded-full border-2 border-[#6B4C2F] flex items-center justify-center bg-[#1a1a1a]">
                <span className="text-[8px] text-center text-[#B8956A] font-bold leading-tight">ISO<br/>9001</span>
              </div>
              <div className="w-14 h-14 rounded-full border-2 border-[#6B4C2F] flex items-center justify-center bg-[#1a1a1a]">
                <span className="text-[8px] text-center text-[#B8956A] font-bold leading-tight">ISO<br/>45001</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#444]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#888]">&copy; 2026 NORTHGATE</p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {locations.map((loc) => (
                <span key={loc} className="text-xs text-[#666]">{loc}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
