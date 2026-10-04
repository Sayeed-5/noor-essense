const collections = [
  "Rare Attar Elixirs",
  "Private Royal Blends",
  "Agarwood & Amber",
  "Bespoke Discovery Sets",
];

const socialLinks = [
  {
    name: "WhatsApp Concierge",
    href: "https://wa.me/8144334641",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/noor_essence_perfume",
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
          gridTemplateColumns: "2fr 1fr",
          justifyContent: "space-between",
          gap: 48,
          paddingBottom: 48,
          borderBottom: "1px solid rgba(201,168,76,0.1)",
          marginBottom: 32,
        }} className="footer-grid">

          {/* Brand */}
          <div>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
              <img src="/logo.png" alt="Chandan Craft" style={{ height: 40, width: "auto", objectFit: "contain" }} />
              <span style={{ marginLeft: 16, fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 500, color: "#f0ebe0", letterSpacing: "0.05em" }}>
                Chandan Craft
              </span>
            </div>
            <p style={{
              fontSize: 14,
              fontWeight: 300,
              lineHeight: 1.85,
              color: "#c8bfa8",
              maxWidth: 320,
              marginBottom: 24,
            }}>
              Discover the essence of luxury with our exclusive collection of fine fragrances
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
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: "#c8bfa8",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "#c9a84c"}
                  onMouseLeave={e => e.currentTarget.style.color = "#c8bfa8"}
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
                  <a href="/collection" style={{
                    fontSize: 14,
                    fontWeight: 300,
                    color: "#c8bfa8",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = "#c9a84c"}
                    onMouseLeave={e => e.currentTarget.style.color = "#c8bfa8"}
                  >
                    {c}
                  </a>
                </li>
              ))}
            </ul>
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
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <p style={{ fontSize: 12, color: "#a89f91", letterSpacing: "0.08em" }}>
              © 2026 Chandan Craft. All rights reserved.
            </p>
            <a href="/admin" style={{
              fontSize: 12, color: "#a89f91", textDecoration: "none", transition: "color 0.2s"
            }} onMouseEnter={e => e.currentTarget.style.color = "#c9a84c"} onMouseLeave={e => e.currentTarget.style.color = "#a89f91"}>
              Admin Panel
            </a>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="https://www.linkedin.com/in/sayed-ahemmad-72baa5274/" target="_blank" rel="noopener noreferrer" style={{
              fontSize: 12,
              color: "#a89f91",
              letterSpacing: "0.05em",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#c9a84c"}
              onMouseLeave={e => e.currentTarget.style.color = "#a89f91"}
            >
              Developed by Sayeed
            </a>
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
