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
        <Link href="#">Join / Log In</Link>
        <span className="separator">|</span>
        <Link href="#">Preferences</Link>
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
          <Link href="#">Stories</Link>
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
            <p>Elowen Living Affiliates LLC was founded to provide independent brokerages with a powerful marketing and referral program for luxury listings.</p>
            <div className="footer-social">
              <Link href="#">f</Link>
              <Link href="#">X</Link>
              <Link href="#">Ig</Link>
              <Link href="#">In</Link>
              <Link href="#">Yt</Link>
            </div>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <Link href="#">Luxury Outlook</Link>
            <Link href="#">About Us</Link>
            <Link href="#">Giving Back</Link>
            <Link href="#">Join Us</Link>
          </div>
          <div className="footer-column">
            <h4>Apps</h4>
            <Link href="#">Mobile App</Link>
            <Link href="#">Apple TV App</Link>
            <Link href="#">Virtual Reality</Link>
          </div>
          <div className="footer-column">
            <h4>Legal</h4>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Use</Link>
            <Link href="#">Contact Us</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright &copy; 2025 Elowen Living Affiliates LLC. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <Link href="#">Fair Housing</Link>
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Accessibility</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
