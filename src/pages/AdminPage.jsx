import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePerfumes, usePerfumeAdmin } from "../hooks/usePerfumes";

// ── Category options ────────────────────────────────────────────────────────
const CATEGORIES = [
  { label: "Oriental Woody",    value: "ORIENTAL WOODY",    slug: "extrait-de-parfum" },
  { label: "Floral Amber",      value: "FLORAL AMBER",      slug: "extrait-de-parfum" },
  { label: "Pure Attar Oil",    value: "PURE ATTAR OIL",    slug: "pure-attar-oils" },
  { label: "Smoky Citrus",      value: "SMOKY CITRUS",      slug: "royal-oud-shrine" },
  { label: "Spicy Oriental",    value: "SPICY ORIENTAL",    slug: "extrait-de-parfum" },
  { label: "Aquatic Woody",     value: "AQUATIC WOODY",     slug: "royal-oud-shrine" },
  { label: "Signature Edition", value: "SIGNATURE EDITION", slug: "royal-oud-shrine" },
  { label: "Royal Attar Oil",   value: "ROYAL ATTAR OIL",   slug: "pure-attar-oils" },
  { label: "Private Blend",     value: "PRIVATE BLEND",     slug: "extrait-de-parfum" },
  { label: "Floral Aérien",     value: "FLORAL AERIENCE",   slug: "floral-aeriences" },
];

const EMPTY_FORM = {
  name: "", slug: "", category: "", category_slug: "",
  description: "", long_description: "", price: "", size: "",
  image_url: "", badge: "",
  is_featured: false, is_new_arrival: false, in_stock: true,
  top_notes: "", heart_notes: "", base_notes: "",
  sillage: "", longevity: "", season: "", occasion: "",
  perfumer: "", origin: "", concentration: "",
};

// ── Small reusable components ───────────────────────────────────────────────
function InputField({ label, name, value, onChange, type = "text", placeholder = "", required = false }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{label}{required && <span style={{ color: "#c9a84c" }}> *</span>}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={inputStyle}
        onFocus={e => e.target.style.borderColor = "#c9a84c"}
        onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"}
      />
    </div>
  );
}

function TextareaField({ label, name, value, onChange, rows = 3, placeholder = "" }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
        onFocus={e => e.target.style.borderColor = "#c9a84c"}
        onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"}
      />
    </div>
  );
}

function Toggle({ label, name, checked, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
      <span style={{ fontSize: 12, color: "#a89878", fontWeight: 300 }}>{label}</span>
      <button
        type="button"
        onClick={() => onChange({ target: { name, value: !checked, type: "checkbox", checked: !checked } })}
        style={{
          width: 44, height: 24,
          background: checked ? "#c9a84c" : "#3a342d",
          borderRadius: 12, border: "none", cursor: "pointer",
          position: "relative", transition: "background 0.3s",
          flexShrink: 0,
        }}
      >
        <span style={{
          position: "absolute", top: 3,
          left: checked ? "calc(100% - 21px)" : 3,
          width: 18, height: 18,
          background: "#f0ebe0", borderRadius: "50%",
          transition: "left 0.3s",
        }} />
      </button>
    </div>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────────
const labelStyle = {
  display: "block",
  fontSize: 9, letterSpacing: "0.15em",
  textTransform: "uppercase", fontWeight: 600,
  color: "#7a7060", marginBottom: 6,
};
const inputStyle = {
  width: "100%",
  background: "#111109",
  border: "1px solid rgba(201,168,76,0.2)",
  color: "#f0ebe0",
  padding: "10px 14px",
  fontSize: 13,
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 300,
  outline: "none",
  transition: "border-color 0.3s",
};
const sectionTitle = {
  fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
  fontWeight: 700, color: "#c9a84c", marginBottom: 16,
  paddingBottom: 8, borderBottom: "1px solid rgba(201,168,76,0.15)",
};

// ── Perfume Form ─────────────────────────────────────────────────────────────
function PerfumeForm({ initial, onSave, onCancel, saving }) {
  const [form,      setForm]      = useState(initial || EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [preview,   setPreview]   = useState(initial?.image_url || initial?.image || "");
  const fileRef = useRef();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    // Auto-fill slug and category_slug
    if (name === "name" && !initial) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      setForm(f => ({ ...f, name: value, slug }));
      return;
    }
    if (name === "category") {
      const found = CATEGORIES.find(c => c.value === value);
      setForm(f => ({ ...f, category: value, category_slug: found?.slug || "" }));
      return;
    }
    setForm(f => ({ ...f, [name]: val }));
  }

  function handleImagePick(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await onSave(form, imageFile);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="form-grid">
        {/* LEFT column */}
        <div>
          {/* Basic Info */}
          <div style={sectionTitle}>Basic Information</div>
          <InputField label="Perfume Name" name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Sultani Amber" />
          <InputField label="Slug (URL)" name="slug" value={form.slug} onChange={handleChange} placeholder="auto-generated" />

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Category <span style={{ color: "#c9a84c" }}>*</span></label>
            <select name="category" value={form.category} onChange={handleChange} required
              style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
              onFocus={e => e.target.style.borderColor = "#c9a84c"}
              onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"}
            >
              <option value="">Select category...</option>
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>

          <InputField label="Price" name="price" value={form.price} onChange={handleChange} placeholder="₹4,800" />
          <InputField label="Size / Volume" name="size" value={form.size} onChange={handleChange} placeholder="50ml Extrait de Parfum" />
          <InputField label="Concentration" name="concentration" value={form.concentration} onChange={handleChange} placeholder="Extrait de Parfum (40%+)" />
          <InputField label="Badge (optional)" name="badge" value={form.badge} onChange={handleChange} placeholder="EXCLUSIVE / NEW ARRIVAL" />

          {/* Toggles */}
          <div style={sectionTitle}>Status</div>
          <Toggle label="Featured on Homepage" name="is_featured"   checked={!!form.is_featured}   onChange={handleChange} />
          <Toggle label="New Arrival"           name="is_new_arrival" checked={!!form.is_new_arrival} onChange={handleChange} />
          <Toggle label="In Stock"              name="in_stock"       checked={form.in_stock !== false} onChange={handleChange} />

          {/* Notes */}
          <div style={{ ...sectionTitle, marginTop: 8 }}>Fragrance Notes (comma separated)</div>
          <InputField label="Top Notes"   name="top_notes"   value={Array.isArray(form.top_notes)   ? form.top_notes.join(", ")   : form.top_notes}   onChange={handleChange} placeholder="Rose, Bergamot, Saffron" />
          <InputField label="Heart Notes" name="heart_notes" value={Array.isArray(form.heart_notes) ? form.heart_notes.join(", ") : form.heart_notes} onChange={handleChange} placeholder="Oud, Amber, Iris" />
          <InputField label="Base Notes"  name="base_notes"  value={Array.isArray(form.base_notes)  ? form.base_notes.join(", ")  : form.base_notes}  onChange={handleChange} placeholder="Musk, Sandalwood, Patchouli" />
        </div>

        {/* RIGHT column */}
        <div>
          {/* Image Upload */}
          <div style={sectionTitle}>Perfume Image</div>
          <div
            onClick={() => fileRef.current.click()}
            style={{
              height: 220,
              border: "2px dashed rgba(201,168,76,0.25)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              cursor: "pointer", marginBottom: 12,
              background: "#111109",
              overflow: "hidden",
              transition: "border-color 0.3s",
              position: "relative",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(201,168,76,0.6)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)"}
          >
            {preview ? (
              <img src={preview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.2" style={{ marginBottom: 10 }}>
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span style={{ fontSize: 11, color: "#7a7060", fontWeight: 300 }}>Click to upload image</span>
                <span style={{ fontSize: 9, color: "#4a4438", marginTop: 4 }}>PNG, JPG, WEBP — Uploads to Supabase Storage</span>
              </>
            )}
            {preview && (
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(17,17,9,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: 0, transition: "opacity 0.3s",
              }} className="img-upload-overlay">
                <span style={{ fontSize: 10, color: "#c9a84c", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>
                  Change Image
                </span>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImagePick} style={{ display: "none" }} />
          {!imageFile && !preview && (
            <InputField label="Or paste image URL" name="image_url" value={form.image_url} onChange={handleChange} placeholder="https://..." />
          )}

          {/* Descriptions */}
          <div style={{ ...sectionTitle, marginTop: 8 }}>Descriptions</div>
          <TextareaField label="Short Description *" name="description" value={form.description} onChange={handleChange} rows={2} placeholder="One-line fragrance summary..." />
          <TextareaField label="Full Description" name="long_description" value={form.long_description} onChange={handleChange} rows={5} placeholder="Detailed story of the fragrance..." />

          {/* Characteristics */}
          <div style={{ ...sectionTitle, marginTop: 8 }}>Characteristics</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <InputField label="Sillage"   name="sillage"  value={form.sillage}  onChange={handleChange} placeholder="Moderate" />
            <InputField label="Longevity" name="longevity" value={form.longevity} onChange={handleChange} placeholder="10–14 hours" />
            <InputField label="Season"    name="season"   value={form.season}   onChange={handleChange} placeholder="All Year" />
            <InputField label="Occasion"  name="occasion" value={form.occasion} onChange={handleChange} placeholder="Evening" />
          </div>
          <InputField label="Perfumer"    name="perfumer" value={form.perfumer} onChange={handleChange} placeholder="Master Blender — Noor Atelier" />
          <InputField label="Origin"      name="origin"   value={form.origin}   onChange={handleChange} placeholder="Dubai, UAE" />
        </div>
      </div>

      {/* Action buttons */}
      <div style={{
        display: "flex", gap: 12, justifyContent: "flex-end",
        marginTop: 24, paddingTop: 20,
        borderTop: "1px solid rgba(201,168,76,0.12)",
      }}>
        <button type="button" onClick={onCancel} style={{
          padding: "10px 24px",
          background: "transparent", border: "1px solid rgba(201,168,76,0.2)",
          color: "#7a7060", fontSize: 10, letterSpacing: "0.15em",
          textTransform: "uppercase", fontWeight: 600, cursor: "pointer",
          transition: "all 0.2s",
          fontFamily: "'Montserrat', sans-serif",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#c9a84c"; e.currentTarget.style.color = "#c9a84c"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)"; e.currentTarget.style.color = "#7a7060"; }}
        >
          Cancel
        </button>
        <button type="submit" disabled={saving} className="btn-gold" style={{ opacity: saving ? 0.7 : 1, cursor: saving ? "not-allowed" : "pointer" }}>
          {saving ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                style={{ animation: "spin 1s linear infinite" }}>
                <path d="M21 12a9 9 0 00-9-9" />
              </svg>
              Saving...
            </>
          ) : initial ? "Update Perfume" : "Add Perfume"}
        </button>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) { .form-grid { grid-template-columns: 1fr !important; } }
        .img-upload-overlay { opacity: 0 !important; }
        div:hover > .img-upload-overlay { opacity: 1 !important; }
      `}</style>
    </form>
  );
}

// ── Perfume Row in list ───────────────────────────────────────────────────────
function PerfumeRow({ perfume, onEdit, onDelete, deleting }) {
  const [confirmDel, setConfirmDel] = useState(false);

  return (
    <tr style={{
      borderBottom: "1px solid rgba(201,168,76,0.08)",
      transition: "background 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(201,168,76,0.04)"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
    >
      {/* Image */}
      <td style={{ padding: "14px 16px", width: 60 }}>
        <div style={{ width: 48, height: 56, background: "#111109", overflow: "hidden", flexShrink: 0 }}>
          {perfume.image ? (
            <img src={perfume.image} alt={perfume.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a4438" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
          )}
        </div>
      </td>

      {/* Name & category */}
      <td style={{ padding: "14px 16px" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "#f0ebe0", marginBottom: 3 }}>
          {perfume.name}
        </div>
        <div style={{ fontSize: 9, letterSpacing: "0.16em", color: "#c9a84c", textTransform: "uppercase", fontWeight: 600 }}>
          {perfume.category}
        </div>
      </td>

      {/* Price */}
      <td style={{ padding: "14px 16px", fontSize: 13, color: "#a89878" }}>
        {perfume.price || "—"}
      </td>

      {/* Status badges */}
      <td style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {perfume.isFeatured && <span style={badgeStyle("#c9a84c", "#1a1a14")}>Featured</span>}
          {perfume.isNewArrival && <span style={badgeStyle("#3a7060", "#a0e8d8")}>New Arrival</span>}
          {!perfume.inStock && <span style={badgeStyle("#6a2020", "#e8a0a0")}>Out of Stock</span>}
          {!perfume.isFeatured && !perfume.isNewArrival && perfume.inStock && (
            <span style={badgeStyle("#2a2a20", "#7a7060")}>Active</span>
          )}
        </div>
      </td>

      {/* Actions */}
      <td style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => onEdit(perfume)} style={{
            background: "transparent", border: "1px solid rgba(201,168,76,0.3)",
            color: "#c9a84c", padding: "6px 14px",
            fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase",
            fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
            fontFamily: "'Montserrat', sans-serif",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            Edit
          </button>

          {confirmDel ? (
            <div style={{ display: "flex", gap: 4 }}>
              <button onClick={() => { onDelete(perfume.id); setConfirmDel(false); }} disabled={deleting}
                style={{
                  background: "rgba(180,40,40,0.15)", border: "1px solid rgba(180,40,40,0.4)",
                  color: "#e07070", padding: "6px 10px", fontSize: 9,
                  letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600,
                  cursor: "pointer", fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Confirm
              </button>
              <button onClick={() => setConfirmDel(false)} style={{
                background: "transparent", border: "1px solid rgba(201,168,76,0.15)",
                color: "#7a7060", padding: "6px 10px", fontSize: 9,
                cursor: "pointer", fontFamily: "'Montserrat', sans-serif",
              }}>
                No
              </button>
            </div>
          ) : (
            <button onClick={() => setConfirmDel(true)} style={{
              background: "transparent", border: "1px solid rgba(180,40,40,0.3)",
              color: "#e07070", padding: "6px 14px",
              fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase",
              fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
              fontFamily: "'Montserrat', sans-serif",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(180,40,40,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            >
              Delete
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

function badgeStyle(bg, color) {
  return {
    display: "inline-block",
    background: bg, color: color,
    fontSize: 8, fontWeight: 700,
    letterSpacing: "0.14em", textTransform: "uppercase",
    padding: "2px 8px",
  };
}

// ── Admin Panel Page ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { perfumes, loading, error, refetch } = usePerfumes();
  const { addPerfume, updatePerfume, deletePerfume, saving, deleting } = usePerfumeAdmin();

  const [view,     setView]     = useState("list"); // "list" | "add" | "edit"
  const [editing,  setEditing]  = useState(null);
  const [toast,    setToast]    = useState(null);
  const [search,   setSearch]   = useState("");

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  async function handleAdd(formData, imageFile) {
    try {
      await addPerfume(formData, imageFile);
      await refetch();
      setView("list");
      showToast("Perfume successfully added!");
    } catch (err) {
      showToast(err.message, "error");
    }
  }

  async function handleUpdate(formData, imageFile) {
    try {
      await updatePerfume(editing.id, formData, imageFile);
      await refetch();
      setView("list");
      setEditing(null);
      showToast("Perfume updated successfully!");
    } catch (err) {
      showToast(err.message, "error");
    }
  }

  async function handleDelete(id) {
    try {
      await deletePerfume(id);
      await refetch();
      showToast("Perfume deleted.");
    } catch (err) {
      showToast(err.message, "error");
    }
  }

  function startEdit(perfume) {
    // Convert mapped perfume back to form shape
    const formShape = {
      name:             perfume.name,
      slug:             perfume.slug,
      category:         perfume.category,
      category_slug:    perfume.categorySlug,
      description:      perfume.description,
      long_description: perfume.longDescription,
      price:            perfume.price,
      size:             perfume.size,
      image_url:        perfume.image,
      badge:            perfume.badge || "",
      is_featured:      perfume.isFeatured,
      is_new_arrival:   perfume.isNewArrival,
      in_stock:         perfume.inStock,
      top_notes:        (perfume.topNotes || []).join(", "),
      heart_notes:      (perfume.heartNotes || []).join(", "),
      base_notes:       (perfume.baseNotes || []).join(", "),
      sillage:          perfume.sillage || "",
      longevity:        perfume.longevity || "",
      season:           perfume.season || "",
      occasion:         perfume.occasion || "",
      perfumer:         perfume.perfumer || "",
      origin:           perfume.origin || "",
      concentration:    perfume.concentration || "",
    };
    setEditing({ id: perfume.id, ...formShape });
    setView("edit");
  }

  const filtered = perfumes.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#111109", fontFamily: "'Montserrat', sans-serif" }}>

      {/* ── Top Bar ── */}
      <header style={{
        background: "#1a1a14",
        borderBottom: "1px solid rgba(201,168,76,0.18)",
        padding: "0 32px",
        height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src="/logo.png" alt="Chandan Craft" style={{ height: 38, objectFit: "contain" }} />
          <div style={{ width: 1, height: 28, background: "rgba(201,168,76,0.2)" }} />
          <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, color: "#c9a84c" }}>
            Admin Panel
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ fontSize: 11, color: "#7a7060", fontWeight: 300 }}>{user?.email}</span>
          <a href="/" target="_blank" rel="noopener noreferrer" style={{
            fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase",
            fontWeight: 600, color: "#a89878", textDecoration: "none",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "#c9a84c"}
            onMouseLeave={e => e.currentTarget.style.color = "#a89878"}
          >
            View Site ↗
          </a>
          <button onClick={signOut} style={{
            background: "transparent", border: "1px solid rgba(201,168,76,0.2)",
            color: "#7a7060", padding: "7px 18px",
            fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase",
            fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
            fontFamily: "'Montserrat', sans-serif",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(220,60,60,0.4)"; e.currentTarget.style.color = "#e07070"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)"; e.currentTarget.style.color = "#7a7060"; }}
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* ── Toast ── */}
      {toast && (
        <div style={{
          position: "fixed", top: 70, right: 24, zIndex: 9999,
          padding: "12px 20px",
          background: toast.type === "error" ? "rgba(180,40,40,0.95)" : "rgba(40,120,80,0.95)",
          border: `1px solid ${toast.type === "error" ? "rgba(220,80,80,0.5)" : "rgba(80,180,120,0.5)"}`,
          color: "#f0ebe0", fontSize: 12, fontWeight: 400,
          backdropFilter: "blur(8px)",
          animation: "fadeInRight 0.3s ease",
          maxWidth: 320,
        }}>
          {toast.msg}
        </div>
      )}

      {/* ── Main Content ── */}
      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 32px" }}>

        {/* ── Stats bar ── */}
        {view === "list" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
            {[
              { label: "Total Perfumes", value: perfumes.length, color: "#f0ebe0" },
              { label: "Featured",       value: perfumes.filter(p => p.isFeatured).length,    color: "#c9a84c" },
              { label: "New Arrivals",   value: perfumes.filter(p => p.isNewArrival).length,  color: "#80c8a8" },
              { label: "Out of Stock",   value: perfumes.filter(p => !p.inStock).length,      color: "#e07070" },
            ].map(s => (
              <div key={s.label} style={{
                background: "#1a1a14",
                border: "1px solid rgba(201,168,76,0.12)",
                padding: "20px 24px",
              }}>
                <div style={{ fontSize: 26, fontFamily: "'Cormorant Garamond', serif", color: s.color, marginBottom: 4 }}>
                  {loading ? "—" : s.value}
                </div>
                <div style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, color: "#5a5040" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── List View ── */}
        {view === "list" && (
          <>
            {/* List header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 400, color: "#f0ebe0", marginBottom: 4 }}>
                  Perfume Collection
                </h1>
                <p style={{ fontSize: 12, color: "#5a5040", fontWeight: 300 }}>
                  {perfumes.length} fragrance{perfumes.length !== 1 ? "s" : ""} in catalogue
                </p>
              </div>
              <button onClick={() => setView("add")} className="btn-gold">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Add New Perfume
              </button>
            </div>

            {/* Search */}
            <div style={{ marginBottom: 20, position: "relative", maxWidth: 340 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5a5040" strokeWidth="1.5"
                style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search perfumes..."
                style={{ ...inputStyle, paddingLeft: 36 }}
                onFocus={e => e.target.style.borderColor = "#c9a84c"}
                onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"}
              />
            </div>

            {/* Table */}
            <div style={{ background: "#1a1a14", border: "1px solid rgba(201,168,76,0.12)", overflow: "hidden" }}>
              {loading ? (
                <div style={{ padding: 60, textAlign: "center", color: "#5a5040" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5"
                    style={{ animation: "spin 1s linear infinite", marginBottom: 12 }}>
                    <path d="M21 12a9 9 0 00-9-9"/>
                    <path d="M21 12a9 9 0 01-9 9" strokeOpacity="0.3"/>
                  </svg>
                  <div style={{ fontSize: 12, marginTop: 8 }}>Loading perfumes from Supabase...</div>
                </div>
              ) : error ? (
                <div style={{ padding: 40, textAlign: "center", color: "#e07070", fontSize: 13 }}>
                  Error: {error}
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ padding: 60, textAlign: "center" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#3a342d", marginBottom: 12 }}>
                    No perfumes found
                  </div>
                  <p style={{ fontSize: 12, color: "#5a5040", marginBottom: 24 }}>
                    {search ? `No results for "${search}"` : "Add your first fragrance to the collection."}
                  </p>
                  {!search && (
                    <button onClick={() => setView("add")} className="btn-gold">
                      Add First Perfume
                    </button>
                  )}
                </div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
                      {["", "Name & Category", "Price", "Status", "Actions"].map(h => (
                        <th key={h} style={{
                          padding: "12px 16px", textAlign: "left",
                          fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase",
                          fontWeight: 700, color: "#5a5040",
                        }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(p => (
                      <PerfumeRow
                        key={p.id} perfume={p}
                        onEdit={startEdit} onDelete={handleDelete}
                        deleting={deleting}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* ── Add View ── */}
        {view === "add" && (
          <div style={{ background: "#1a1a14", border: "1px solid rgba(201,168,76,0.12)", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
              <div>
                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: "#f0ebe0", marginBottom: 4 }}>
                  Add New Perfume
                </h1>
                <p style={{ fontSize: 12, color: "#5a5040", fontWeight: 300 }}>
                  Fill in the details — image will upload to Supabase Storage
                </p>
              </div>
              <button onClick={() => setView("list")} style={{
                background: "none", border: "none", color: "#7a7060",
                cursor: "pointer", fontSize: 11, letterSpacing: "0.12em",
                textTransform: "uppercase", fontWeight: 600,
                display: "flex", alignItems: "center", gap: 6,
                fontFamily: "'Montserrat', sans-serif",
              }}>
                ← Back to List
              </button>
            </div>
            <PerfumeForm onSave={handleAdd} onCancel={() => setView("list")} saving={saving} />
          </div>
        )}

        {/* ── Edit View ── */}
        {view === "edit" && editing && (
          <div style={{ background: "#1a1a14", border: "1px solid rgba(201,168,76,0.12)", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
              <div>
                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: "#f0ebe0", marginBottom: 4 }}>
                  Edit — {editing.name}
                </h1>
                <p style={{ fontSize: 12, color: "#5a5040", fontWeight: 300 }}>
                  Changes will update the Supabase database immediately
                </p>
              </div>
              <button onClick={() => { setView("list"); setEditing(null); }} style={{
                background: "none", border: "none", color: "#7a7060",
                cursor: "pointer", fontSize: 11, letterSpacing: "0.12em",
                textTransform: "uppercase", fontWeight: 600,
                display: "flex", alignItems: "center", gap: 6,
                fontFamily: "'Montserrat', sans-serif",
              }}>
                ← Back to List
              </button>
            </div>
            <PerfumeForm initial={editing} onSave={handleUpdate} onCancel={() => { setView("list"); setEditing(null); }} saving={saving} />
          </div>
        )}
      </main>

      <style>{`
        @keyframes spin         { to   { transform: rotate(360deg); } }
        @keyframes fadeInRight  { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  );
}
