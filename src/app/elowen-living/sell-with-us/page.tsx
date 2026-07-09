"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SellWithUsPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const subTabs = ["Overview", "Find an Expert", "Marketing"];

  return (
    <>
      {/* Sub Navigation */}
      <div className="sub-nav">
        {subTabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <button className="cta-btn">List Your Home</button>
      </div>

      {/* Hero Section */}
      <section className="hero-sell">
        <h1>Sell with Us</h1>
        <p>Exceptional properties deserve extraordinary marketing.</p>
      </section>

      {/* Intro Section */}
      <section className="content-section">
        <div className="section-header">
          <h2 className="section-title">Don&apos;t just get it on the market.<br />Get it the attention it deserves.</h2>
        </div>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: "16px", color: "#666", lineHeight: "1.8", marginBottom: "40px" }}>
            For those who demand an elevated service like none other, there&apos;s Elowen Living. We&apos;re the industry&apos;s best agents, curating with incomparable attention to style and detail. We&apos;re here for you to help sell your home at a scale you just won&apos;t find anywhere else.
          </p>
        </div>

        {/* Two Column Feature */}
        <div className="two-column" style={{ marginTop: "60px" }}>
          <div className="column-content">
            <h3>List Your Home with Elowen Living</h3>
            <p>If you are considering a move anywhere around the globe, it would be our privilege to help you facilitate your best outcome.</p>
            <div style={{ marginTop: "30px" }}>
              <div style={{ display: "flex", gap: "40px", marginBottom: "30px" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#666", lineHeight: "1.7", marginBottom: "16px" }}>
                    Our network of local real estate professionals apply their local market knowledge to create a comprehensive and customized plan for your home.
                  </p>
                  <Link href="/elowen-living/agents" className="column-link">Find your agent &#8594;</Link>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#666", lineHeight: "1.7", marginBottom: "16px" }}>
                    With experts in every part of the world, we are local everywhere. With innovative technology and unrivaled service, our local brokerage offices can elevate your property.
                  </p>
                  <Link href="#" className="column-link">Contact Your Local Office &#8594;</Link>
                </div>
              </div>
            </div>
          </div>
          <div style={{ position: "relative", width: "100%", height: "500px" }}>
            <Image
              src="/images/elowen/luxury-interior.jpg"
              alt="Luxury Property Interior"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="content-section dark">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Be where the world is looking.</h2>
          </div>
          <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: "1.8", marginBottom: "50px" }}>
              The homes we represent benefit from the worldwide recognition and prestige of the Elowen name, giving them exclusive access to a highly qualified global clientele. The award-winning Elowen Living website, available in multiple languages, reaches more visitors than any other luxury real estate platform.
            </p>
          </div>
          <div className="features-grid" style={{ marginTop: "40px" }}>
            <div className="feature-card" style={{ color: "#fff" }}>
              <div className="feature-icon" style={{ background: "rgba(255,255,255,0.1)", color: "#c9a96e" }}>&#9733;</div>
              <h3 style={{ color: "#fff" }}>Unrivaled Marketing</h3>
              <p style={{ color: "rgba(255,255,255,0.6)" }}>Exclusive partnerships and public relations powerhouse to showcase your property.</p>
            </div>
            <div className="feature-card" style={{ color: "#fff" }}>
              <div className="feature-icon" style={{ background: "rgba(255,255,255,0.1)", color: "#c9a96e" }}>&#9733;</div>
              <h3 style={{ color: "#fff" }}>Brand Heritage</h3>
              <p style={{ color: "rgba(255,255,255,0.6)" }}>Centuries of tradition and reputation that opens doors to the most prestigious clientele.</p>
            </div>
            <div className="feature-card" style={{ color: "#fff" }}>
              <div className="feature-icon" style={{ background: "rgba(255,255,255,0.1)", color: "#c9a96e" }}>&#9733;</div>
              <h3 style={{ color: "#fff" }}>True Global Reach</h3>
              <p style={{ color: "rgba(255,255,255,0.6)" }}>We distribute listings to the most relevant websites around the globe with top analytic tools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="content-section">
        <div className="section-header">
          <h2 className="section-title">We drive more eyes to your listing.</h2>
          <p className="section-subtitle">At Elowen Living, we create exclusive content to promote your property to those who are passionate about fine living.</p>
        </div>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">1.2M</div>
            <div className="stat-label">Engaged Social Followers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">#1</div>
            <div className="stat-label">Most Viewed Real Estate Channel</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">33M</div>
            <div className="stat-label">Annual Visits in 2024</div>
          </div>
        </div>
      </section>

      {/* Exclusive Highlights */}
      <section className="content-section" style={{ background: "#f8f8f8" }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">The way you market your home should have that wow factor too.</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div style={{ position: "relative", width: "100%", height: "200px", marginBottom: "20px" }}>
                <Image
                  src="/images/elowen/press-coverage.jpg"
                  alt="Press Coverage"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h3>In The News</h3>
              <p>As the most profiled luxury real estate brand in the news, we lead the conversation and drive traffic to listings.</p>
            </div>
            <div className="feature-card">
              <div style={{ position: "relative", width: "100%", height: "200px", marginBottom: "20px" }}>
                <Image
                  src="/images/elowen/network-map.jpg"
                  alt="Global Network Map"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h3>Unparalleled Network</h3>
              <p>The only truly global luxury real estate company with advisors working in local offices across 80+ countries.</p>
            </div>
            <div className="feature-card">
              <div style={{ position: "relative", width: "100%", height: "200px", marginBottom: "20px" }}>
                <Image
                  src="/images/elowen/creative-agency.jpg"
                  alt="Creative Agency Partnership"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h3>The Highest Standard</h3>
              <p>Working alongside the highest-profile creative agencies to connect with global consumers through sophisticated design.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-section dark" style={{ textAlign: "center" }}>
        <div className="container">
          <p style={{ fontFamily: "Georgia, serif", fontSize: "22px", color: "#ffffff", fontStyle: "italic", marginBottom: "30px" }}>
            Connect with our local experts who can create a comprehensive and customized plan for your home.
          </p>
          <Link href="/elowen-living/agents" className="nav-cta" style={{ display: "inline-block", fontSize: "14px", padding: "16px 40px" }}>
            Find an Expert
          </Link>
        </div>
      </section>
    </>
  );
}
