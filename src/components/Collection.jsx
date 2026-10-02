import { useState } from "react";
import { featuredPerfumes, filterTabs } from "../data/perfumes";

export default function Collection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? featuredPerfumes
      : featuredPerfumes.filter((p) => p.categorySlug === activeFilter);

  return (
    <section
      id="collection"
      style={{
        background: "#f0ebe0",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            fontSize: 9,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "#c9a84c",
            marginBottom: 16,
          }}>
            Curated Formulations
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(34px, 5vw, 56px)",
            fontWeight: 400,
            color: "#1a1a14",
            marginBottom: 12,
            lineHeight: 1.1,
          }}>
            Discover Our Collection
          </h2>
          <p style={{ fontSize: 12, fontWeight: 300, color: "#6a6050", letterSpacing: "0.03em" }}>
            Explore an exclusive selection of fragrances crafted for every moment.
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
          marginBottom: 48,
          background: "#e8e2d4",
          padding: 4,
          width: "fit-content",
          margin: "0 auto 48px",
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

        {/* Product Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
        }} className="collection-grid">
          {filtered.map((perfume) => (
            <div key={perfume.id} className="perfume-card anim-fade-up">
              {/* Category badge */}
              <div style={{ position: "relative" }}>
                <div className="card-img" style={{ height: 260, background: "#252520" }}>
                  <img
                    src={perfume.image}
                    alt={perfume.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{
                  position: "absolute",
                  top: 14, left: 14,
                  fontSize: 8,
                  letterSpacing: "0.2em",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  color: "#c9a84c",
                  background: "rgba(17,17,9,0.75)",
                  backdropFilter: "blur(4px)",
                  padding: "3px 8px",
                }}>
                  {perfume.category}
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: "18px 20px 22px", background: "#1a1a14" }}>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 20,
                  fontWeight: 500,
                  color: "#f0ebe0",
                  marginBottom: 8,
                  lineHeight: 1.2,
                }}>
                  {perfume.name}
                </h3>
                <p style={{
                  fontSize: 11,
                  fontWeight: 300,
                  lineHeight: 1.75,
                  color: "#8a7e6e",
                  marginBottom: 16,
                }}>
                  {perfume.description}
                </p>
                <a href={`#${perfume.slug}`} className="discover-link" style={{ fontSize: 9 }}>
                  Discover Fragrance &nbsp;→
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .collection-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 481px) and (max-width: 768px) {
          .collection-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (min-width: 769px) and (max-width: 1100px) {
          .collection-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
