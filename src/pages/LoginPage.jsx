import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { signIn } = useAuth();
  const navigate   = useNavigate();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) {
      setError(err.message === "Invalid login credentials"
        ? "Email ya password galat hai."
        : err.message);
    } else {
      navigate("/admin");
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#111109",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background radial glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)",
      }} />

      <div style={{
        width: "100%",
        maxWidth: 420,
        position: "relative",
        animation: "scaleModalIn 0.4s cubic-bezier(0.34,1.4,0.64,1) both",
      }}>
        {/* Card */}
        <div style={{
          background: "#1a1a14",
          border: "1px solid rgba(201,168,76,0.2)",
          padding: "48px 40px",
          position: "relative",
        }}>
          {/* Corner ornaments */}
          {[
            { top: 10, left: 10, borderTop: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" },
            { top: 10, right: 10, borderTop: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" },
            { bottom: 10, left: 10, borderBottom: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" },
            { bottom: 10, right: 10, borderBottom: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" },
          ].map((s, i) => (
            <div key={i} style={{ position: "absolute", width: 18, height: 18, ...s }} />
          ))}

          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <img
              src="/logo.png"
              alt="Chandan Craft"
              style={{ height: 90, width: "auto", objectFit: "contain", margin: "0 auto 16px" }}
            />
            <div style={{
              fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase",
              fontWeight: 600, color: "#c9a84c",
            }}>
              Admin Portal
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "rgba(201,168,76,0.15)", marginBottom: 32 }} />

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: "block",
                fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
                fontWeight: 600, color: "#7a7060", marginBottom: 8,
              }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@nooressence.com"
                style={{
                  width: "100%",
                  background: "#111109",
                  border: "1px solid rgba(201,168,76,0.2)",
                  color: "#f0ebe0",
                  padding: "12px 16px",
                  fontSize: 13,
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 300,
                  outline: "none",
                  transition: "border-color 0.3s",
                }}
                onFocus={e => e.target.style.borderColor = "#c9a84c"}
                onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 28, position: "relative" }}>
              <label style={{
                display: "block",
                fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
                fontWeight: 600, color: "#7a7060", marginBottom: 8,
              }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    background: "#111109",
                    border: "1px solid rgba(201,168,76,0.2)",
                    color: "#f0ebe0",
                    padding: "12px 44px 12px 16px",
                    fontSize: 13,
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 300,
                    outline: "none",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={e => e.target.style.borderColor = "#c9a84c"}
                  onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", color: "#7a7060",
                    cursor: "pointer", padding: 0, display: "flex",
                  }}
                >
                  {showPass ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: "rgba(220,60,60,0.1)",
                border: "1px solid rgba(220,60,60,0.3)",
                color: "#e07070",
                padding: "10px 14px",
                fontSize: 12,
                marginBottom: 20,
                fontWeight: 300,
              }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-gold"
              style={{
                width: "100%",
                justifyContent: "center",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    style={{ animation: "spin 1s linear infinite" }}>
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.3"/>
                    <path d="M21 12a9 9 0 00-9-9"/>
                  </svg>
                  Signing in...
                </>
              ) : "Sign In to Admin"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", fontSize: 10, color: "#4a4438", marginTop: 20, letterSpacing: "0.08em" }}>
          © 2026 Chandan Craft — Admin Access Only
        </p>
      </div>

      <style>{`
        @keyframes scaleModalIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
