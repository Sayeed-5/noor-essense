const collections = [
  "Rare Attar Elixirs",
  "Private Royal Blends",
  "Agarwood & Amber",
  "Bespoke Discovery Sets",
];

const socialLinks = [
  {
    name: "WhatsApp Concierge",
    href: "https://wa.me/9718009999",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/nooressence",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#111109",
        borderTop: "1px solid rgba(201,168,76,0.15)",
        padding: "60px 24px 32px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Top row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1.5fr 2fr",
          gap: 48,
          paddingBottom: 48,
          borderBottom: "1px solid rgba(201,168,76,0.1)",
          marginBottom: 32,
        }} className="footer-grid">

          {/* Brand */}
          <div>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
                <path d="M9 8 Q9 4 14 4 Q19 4 19 8 L19 10 L22 10 L22 25 L6 25 L6 10 L9 10 Z" fill="#c9a84c" opacity="0.9"/>
                <path d="M11.5 4 Q14 1 16.5 4" stroke="#c9a84c" strokeWidth="1.2" fill="none"/>
              </svg>
              <div>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "0.22em", color: "#c9a84c" }}>
                  NOOR ESSENCE
                </div>
              </div>
            </div>
            <p style={{
              fontSize: 12,
              fontWeight: 300,
              lineHeight: 1.85,
              color: "#7a7060",
              maxWidth: 280,
              marginBottom: 24,
            }}>
              Curator of rare Middle Eastern extrait de parfums, pure aged Dehn Al Oud, and bespoke artisanal attars.
              Hand-blended for connoisseurs of timeless olfactory art.
            </p>
            {/* Social links */}
            <div style={{ display: "flex", gap: 20 }}>
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: "#7a7060",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "#c9a84c"}
                  onMouseLeave={e => e.currentTarget.style.color = "#7a7060"}
                >
                  {s.icon}
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <div style={{
              fontSize: 9,
              letterSpacing: "0.24em",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#f0ebe0",
              marginBottom: 20,
            }}>
              The Collections
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {collections.map((c) => (
                <li key={c}>
                  <a href="#collection" style={{
                    fontSize: 12,
                    fontWeight: 300,
                    color: "#7a7060",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = "#c9a84c"}
                    onMouseLeave={e => e.currentTarget.style.color = "#7a7060"}
                  >
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Private Salon */}
          <div>
            <div style={{
              fontSize: 9,
              letterSpacing: "0.24em",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#f0ebe0",
              marginBottom: 20,
            }}>
              Private Salon &amp; Inquiries
            </div>
            <p style={{
              fontSize: 12,
              fontWeight: 300,
              lineHeight: 1.85,
              color: "#7a7060",
              marginBottom: 20,
            }}>
              By-appointment sensory consultations available at our boutiques in
              Dubai, Mumbai, and London.
            </p>
            <a href="#contact" className="discover-link">
              Reserve Private Tasting &nbsp;→
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <p style={{ fontSize: 10, color: "#4a4438", letterSpacing: "0.08em" }}>
            © 2024 Noor Essence. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Use", "Shipping & Returns"].map((l) => (
              <a key={l} href="#" style={{
                fontSize: 10,
                color: "#4a4438",
                letterSpacing: "0.08em",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = "#c9a84c"}
                onMouseLeave={e => e.currentTarget.style.color = "#4a4438"}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </footer>
  );
}
