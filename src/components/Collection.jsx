import { useState } from "react";
import { usePerfumes } from "../hooks/usePerfumes";
import PerfumeModal from "./PerfumeModal";
import { filterTabs } from "../data/perfumes"; // only filter config stays static

export default function Collection({ featuredOnly = false }) {
  const { perfumes, loading, error } = usePerfumes();
  const [activeFilter,    setActiveFilter]    = useState("all");
  const [selectedPerfume, setSelectedPerfume] = useState(null);

  // Show ALL perfumes or featured only based on prop
  const basePerfumes = featuredOnly ? perfumes.filter((p) => p.isFeatured) : perfumes;

  const filtered =
    activeFilter === "all"
      ? basePerfumes
      : basePerfumes.filter((p) => p.categorySlug === activeFilter);

  return (
    <>
      <section id="collection" style={{ background: "#f0ebe0", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{
              fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase",
              fontWeight: 600, color: "#c9a84c", marginBottom: 16,
            }}>
              Curated Formulations
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(34px, 5vw, 56px)",
              fontWeight: 400, color: "#1a1a14", marginBottom: 12, lineHeight: 1.1,
            }}>
              Discover Our Collection
            </h2>
            <p style={{ fontSize: 12, fontWeight: 300, color: "#6a6050" }}>
              Explore an exclusive selection of fragrances crafted for every moment.
            </p>
          </div>

          {/* Filter Tabs */}
          <div style={{
            display: "flex", flexWrap: "wrap", justifyContent: "center",
            gap: 4, marginBottom: 48, background: "#e8e2d4",
            padding: 4, width: "fit-content", margin: "0 auto 48px",
          }}>
            {filterTabs.map((tab) => (
              <button
                key={tab.slug}
                className={`filter-tab${activeFilter === tab.slug ? " active" : ""}`}
                onClick={() => setActiveFilter(tab.slug)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#8a7060" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5"
                style={{ animation: "spin 1s linear infinite", marginBottom: 12 }}>
                <path d="M21 12a9 9 0 00-9-9"/><path d="M21 12a9 9 0 01-9 9" strokeOpacity="0.3"/>
              </svg>
              <div style={{ fontSize: 12, fontWeight: 300 }}>Loading collection...</div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{ textAlign: "center", padding: 40, color: "#e07070", fontSize: 13 }}>
              Could not load perfumes. Please try again.
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#c9b090", marginBottom: 10 }}>
                No fragrances yet
              </div>
              <p style={{ fontSize: 12, color: "#8a7860", fontWeight: 300 }}>
                Our collection is being curated. Check back soon.
              </p>
            </div>
          )}

          {/* Grid */}
          {!loading && filtered.length > 0 && (
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20,
            }} className="collection-grid">
              {filtered.map((perfume) => (
                <div
                  key={perfume.id}
                  className="perfume-card anim-fade-up"
                  onClick={() => setSelectedPerfume(perfume)}
                  style={{ cursor: "pointer" }}
                  role="button"
                  aria-label={`View details for ${perfume.name}`}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedPerfume(perfume)}
                >
                  <div style={{ position: "relative" }}>
                    <div className="card-img" style={{ height: 260, background: "#252520" }}>
                      <img src={perfume.image} alt={perfume.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{
                      position: "absolute", top: 14, left: 14,
                      fontSize: 8, letterSpacing: "0.2em", fontWeight: 600, textTransform: "uppercase",
                      color: "#c9a84c", background: "rgba(17,17,9,0.75)", backdropFilter: "blur(4px)", padding: "3px 8px",
                    }}>
                      {perfume.category}
                    </div>
                    {perfume.badge && (
                      <div style={{
                        position: "absolute", top: 14, right: 14,
                        background: "#c9a84c", padding: "3px 8px",
                        fontSize: 8, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1a1a14",
                      }}>
                        {perfume.badge}
                      </div>
                    )}
                    <div style={{
                      position: "absolute", inset: 0, background: "rgba(201,168,76,0.04)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      opacity: 0, transition: "opacity 0.3s",
                    }} className="card-hover-overlay">
                      <span style={{
                        background: "rgba(17,17,9,0.85)", color: "#c9a84c",
                        fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
                        padding: "10px 20px", border: "1px solid rgba(201,168,76,0.4)",
                      }}>
                        View Details
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: "18px 20px 22px", background: "#1a1a14" }}>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 500, color: "#f0ebe0", marginBottom: 6, lineHeight: 1.2 }}>
                      {perfume.name}
                    </h3>
                    {perfume.price && (
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#c9a84c", marginBottom: 8 }}>
                        {perfume.price}
                      </div>
                    )}
                    <p style={{ fontSize: 11, fontWeight: 300, lineHeight: 1.75, color: "#8a7e6e", marginBottom: 14 }}>
                      {perfume.description}
                    </p>
                    <span className="discover-link" style={{ fontSize: 9 }}>
                      Discover Fragrance &nbsp;→
                    </span>
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
        @media (max-width: 480px)                        { .collection-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 481px) and (max-width: 768px) { .collection-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (min-width: 769px) and (max-width: 1100px){ .collection-grid { grid-template-columns: 1fr 1fr !important; } }
        .perfume-card:hover .card-hover-overlay { opacity: 1 !important; }
      `}</style>
    </>
  );
}
