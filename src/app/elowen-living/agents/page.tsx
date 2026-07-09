"use client";

import { useState } from "react";
import Image from "next/image";

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const agents = [
    { name: "Sarah Mitchell", title: "Sales Manager - Project Developments", location: "Park Avenue Tower, New York, NY", image: "/images/elowen/agent-1.jpg" },
    { name: "James Wellington", title: "Senior Real Estate Advisor", location: "Beverly Hills, California", image: "/images/elowen/agent-2.jpg" },
    { name: "Elena Rodriguez", title: "Luxury Property Specialist", location: "Miami Beach, Florida", image: "/images/elowen/agent-3.jpg" },
    { name: "Michael Chen", title: "International Sales Director", location: "Singapore, Southeast Asia", image: "/images/elowen/agent-4.jpg" },
    { name: "Isabella Romano", title: "European Markets Lead", location: "Rome, Italy", image: "/images/elowen/agent-5.jpg" },
    { name: "David Thompson", title: "Waterfront Property Expert", location: "Hamptons, New York", image: "/images/elowen/agent-6.jpg" },
    { name: "Amara Okafor", title: "Development Projects Manager", location: "Lagos, Nigeria", image: "/images/elowen/agent-7.jpg" },
    { name: "Robert Harrington", title: "Historic Properties Specialist", location: "London, United Kingdom", image: "/images/elowen/agent-8.jpg" },
    { name: "Yuki Tanaka", title: "Asia-Pacific Director", location: "Tokyo, Japan", image: "/images/elowen/agent-9.jpg" },
    { name: "Camille Dubois", title: "French Riviera Specialist", location: "Nice, France", image: "/images/elowen/agent-10.jpg" },
    { name: "Alexander Petrov", title: "Eastern Europe Advisor", location: "Moscow, Russia", image: "/images/elowen/agent-11.jpg" },
    { name: "Priya Sharma", title: "South Asia Markets Lead", location: "Mumbai, India", image: "/images/elowen/agent-12.jpg" },
  ];

  const filteredAgents = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Hero Section with Background Image */}
      <section className="hero-agents">
        <Image
          src="/images/elowen/agents-hero.jpg"
          alt="Luxury Poolside Estate"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="hero-agents-overlay">
          <h1>Our local experts will guide you on your journey.</h1>
        </div>
        <div className="hero-agents-search">
          <span style={{ color: "#999", fontSize: "20px" }}>&#128269;</span>
          <input
            type="text"
            placeholder="Person's name or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-arrow">&#8594;</button>
        </div>
      </section>

      {/* Agents Listing Section */}
      <section className="agents-section">
        <div className="agents-header">
          <h2>Worldwide Agents</h2>
          <div className="agents-sort">
            <span style={{ color: "#666" }}>Sort:</span>
            <span style={{ color: "#1a1a1a", fontWeight: 600, cursor: "pointer" }}>Sort A-Z &#9662;</span>
          </div>
        </div>

        <div className="agents-grid">
          {filteredAgents.map((agent, i) => (
            <div className="agent-card" key={i}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", marginBottom: "16px", overflow: "hidden" }}>
                <Image
                  src={agent.image}
                  alt={agent.name}
                  fill
                  style={{ objectFit: "cover", filter: "grayscale(100%)", transition: "filter 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0%)")}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(100%)")}
                />
              </div>
              <div className="agent-name">{agent.name}</div>
              <div className="agent-title">{agent.title}</div>
              <div className="agent-location">{agent.location}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
