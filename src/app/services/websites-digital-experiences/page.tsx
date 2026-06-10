"use client";

import { useEffect, useRef } from "react";

export default function WebsitesDigitalExperiencesPage() {
  const revealRefs = useRef<NodeListOf<Element> | null>(null);

  useEffect(() => {
    // Scroll reveal
    const elements = document.querySelectorAll(".reveal");
    revealRefs.current = elements;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(
              () => entry.target.classList.add("visible"),
              i * 80
            );
          }
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));

    // Nav shrink on scroll
    const handleScroll = () => {
      const nav = document.querySelector("nav") as HTMLElement;
      if (!nav) return;
      if (window.scrollY > 80) {
        nav.style.padding = "12px 60px";
        nav.style.boxShadow = "0 2px 30px rgba(13,12,10,0.08)";
      } else {
        nav.style.padding = "20px 60px";
        nav.style.boxShadow = "none";
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Browser mockup hover
    const mocks = document.querySelectorAll(
      ".browser-float"
    ) as NodeListOf<HTMLElement>;
    mocks.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        el.style.transform = el.classList.contains("left")
          ? "rotate(-1deg) translateY(-8px)"
          : el.classList.contains("right")
          ? "rotate(1deg) translateY(-8px)"
          : "translateX(-50%) translateY(-8px)";
        el.style.transition =
          "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s";
        el.style.boxShadow =
          "0 50px 100px rgba(13,12,10,0.2), 0 8px 24px rgba(13,12,10,0.1)";
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = el.classList.contains("left")
          ? "rotate(-3deg)"
          : el.classList.contains("right")
          ? "rotate(3deg)"
          : "translateX(-50%)";
        el.style.boxShadow =
          "0 30px 80px rgba(13,12,10,0.14), 0 4px 16px rgba(13,12,10,0.08)";
      });
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const switchTab = (btn: HTMLButtonElement, prefix: string) => {
    const parent = btn.closest(".cs-info") as HTMLElement;
    if (!parent) return;
    const tabs = parent.querySelectorAll(".cs-tab");
    const idx = Array.from(tabs).indexOf(btn);
    tabs.forEach((t) => t.classList.remove("active"));
    btn.classList.add("active");
    const contentEl = document.getElementById(`${prefix}-content`);
    if (contentEl) {
      contentEl
        .querySelectorAll(".cs-panel")
        .forEach((p) => p.classList.remove("active"));
      const target = document.getElementById(`${prefix}-${idx}`);
      if (target) target.classList.add("active");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=JetBrains+Mono:wght@400;500&display=swap');

        .wde-wrap { font-family: 'DM Sans', sans-serif; }

        .wde-wrap *, .wde-wrap *::before, .wde-wrap *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }

        /* ── TOKENS ── */
        .wde-wrap {
          --ink: #0D0C0A;
          --ink-80: #1E1C19;
          --ink-60: rgba(13,12,10,0.6);
          --ink-30: rgba(13,12,10,0.3);
          --ink-10: rgba(13,12,10,0.07);
          --ink-05: rgba(13,12,10,0.04);
          --gold: #B89B6E;
          --gold-light: #D4BFA0;
          --gold-faint: rgba(184,155,110,0.08);
          --gold-faint2: rgba(184,155,110,0.15);
          --white: #FAFAF8;
          --surface: #F5F4F0;
          --surface-2: #EFEDE8;
          --r-sm: 8px; --r-md: 14px; --r-lg: 20px; --r-xl: 28px;
          --font-d: 'Instrument Serif', serif;
          --font-b: 'DM Sans', sans-serif;
          --font-m: 'JetBrains Mono', monospace;
          --ease-spring: cubic-bezier(0.34,1.56,0.64,1);
          --ease-out: cubic-bezier(0.22,1,0.36,1);
          background: var(--white);
          color: var(--ink);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        /* ── NAV ── */
        .wde-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 60px;
          background: rgba(250,250,248,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--ink-10);
          transition: all 0.3s var(--ease-out);
        }
        .wde-nav-logo { font-family: var(--font-m); font-size: 13px; font-weight: 500; letter-spacing: 0.12em; color: var(--ink); text-decoration: none; }
        .wde-nav-links { display: flex; gap: 36px; list-style: none; }
        .wde-nav-links a { font-size: 13.5px; font-weight: 400; color: var(--ink-60); text-decoration: none; letter-spacing: 0.01em; transition: color 0.2s; }
        .wde-nav-links a:hover { color: var(--ink); }
        .wde-nav-cta { font-size: 13px; font-weight: 500; color: var(--white); background: var(--ink); padding: 9px 20px; border-radius: 100px; text-decoration: none; transition: background 0.2s, transform 0.2s var(--ease-spring); }
        .wde-nav-cta:hover { background: var(--gold); transform: scale(1.03); }

        /* ── HERO ── */
        .wde-hero {
          min-height: 100vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 140px 60px 100px; position: relative; overflow: hidden; text-align: center;
        }
        .wde-hero-ambient {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 80% 60% at 50% 20%, rgba(184,155,110,0.10) 0%, transparent 60%),
                      radial-gradient(ellipse 60% 40% at 20% 80%, rgba(13,12,10,0.04) 0%, transparent 50%),
                      radial-gradient(ellipse 40% 30% at 80% 70%, rgba(184,155,110,0.06) 0%, transparent 50%);
        }
        .wde-kicker {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-m); font-size: 11px; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--gold); border: 1px solid var(--gold-faint2);
          padding: 7px 16px; border-radius: 100px; margin-bottom: 32px;
          background: var(--gold-faint);
          animation: fadeUp 0.8s var(--ease-out) both;
        }
        .wde-kicker::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--gold); }
        .wde-h1 {
          font-family: var(--font-d); font-size: clamp(48px, 6.5vw, 88px);
          font-weight: 400; line-height: 1.08; letter-spacing: -0.02em;
          color: var(--ink); max-width: 960px; margin: 0 auto 28px;
          animation: fadeUp 0.9s 0.1s var(--ease-out) both;
        }
        .wde-h1 em { font-style: italic; color: var(--gold); }
        .wde-hero-sub {
          font-size: 18px; font-weight: 300; color: var(--ink-60); max-width: 540px;
          line-height: 1.65; margin: 0 auto 48px;
          animation: fadeUp 0.9s 0.2s var(--ease-out) both;
        }
        .wde-hero-actions {
          display: flex; align-items: center; gap: 16px; justify-content: center;
          animation: fadeUp 0.9s 0.3s var(--ease-out) both;
        }
        .btn-primary {
          font-size: 14px; font-weight: 500; color: var(--white); background: var(--ink);
          padding: 14px 28px; border-radius: 100px; text-decoration: none;
          transition: background 0.25s, transform 0.25s var(--ease-spring), box-shadow 0.25s;
          box-shadow: 0 2px 20px rgba(13,12,10,0.15);
        }
        .btn-primary:hover { background: var(--gold); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(184,155,110,0.3); }
        .btn-secondary {
          font-size: 14px; font-weight: 400; color: var(--ink); background: transparent;
          padding: 14px 28px; border-radius: 100px; text-decoration: none;
          border: 1px solid var(--ink-30); transition: border-color 0.2s, transform 0.2s var(--ease-spring), background 0.2s;
        }
        .btn-secondary:hover { border-color: var(--ink); background: var(--ink-05); transform: translateY(-2px); }

        /* ── HERO MOCKUPS ── */
        .wde-hero-mockups {
          position: relative; width: 100%; max-width: 1100px; margin: 72px auto 0; height: 460px;
          animation: fadeUp 1s 0.4s var(--ease-out) both;
        }
        .browser-float {
          position: absolute; border-radius: var(--r-lg); overflow: hidden;
          box-shadow: 0 30px 80px rgba(13,12,10,0.14), 0 4px 16px rgba(13,12,10,0.08);
          border: 1px solid var(--ink-10); background: var(--white);
        }
        .browser-float.main { left: 50%; top: 0; transform: translateX(-50%); width: 680px; z-index: 3; }
        .browser-float.left { left: 0; top: 60px; width: 340px; z-index: 2; transform: rotate(-3deg); opacity: 0.85; }
        .browser-float.right { right: 0; top: 80px; width: 320px; z-index: 2; transform: rotate(3deg); opacity: 0.85; }

        .browser-bar { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background: var(--surface); border-bottom: 1px solid var(--ink-10); }
        .browser-dots { display: flex; gap: 5px; }
        .browser-dots span { width: 8px; height: 8px; border-radius: 50%; }
        .d1 { background: #FC5F57; } .d2 { background: #FDBD2E; } .d3 { background: #27C840; }
        .browser-url { flex: 1; background: var(--white); border-radius: 6px; padding: 5px 10px; font-family: var(--font-m); font-size: 10px; color: var(--ink-60); border: 1px solid var(--ink-10); margin-left: 8px; }

        /* Mini-sites inside hero mockups */
        .mini-site { width: 100%; }
        .mini-nav { display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; background: var(--ink); }
        .mini-nav-logo { font-family: var(--font-m); font-size: 10px; color: var(--white); font-weight: 500; }
        .mini-nav-links { display: flex; gap: 16px; }
        .mini-nav-links span { font-size: 9px; color: rgba(255,255,255,0.6); }
        .mini-hero { padding: 28px 20px 22px; background: linear-gradient(135deg, #F8F6F0 0%, #EDEAE0 100%); }
        .mini-hero-label { font-family: var(--font-m); font-size: 8px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); margin-bottom: 8px; }
        .mini-hero-h { font-family: var(--font-d); font-size: 22px; line-height: 1.15; color: var(--ink); margin-bottom: 8px; }
        .mini-hero-sub { font-size: 10px; color: var(--ink-60); line-height: 1.5; margin-bottom: 14px; }
        .mini-btn { display: inline-block; font-size: 9px; font-weight: 500; color: var(--white); background: var(--ink); padding: 7px 14px; border-radius: 100px; }
        .mini-cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; padding: 14px 20px; background: var(--white); }
        .mini-card { background: var(--surface); border-radius: 8px; padding: 10px; border: 1px solid var(--ink-10); }
        .mini-card-img { width: 100%; height: 36px; background: linear-gradient(135deg, var(--ink-10), var(--ink-05)); border-radius: 4px; margin-bottom: 6px; }
        .mini-card-title { font-size: 9px; font-weight: 600; color: var(--ink); margin-bottom: 2px; }
        .mini-card-sub { font-size: 8px; color: var(--ink-60); }

        /* RE mini-site */
        .re-site { background: #0F0C08; color: white; }
        .re-nav { display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .re-logo { font-family: var(--font-m); font-size: 10px; font-weight: 500; color: rgba(255,255,255,0.9); letter-spacing: 0.15em; }
        .re-nav-links { display: flex; gap: 14px; }
        .re-nav-links span { font-size: 8.5px; color: rgba(255,255,255,0.4); }
        .re-hero { padding: 28px 18px 20px; background: linear-gradient(145deg, #1A1510 0%, #0F0C08 80%); }
        .re-hero-badge { font-family: var(--font-m); font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase; color: #B89B6E; margin-bottom: 10px; }
        .re-hero-h { font-family: var(--font-d); font-size: 20px; line-height: 1.2; color: white; margin-bottom: 8px; }
        .re-hero-h em { color: #B89B6E; font-style: italic; }
        .re-hero-sub { font-size: 9px; color: rgba(255,255,255,0.5); margin-bottom: 14px; line-height: 1.5; }
        .re-search { display: flex; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; overflow: hidden; margin-bottom: 16px; }
        .re-search-input { flex: 1; padding: 9px 12px; font-size: 8.5px; color: rgba(255,255,255,0.3); background: transparent; border: none; outline: none; }
        .re-search-btn { background: #B89B6E; padding: 8px 14px; font-size: 8px; font-weight: 600; color: white; }
        .re-props { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 0 18px 16px; }
        .re-prop { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; overflow: hidden; }
        .re-prop-img { height: 50px; background: linear-gradient(135deg, rgba(184,155,110,0.2), rgba(184,155,110,0.05)); }
        .re-prop-info { padding: 8px; }
        .re-prop-price { font-family: var(--font-m); font-size: 11px; font-weight: 500; color: #B89B6E; }
        .re-prop-loc { font-size: 7.5px; color: rgba(255,255,255,0.4); margin-top: 2px; }

        /* HC mini-site */
        .hc-site { background: white; font-family: var(--font-b); }
        .hc-nav { display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; border-bottom: 1px solid #EBF0F5; background: white; }
        .hc-logo { display: flex; align-items: center; gap: 6px; }
        .hc-logo-mark { width: 20px; height: 20px; background: #0069B4; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 300; color: white; line-height: 1; }
        .hc-logo-text { font-size: 11px; font-weight: 600; color: #0D1F35; }
        .hc-nav-links { display: flex; gap: 14px; }
        .hc-nav-links span { font-size: 8.5px; color: #6B7C93; }
        .hc-appt-btn { font-size: 8.5px; font-weight: 600; background: #0069B4; color: white; padding: 6px 12px; border-radius: 100px; }
        .hc-hero { padding: 22px 18px; background: linear-gradient(135deg, #EBF4FF 0%, #F5F9FF 100%); }
        .hc-trust { display: flex; gap: 6px; margin-bottom: 10px; }
        .hc-trust-badge { font-size: 7.5px; background: rgba(0,105,180,0.08); color: #0069B4; padding: 3px 8px; border-radius: 100px; font-weight: 500; }
        .hc-hero-h { font-family: var(--font-d); font-size: 18px; line-height: 1.25; color: #0D1F35; margin-bottom: 7px; }
        .hc-hero-sub { font-size: 9px; color: #6B7C93; margin-bottom: 12px; line-height: 1.5; }
        .hc-book-card { background: white; border-radius: 10px; padding: 12px; box-shadow: 0 4px 20px rgba(0,105,180,0.1); border: 1px solid #EBF0F5; }
        .hc-book-title { font-size: 9px; font-weight: 600; color: #0D1F35; margin-bottom: 8px; }
        .hc-time-slots { display: grid; grid-template-columns: repeat(4,1fr); gap: 4px; margin-bottom: 8px; }
        .hc-slot { font-size: 7.5px; text-align: center; padding: 4px 2px; border: 1px solid #DDE5EE; border-radius: 5px; color: #4A6080; }
        .hc-slot.sel { background: #0069B4; color: white; border-color: #0069B4; }
        .hc-confirm-btn { width: 100%; text-align: center; font-size: 9px; font-weight: 600; background: #0069B4; color: white; padding: 8px; border-radius: 6px; }
        .hc-doctors { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; padding: 12px 18px 16px; }
        .hc-doc { text-align: center; }
        .hc-doc-avatar { width: 36px; height: 36px; border-radius: 50%; margin: 0 auto 5px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; }
        .hc-doc-name { font-size: 8px; font-weight: 600; color: #0D1F35; }
        .hc-doc-spec { font-size: 7px; color: #6B7C93; }

        /* EC mini-site */
        .ec-site { background: white; }
        .ec-nav { display: flex; align-items: center; justify-content: space-between; padding: 11px 18px; border-bottom: 1px solid #F0ECF9; }
        .ec-logo { font-family: var(--font-m); font-size: 12px; font-weight: 500; color: #1A0F2E; letter-spacing: 0.05em; }
        .ec-nav-right { display: flex; align-items: center; gap: 12px; }
        .ec-nav-links { display: flex; gap: 12px; }
        .ec-nav-links span { font-size: 8.5px; color: #6B5A8A; }
        .ec-cart-icon { font-size: 8px; font-weight: 600; background: #6B2FCC; color: white; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .ec-hero { padding: 18px; background: linear-gradient(135deg, #1A0F2E 0%, #2D1654 100%); }
        .ec-hero-label { font-family: var(--font-m); font-size: 8px; letter-spacing: 0.18em; text-transform: uppercase; color: #A78BFA; margin-bottom: 8px; }
        .ec-hero-h { font-family: var(--font-d); font-size: 19px; line-height: 1.2; color: white; margin-bottom: 6px; }
        .ec-hero-sub { font-size: 9px; color: rgba(255,255,255,0.5); margin-bottom: 12px; }
        .ec-hero-btns { display: flex; gap: 8px; }
        .ec-btn-p { font-size: 8.5px; font-weight: 600; background: #6B2FCC; color: white; padding: 7px 14px; border-radius: 100px; }
        .ec-btn-s { font-size: 8.5px; font-weight: 400; color: rgba(255,255,255,0.7); padding: 7px 14px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.15); }
        .ec-products { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; padding: 12px 18px 16px; background: white; }
        .ec-prod { border: 1px solid #F0ECF9; border-radius: 8px; overflow: hidden; }
        .ec-prod-img { height: 52px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
        .ec-prod-info { padding: 7px 8px; }
        .ec-prod-name { font-size: 8.5px; font-weight: 600; color: #1A0F2E; margin-bottom: 3px; }
        .ec-prod-price { font-size: 9px; font-weight: 500; color: #6B2FCC; font-family: var(--font-m); }
        .ec-add-btn { font-size: 7.5px; font-weight: 600; background: #6B2FCC; color: white; padding: 4px 8px; border-radius: 100px; float: right; margin-top: -14px; }

        /* ── SCROLL INDICATOR ── */
        .scroll-indicator {
          position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          opacity: 0.4; animation: fadeUp 1s 1s var(--ease-out) both;
        }
        .scroll-line { width: 1px; height: 40px; background: var(--gold); transform-origin: top; animation: scrollGrow 2s ease-in-out infinite; }
        .scroll-label { font-family: var(--font-m); font-size: 9px; letter-spacing: 0.15em; color: var(--ink); }

        /* ── SECTION GLOBALS ── */
        .wde-section { padding: 120px 60px; }
        .section-kicker {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-m); font-size: 10.5px; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold);
          margin-bottom: 20px;
        }
        .section-kicker::before { content: ''; width: 18px; height: 1px; background: var(--gold); }
        .section-h2 { font-family: var(--font-d); font-size: clamp(36px, 4vw, 58px); font-weight: 400; line-height: 1.1; letter-spacing: -0.015em; margin-bottom: 18px; }
        .section-sub { font-size: 17px; font-weight: 300; color: var(--ink-60); max-width: 520px; line-height: 1.65; }
        .container { max-width: 1200px; margin: 0 auto; }

        /* ── CASE STUDIES ── */
        .case-studies { background: var(--white); padding: 120px 0; }
        .cs-header { padding: 0 60px; margin-bottom: 80px; }
        .case-study { display: grid; grid-template-columns: 1fr 1fr; min-height: 680px; align-items: stretch; border-top: 1px solid var(--ink-10); }
        .case-study:last-child { border-bottom: 1px solid var(--ink-10); }
        .case-study.reverse { direction: rtl; }
        .case-study.reverse > * { direction: ltr; }
        .cs-info { padding: 80px 60px; display: flex; flex-direction: column; justify-content: center; }
        .cs-number { font-family: var(--font-m); font-size: 11px; font-weight: 500; letter-spacing: 0.2em; color: var(--gold); margin-bottom: 12px; }
        .cs-industry { display: inline-block; font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; background: var(--ink-05); color: var(--ink-60); padding: 5px 12px; border-radius: 100px; margin-bottom: 24px; }
        .cs-title { font-family: var(--font-d); font-size: clamp(30px,3vw,44px); line-height: 1.12; letter-spacing: -0.01em; margin-bottom: 20px; }
        .cs-desc { font-size: 15.5px; font-weight: 300; color: var(--ink-60); line-height: 1.7; margin-bottom: 32px; }
        .cs-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; }
        .cs-tab { font-size: 12px; font-weight: 500; padding: 6px 14px; border-radius: 100px; border: 1px solid var(--ink-10); color: var(--ink-60); cursor: pointer; transition: all 0.2s; background: transparent; }
        .cs-tab.active, .cs-tab:hover { background: var(--ink); color: var(--white); border-color: var(--ink); }
        .cs-content { min-height: 120px; }
        .cs-panel { display: none; }
        .cs-panel.active { display: block; animation: fadeIn 0.3s var(--ease-out); }
        .cs-panel h4 { font-size: 14px; font-weight: 600; color: var(--ink); margin-bottom: 10px; }
        .cs-panel p { font-size: 14px; font-weight: 300; color: var(--ink-60); line-height: 1.65; }
        .cs-panel ul { list-style: none; }
        .cs-panel ul li { font-size: 13.5px; color: var(--ink-60); padding: 4px 0 4px 16px; position: relative; line-height: 1.5; }
        .cs-panel ul li::before { content: '→'; position: absolute; left: 0; color: var(--gold); font-size: 11px; }
        .results-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .result-item { background: var(--gold-faint); border: 1px solid var(--gold-faint2); border-radius: var(--r-md); padding: 14px; }
        .result-item .val { font-family: var(--font-d); font-size: 28px; color: var(--gold); line-height: 1; margin-bottom: 4px; }
        .result-item .lbl { font-size: 11px; color: var(--ink-60); font-weight: 400; }
        .cs-link { display: inline-flex; align-items: center; gap: 8px; font-size: 13.5px; font-weight: 500; color: var(--ink); text-decoration: none; margin-top: 8px; border-bottom: 1px solid var(--ink-30); padding-bottom: 2px; transition: color 0.2s, border-color 0.2s; }
        .cs-link:hover { color: var(--gold); border-color: var(--gold); }
        .cs-link svg { transition: transform 0.2s var(--ease-spring); }
        .cs-link:hover svg { transform: translate(3px,-3px); }
        .cs-visual { position: relative; overflow: hidden; background: var(--surface); display: flex; align-items: center; justify-content: center; }
        .cs-visual-inner { position: relative; width: 100%; height: 100%; min-height: 600px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; }
        .cs-re { background: linear-gradient(145deg,#1A1510 0%,#2D2318 100%); }
        .cs-hc { background: linear-gradient(145deg,#F0F4F9 0%,#E8EEF5 100%); }
        .cs-ec { background: linear-gradient(145deg,#F9F7FF 0%,#F0EDF9 100%); }

        /* ── DIFFERENTIATORS ── */
        .diff { background: var(--surface); }
        .diff-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: var(--ink-10); border: 1px solid var(--ink-10); border-radius: var(--r-xl); overflow: hidden; margin-top: 64px; }
        .diff-card { background: var(--white); padding: 36px 28px; transition: background 0.2s; }
        .diff-card:hover { background: var(--gold-faint); }
        .diff-icon { width: 44px; height: 44px; background: var(--ink); border-radius: var(--r-sm); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
        .diff-icon svg { width: 20px; height: 20px; stroke: var(--gold); fill: none; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
        .diff-title { font-size: 15px; font-weight: 600; color: var(--ink); margin-bottom: 10px; }
        .diff-text { font-size: 13.5px; font-weight: 300; color: var(--ink-60); line-height: 1.6; }

        /* ── PROCESS ── */
        .process { background: var(--white); }
        .process-timeline { margin-top: 72px; position: relative; }
        .process-timeline::before { content: ''; position: absolute; left: 32px; top: 0; bottom: 0; width: 1px; background: var(--ink-10); }
        .process-step { display: grid; grid-template-columns: 80px 1fr; gap: 32px; position: relative; }
        .process-step + .process-step { border-top: 1px solid var(--ink-05); }
        .process-num-wrap { display: flex; flex-direction: column; align-items: center; padding-top: 40px; }
        .process-num { font-family: var(--font-m); font-size: 11px; font-weight: 500; letter-spacing: 0.15em; color: var(--white); background: var(--ink); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; position: relative; z-index: 1; flex-shrink: 0; transition: background 0.2s; }
        .process-step:hover .process-num { background: var(--gold); }
        .process-body { padding: 40px 0; }
        .process-phase { font-family: var(--font-m); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 10px; }
        .process-title { font-family: var(--font-d); font-size: 26px; font-weight: 400; color: var(--ink); margin-bottom: 12px; }
        .process-desc { font-size: 14.5px; font-weight: 300; color: var(--ink-60); line-height: 1.65; margin-bottom: 20px; max-width: 600px; }
        .process-meta { display: flex; gap: 32px; margin-bottom: 16px; }
        .process-meta-label { font-family: var(--font-m); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-30); margin-bottom: 4px; }
        .process-meta-val { font-size: 13px; font-weight: 500; color: var(--ink); }
        .process-deliverables { display: flex; flex-wrap: wrap; gap: 6px; }
        .deliverable { font-size: 12px; color: var(--ink-60); background: var(--surface); padding: 5px 12px; border-radius: 100px; border: 1px solid var(--ink-10); }

        /* ── RESULTS ── */
        .results { background: var(--ink); padding: 120px 60px; }
        .results .section-kicker { color: var(--gold); }
        .results .section-kicker::before { background: var(--gold); }
        .results .section-h2 { color: var(--white); }
        .results .section-sub { color: rgba(255,255,255,0.5); }
        .metrics-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 0; margin-top: 72px; border: 1px solid rgba(255,255,255,0.08); border-radius: var(--r-xl); overflow: hidden; }
        .metric-item { padding: 48px 32px; border-right: 1px solid rgba(255,255,255,0.06); transition: background 0.3s; }
        .metric-item:last-child { border-right: none; }
        .metric-item:hover { background: rgba(255,255,255,0.03); }
        .metric-value { font-family: var(--font-d); font-size: clamp(40px,4vw,64px); font-weight: 400; line-height: 1; margin-bottom: 12px; }
        .metric-value span { font-size: 0.55em; }
        .metric-label { font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.5); line-height: 1.4; }
        .metric-item:nth-child(1) .metric-value { color: var(--gold); }
        .metric-item:nth-child(2) .metric-value { color: #A8E6CF; }
        .metric-item:nth-child(3) .metric-value { color: #A8C6FF; }
        .metric-item:nth-child(4) .metric-value { color: #FFD4A8; }
        .metric-item:nth-child(5) .metric-value { color: #E8A8FF; }

        /* ── TESTIMONIALS ── */
        .testimonials { background: var(--white); }
        .testi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 72px; }
        .testi-card { background: var(--surface); border-radius: var(--r-xl); padding: 40px 36px; border: 1px solid var(--ink-05); transition: transform 0.3s var(--ease-spring), box-shadow 0.3s, border-color 0.3s; }
        .testi-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(13,12,10,0.1); border-color: var(--gold-faint2); }
        .testi-stars { display: flex; gap: 3px; margin-bottom: 20px; }
        .testi-star { color: var(--gold); font-size: 15px; }
        .testi-quote { font-family: var(--font-d); font-size: 18px; line-height: 1.55; color: var(--ink); margin-bottom: 28px; font-style: italic; }
        .testi-author { display: flex; align-items: center; gap: 14px; }
        .testi-avatar { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 600; flex-shrink: 0; }
        .testi-name { font-size: 14px; font-weight: 600; color: var(--ink); }
        .testi-role { font-size: 12.5px; color: var(--ink-60); }

        /* ── FINAL CTA ── */
        .final-cta { background: var(--white); padding: 140px 60px; text-align: center; position: relative; overflow: hidden; }
        .final-cta-bg { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(184,155,110,0.08) 0%, transparent 60%); }
        .final-cta-h { font-family: var(--font-d); font-size: clamp(42px,5vw,72px); font-weight: 400; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 24px; max-width: 800px; margin-left: auto; margin-right: auto; }
        .final-cta-sub { font-size: 17px; font-weight: 300; color: var(--ink-60); max-width: 480px; margin: 0 auto 48px; line-height: 1.65; }
        .final-cta-actions { display: flex; gap: 16px; align-items: center; justify-content: center; }
        .final-cta-note { font-size: 12.5px; color: var(--ink-30); margin-top: 20px; }

        /* ── FOOTER ── */
        .wde-footer { background: var(--ink-80); padding: 60px; border-top: 1px solid rgba(255,255,255,0.06); }
        .wde-footer-inner { display: flex; align-items: center; justify-content: space-between; }
        .footer-logo { font-family: var(--font-m); font-size: 13px; font-weight: 500; letter-spacing: 0.12em; color: rgba(255,255,255,0.7); }
        .footer-copy { font-size: 12.5px; color: rgba(255,255,255,0.3); }
        .footer-links { display: flex; gap: 24px; }
        .footer-links a { font-size: 12.5px; color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: var(--gold); }

        /* ── ANIMATIONS ── */
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scrollGrow { 0% { transform: scaleY(0); opacity: 0; } 50% { opacity: 1; } 100% { transform: scaleY(1); opacity: 0; } }

        .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out); }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .wde-nav { padding: 16px 30px; }
          .wde-nav-links { display: none; }
          .wde-section { padding: 80px 30px; }
          .wde-hero { padding: 120px 30px 80px; }
          .case-study { grid-template-columns: 1fr; }
          .case-study.reverse { direction: ltr; }
          .cs-info { padding: 48px 30px; }
          .diff-grid { grid-template-columns: repeat(2,1fr); }
          .metrics-grid { grid-template-columns: repeat(3,1fr); }
          .metrics-grid .metric-item:nth-child(4), .metrics-grid .metric-item:nth-child(5) { border-top: 1px solid rgba(255,255,255,0.06); }
          .testi-grid { grid-template-columns: 1fr; }
          .browser-float.left, .browser-float.right { display: none; }
          .browser-float.main { left: 0; transform: none; width: 100%; max-width: 100%; }
          .cs-header { padding: 0 30px; }
          .results { padding: 80px 30px; }
          .final-cta { padding: 100px 30px; }
          .wde-footer { padding: 40px 30px; }
          .wde-footer-inner { flex-direction: column; gap: 20px; text-align: center; }
          .process-timeline::before { left: 28px; }
        }
        @media (max-width: 640px) {
          .metrics-grid { grid-template-columns: repeat(2,1fr); }
          .diff-grid { grid-template-columns: 1fr; }
          .wde-hero-mockups { display: none; }
          .process-step { grid-template-columns: 60px 1fr; gap: 16px; }
          .process-meta { flex-direction: column; gap: 16px; }
          .final-cta-actions { flex-direction: column; }
          .case-study { min-height: auto; }
          .cs-visual-inner { min-height: 360px; }
        }
      `}</style>

      <div className="wde-wrap">
        {/* NAV */}
        <nav className="wde-nav">
          <a href="#" className="wde-nav-logo">GITS</a>
          <ul className="wde-nav-links">
            <li><a href="#work">Work</a></li>
            <li><a href="#process">Process</a></li>
            <li><a href="#results">Results</a></li>
            <li><a href="#testimonials">Clients</a></li>
          </ul>
          <a href="#contact" className="wde-nav-cta">Start a Project</a>
        </nav>

        {/* HERO */}
        <section className="wde-hero" id="home">
          <div className="wde-hero-ambient" />
          <div className="wde-kicker">Website Design &amp; Development</div>
          <h1 className="wde-h1">Websites that don&apos;t just look impressive — they <em>drive business growth</em>.</h1>
          <p className="wde-hero-sub">We design and develop high-performance websites that establish authority, generate leads, and convert visitors into customers.</p>
          <div className="wde-hero-actions">
            <a href="#work" className="btn-primary">View Our Work</a>
            <a href="#contact" className="btn-secondary">Start a Project →</a>
          </div>

          {/* FLOATING BROWSER MOCKUPS */}
          <div className="wde-hero-mockups">
            {/* Left: RE */}
            <div className="browser-float left">
              <div className="browser-bar">
                <div className="browser-dots"><span className="d1"/><span className="d2"/><span className="d3"/></div>
                <div className="browser-url">luxeestates.com</div>
              </div>
              <div className="re-site">
                <div className="re-nav">
                  <span className="re-logo">LUXE ESTATES</span>
                  <div className="re-nav-links"><span>Properties</span><span>About</span><span>Contact</span></div>
                </div>
                <div className="re-hero">
                  <div className="re-hero-badge">Luxury Portfolio</div>
                  <div className="re-hero-h">Find Your <em>Dream</em> Property</div>
                  <div className="re-hero-sub">Premium real estate curated for discerning clients</div>
                  <div className="re-search">
                    <div className="re-search-input">Search location or property...</div>
                    <div className="re-search-btn">Search</div>
                  </div>
                </div>
                <div className="re-props">
                  <div className="re-prop"><div className="re-prop-img"/><div className="re-prop-info"><div className="re-prop-price">$4.2M</div><div className="re-prop-loc">Beverly Hills, CA</div></div></div>
                  <div className="re-prop"><div className="re-prop-img"/><div className="re-prop-info"><div className="re-prop-price">$2.8M</div><div className="re-prop-loc">Miami Beach, FL</div></div></div>
                </div>
              </div>
            </div>

            {/* Center: GITS */}
            <div className="browser-float main">
              <div className="browser-bar">
                <div className="browser-dots"><span className="d1"/><span className="d2"/><span className="d3"/></div>
                <div className="browser-url">gits.agency/portfolio</div>
              </div>
              <div className="mini-site">
                <div className="mini-nav">
                  <span className="mini-nav-logo">GITS</span>
                  <div className="mini-nav-links"><span>Work</span><span>Services</span><span>Process</span><span>Contact</span></div>
                </div>
                <div className="mini-hero">
                  <div className="mini-hero-label">Gwer Intelligent Tech Solutions</div>
                  <div className="mini-hero-h">We build websites that<br/>convert visitors into customers.</div>
                  <div className="mini-hero-sub">Premium digital experiences for ambitious businesses — from concept to conversion.</div>
                  <div className="mini-btn">View Our Work</div>
                </div>
                <div className="mini-cards">
                  <div className="mini-card"><div className="mini-card-img"/><div className="mini-card-title">Real Estate</div><div className="mini-card-sub">Luxury property platform</div></div>
                  <div className="mini-card"><div className="mini-card-img"/><div className="mini-card-title">Healthcare</div><div className="mini-card-sub">Medical booking system</div></div>
                  <div className="mini-card"><div className="mini-card-img"/><div className="mini-card-title">E-commerce</div><div className="mini-card-sub">Premium shopping experience</div></div>
                </div>
              </div>
            </div>

            {/* Right: HC */}
            <div className="browser-float right">
              <div className="browser-bar">
                <div className="browser-dots"><span className="d1"/><span className="d2"/><span className="d3"/></div>
                <div className="browser-url">medicard.io</div>
              </div>
              <div className="hc-site">
                <div className="hc-nav">
                  <div className="hc-logo"><div className="hc-logo-mark">+</div><span className="hc-logo-text">MediCare</span></div>
                  <div className="hc-appt-btn">Book Now</div>
                </div>
                <div className="hc-hero">
                  <div className="hc-trust"><div className="hc-trust-badge">Verified</div><div className="hc-trust-badge">HIPAA Compliant</div></div>
                  <div className="hc-hero-h">Your Health,<br/>Our Priority</div>
                  <div className="hc-hero-sub">Book appointments with top specialists in under 60 seconds</div>
                  <div className="hc-book-card">
                    <div className="hc-book-title">Available Today</div>
                    <div className="hc-time-slots">
                      <div className="hc-slot">9:00</div><div className="hc-slot sel">10:30</div><div className="hc-slot">2:00</div><div className="hc-slot">4:30</div>
                    </div>
                    <div className="hc-confirm-btn">Confirm Appointment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="scroll-indicator">
            <div className="scroll-line"/>
            <span className="scroll-label">Scroll</span>
          </div>
        </section>

        {/* ── CASE STUDIES ── */}
        <section className="case-studies" id="work">
          <div className="cs-header reveal">
            <div className="section-kicker">Featured Projects</div>
            <h2 className="section-h2">Every website tells<br/>a business story.</h2>
            <p className="section-sub">Three industry-defining projects, built to convert, built to last.</p>
          </div>

          {/* Project 01 — Real Estate */}
          <div className="case-study reveal">
            <div className="cs-info">
              <div className="cs-number">01 / 03</div>
              <span className="cs-industry">Real Estate</span>
              <h3 className="cs-title">Luxury Real Estate Experience</h3>
              <p className="cs-desc">Positioning premium developers and agents as aspirational brands through editorial design, intelligent property search, and lead generation systems that convert high-intent visitors.</p>
              <div className="cs-tabs">
                <button className="cs-tab active" onClick={(e) => switchTab(e.currentTarget, "re")}>Challenge</button>
                <button className="cs-tab" onClick={(e) => switchTab(e.currentTarget, "re")}>Solution</button>
                <button className="cs-tab" onClick={(e) => switchTab(e.currentTarget, "re")}>Design</button>
                <button className="cs-tab" onClick={(e) => switchTab(e.currentTarget, "re")}>Results</button>
              </div>
              <div className="cs-content" id="re-content">
                <div className="cs-panel active" id="re-0">
                  <h4>The Challenge</h4>
                  <p>Luxury real estate agencies were losing high-value leads to competitors with better digital presence. Outdated websites with poor mobile performance failed to communicate exclusivity — resulting in prospects bouncing before making contact.</p>
                </div>
                <div className="cs-panel" id="re-1">
                  <h4>Our Solution</h4>
                  <ul>
                    <li>Editorial dark-mode design language conveying exclusivity</li>
                    <li>Intelligent property search with real-time filtering</li>
                    <li>Agent profiles with social proof and availability calendars</li>
                    <li>Lead capture integrated into the property discovery flow</li>
                    <li>Mobile-first approach serving 73% of luxury buyers on mobile</li>
                  </ul>
                </div>
                <div className="cs-panel" id="re-2">
                  <h4>Design Strategy</h4>
                  <p>We chose a deep-toned editorial aesthetic with amber gold accents — a palette that signals wealth without being garish. Property imagery bleeds to the edges, creating the immersive feel of a premium lifestyle magazine.</p>
                </div>
                <div className="cs-panel" id="re-3">
                  <div className="results-grid">
                    <div className="result-item"><div className="val">3.4×</div><div className="lbl">Lead volume increase</div></div>
                    <div className="result-item"><div className="val">68%</div><div className="lbl">Bounce rate reduction</div></div>
                    <div className="result-item"><div className="val">98</div><div className="lbl">Lighthouse score</div></div>
                    <div className="result-item"><div className="val">4.1s</div><div className="lbl">Avg. session → inquiry</div></div>
                  </div>
                </div>
              </div>
              <a href="#contact" className="cs-link">Start a similar project <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12L12 2M12 2H5M12 2v7"/></svg></a>
            </div>
            <div className="cs-visual cs-re">
              <div className="cs-visual-inner">
                <div style={{width:"100%",maxWidth:"440px",margin:"0 auto",borderRadius:"14px",overflow:"hidden",boxShadow:"0 40px 100px rgba(0,0,0,0.5)",border:"1px solid rgba(255,255,255,0.08)"}}>
                  <div className="browser-bar" style={{background:"#111009",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                    <div className="browser-dots"><span className="d1"/><span className="d2"/><span className="d3"/></div>
                    <div className="browser-url" style={{background:"rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.4)",borderColor:"rgba(255,255,255,0.06)"}}>luxeestates.com</div>
                  </div>
                  <div className="re-site">
                    <div className="re-nav"><span className="re-logo">LUXE ESTATES</span><div className="re-nav-links"><span>Properties</span><span>Agents</span><span>Exclusive</span></div></div>
                    <div className="re-hero" style={{padding:"28px 18px 20px"}}>
                      <div className="re-hero-badge">Curated Luxury Portfolio — 2025</div>
                      <div className="re-hero-h" style={{fontSize:"26px",marginBottom:"10px"}}>Exceptional Properties<br/>for Exceptional <em>Lives</em></div>
                      <div className="re-hero-sub" style={{maxWidth:"380px"}}>Access our exclusive portfolio of ultra-premium properties across prime global destinations.</div>
                      <div className="re-search" style={{maxWidth:"380px"}}>
                        <div className="re-search-input">City, neighborhood, or property ID...</div>
                        <div className="re-search-btn" style={{padding:"10px 18px",fontSize:"10px"}}>Search</div>
                      </div>
                    </div>
                    <div className="re-props" style={{gridTemplateColumns:"repeat(3,1fr)",padding:"16px 20px 20px"}}>
                      <div className="re-prop"><div className="re-prop-img" style={{height:"70px",background:"linear-gradient(135deg,rgba(184,155,110,0.25),rgba(184,155,110,0.06))"}}/><div className="re-prop-info"><div className="re-prop-price" style={{fontSize:"13px"}}>$8.5M</div><div className="re-prop-loc">Beverly Hills</div></div></div>
                      <div className="re-prop"><div className="re-prop-img" style={{height:"70px",background:"linear-gradient(135deg,rgba(184,155,110,0.18),rgba(184,155,110,0.04))"}}/><div className="re-prop-info"><div className="re-prop-price" style={{fontSize:"13px"}}>$4.9M</div><div className="re-prop-loc">Miami Beach</div></div></div>
                      <div className="re-prop"><div className="re-prop-img" style={{height:"70px",background:"linear-gradient(135deg,rgba(184,155,110,0.22),rgba(184,155,110,0.05))"}}/><div className="re-prop-info"><div className="re-prop-price" style={{fontSize:"13px"}}>$12.2M</div><div className="re-prop-loc">Malibu Coast</div></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project 02 — Healthcare */}
          <div className="case-study reverse reveal">
            <div className="cs-info">
              <div className="cs-number">02 / 03</div>
              <span className="cs-industry">Healthcare</span>
              <h3 className="cs-title">Healthcare &amp; Medical Platform</h3>
              <p className="cs-desc">Building patient trust from the first page load through clear design, seamless booking flows, and clinical credibility — designed to reduce administrative burden while increasing appointment volume.</p>
              <div className="cs-tabs">
                <button className="cs-tab active" onClick={(e) => switchTab(e.currentTarget, "hc")}>Challenge</button>
                <button className="cs-tab" onClick={(e) => switchTab(e.currentTarget, "hc")}>Solution</button>
                <button className="cs-tab" onClick={(e) => switchTab(e.currentTarget, "hc")}>Design</button>
                <button className="cs-tab" onClick={(e) => switchTab(e.currentTarget, "hc")}>Results</button>
              </div>
              <div className="cs-content" id="hc-content">
                <div className="cs-panel active" id="hc-0">
                  <h4>The Challenge</h4>
                  <p>Medical practices were struggling with outdated booking systems that frustrated patients and overloaded front-desk staff. Complex navigation buried critical information, causing patients to abandon before booking.</p>
                </div>
                <div className="cs-panel" id="hc-1">
                  <h4>Our Solution</h4>
                  <ul>
                    <li>Clean, trust-anchored design with clinical authority signals</li>
                    <li>One-screen appointment booking with real-time availability</li>
                    <li>Structured doctor profile pages with verified credentials</li>
                    <li>Insurance &amp; services information surfaced prominently</li>
                    <li>Patient portal with prescription refills and test results</li>
                  </ul>
                </div>
                <div className="cs-panel" id="hc-2">
                  <h4>Design Strategy</h4>
                  <p>We chose a calm blue-white palette that conveys clinical precision without coldness. Trust badges, accreditation marks, and doctor headshots are placed above the fold. The booking widget is always one tap away.</p>
                </div>
                <div className="cs-panel" id="hc-3">
                  <div className="results-grid">
                    <div className="result-item"><div className="val">52%</div><div className="lbl">More online bookings</div></div>
                    <div className="result-item"><div className="val">78%</div><div className="lbl">Reduction in no-shows</div></div>
                    <div className="result-item"><div className="val">4.9★</div><div className="lbl">Patient experience score</div></div>
                    <div className="result-item"><div className="val">1.8s</div><div className="lbl">Page load time</div></div>
                  </div>
                </div>
              </div>
              <a href="#contact" className="cs-link">Start a similar project <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12L12 2M12 2H5M12 2v7"/></svg></a>
            </div>
            <div className="cs-visual cs-hc">
              <div className="cs-visual-inner">
                <div style={{width:"100%",maxWidth:"460px",background:"white",borderRadius:"14px",overflow:"hidden",boxShadow:"0 30px 80px rgba(0,0,0,0.15)",border:"1px solid #EBF0F5"}}>
                  <div className="browser-bar">
                    <div className="browser-dots"><span className="d1"/><span className="d2"/><span className="d3"/></div>
                    <div className="browser-url">medicard.io</div>
                  </div>
                  <div className="hc-site">
                    <div className="hc-nav">
                      <div className="hc-logo"><div className="hc-logo-mark">+</div><span className="hc-logo-text" style={{fontSize:"13px"}}>MediCard Health</span></div>
                      <div className="hc-nav-links"><span>Services</span><span>Doctors</span><span>Insurance</span></div>
                      <div className="hc-appt-btn" style={{fontSize:"10px",padding:"8px 16px"}}>Book Appointment</div>
                    </div>
                    <div className="hc-hero" style={{padding:"24px 20px"}}>
                      <div className="hc-trust" style={{marginBottom:"12px"}}>
                        <div className="hc-trust-badge">✓ Board Certified</div>
                        <div className="hc-trust-badge">✓ HIPAA Compliant</div>
                        <div className="hc-trust-badge">✓ 500+ Reviews</div>
                      </div>
                      <div className="hc-hero-h" style={{fontSize:"22px",marginBottom:"8px"}}>Expert Care,<br/>Simplified Booking</div>
                      <div className="hc-hero-sub" style={{fontSize:"11px",marginBottom:"16px"}}>Book appointments with top specialists in under 60 seconds.</div>
                      <div className="hc-book-card" style={{padding:"16px"}}>
                        <div className="hc-book-title" style={{fontSize:"11px",marginBottom:"10px"}}>Available Appointments Today</div>
                        <div className="hc-time-slots" style={{gridTemplateColumns:"repeat(6,1fr)",gap:"5px",marginBottom:"10px"}}>
                          <div className="hc-slot" style={{fontSize:"9px"}}>9:00</div>
                          <div className="hc-slot sel" style={{fontSize:"9px"}}>10:30</div>
                          <div className="hc-slot" style={{fontSize:"9px"}}>11:00</div>
                          <div className="hc-slot" style={{fontSize:"9px"}}>2:00</div>
                          <div className="hc-slot" style={{fontSize:"9px"}}>3:30</div>
                          <div className="hc-slot" style={{fontSize:"9px"}}>4:30</div>
                        </div>
                        <div className="hc-confirm-btn" style={{fontSize:"11px",padding:"10px"}}>Confirm — 10:30 AM with Dr. Osei</div>
                      </div>
                    </div>
                    <div className="hc-doctors" style={{padding:"14px 20px 18px"}}>
                      <div className="hc-doc"><div className="hc-doc-avatar" style={{background:"#EBF4FF",color:"#0069B4"}}>DO</div><div className="hc-doc-name">Dr. Osei</div><div className="hc-doc-spec">Cardiology</div></div>
                      <div className="hc-doc"><div className="hc-doc-avatar" style={{background:"#EFF9F4",color:"#1D7A52"}}>AL</div><div className="hc-doc-name">Dr. Alabi</div><div className="hc-doc-spec">Neurology</div></div>
                      <div className="hc-doc"><div className="hc-doc-avatar" style={{background:"#FEF3E8",color:"#B85C08"}}>NK</div><div className="hc-doc-name">Dr. Nkosi</div><div className="hc-doc-spec">Oncology</div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project 03 — E-commerce */}
          <div className="case-study reveal">
            <div className="cs-info">
              <div className="cs-number">03 / 03</div>
              <span className="cs-industry">E-commerce</span>
              <h3 className="cs-title">Modern E-commerce Experience</h3>
              <p className="cs-desc">Redesigning the entire purchase journey — from product discovery to checkout — to eliminate friction and maximize conversion. Built on a headless architecture for millisecond-fast load times.</p>
              <div className="cs-tabs">
                <button className="cs-tab active" onClick={(e) => switchTab(e.currentTarget, "ec")}>Challenge</button>
                <button className="cs-tab" onClick={(e) => switchTab(e.currentTarget, "ec")}>Solution</button>
                <button className="cs-tab" onClick={(e) => switchTab(e.currentTarget, "ec")}>Design</button>
                <button className="cs-tab" onClick={(e) => switchTab(e.currentTarget, "ec")}>Results</button>
              </div>
              <div className="cs-content" id="ec-content">
                <div className="cs-panel active" id="ec-0">
                  <h4>The Challenge</h4>
                  <p>The client&apos;s existing store had a 7-step checkout flow, no guest checkout, and a product discovery experience that buried their bestsellers. Cart abandonment sat at 81%. Mobile conversion was 0.4%.</p>
                </div>
                <div className="cs-panel" id="ec-1">
                  <h4>Our Solution</h4>
                  <ul>
                    <li>Headless Next.js frontend with sub-1s page loads</li>
                    <li>Two-step guest checkout with saved payment methods</li>
                    <li>AI-powered product recommendation engine</li>
                    <li>Persistent cart with recovery emails and push notifications</li>
                    <li>Mobile-native UX with swipe gestures and tap-to-buy</li>
                  </ul>
                </div>
                <div className="cs-panel" id="ec-2">
                  <h4>Design Strategy</h4>
                  <p>We used a sophisticated deep-purple dark theme that makes products pop off the screen. Photography-first design places hero products at full bleed. The checkout flow was collapsed to two screens, reducing abandonment.</p>
                </div>
                <div className="cs-panel" id="ec-3">
                  <div className="results-grid">
                    <div className="result-item"><div className="val">4.1×</div><div className="lbl">Conversion rate lift</div></div>
                    <div className="result-item"><div className="val">61%</div><div className="lbl">Cart abandonment drop</div></div>
                    <div className="result-item"><div className="val">$28</div><div className="lbl">AOV increase</div></div>
                    <div className="result-item"><div className="val">0.9s</div><div className="lbl">Time to interactive</div></div>
                  </div>
                </div>
              </div>
              <a href="#contact" className="cs-link">Start a similar project <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12L12 2M12 2H5M12 2v7"/></svg></a>
            </div>
            <div className="cs-visual cs-ec">
              <div className="cs-visual-inner">
                <div style={{width:"100%",maxWidth:"460px",background:"white",borderRadius:"14px",overflow:"hidden",boxShadow:"0 30px 80px rgba(107,47,204,0.2)",border:"1px solid #F0ECF9"}}>
                  <div className="browser-bar" style={{background:"#F9F7FF"}}>
                    <div className="browser-dots"><span className="d1"/><span className="d2"/><span className="d3"/></div>
                    <div className="browser-url" style={{borderColor:"#E8E2F5",color:"#6B5A8A"}}>shopvault.co</div>
                  </div>
                  <div className="ec-site">
                    <div className="ec-nav" style={{padding:"12px 20px"}}>
                      <div className="ec-logo" style={{fontSize:"14px"}}>VAULT</div>
                      <div className="ec-nav-right">
                        <div className="ec-nav-links" style={{gap:"16px"}}><span style={{fontSize:"10px"}}>Products</span><span style={{fontSize:"10px"}}>Collections</span><span style={{fontSize:"10px"}}>About</span></div>
                        <div className="ec-cart-icon" style={{width:"24px",height:"24px",fontSize:"10px"}}>3</div>
                      </div>
                    </div>
                    <div className="ec-hero" style={{padding:"24px 20px"}}>
                      <div className="ec-hero-label">New Collection — SS25</div>
                      <div className="ec-hero-h" style={{fontSize:"26px",marginBottom:"8px"}}>Crafted for the<br/>Discerning Buyer</div>
                      <div className="ec-hero-sub" style={{fontSize:"11px",marginBottom:"14px"}}>Premium goods, curated for those who demand quality.</div>
                      <div className="ec-hero-btns">
                        <div className="ec-btn-p" style={{fontSize:"10px",padding:"9px 18px"}}>Shop Now</div>
                        <div className="ec-btn-s" style={{fontSize:"10px",padding:"9px 18px"}}>View Lookbook</div>
                      </div>
                    </div>
                    <div className="ec-products" style={{gridTemplateColumns:"repeat(3,1fr)",padding:"14px 20px 20px"}}>
                      <div className="ec-prod"><div className="ec-prod-img" style={{background:"#F5F0FF"}}>🖤</div><div className="ec-prod-info"><div className="ec-prod-name" style={{fontSize:"10px"}}>Obsidian Watch</div><div className="ec-prod-price" style={{fontSize:"10px"}}>$429</div><div className="ec-add-btn" style={{fontSize:"8px"}}>+ Add</div></div></div>
                      <div className="ec-prod"><div className="ec-prod-img" style={{background:"#EFF5FF"}}>💎</div><div className="ec-prod-info"><div className="ec-prod-name" style={{fontSize:"10px"}}>Crystal Pendant</div><div className="ec-prod-price" style={{fontSize:"10px"}}>$189</div><div className="ec-add-btn" style={{fontSize:"8px"}}>+ Add</div></div></div>
                      <div className="ec-prod"><div className="ec-prod-img" style={{background:"#FFF0F5"}}>🌸</div><div className="ec-prod-info"><div className="ec-prod-name" style={{fontSize:"10px"}}>Rose Serum Set</div><div className="ec-prod-price" style={{fontSize:"10px"}}>$96</div><div className="ec-add-btn" style={{fontSize:"8px"}}>+ Add</div></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── DIFFERENTIATORS ── */}
        <section className="wde-section diff" id="services">
          <div className="container">
            <div className="reveal">
              <div className="section-kicker">Why GITS</div>
              <h2 className="section-h2">What makes our websites different.</h2>
              <p className="section-sub">We obsess over the details most agencies ignore — because those details are often the difference between a website that generates revenue and one that doesn&apos;t.</p>
            </div>
            <div className="diff-grid reveal">
              {[
                { title: "SEO Architecture", text: "Structured data, Core Web Vitals optimization, and semantic HTML from day one — not as an afterthought.", icon: <><circle cx="10" cy="10" r="3"/><path d="M10 1v3M10 16v3M1 10h3M16 10h3M3.5 3.5l2 2M14.5 14.5l2 2M3.5 16.5l2-2M14.5 5.5l2-2"/></> },
                { title: "Performance First", text: "Sub-2 second load times through image optimization, lazy loading, and edge-deployed infrastructure.", icon: <><path d="M3 10l4 4 10-8M1 5h4M1 10h4M1 15h4"/></> },
                { title: "Mobile-First Design", text: "Every layout begins on mobile. Desktop is the enhancement — not the other way around.", icon: <><rect x="4" y="7" width="6" height="10" rx="1"/><path d="M10 3h7v14h-7M7 3v4"/></> },
                { title: "Conversion Strategy", text: "CTA placement, trust signal positioning, and journey mapping based on how humans actually make decisions.", icon: <><path d="M10 2l2.5 5 5.5.8-4 3.9.9 5.5L10 14.8l-4.9 2.4.9-5.5L2 7.8l5.5-.8z"/></> },
                { title: "Custom Development", text: "Zero template reliance. Every component is purpose-built for your specific business goals.", icon: <><polyline points="2,15 7,9 11,12 15,6 18,8"/><rect x="2" y="16" width="16" height="1.5" rx="0.5"/></> },
                { title: "Accessibility", text: "WCAG 2.2 AA compliant as standard — reaching more users and avoiding legal risk.", icon: <><circle cx="10" cy="10" r="8"/><path d="M10 6v4l3 3"/></> },
                { title: "Analytics Integration", text: "GA4, Hotjar, Clarity, and custom event tracking configured so you can make data-driven decisions from launch.", icon: <><rect x="2" y="4" width="16" height="12" rx="2"/><path d="M2 8h16M6 12h4M6 14.5h2"/></> },
                { title: "Scalable Infrastructure", text: "Headless CMS, edge deployments, and component libraries that grow with your business without rebuilding from scratch.", icon: <><rect x="3" y="10" width="5" height="8" rx="1"/><rect x="11" y="6" width="5" height="12" rx="1"/><rect x="7" y="4" width="5" height="14" rx="1"/></> },
              ].map(({ title, text, icon }) => (
                <div key={title} className="diff-card">
                  <div className="diff-icon"><svg viewBox="0 0 20 20">{icon}</svg></div>
                  <div className="diff-title">{title}</div>
                  <div className="diff-text">{text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="wde-section process" id="process">
          <div className="container">
            <div className="reveal">
              <div className="section-kicker">Our Process</div>
              <h2 className="section-h2">How we build websites that work.</h2>
              <p className="section-sub">A rigorous, proven process refined across dozens of successful launches — designed to eliminate surprises and maximize results.</p>
            </div>
            <div className="process-timeline reveal">
              {[
                { num: "01", phase: "Week 1–2", title: "Research & Strategy", desc: "We spend the first two weeks understanding your business, audience, competitors, and goals. No assumptions — only evidence. We map user journeys, identify conversion opportunities, and define technical requirements before a single pixel is placed.", duration: "2 weeks", involvement: "2–3 hrs/week", deliverables: ["Strategy Brief", "User Personas", "Competitive Analysis", "Technical Spec"] },
                { num: "02", phase: "Week 2–3", title: "Information Architecture", desc: "Before design begins, we map out every page, every pathway, and every content requirement. We identify what information your visitors need at each stage of their journey and architect the site to deliver it effortlessly.", duration: "1 week", involvement: "1–2 hrs", deliverables: ["Sitemap", "User Flow Diagrams", "Content Inventory", "Wireframe Sketches"] },
                { num: "03", phase: "Week 3–6", title: "UI / UX Design", desc: "This is where vision becomes reality. We design in Figma, creating responsive designs for every key page. Two rounds of revisions are included. We present rationale behind every decision — you'll understand not just what we built, but why.", duration: "3 weeks", involvement: "4–6 hrs", deliverables: ["Design System", "Full Page Designs", "Mobile Designs", "Component Library", "Prototype"] },
                { num: "04", phase: "Week 6–10", title: "Development", desc: "We build in Next.js with TypeScript — production-grade code that's maintainable, scalable, and fast. Weekly progress reviews keep you informed. CMS integration allows your team to manage content without a developer.", duration: "4 weeks", involvement: "1–2 hrs/week", deliverables: ["Staging Environment", "CMS Setup", "API Integrations", "Code Repository"] },
                { num: "05", phase: "Week 10–11", title: "SEO & Performance Optimization", desc: "Before launch, every page is audited for Core Web Vitals, structured data, metadata, and crawlability. We target 90+ Lighthouse across all four metrics. Analytics, heatmaps, and conversion tracking go live with the site.", duration: "1 week", involvement: "0.5 hrs", deliverables: ["SEO Audit Report", "Performance Report", "Schema Markup", "Analytics Setup"] },
                { num: "06", phase: "Week 12 onwards", title: "Launch & Support", desc: "We handle the full launch — DNS migration, CDN configuration, and a 48-hour monitoring window. Post-launch support is included for 30 days. Ongoing retainer options keep your site evolving as your business grows.", duration: "Ongoing", involvement: "1 hr total", deliverables: ["Live Website", "Handoff Documentation", "Training Session", "30-Day Support"] },
              ].map(({ num, phase, title, desc, duration, involvement, deliverables }) => (
                <div key={num} className="process-step">
                  <div className="process-num-wrap"><div className="process-num">{num}</div></div>
                  <div className="process-body">
                    <div className="process-phase">{phase}</div>
                    <div className="process-title">{title}</div>
                    <div className="process-desc">{desc}</div>
                    <div className="process-meta">
                      <div><div className="process-meta-label">Duration</div><div className="process-meta-val">{duration}</div></div>
                      <div><div className="process-meta-label">Your involvement</div><div className="process-meta-val">{involvement}</div></div>
                    </div>
                    <div className="process-deliverables">{deliverables.map((d) => <span key={d} className="deliverable">{d}</span>)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESULTS ── */}
        <section className="results" id="results">
          <div className="container">
            <div className="reveal">
              <div className="section-kicker">By the Numbers</div>
              <h2 className="section-h2">What our websites<br/>consistently deliver.</h2>
              <p className="section-sub">Benchmarks from our last 20 launches, measured at the 90-day mark.</p>
            </div>
            <div className="metrics-grid reveal">
              {[
                { val: "90", sup: "+", label: "Lighthouse Performance Score across all projects" },
                { val: "1.8", sup: "s", label: "Average time-to-interactive on first load" },
                { val: "100", sup: "%", label: "Mobile-first — every project, every time" },
                { val: "3.2", sup: "×", label: "Average lead volume increase at 90 days post-launch" },
                { val: "A", sup: "A", label: "WCAG 2.2 accessibility compliance on every build" },
              ].map(({ val, sup, label }) => (
                <div key={val + sup} className="metric-item">
                  <div className="metric-value">{val}<span>{sup}</span></div>
                  <div className="metric-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="wde-section testimonials" id="testimonials">
          <div className="container">
            <div className="reveal">
              <div className="section-kicker">Client Voices</div>
              <h2 className="section-h2">What our clients say.</h2>
              <p className="section-sub">We measure success in business outcomes, not Awwwards trophies — though we&apos;re proud of those too.</p>
            </div>
            <div className="testi-grid reveal">
              {[
                { quote: "Within six weeks of launch, our qualified lead pipeline had more than doubled. The site doesn't just look impressive — it works as a 24/7 sales asset.", name: "Adewale Okonkwo", role: "Managing Director, Apex Properties", init: "AO", bg: "#FEF3E8", col: "#9A4B0A" },
                { quote: "GITS understood our clinical audience better than agencies twice their size. The booking system alone reduced our admin workload by 40%. Exceptional work.", name: "Dr. Chioma Nwachukwu", role: "Medical Director, CareFirst Clinics", init: "CN", bg: "#EBF4FF", col: "#0C4C8A" },
                { quote: "Our conversion rate went from 0.9% to 3.8% in the first quarter. I've worked with agencies in London and Dubai — GITS delivers at a level that competes with all of them.", name: "Tobi Fashola", role: "Founder & CEO, LuxStore", init: "TF", bg: "#F5F0FF", col: "#5A2AA8" },
              ].map(({ quote, name, role, init, bg, col }) => (
                <div key={name} className="testi-card">
                  <div className="testi-stars">{"★★★★★".split("").map((s, i) => <span key={i} className="testi-star">{s}</span>)}</div>
                  <p className="testi-quote">&ldquo;{quote}&rdquo;</p>
                  <div className="testi-author">
                    <div className="testi-avatar" style={{ background: bg, color: col }}>{init}</div>
                    <div><div className="testi-name">{name}</div><div className="testi-role">{role}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="final-cta" id="contact">
          <div className="final-cta-bg"/>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="section-kicker" style={{ justifyContent: "center", marginBottom: "24px" }}>Let&apos;s Build Something Exceptional</div>
            <h2 className="final-cta-h">Ready to build a website that works as hard as you do?</h2>
            <p className="final-cta-sub">Let&apos;s discuss your project and create a website designed to generate measurable business results.</p>
            <div className="final-cta-actions">
              <a href="mailto:hello@gits.agency" className="btn-primary" style={{ padding: "16px 36px", fontSize: "15px" }}>Start Your Project →</a>
              <a href="mailto:hello@gits.agency?subject=Schedule+Consultation" className="btn-secondary" style={{ padding: "16px 36px", fontSize: "15px" }}>Schedule a Consultation</a>
            </div>
            <p className="final-cta-note">Typically respond within 24 hours · No commitment required · Based in Abuja, serving globally</p>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="wde-footer">
          <div className="wde-footer-inner">
            <span className="footer-logo">GITS</span>
            <div className="footer-links">
              <a href="#">Work</a>
              <a href="#">Services</a>
              <a href="#">Process</a>
              <a href="#">Contact</a>
            </div>
            <span className="footer-copy">© 2025 Gwer Intelligent Tech Solutions</span>
          </div>
        </footer>
      </div>
    </>
  );
}