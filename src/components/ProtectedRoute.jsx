import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#111109",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 16,
      }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5"
          style={{ animation: "spin 1s linear infinite" }}>
          <path d="M21 12a9 9 0 00-9-9"/>
          <path d="M21 12a9 9 0 01-9 9" strokeOpacity="0.25"/>
        </svg>
        <span style={{ fontSize: 11, color: "#5a5040", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Authenticating...
        </span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return children;
}
