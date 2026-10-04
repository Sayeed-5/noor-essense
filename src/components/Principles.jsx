const principles = [
  {
    id: 1,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    titleParts: [
      { text: "Crafted ", italic: false },
      { text: "with", italic: false, bold: true },
      { text: " ", italic: false },
      { text: "Passion", italic: true, gold: true },
    ],
    desc: "Every fragrance reflects our dedication to quality, creativity and the art of perfumery.",
  },
  {
    id: 2,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5">
        <path d="M12 2a10 10 0 110 20 10 10 0 010-20zm0 0v4m0 4h.01M8 12h8"/>
      </svg>
    ),
    titleParts: [
      { text: "Inspired ", italic: false },
      { text: "by", italic: false, bold: true },
      { text: " ", italic: false },
      { text: "Nature", italic: true, gold: true },
    ],
    desc: "From rich oud and warm amber to delicate florals, discover the beauty of carefully selected fragrance notes.",
  },
  {
    id: 3,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    titleParts: [
      { text: "Made ", italic: false },
      { text: "to be", italic: false, bold: true },
      { text: " ", italic: false },
      { text: "Remembered", italic: true, gold: true },
    ],
    desc: "Distinctive scents designed to become part of your most memorable moments.",
  },
];

function TitleParts({ parts }) {
  return (
    <h3
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 22,
        fontWeight: 400,
        color: "#1a1a14",
        marginBottom: 14,
        lineHeight: 1.3,
      }}
    >
      {parts.map((p, i) => {
        const style = {
          fontStyle: p.italic ? "italic" : "normal",
          fontWeight: p.bold ? 600 : 400,
          color: p.gold ? "#c9a84c" : "inherit",
        };
        return (
          <span key={i} style={style}>
            {p.text}
          </span>
        );
      })}
    </h3>
  );
}

export default function Principles() {
  return (
    <section
      id="principles"
      style={{
        background: "#f0ebe0",
        padding: "80px 24px",
        borderTop: "1px solid rgba(201,168,76,0.12)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{
            fontSize: 11,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: "#a8882a",
            marginBottom: 18,
          }}>
            Our Principles
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(34px, 5vw, 54px)",
            fontWeight: 600,
            lineHeight: 1.15,
            color: "#000000",
          }}>
            Beyond Fragrance.
          </h2>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(34px, 5vw, 54px)",
            fontWeight: 500,
            fontStyle: "italic",
            lineHeight: 1.15,
            color: "#000000",
          }}>
            An Expression of You.
          </h2>
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }} className="principles-grid">
          {principles.map((p) => (
            <div key={p.id} className="principle-card">
              {/* Icon box */}
              <div style={{ marginBottom: 22 }}>
                <div style={{
                  width: 46,
                  height: 46,
                  border: "1px solid rgba(201,168,76,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {p.icon}
                </div>
              </div>

              <TitleParts parts={p.titleParts} />

              <p style={{ fontSize: 15, fontWeight: 400, lineHeight: 1.7, color: "#3a342d" }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .principles-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .principles-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
