import { useState } from "react";
import { usePerfumes } from "../hooks/usePerfumes";
import PerfumeModal from "./PerfumeModal";

export default function NewArrivals() {
  const { perfumes: newArrivals, loading } = usePerfumes({ newArrival: true });
  const [selectedPerfume, setSelectedPerfume] = useState(null);

  // Section always visible — shows empty state if no new arrivals

  return (
    <>
      <section id="new-arrivals" style={{ background: "#1a1a14", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Header row */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16,
          }}>
            <div>
              <div style={{
                fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase",
                fontWeight: 600, color: "#c9a84c", marginBottom: 12,
              }}>
                Just Arrived
              </div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(30px, 4vw, 46px)",
                fontWeight: 400, color: "#f0ebe0", lineHeight: 1.15, marginBottom: 6,
              }}>
                New Expressions of Fragrance
              </h2>
              <p style={{ fontSize: 12, fontWeight: 300, color: "#7a7060" }}>
                Meet our latest creations, thoughtfully crafted to{" "}
                <span style={{ color: "#c9a84c", fontStyle: "italic" }}>inspire</span> your senses.
              </p>
            </div>
            <a href="/collection" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
              fontWeight: 600, color: "#f0ebe0",
              border: "1px solid rgba(240,235,224,0.25)",
              padding: "10px 20px", textDecoration: "none", transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#c9a84c"; e.currentTarget.style.color = "#c9a84c"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(240,235,224,0.25)"; e.currentTarget.style.color = "#f0ebe0"; }}
            >
              View Full Collection &nbsp;→
            </a>
          </div>

          {/* Loading spinner */}
          {loading && (
            <div style={{ textAlign: "center", padding: 40, color: "#5a5040" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5"
                style={{ animation: "spin 1s linear infinite" }}>
                <path d="M21 12a9 9 0 00-9-9"/><path d="M21 12a9 9 0 01-9 9" strokeOpacity="0.3"/>
              </svg>
            </div>
          )}

          {/* Empty state */}
          {!loading && newArrivals.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 28, color: "#3a342d", marginBottom: 10,
              }}>
                New arrivals coming soon
              </div>
              <p style={{ fontSize: 12, color: "#5a5040", fontWeight: 300 }}>
                Our latest fragrances are being prepared. Check back shortly.
              </p>
            </div>
          )}

          {/* Cards */}
          {!loading && newArrivals.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="arrivals-grid">

              {newArrivals.map((item) => (
                <div
                  key={item.id}
                  className="perfume-card anim-fade-up"
                  onClick={() => setSelectedPerfume(item)}
                  style={{ cursor: "pointer" }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${item.name}`}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedPerfume(item)}
                >
                  <div style={{ position: "relative" }}>
                    <div className="card-img" style={{ height: 320, background: "#252520" }}>
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ position: "absolute", top: 16, left: 16 }}>
                      <span className="badge-new">New Arrival</span>
                    </div>
                    <div style={{
                      position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      opacity: 0, transition: "opacity 0.3s",
                    }} className="card-hover-overlay">
                      <span style={{
                        background: "rgba(17,17,9,0.9)", color: "#c9a84c",
                        fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
                        padding: "10px 20px", border: "1px solid rgba(201,168,76,0.4)",
                      }}>
                        View Details
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: "18px 20px 24px", background: "#1a1a14" }}>
                    <div style={{ fontSize: 8, letterSpacing: "0.22em", fontWeight: 600, color: "#7a7060", textTransform: "uppercase", marginBottom: 6 }}>
                      {item.category}
                    </div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 500, color: "#f0ebe0", marginBottom: 6, lineHeight: 1.2 }}>
                      {item.name}
                    </h3>
                    {item.price && (
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#c9a84c", marginBottom: 8 }}>
                        {item.price}
                      </div>
                    )}
                    <p style={{ fontSize: 11, fontWeight: 300, lineHeight: 1.75, color: "#8a7e6e" }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedPerfume && (
        <PerfumeModal perfume={selectedPerfume} onClose={() => setSelectedPerfume(null)} />
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 600px)                        { .arrivals-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 601px) and (max-width: 900px) { .arrivals-grid { grid-template-columns: 1fr 1fr !important; } }
        .perfume-card:hover .card-hover-overlay { opacity: 1 !important; }
      `}</style>
    </>
  );
}
