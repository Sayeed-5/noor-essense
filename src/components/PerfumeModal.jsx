import { useEffect } from "react";

// ── Note Group chip ────────────────────────────────────────────────────────
function NoteChip({ note }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "4px 12px",
      border: "1px solid rgba(201,168,76,0.3)",
      fontSize: 10,
      fontWeight: 400,
      letterSpacing: "0.08em",
      color: "#c8bfa8",
      background: "rgba(201,168,76,0.06)",
    }}>
      {note}
    </span>
  );
}

// ── Stat Row ───────────────────────────────────────────────────────────────
function StatRow({ label, value }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      padding: "12px 0",
      borderBottom: "1px solid rgba(201,168,76,0.1)",
      gap: 16,
    }}>
      <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, color: "#7a7060", flexShrink: 0 }}>
        {label}
      </span>
      <span style={{ fontSize: 12, fontWeight: 300, color: "#d4c9b0", textAlign: "right" }}>
        {value}
      </span>
    </div>
  );
}

// ── Main Modal ─────────────────────────────────────────────────────────────
export default function PerfumeModal({ perfume, onClose }) {
  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!perfume) return null;

  const hasNotes = perfume.topNotes || perfume.heartNotes || perfume.baseNotes;

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(10,10,8,0.85)",
          backdropFilter: "blur(6px)",
          zIndex: 1000,
          animation: "fadeIn 0.25s ease",
        }}
      />

      {/* ── Modal Panel ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={perfume.name}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1001,
          width: "min(960px, 95vw)",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#1a1a14",
          border: "1px solid rgba(201,168,76,0.2)",
          animation: "scaleModalIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
        className="modal-grid"
      >
        {/* ── LEFT — Image ── */}
        <div style={{ position: "relative", background: "#111109", minHeight: 420 }}>
          <img
            src={perfume.image}
            alt={perfume.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />

          {/* Category badge */}
          <div style={{
            position: "absolute", top: 20, left: 20,
            background: "rgba(17,17,9,0.8)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(201,168,76,0.3)",
            padding: "4px 12px",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#c9a84c",
          }}>
            {perfume.category}
          </div>

          {/* Exclusive badge */}
          {perfume.badge && (
            <div style={{
              position: "absolute", top: 20, right: 20,
              background: "#c9a84c",
              padding: "4px 12px",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#1a1a14",
            }}>
              {perfume.badge}
            </div>
          )}

          {/* Out of stock overlay */}
          {!perfume.inStock && (
            <div style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              background: "rgba(17,17,9,0.9)",
              textAlign: "center",
              padding: "12px",
              fontSize: 10,
              letterSpacing: "0.2em",
              fontWeight: 600,
              color: "#7a7060",
              textTransform: "uppercase",
            }}>
              Currently Unavailable — Join Waitlist
            </div>
          )}
        </div>

        {/* ── RIGHT — Details ── */}
        <div style={{
          padding: "36px 32px",
          overflowY: "auto",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}>
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute",
              top: 16, right: 16,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(201,168,76,0.2)",
              color: "#f0ebe0",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s",
              zIndex: 2,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.15)"; e.currentTarget.style.borderColor = "#c9a84c"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* Name & Price */}
          <div style={{ marginBottom: 20, paddingRight: 40 }}>
            <div style={{ fontSize: 9, letterSpacing: "0.22em", fontWeight: 600, color: "#c9a84c", textTransform: "uppercase", marginBottom: 10 }}>
              {perfume.size}
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(28px, 4vw, 38px)",
              fontWeight: 500,
              color: "#f0ebe0",
              lineHeight: 1.15,
              marginBottom: 10,
            }}>
              {perfume.name}
            </h2>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 400, color: "#c9a84c" }}>
              {perfume.price}
            </div>
          </div>

          {/* Thin divider */}
          <div style={{ height: 1, background: "rgba(201,168,76,0.12)", marginBottom: 20 }} />

          {/* Long description */}
          <p style={{
            fontSize: 13,
            fontWeight: 300,
            lineHeight: 1.9,
            color: "#a89878",
            marginBottom: 24,
          }}>
            {perfume.longDescription || perfume.description}
          </p>

          {/* Fragrance Notes */}
          {hasNotes && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 9, letterSpacing: "0.22em", fontWeight: 700, color: "#f0ebe0", textTransform: "uppercase", marginBottom: 14 }}>
                Fragrance Pyramid
              </div>
              {[
                { label: "TOP", notes: perfume.topNotes },
                { label: "HEART", notes: perfume.heartNotes },
                { label: "BASE", notes: perfume.baseNotes },
              ].map(({ label, notes }) =>
                notes?.length ? (
                  <div key={label} style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 8, letterSpacing: "0.2em", fontWeight: 600, color: "#5a5040", marginBottom: 6 }}>
                      {label} NOTES
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {notes.map((n) => <NoteChip key={n} note={n} />)}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          )}

          {/* Stats */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 9, letterSpacing: "0.22em", fontWeight: 700, color: "#f0ebe0", textTransform: "uppercase", marginBottom: 4 }}>
              Details
            </div>
            {perfume.concentration && <StatRow label="Concentration" value={perfume.concentration} />}
            {perfume.longevity     && <StatRow label="Longevity"     value={perfume.longevity} />}
            {perfume.sillage       && <StatRow label="Sillage"       value={perfume.sillage} />}
            {perfume.season        && <StatRow label="Season"        value={perfume.season} />}
            {perfume.occasion      && <StatRow label="Occasion"      value={perfume.occasion} />}
            {perfume.perfumer      && <StatRow label="Perfumer"      value={perfume.perfumer} />}
            {perfume.origin        && <StatRow label="Origin"        value={perfume.origin} />}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {perfume.inStock ? (
              <>
                {/* <button className="btn-gold" style={{ flex: 1, justifyContent: "center", minWidth: 140 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                  Enquire
                </button> */}
                <a
                  href={`https://wa.me/8144334641?text=${encodeURIComponent(`Hello Chandan Craft, I would like to inquire about this perfume:

*Name:* ${perfume.name}

*Image:* ${perfume.image}

Please provide me with more details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 20px",
                    border: "1px solid rgba(201,168,76,0.35)",
                    background: "transparent",
                    color: "#c9a84c",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "all 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  Enquire
                </a>
              </>
            ) : (
              <button className="btn-gold" style={{ flex: 1, justifyContent: "center", background: "#3a342d", color: "#7a7060", cursor: "default" }}>
                Notify When Available
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scaleModalIn {
          from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        @media (max-width: 640px) {
          .modal-grid {
            grid-template-columns: 1fr !important;
            width: 95vw !important;
            max-height: 95vh !important;
          }
        }

        /* Custom scrollbar for modal */
        .modal-grid ::-webkit-scrollbar { width: 4px; }
        .modal-grid ::-webkit-scrollbar-track { background: #111109; }
        .modal-grid ::-webkit-scrollbar-thumb { background: #c9a84c50; }
      `}</style>
    </>
  );
}
