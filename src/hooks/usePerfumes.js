import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

// Map DB snake_case → camelCase used in components
function mapPerfume(row) {
  if (!row) return null;
  return {
    id:              row.id,
    slug:            row.slug,
    name:            row.name,
    category:        row.category,
    categorySlug:    row.category_slug,
    description:     row.description,
    longDescription: row.long_description,
    price:           row.price,
    size:            row.size,
    image:           row.image_url,
    badge:           row.badge,
    isFeatured:      row.is_featured,
    isNewArrival:    row.is_new_arrival,
    inStock:         row.in_stock,
    topNotes:        row.top_notes    || [],
    heartNotes:      row.heart_notes  || [],
    baseNotes:       row.base_notes   || [],
    sillage:         row.sillage,
    longevity:       row.longevity,
    season:          row.season,
    occasion:        row.occasion,
    perfumer:        row.perfumer,
    origin:          row.origin,
    concentration:   row.concentration,
    createdAt:       row.created_at,
  };
}

// ── Public hook — fetches all perfumes from DB ───────────────────────────────
export function usePerfumes({ featured, newArrival } = {}) {
  const [perfumes, setPerfumes] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  const fetchPerfumes = useCallback(async () => {
    setLoading(true);
    setError(null);

    let query = supabase
      .from("perfumes")
      .select("*")
      .order("created_at", { ascending: false });

    if (featured    !== undefined) query = query.eq("is_featured",    featured);
    if (newArrival  !== undefined) query = query.eq("is_new_arrival",  newArrival);

    const { data, error: err } = await query;
    if (err) setError(err.message);
    else     setPerfumes((data || []).map(mapPerfume));
    setLoading(false);
  }, [featured, newArrival]);

  useEffect(() => { fetchPerfumes(); }, [fetchPerfumes]);

  return { perfumes, loading, error, refetch: fetchPerfumes };
}

// ── Admin hook — CRUD operations ─────────────────────────────────────────────
export function usePerfumeAdmin() {
  const [saving,   setSaving]   = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Upload image to Supabase Storage → return public URL
  async function uploadImage(file) {
    const ext  = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage
      .from("perfume-images")
      .upload(path, file, { upsert: false });

    if (error) throw new Error(error.message);

    const { data } = supabase.storage
      .from("perfume-images")
      .getPublicUrl(path);

    return data.publicUrl;
  }

  // Add new perfume
  async function addPerfume(formData, imageFile) {
    setSaving(true);
    try {
      let imageUrl = formData.image_url || "";
      if (imageFile) imageUrl = await uploadImage(imageFile);

      const payload = buildPayload({ ...formData, image_url: imageUrl });
      const { data, error } = await supabase.from("perfumes").insert([payload]).select().single();
      if (error) throw new Error(error.message);
      return mapPerfume(data);
    } finally {
      setSaving(false);
    }
  }

  // Update existing perfume
  async function updatePerfume(id, formData, imageFile) {
    setSaving(true);
    try {
      let imageUrl = formData.image_url || "";
      if (imageFile) imageUrl = await uploadImage(imageFile);

      const payload = buildPayload({ ...formData, image_url: imageUrl });
      payload.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from("perfumes")
        .update(payload)
        .eq("id", id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return mapPerfume(data);
    } finally {
      setSaving(false);
    }
  }

  // Delete perfume
  async function deletePerfume(id) {
    setDeleting(true);
    try {
      const { error } = await supabase.from("perfumes").delete().eq("id", id);
      if (error) throw new Error(error.message);
    } finally {
      setDeleting(false);
    }
  }

  return { addPerfume, updatePerfume, deletePerfume, saving, deleting };
}

// Convert camelCase form → DB snake_case
function buildPayload(f) {
  return {
    name:             f.name,
    slug:             f.slug || slugify(f.name),
    category:         f.category,
    category_slug:    f.category_slug,
    description:      f.description,
    long_description: f.long_description,
    price:            f.price,
    size:             f.size,
    image_url:        f.image_url,
    badge:            f.badge || null,
    is_featured:      Boolean(f.is_featured),
    is_new_arrival:   Boolean(f.is_new_arrival),
    in_stock:         f.in_stock !== false,
    top_notes:        parseNotes(f.top_notes),
    heart_notes:      parseNotes(f.heart_notes),
    base_notes:       parseNotes(f.base_notes),
    sillage:          f.sillage,
    longevity:        f.longevity,
    season:           f.season,
    occasion:         f.occasion,
    perfumer:         f.perfumer,
    origin:           f.origin,
    concentration:    f.concentration,
  };
}

function slugify(str = "") {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Accept either array or comma-separated string
function parseNotes(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val.filter(Boolean);
  return val.split(",").map((s) => s.trim()).filter(Boolean);
}
