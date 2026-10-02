import { newArrivals } from "../data/perfumes";

export default function NewArrivals() {
  return (
    <section
      id="new-arrivals"
      style={{
        background: "#1a1a14",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header row */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 48,
          flexWrap: "wrap",
          gap: 16,
        }}>
          <div>
            <div style={{
              fontSize: 9,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#c9a84c",
              marginBottom: 12,
            }}>
              Just Arrived
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(30px, 4vw, 46px)",
              fontWeight: 400,
              color: "#f0ebe0",
              lineHeight: 1.15,
              marginBottom: 6,
            }}>
              New Expressions of Fragrance
            </h2>
            <p style={{ fontSize: 12, fontWeight: 300, color: "#7a7060" }}>
              Meet our latest creations, thoughtfully crafted to{" "}
              <span style={{ color: "#c9a84c", fontStyle: "italic" }}>inspire</span> your senses.
            </p>
          </div>
          <a href="#collection" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "#f0ebe0",
            border: "1px solid rgba(240,235,224,0.25)",
            padding: "10px 20px",
            textDecoration: "none",
            transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#c9a84c"; e.currentTarget.style.color = "#c9a84c"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(240,235,224,0.25)"; e.currentTarget.style.color = "#f0ebe0"; }}
          >
            View Full Collection &nbsp;→
          </a>
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
        }} className="arrivals-grid">
          {newArrivals.map((item) => (
            <div key={item.id} className="perfume-card anim-fade-up">
              {/* Image */}
              <div style={{ position: "relative" }}>
                <div className="card-img" style={{ height: 320, background: "#252520" }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                {/* New Arrival badge */}
                <div style={{
                  position: "absolute",
                  top: 16, left: 16,
                }}>
                  <span className="badge-new">{item.tagline}</span>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: "18px 20px 24px", background: "#1a1a14" }}>
                <div style={{
                  fontSize: 8,
                  letterSpacing: "0.22em",
                  fontWeight: 600,
                  color: "#7a7060",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}>
                  {item.category}
                </div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 22,
                  fontWeight: 500,
                  color: "#f0ebe0",
                  marginBottom: 8,
                  lineHeight: 1.2,
                }}>
                  {item.name}
                </h3>
                <p style={{
                  fontSize: 11,
                  fontWeight: 300,
                  lineHeight: 1.75,
                  color: "#8a7e6e",
                }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .arrivals-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 601px) and (max-width: 900px) {
          .arrivals-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
