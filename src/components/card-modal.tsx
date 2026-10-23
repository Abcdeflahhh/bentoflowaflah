"use client";

import React, { useState, useEffect } from "react";
import { BentoCard, CardSize, CardType } from "@/types/bento";
import { X, Sparkles } from "lucide-react";

interface CardModalProps {
  isOpen: boolean;
  initialCard: BentoCard | null;
  onClose: () => void;
  onSave: (card: BentoCard) => void;
}

export function CardModal({
  isOpen,
  initialCard,
  onClose,
  onSave,
}: CardModalProps) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [badge, setBadge] = useState("");
  const [size, setSize] = useState<CardSize>("1x1");
  const [type, setType] = useState<CardType>("project");
  const [metricValue, setMetricValue] = useState("");
  const [metricLabel, setMetricLabel] = useState("");

  useEffect(() => {
    if (initialCard) {
      setTitle(initialCard.title || "");
      setSubtitle(initialCard.subtitle || "");
      setDescription(initialCard.description || "");
      setUrl(initialCard.url || "");
      setBadge(initialCard.badge || "");
      setSize(initialCard.size || "1x1");
      setType(initialCard.type || "project");
      setMetricValue(String(initialCard.metrics?.value || ""));
      setMetricLabel(initialCard.metrics?.label || "");
    } else {
      setTitle("");
      setSubtitle("");
      setDescription("");
      setUrl("");
      setBadge("");
      setSize("1x1");
      setType("project");
      setMetricValue("");
      setMetricLabel("");
    }
  }, [initialCard, isOpen]);

  const applyPreset = (presetType: CardType) => {
    setType(presetType);
    if (presetType === "project") {
      setTitle("Portfolio Web App");
      setSubtitle("Next.js & Tailwind CSS");
      setDescription("Aplikasi web modern dengan performa tinggi dan desain interaktif.");
      setBadge("Featured");
      setSize("2x1");
      setUrl("https://github.com");
    } else if (presetType === "github") {
      setTitle("GitHub Repository");
      setSubtitle("Open Source");
      setDescription("Koleksi kode sumber terbuka dan kontribusi komunitas.");
      setBadge("Live API");
      setSize("2x1");
      setUrl("https://github.com/Abcdeflahhh");
    } else if (presetType === "spotify") {
      setTitle("Midnight City - M83");
      setSubtitle("Favorit Saat Ngoding");
      setDescription("Lagu synthwave penambah fokus saat menulis kode malam hari.");
      setBadge("Spotify");
      setSize("1x1");
      setUrl("https://open.spotify.com");
    } else if (presetType === "stats") {
      setTitle("Pendidikan & Prestasi");
      setSubtitle("S1 Teknik Informatika");
      setDescription("Fokus bidang Software Engineering dan Cloud Computing.");
      setBadge("Akademik");
      setSize("1x1");
      setMetricValue("3.85");
      setMetricLabel("IPK Kumulatif");
    } else if (presetType === "quote") {
      setTitle("Kata Mutiara");
      setSubtitle("Steve Jobs");
      setDescription('"Stay hungry, stay foolish."');
      setBadge("Inspirasi");
      setSize("1x1");
    } else if (presetType === "map") {
      setTitle("Domisili & Lokasi");
      setSubtitle("Cikarang, Bekasi");
      setDescription("Siap untuk kerja remote (WFA) maupun hybrid di Jabodetabek.");
      setBadge("Jawa Barat");
      setSize("1x1");
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newCard: BentoCard = {
      id: initialCard?.id || `card-${Date.now()}`,
      type,
      size,
      title,
      subtitle: subtitle || undefined,
      description: description || undefined,
      url: url || undefined,
      badge: badge || undefined,
      metrics:
        metricValue && metricLabel
          ? { value: metricValue, label: metricLabel }
          : undefined,
    };

    onSave(newCard);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#121216] border border-white/10 p-6 sm:p-8 shadow-2xl text-zinc-100">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h3 className="text-xl font-bold tracking-tight">
            {initialCard ? "Edit Bento Card" : "Tambah Kartu Bento Baru"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Templates (Only when creating new card) */}
        {!initialCard && (
          <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              Template Cepat:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => applyPreset("project")}
                className="px-2.5 py-1 text-xs rounded-lg bg-white/10 hover:bg-white/20 text-zinc-200 transition-colors"
              >
                + Proyek
              </button>
              <button
                type="button"
                onClick={() => applyPreset("github")}
                className="px-2.5 py-1 text-xs rounded-lg bg-white/10 hover:bg-white/20 text-zinc-200 transition-colors"
              >
                + GitHub
              </button>
              <button
                type="button"
                onClick={() => applyPreset("spotify")}
                className="px-2.5 py-1 text-xs rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 transition-colors"
              >
                + Spotify
              </button>
              <button
                type="button"
                onClick={() => applyPreset("stats")}
                className="px-2.5 py-1 text-xs rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 transition-colors"
              >
                + Nilai / IPK
              </button>
              <button
                type="button"
                onClick={() => applyPreset("quote")}
                className="px-2.5 py-1 text-xs rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 transition-colors"
              >
                + Quotes
              </button>
              <button
                type="button"
                onClick={() => applyPreset("map")}
                className="px-2.5 py-1 text-xs rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 transition-colors"
              >
                + Lokasi
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Tipe Kartu
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as CardType)}
                className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="project" className="bg-zinc-900">Project Showcase</option>
                <option value="github" className="bg-zinc-900">GitHub Repo & Live Stats</option>
                <option value="stats" className="bg-zinc-900">Statistik / Nilai</option>
                <option value="quote" className="bg-zinc-900">Quotes / Filosofi</option>
                <option value="spotify" className="bg-zinc-900">Lagu / Spotify Music</option>
                <option value="map" className="bg-zinc-900">Peta / Lokasi</option>
                <option value="social" className="bg-zinc-900">Media Sosial</option>
                <option value="link" className="bg-zinc-900">Link Web Kustom</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Ukuran Grid
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as CardSize)}
                className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="1x1" className="bg-zinc-900">1x1 (Kotak Standar)</option>
                <option value="2x1" className="bg-zinc-900">2x1 (Persegi Panjang Lebar)</option>
                <option value="1x2" className="bg-zinc-900">1x2 (Tinggi Menjulang)</option>
                <option value="2x2" className="bg-zinc-900">2x2 (Kotak Besar)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">
              Judul Kartu *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Sistem Informasi Parkir IoT"
              className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-zinc-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Sub-judul (Opsional)
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Contoh: Tugas RPL Semester 4"
                className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-zinc-600"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Badge Label (Opsional)
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="Contoh: Nilai A / Featured"
                className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-zinc-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">
              Deskripsi Singkat
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan tech stack atau fitur unggulan proyek..."
              className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-zinc-600 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">
              Tautan / URL Tujuan (Opsional)
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://github.com/username/project"
              className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-zinc-600"
            />
          </div>

          {type === "stats" && (
            <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Angka / Nilai
                </label>
                <input
                  type="text"
                  value={metricValue}
                  onChange={(e) => setMetricValue(e.target.value)}
                  placeholder="3.85 / 12+"
                  className="w-full px-3 py-1.5 text-sm bg-black/40 border border-white/10 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Label Metrik
                </label>
                <input
                  type="text"
                  value={metricLabel}
                  onChange={(e) => setMetricLabel(e.target.value)}
                  placeholder="IPK / Repositori"
                  className="w-full px-3 py-1.5 text-sm bg-black/40 border border-white/10 rounded-lg"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold rounded-xl bg-white text-black hover:bg-zinc-200 transition-colors"
            >
              Simpan Kartu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
