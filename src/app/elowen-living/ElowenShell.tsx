"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import "./globals.css";

export default function ElowenLivingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + "/");

  return (
    <div className="elowen-living">
      {/* Top Utility Bar */}
      <div className="top-bar">
        <Link href="/services/websites-digital-experiences#elowen">GITS UI demonstration · sample listings</Link>
        <span className="separator">|</span>
        <span>No live bookings or accounts</span>
      </div>

      {/* Main Navigation */}
      <nav className="main-nav" style={{ boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.15)" : "none" }}>
        <Link href="/elowen-living" className="logo">
          <span className="logo-brand">Elowen</span>
          <span className="logo-sub">LIVING</span>
        </Link>
        <div className="nav-links">
          <span className="search-icon">&#128269;</span>
          <Link href="/elowen-living/properties" className={isActive("/elowen-living/properties") ? "active" : ""}>Search</Link>
          <Link href="/elowen-living/properties" className={isActive("/elowen-living/properties") ? "active" : ""}>Properties</Link>
          <Link href="/elowen-living/agents" className={isActive("/elowen-living/agents") ? "active" : ""}>Agents</Link>
          <Link href="/services/websites-digital-experiences#elowen">About this preview</Link>
        </div>
        <Link href="/elowen-living/sell-with-us" className="nav-cta">Sell With Us</Link>
      </nav>

      {/* Page Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo-brand">Elowen</div>
            <p>Elowen Living is a sample property interface, not a verified brokerage. Listings, people, prices and business statements are demonstration content.</p>
            <div className="footer-social">
              <span title="Not connected in this UI demonstration">f (sample)</span>
              <span title="Not connected in this UI demonstration">X (sample)</span>
              <span title="Not connected in this UI demonstration">Ig (sample)</span>
              <span title="Not connected in this UI demonstration">In (sample)</span>
              <span title="Not connected in this UI demonstration">Yt (sample)</span>
            </div>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <span title="Not connected in this UI demonstration">Luxury Outlook (sample)</span>
            <span title="Not connected in this UI demonstration">About Us (sample)</span>
            <span title="Not connected in this UI demonstration">Giving Back (sample)</span>
            <span title="Not connected in this UI demonstration">Join Us (sample)</span>
          </div>
          <div className="footer-column">
            <h4>Apps</h4>
            <span title="Not connected in this UI demonstration">Mobile App (sample)</span>
            <span title="Not connected in this UI demonstration">Apple TV App (sample)</span>
            <span title="Not connected in this UI demonstration">Virtual Reality (sample)</span>
          </div>
          <div className="footer-column">
            <h4>Legal</h4>
            <span title="Not connected in this UI demonstration">Privacy Policy (sample)</span>
            <span title="Not connected in this UI demonstration">Terms of Use (sample)</span>
            <span title="Not connected in this UI demonstration">Contact Us (sample)</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>GITS property interface demonstration. No affiliation or live property availability is asserted.</p>
          <div className="footer-bottom-links">
            <span title="Not connected in this UI demonstration">Fair Housing (sample)</span>
            <span title="Not connected in this UI demonstration">Privacy (sample)</span>
            <span title="Not connected in this UI demonstration">Terms (sample)</span>
            <span title="Not connected in this UI demonstration">Accessibility (sample)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
