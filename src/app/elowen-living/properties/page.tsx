"use client";

import { useState } from "react";
import Image from "next/image";

export default function PropertiesPage() {
  const [activeFilter, setActiveFilter] = useState("Buy");
  const filters = ["Buy", "Rent", "Price Range", "Beds & Baths", "Home Type", "Filters"];

  const properties = [
    { price: "$12,500,000", address: "123 Ocean View Drive", city: "Malibu, California 90265", details: "5 Beds • 7 Baths • 8,500 sq ft", image: "/images/elowen/property-1.jpg", alt: "Ocean View Estate Malibu" },
    { price: "$8,950,000", address: "456 Park Avenue, Apt 45B", city: "New York, New York 10022", details: "3 Beds • 4 Baths • 3,200 sq ft", image: "/images/elowen/property-2.jpg", alt: "Park Avenue Penthouse New York" },
    { price: "$24,000,000", address: "789 Bel Air Road", city: "Los Angeles, California 90077", details: "7 Beds • 10 Baths • 15,000 sq ft", image: "/images/elowen/property-3.jpg", alt: "Bel Air Mansion Los Angeles" },
    { price: "$4,200,000", address: "321 Lake Shore Drive", city: "Chicago, Illinois 60611", details: "4 Beds • 5 Baths • 4,100 sq ft", image: "/images/elowen/property-4.jpg", alt: "Lake Shore Residence Chicago" },
    { price: "$18,750,000", address: "555 Star Island Drive", city: "Miami Beach, Florida 33139", details: "6 Beds • 8 Baths • 12,000 sq ft", image: "/images/elowen/property-5.jpg", alt: "Star Island Estate Miami Beach" },
    { price: "$6,800,000", address: "888 Commonwealth Avenue", city: "Boston, Massachusetts 02215", details: "4 Beds • 5 Baths • 5,200 sq ft", image: "/images/elowen/property-6.jpg", alt: "Commonwealth Avenue Townhouse Boston" },
  ];

  const markers = [
    { top: "25%", left: "48%", val: "410" },
    { top: "30%", left: "52%", val: "2" },
    { top: "28%", left: "55%", val: "28" },
    { top: "32%", left: "50%", val: "47" },
    { top: "35%", left: "54%", val: "66" },
    { top: "33%", left: "58%", val: "4" },
    { top: "38%", left: "51%", val: "1k", large: true },
    { top: "40%", left: "56%", val: "463" },
    { top: "42%", left: "60%", val: "1" },
    { top: "45%", left: "53%", val: "57" },
    { top: "48%", left: "62%", val: "177" },
    { top: "50%", left: "58%", val: "9" },
    { top: "52%", left: "65%", val: "65" },
    { top: "55%", left: "50%", val: "77" },
    { top: "58%", left: "55%", val: "822", large: true },
    { top: "60%", left: "48%", val: "14" },
    { top: "62%", left: "52%", val: "2k", large: true },
    { top: "65%", left: "45%", val: "122" },
    { top: "68%", left: "58%", val: "5" },
    { top: "70%", left: "63%", val: "363" },
    { top: "72%", left: "68%", val: "303" },
    { top: "75%", left: "70%", val: "9" },
    { top: "78%", left: "60%", val: "30" },
    { top: "80%", left: "72%", val: "14" },
    { top: "82%", left: "75%", val: "25" },
    { top: "35%", left: "35%", val: "65" },
    { top: "70%", left: "38%", val: "1k", large: true },
    { top: "75%", left: "40%", val: "530" },
    { top: "78%", left: "42%", val: "44" },
    { top: "80%", left: "45%", val: "87" },
    { top: "82%", left: "48%", val: "43" },
    { top: "85%", left: "50%", val: "4" },
  ];

  return (
    <>
      {/* Search Bar Section */}
      <div className="search-bar-section">
        <div className="search-input-wrapper">
          <span style={{ color: "#999", fontSize: "18px" }}>&#128269;</span>
          <input type="text" placeholder="Country, City, Address, Postal Code or ID" />
        </div>
        <div className="search-filters">
          {filters.map((f) => (
            <button
              key={f}
              className={activeFilter === f ? "filter-btn active" : "filter-btn"}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Properties Section */}
      <div className="properties-section">
        {/* List View */}
        <div className="properties-list">
          <div className="properties-header">
            <h2>Viewing 24 of 952,254 Homes for Sale in All locations</h2>
            <p>Showing listings marketed by all brokers in the searched area.</p>
          </div>
          <div className="sort-bar">
            <span className="sort-label">Sort:</span>
            <span className="sort-value">Exclusive (Default) &#9662;</span>
          </div>

          {properties.map((prop, i) => (
            <div className="property-card" key={i}>
              <div style={{ position: "relative", width: "280px", height: "200px", flexShrink: 0 }}>
                <Image
                  src={prop.image}
                  alt={prop.alt}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="card-info">
                <div className="card-price">{prop.price}</div>
                <div className="card-address">{prop.address}<br />{prop.city}</div>
                <div className="card-details">{prop.details}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Map View */}
        <div className="map-section">
          <div className="map-controls">
            <button className="map-control-btn">
              <span>&#128204;</span> Boundary
            </button>
            <button className="map-control-btn">Remove Outline</button>
          </div>
          <div className="map-zoom">
            <button className="map-zoom-btn">+</button>
            <button className="map-zoom-btn">&#8722;</button>
          </div>
          <div className="map-placeholder">
            <span className="map-placeholder-text">Interactive Map</span>
            {markers.map((m, i) => (
              <div className={`map-marker ${m.large ? "large" : ""}`} style={{ top: m.top, left: m.left }} key={i}>
                {m.val}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
