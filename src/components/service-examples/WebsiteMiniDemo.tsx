"use client";
import { useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import "./demos.css";
export default function WebsiteMiniDemo({
  kind,
}: {
  kind: "notgate" | "lamed" | "elowen";
}) {
  const [view, setView] = useState("Home"),
    [selected, setSelected] = useState(""),
    [message, setMessage] = useState(""),
    [brief, setBrief] = useState(""),
    [step, setStep] = useState(0);
  const [selectedRoom, setRoom] = useState("Exterior");
  const scrollRef = useRef<HTMLElement>(null);
  const dark = kind === "notgate",
    name = dark
      ? "NOTGATE"
      : kind === "lamed"
        ? "LaMed Pharmacy"
        : "Elowen Living",
    tabs =
      kind === "notgate"
        ? ["Home", "Projects", "Enquire"]
        : kind === "lamed"
          ? ["Home", "Prescription", "Branches"]
          : ["Home", "Properties", "Viewing"];
  return (
    <section
      ref={scrollRef}
      className={`interactive-demo site-mini site-mini-${kind}`}
      aria-label={`${name} website sample`}
      style={
        {
          height: "100%",
          overflow: "auto",
          padding: 16,
          borderRadius: 0,
          border: 0,
          background: dark ? "#3b0d17" : kind === "elowen" ? "#f8f7f3" : "#fff",
          color: dark ? "#fff" : "#243044",
          "--demo-accent": dark
            ? "#b64717"
            : kind === "lamed"
              ? "#176647"
              : "#16372e",
        } as CSSProperties
      }
    >
      <strong
        style={{ fontFamily: dark ? "Arial" : "Georgia", letterSpacing: 2 }}
      >
        {name}
      </strong>
      <nav
        aria-label={`${name} sample pages`}
        style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "12px 0" }}
      >
        {tabs.map((t) => (
          <button
            className="demo-secondary"
            key={t}
            aria-pressed={view === t}
            onClick={() => {
              setView(t);
              setMessage("");
              scrollRef.current?.scrollTo({ top: 0 });
            }}
          >
            {t}
          </button>
        ))}
      </nav>
      <small>Interface simulation · sample content · no live submission</small>
      {message && (
        <p role="status" className="demo-notice">
          {message}
        </p>
      )}
      {view === "Home" ? (
        <>
          {kind === "elowen" && (
            <Image
              width={800}
              height={450}
              className="site-demo-hero"
              src="/images/elowen/hero-featured.webp"
              alt="Illustrative featured residence"
            />
          )}
          <p className="site-demo-eyebrow">
            {dark
              ? "Construction & infrastructure"
              : kind === "lamed"
                ? "Your care, our priority"
                : "Distinctive homes · considered living"}
          </p>
          <h4
            style={{
              fontSize: 22,
              margin: "14px 0",
              fontFamily: dark ? "Arial" : "Georgia",
            }}
          >
            {dark
              ? "Building Nigeria’s future."
              : kind === "lamed"
                ? "Care, closer to you."
                : "A considered place to live."}
          </h4>
          <p style={{ marginBottom: 14 }}>
            {dark
              ? "Explore how a project moves from planning to handover."
              : kind === "lamed"
                ? "Explore the sample prescription request and branch collection flow."
                : "Explore a sample residence, room views and a viewing request."}
          </p>
          <button className="demo-primary" onClick={() => setView(tabs[1])}>
            Explore {tabs[1].toLowerCase()} →
          </button>
          <div className="site-demo-highlights">
            {(dark
              ? ["Plan", "Build", "Handover"]
              : kind === "lamed"
                ? ["Staff review", "Local branches", "Collection"]
                : ["Explore", "Choose a room", "Arrange a viewing"]
            ).map((label, i) => (
              <span key={label}>
                <b>0{i + 1}</b>
                {label}
              </span>
            ))}
          </div>
        </>
      ) : view === "Projects" || view === "Properties" ? (
        <>
          {(dark
            ? [
                "Commercial development",
                "Infrastructure project",
                "Residential build",
              ]
            : [
                "Five-bedroom residence · Maitama",
                "Three-bedroom apartment · Wuse",
              ]
          ).map((item) => (
            <button
              className="demo-row"
              key={item}
              onClick={() => {
                setSelected(item);
                setRoom("Exterior");
                setMessage("");
              }}
            >
              {!dark && (
                <Image
                  width={72}
                  height={64}
                  className="site-property-thumb"
                  src={
                    item.startsWith("Five")
                      ? "/images/elowen/property-1.webp"
                      : "/images/elowen/property-2.webp"
                  }
                  alt="Sample residence"
                />
              )}
              <span className="demo-row-main">
                <strong>{item}</strong>
                <small>Open sample details</small>
              </span>
            </button>
          ))}
          {selected && (
            <div className="demo-card">
              <h4>{selected}</h4>
              <p>
                {dark
                  ? "Sample scope: site planning, build coordination and handover."
                  : "Sample layout: reception, kitchen, bedrooms and outdoor space."}
              </p>
              {!dark && (
                <>
                  <figure className="site-room-gallery">
                    <Image
                      width={800}
                      height={450}
                      src={
                        selectedRoom === "Living"
                          ? "/images/elowen/luxury-interior.webp"
                          : selectedRoom === "Virtual tour"
                            ? "/images/elowen/virtual-tour.webp"
                            : selected.startsWith("Five")
                              ? "/images/elowen/property-1.webp"
                              : "/images/elowen/property-2.webp"
                      }
                      alt={`${selectedRoom} · illustrative imagery, not the live listing`}
                    />
                    <figcaption>
                      {selectedRoom} · illustrative gallery
                    </figcaption>
                  </figure>
                  <div className="demo-actions" aria-label="Room gallery">
                    {["Living", "Virtual tour", "Exterior"].map((room) => (
                      <button
                        className="demo-secondary"
                        key={room}
                        aria-pressed={room === selectedRoom}
                        onClick={() => {
                          setRoom(room);
                          setMessage(
                            `${room} view selected for ${selected}. This is a sample property, not a live listing.`,
                          );
                        }}
                      >
                        {room}
                      </button>
                    ))}
                  </div>
                </>
              )}
              <button className="demo-primary" onClick={() => setView(tabs[2])}>
                {dark ? "Discuss a similar project" : "Arrange a viewing"}
              </button>
            </div>
          )}
        </>
      ) : view === "Prescription" ? (
        <div className="demo-card">
          <h4>Sample prescription request</h4>
          <p>
            No real prescription, eligibility or medical information is
            collected.
          </p>
          <ol className="demo-steps">
            {["Sample attached", "Staff review", "Collection"].map((s, i) => (
              <li key={s} aria-current={step === i ? "step" : undefined}>
                {s}
              </li>
            ))}
          </ol>
          <button
            className="demo-primary"
            disabled={step === 2}
            onClick={() => {
              setStep((s) => s + 1);
              setMessage(
                step === 0
                  ? "Fictional document attached. A pharmacist would review a real request; no medical or coverage verification has happened."
                  : "Sample reviewer acknowledged the request. Choose a branch for collection.",
              );
            }}
          >
            {step === 0
              ? "Attach sample document"
              : "Simulate staff acknowledgement"}
          </button>
          {step === 2 && (
            <button
              className="demo-secondary"
              onClick={() => setView("Branches")}
            >
              Choose collection branch
            </button>
          )}
          <button
            className="demo-secondary"
            onClick={() => {
              setStep(0);
              setMessage("Request reset.");
            }}
          >
            Reset request
          </button>
        </div>
      ) : view === "Branches" ? (
        <>
          {["Rayfield · open", "Terminus · open", "Bukuru · closed"].map(
            (branch) => (
              <button
                className="demo-row"
                key={branch}
                disabled={branch.includes("closed")}
                onClick={() => {
                  setSelected(branch);
                  setMessage(
                    step === 2
                      ? `Sample collection request assigned to ${branch}. No appointment was sent.`
                      : `${branch} selected. Complete the sample request before arranging collection.`,
                  );
                }}
              >
                <span className="demo-row-main">
                  <strong>{branch}</strong>
                  <small>Sample branch availability</small>
                </span>
              </button>
            ),
          )}
        </>
      ) : (
        <div className="demo-card">
          <h4>{view === "Viewing" ? "Viewing request" : "Project enquiry"}</h4>
          <p>{selected || "Describe the project you have in mind."}</p>
          <label className="demo-label">
            {view === "Viewing"
              ? "Preferred day / time"
              : "Project requirements"}
            <textarea
              className="demo-input"
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              maxLength={200}
              placeholder="Use sample information only"
            />
          </label>
          <button
            className="demo-primary"
            onClick={() =>
              setMessage(
                brief.trim()
                  ? `Sample ${view === "Viewing" ? "viewing request" : "brief"} saved for review. Nothing was submitted externally.`
                  : "Enter a short sample request first.",
              )
            }
          >
            Save sample request
          </button>
        </div>
      )}
    </section>
  );
}
