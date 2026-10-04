export default function OurStory() {
  return (
    <section
      id="our-story"
      style={{
        background: "#1a1a14",
        padding: "80px 24px",
      }}
    >
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 64,
        alignItems: "center",
      }} className="story2-grid">

        {/* LEFT — Image */}
        <div className="anim-fade-in" style={{ position: "relative" }}>
          <div className="img-zoom" style={{ aspectRatio: "4/3" }}>
            <img
              src="/botanical.png"
              alt="Distillation Tradition – Master Artisanship Since 1994"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          {/* Caption tag */}
          <div style={{
            position: "absolute",
            bottom: 0, left: 0,
            background: "rgba(17,17,9,0.88)",
            backdropFilter: "blur(6px)",
            borderTop: "1px solid rgba(201,168,76,0.3)",
            padding: "12px 18px",
          }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", color: "#c9a84c", textTransform: "uppercase", marginBottom: 3 }}>
              Distillation Tradition
            </div>
            <div style={{ fontSize: 11, color: "#a89060" }}>Master Artisanship Since 1994</div>
          </div>
        </div>

        {/* RIGHT — Text */}
        <div className="anim-fade-up delay-1">
          <div style={{
            fontSize: 9,
            letterSpacing: "0.25em",
            fontWeight: 600,
            color: "#c9a84c",
            textTransform: "uppercase",
            marginBottom: 20,
          }}>
            Our Story
          </div>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(32px, 4.5vw, 52px)",
            fontWeight: 400,
            lineHeight: 1.1,
            color: "#f0ebe0",
            marginBottom: 4,
          }}>
            The Essence of
          </h2>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(32px, 4.5vw, 52px)",
            fontWeight: 500,
            fontStyle: "italic",
            lineHeight: 1.1,
            color: "#c9a84c",
            marginBottom: 28,
          }}>
            Timeless Luxury
          </h2>

          <p style={{
            fontSize: 13,
            fontWeight: 300,
            lineHeight: 1.9,
            color: "#a89878",
            marginBottom: 20,
          }}>
            Founded upon centuries-old{" "}
            <span style={{ color: "#f0ebe0" }}>Eastern fragrance rituals</span> and elevated
            through modern{" "}
            <span style={{ color: "#f0ebe0" }}>French haute parfumerie</span>, Chandan Craft
            curates olfactory experiences of unmatched purity.
          </p>
          <p style={{
            fontSize: 13,
            fontWeight: 300,
            lineHeight: 1.9,
            color: "#a89878",
            marginBottom: 36,
          }}>
            Each flacon houses extracts distilled from rare harvests, bottled by master perfumers.
          </p>

          <a href="#collection" className="discover-link">
            Discover Our Journey &nbsp;→
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .story2-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </section>
  );
}
