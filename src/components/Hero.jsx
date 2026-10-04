export default function Hero() {
  return (
    <section
      id="home"
      style={{
        background: "#1a1a14",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: 60,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background texture */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 70% 60% at 70% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "60px 24px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 48,
        alignItems: "center",
        width: "100%",
        position: "relative",
      }} className="hero-grid">

        {/* LEFT — Text Content */}
        <div className="anim-fade-up">
          {/* Eyebrow */}
          <div className="eyebrow" style={{ marginBottom: 28 }}>
            The Art of Fine Fragrance
          </div>

          {/* Heading */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(42px, 6vw, 72px)",
            fontWeight: 400,
            lineHeight: 1.05,
            color: "#f0ebe0",
            marginBottom: 6,
          }}>
            Where Elegance
          </h1>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(42px, 6vw, 72px)",
            fontWeight: 500,
            fontStyle: "italic",
            lineHeight: 1.05,
            color: "#c9a84c",
            marginBottom: 28,
          }}>
            Meets Essence
          </h1>

          {/* Description */}
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 15,
            fontWeight: 400,
            lineHeight: 1.8,
            color: "#c8bfa8",
            maxWidth: 420,
            marginBottom: 36,
          }}>
            Discover the beauty of{" "}
            <span style={{ color: "#c9a84c" }}>handcrafted perfumes</span> and timeless
            attars, thoughtfully created to leave a{" "}
            <span style={{ color: "#c9a84c" }}>lasting impression</span>.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap", marginBottom: 48 }}>
            <a href="/collection" className="btn-gold">
              Explore Collection
            </a>
            <a href="/#our-story" className="discover-link">
              Discover Our Story &nbsp;→
            </a>
          </div>

          {/* Feature tags */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
          }}>
            {["★ Haute Parfumerie", "★ Pure Oils", "★ Artisanal Attars"].map((tag) => (
              <span key={tag} style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 9,
                fontWeight: 500,
                letterSpacing: "0.18em",
                color: "#7a7060",
                textTransform: "uppercase",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — Perfume Bottle */}
        <div className="anim-fade-in delay-2" style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          {/* Image container with frame */}
          <div style={{
            position: "relative",
            width: "100%",
            maxWidth: 420,
          }}>
            {/* Frame border */}
            <div style={{
              border: "1px solid rgba(201,168,76,0.2)",
              padding: 4,
              background: "rgba(201,168,76,0.03)",
            }}>
              <div className="img-zoom" style={{ aspectRatio: "4/5" }}>
                <img
                  src="/hero_bottle.png"
                  alt="Royal Nectar Extrait – Signature Perfume"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Caption */}
              <div style={{
                position: "absolute",
                bottom: 20, left: 20, right: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}>
                <div style={{
                  background: "rgba(17,17,9,0.85)",
                  backdropFilter: "blur(8px)",
                  padding: "10px 16px",
                  borderTop: "1px solid rgba(201,168,76,0.3)",
                }}>
                  <div style={{ fontSize: 8, letterSpacing: "0.2em", color: "#c9a84c", textTransform: "uppercase", fontWeight: 600, marginBottom: 3 }}>
                    Signature Edition
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 400, color: "#f0ebe0", letterSpacing: "0.04em" }}>
                    Royal Nectar Extrait
                  </div>
                </div>
                <div style={{
                  background: "rgba(17,17,9,0.85)",
                  backdropFilter: "blur(8px)",
                  padding: "8px 12px",
                }}>
                  <span style={{ fontSize: 9, letterSpacing: "0.15em", color: "#7a7060", textTransform: "uppercase" }}>chandan_craft</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding: 40px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
