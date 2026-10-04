import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home",           href: "/" },
  { label: "Our Collection", href: "/collection" },
  { label: "New Arrivals",   href: "/#new-arrivals" },
  { label: "Our Story",      href: "/#our-story" },
  { label: "Contact",        href: "#contact" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href) => {
    setActive(href);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        id="navbar"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 999,
          background: scrolled
            ? "rgba(17,17,9,0.97)"
            : "rgba(17,17,9,0.92)",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.2)" : "none",
          backdropFilter: "blur(12px)",
          transition: "all 0.35s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }} onClick={() => handleNavClick("/")}>
            <img src="/logo.png" alt="Chandan Craft" style={{ height: 32, width: "auto", objectFit: "contain" }} />
            <span style={{ marginLeft: 12, fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 500, color: "#f0ebe0", letterSpacing: "0.05em" }}>
              Chandan Craft
            </span>
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 28 }} className="hidden-mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link${active === link.href ? " active" : ""}`}
                onClick={() => handleNavClick(link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
            <a href="/collection" className="btn-gold hidden-mobile" style={{ padding: "9px 20px", fontSize: 9 }}>
              Discover Collection
            </a>
            {/* Hamburger */}
            <button
              id="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#f0ebe0", padding: 4, display: "none" }}
              className="show-mobile"
              aria-label="Menu"
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            background: "rgba(17,17,9,0.98)",
            borderTop: "1px solid rgba(201,168,76,0.15)",
            padding: "20px 24px 28px",
          }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                onClick={() => handleNavClick(link.href)}
                style={{ display: "block", padding: "12px 0", borderBottom: "1px solid rgba(201,168,76,0.08)" }}
              >
                {link.label}
              </a>
            ))}
            <a href="/collection" className="btn-gold" style={{ marginTop: 20, display: "inline-flex" }}>
              Discover Collection
            </a>
          </div>
        )}
      </header>

      {/* Responsive styles injected */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
