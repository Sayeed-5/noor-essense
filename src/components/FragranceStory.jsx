const features = [
  {
    id: "science",
    label: "HAND-BLENDED CONCENTRATES",
    desc: "Each concentration refined with precision through slow-maceration cycles for sublime projection.",
  },
  {
    id: "pschicity",
    label: "SUSTAINABLY HARVESTED OUD & FLORA",
    desc: "Direct partnerships with gardens to discover in-house in Japan, Cambodia, and the rare valleys of Taif.",
  },
  {
    id: "architecture",
    label: "BESPOKE SCENT ARCHITECTURE",
    desc: "Non-linear scent pyramids formulated to gently transform and elevate upon the wearer's skin.",
  },
];

export default function FragranceStory() {
  return (
    <section
      id="fragrance-story"
      style={{
        background: "#f0ebe0",
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
      }} className="story-grid">

        {/* LEFT — Text */}
        <div className="anim-fade-up">
          <div className="eyebrow" style={{ color: "#c9a84c", marginBottom: 24 }}
            /* Override default white color */
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500, color: "#c9a84c" }}>
              <span style={{ display: "inline-block", width: 28, height: 1, background: "#c9a84c" }} />
              The Chandan Craft Experience
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 5vw, 58px)",
            fontWeight: 400,
            lineHeight: 1.1,
            color: "#1a1a14",
            marginBottom: 6,
          }}>
            A Fragrance That
          </h2>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 5vw, 58px)",
            fontWeight: 500,
            fontStyle: "italic",
            lineHeight: 1.1,
            color: "#c9a84c",
            marginBottom: 32,
          }}>
            Tells Your Story
          </h2>

          <p style={{
            fontSize: 15,
            fontWeight: 400,
            lineHeight: 1.85,
            color: "#3a342d",
            marginBottom: 36,
            maxWidth: 440,
          }}>
            At Chandan Craft, every fragrance is an{" "}
            <strong style={{ fontWeight: 500, color: "#1a1a14" }}>expression of individuality</strong>,
            crafted with{" "}
            <strong style={{ fontWeight: 500, color: "#c9a84c" }}>passion</strong> and inspired by the timeless
            art of perfumery.
          </p>

          {/* Feature list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {features.map((f) => (
              <div key={f.id} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{ width: 6, height: 6, background: "#c9a84c", marginTop: 6 }} />
                </div>
                <div>
                  <div style={{
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    fontWeight: 700,
                    color: "#1a1a14",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}>
                    {f.label}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.75, color: "#3a342d" }}>
                    {f.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Image */}
        <div className="anim-fade-in delay-2" style={{ position: "relative" }}>
          <div className="img-zoom" style={{ aspectRatio: "3/4" }}>
            <img
              src="/botanical.png"
              alt="Botanical Ingredients – Rose, Agarwood, Royal Oud Resin & Aged Amber Resin"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          {/* Caption */}
          <div style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            background: "rgba(240,235,224,0.9)",
            backdropFilter: "blur(4px)",
            padding: "14px 20px",
            borderTop: "1px solid rgba(201,168,76,0.25)",
          }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", color: "#1a1a14", textTransform: "uppercase", marginBottom: 3 }}>
              Botanical &nbsp;|&nbsp; Source
            </div>
            <div style={{ fontSize: 11, fontWeight: 300, color: "#4a4438" }}>
              Rare Agarwood, Royal Oud Resin &amp; Aged Amber Resin
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .story-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
