export default function SignatureScent() {
  return (
    <section
      id="contact"
      style={{
        background: "#f0ebe0",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Bordered container */}
        <div style={{
          border: "1px solid #d4c9b0",
          padding: "64px 48px",
          textAlign: "center",
          position: "relative",
        }}>
          {/* Corner ornaments */}
          <div style={{ position: "absolute", top: 12, left: 12, width: 20, height: 20, borderTop: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" }} />
          <div style={{ position: "absolute", top: 12, right: 12, width: 20, height: 20, borderTop: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" }} />
          <div style={{ position: "absolute", bottom: 12, left: 12, width: 20, height: 20, borderBottom: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" }} />
          <div style={{ position: "absolute", bottom: 12, right: 12, width: 20, height: 20, borderBottom: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" }} />

          <div style={{
            fontSize: 9,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "#c9a84c",
            marginBottom: 24,
          }}>
          </div>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 400,
            color: "#1a1a14",
            lineHeight: 1.1,
            marginBottom: 0,
          }}>
            Find Your
          </h2>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "#c9a84c",
            lineHeight: 1.1,
            marginBottom: 28,
          }}>
            Signature Scent
          </h2>

          <p style={{
            fontSize: 15,
            fontWeight: 400,
            lineHeight: 1.85,
            color: "#3a342d",
            marginBottom: 36,
            maxWidth: 500,
            margin: "0 auto 36px",
          }}>
            Have a fragrance in mind or seeking a custom olfactory consultation? Connect
            with our master blenders to explore our exclusive collection.
          </p>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/918009999"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            style={{ display: "inline-flex", gap: 10, marginBottom: 20 }}
          >
            {/* WhatsApp icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Enquire on WhatsApp
          </a>

          <div style={{ marginTop: 8, fontSize: 10, color: "#8a7e6e", letterSpacing: "0.08em" }}>
            +91 8144334641 • Park street, Berhampur
          </div>

          <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <span style={{ fontSize: 10, color: "#8a7e6e", letterSpacing: "0.12em" }}>
              Complimentary Olfactory Guidance &amp; Sample Discovery Available
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
