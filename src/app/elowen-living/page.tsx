"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("Buy");
  const tabs = ["Buy", "Rent", "Developments", "Sell", "Agents"];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-home">
        <div className="hero-home-content">
          <div className="hero-home-left">
            <h1>Find a home that suits your lifestyle.</h1>
            <div className="hero-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={activeTab === tab ? "active" : ""}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="hero-search">
              <input type="text" placeholder="Country, City, Address, Postal Code or ID" />
              <button className="search-arrow">&#8594;</button>
            </div>
          </div>
          <div className="hero-property-card">
            <div style={{ position: "relative", width: "100%", height: "400px" }}>
              <Image
                src="/images/elowen/hero-featured.jpg"
                alt="Chatham MA Estate"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <div className="property-overlay">
              <div className="property-location">Chatham, MA</div>
              <div className="property-details">
                <span>United States</span>
                <span className="dot">&#8226;</span>
                <span>$5,995,000</span>
              </div>
              <Link href="/elowen-living/properties" className="see-details">
                See Details <span>&#8594;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section style={{ padding: "80px 40px", background: "#ffffff" }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Exceptional Locations, Unrivaled Lifestyles.</h2>
            <p className="section-subtitle">Conceived in the belief that home and living in full are inextricably entwined.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div style={{ position: "relative", width: "100%", height: "280px", marginBottom: "20px" }}>
                <Image
                  src="/images/elowen/magazine-cover.jpg"
                  alt="Reside Magazine"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h3>Reside Magazine</h3>
              <p>Exceptional Locations, Unrivaled Lifestyles. The finest in inspirational locales and lifestyles.</p>
            </div>
            <div className="feature-card">
              <div style={{ position: "relative", width: "100%", height: "280px", marginBottom: "20px" }}>
                <Image
                  src="/images/elowen/market-report.jpg"
                  alt="Luxury Outlook Market Report"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h3>Luxury Outlook</h3>
              <p>An ambitious exploration into high-end residential markets across the globe.</p>
            </div>
            <div className="feature-card">
              <div style={{ position: "relative", width: "100%", height: "280px", marginBottom: "20px" }}>
                <Image
                  src="/images/elowen/virtual-tour.jpg"
                  alt="Virtual Experiences"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h3>Virtual Experiences</h3>
              <p>Experience luxury homes like never before, all from the comfort of yours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="content-section dark">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">The one for an exceptional home and life.</h2>
          </div>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: "1.8", marginBottom: "30px" }}>
              Built on centuries of tradition and dedicated to innovating the luxury real estate industry, Elowen Living offers transformative experiences through a global network of exceptional agents. Only one network of agents represents the longest standing tastemaker in the world.
            </p>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: "1.8" }}>
              In the spirit of innovation, an exceptional luxury real estate company was launched with a commitment to excellence. Beyond the beautiful properties and the personal touch of our agents, only one brand can deliver a lifestyle that caters to you.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
