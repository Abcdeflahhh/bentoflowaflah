"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { toPng } from "html-to-image";

import { BentoCard, BentoProfile, ThemeId } from "@/types/bento";
import { THEMES } from "@/lib/themes";
import { INITIAL_PROFILE } from "@/lib/initial-data";
import { SortableCard } from "@/components/sortable-card";
import { BentoCardView } from "@/components/bento-card-view";
import { CardModal } from "@/components/card-modal";
import { ProfileModal } from "@/components/profile-modal";
import { AICopilotBar } from "@/components/ai-copilot-bar";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

import {
  Plus,
  Share2,
  Eye,
  Edit3,
  Palette,
  Check,
  Mail,
  MapPin,
  Laptop,
  Download,
  RotateCcw,
  User,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "bentoflow_profile_v1";

export default function BentoFlowPage() {
  const [profile, setProfile] = useState<BentoProfile>(INITIAL_PROFILE);
  const [isEditorMode, setIsEditorMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<BentoCard | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setProfile(JSON.parse(saved));
      }
    } catch {
      // Fallback
    } finally {
      setHasLoaded(true);
    }
  }, []);

  // Auto-Save to LocalStorage on changes
  useEffect(() => {
    if (hasLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      } catch {
        // LocalStorage quota or privacy mode handling
      }
    }
  }, [profile, hasLoaded]);

  const currentTheme = THEMES[profile.theme] || THEMES["dark-minimal"];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setProfile((prev) => {
        const oldIndex = prev.cards.findIndex((c) => c.id === active.id);
        const newIndex = prev.cards.findIndex((c) => c.id === over.id);
        return {
          ...prev,
          cards: arrayMove(prev.cards, oldIndex, newIndex),
        };
      });
    }
  };

  const handleSaveCard = (card: BentoCard) => {
    setProfile((prev) => {
      const exists = prev.cards.some((c) => c.id === card.id);
      if (exists) {
        return {
          ...prev,
          cards: prev.cards.map((c) => (c.id === card.id ? card : c)),
        };
      }
      return {
        ...prev,
        cards: [card, ...prev.cards],
      };
    });
  };

  const handleDeleteCard = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      cards: prev.cards.filter((c) => c.id !== id),
    }));
  };

  const handleApplyAI = (data: Partial<BentoProfile> & { newCards?: BentoCard[] }) => {
    setProfile((prev) => ({
      ...prev,
      theme: data.theme || prev.theme,
      headline: data.headline || prev.headline,
      bio: data.bio || prev.bio,
      cards: data.newCards ? [...data.newCards, ...prev.cards] : prev.cards,
    }));
  };

  const handleUpdateProfile = (updated: Partial<BentoProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...updated,
      socialLinks: {
        ...prev.socialLinks,
        ...(updated.socialLinks || {}),
      },
    }));
  };

  const handleResetToDefault = () => {
    if (confirm("Kembalikan seluruh data dan kartu ke setelan bawaan awal?")) {
      setProfile(INITIAL_PROFILE);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleExportImage = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
        quality: 0.95,
        backgroundColor: "#09090b",
      });
      const link = document.createElement("a");
      link.download = `bentoflow-${profile.username || "portfolio"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export error:", err);
      alert("Gagal mengunduh gambar. Silakan coba lagi.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-500 font-sans selection:bg-purple-500 selection:text-white",
        currentTheme.background
      )}
    >
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b border-white/10 bg-black/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Laptop className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-lg">BentoFlow</span>
              <span className="ml-2 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Auto-Save On
              </span>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Mode Switcher */}
            <button
              onClick={() => setIsEditorMode(!isEditorMode)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-white/10 hover:bg-white/15 transition-all"
            >
              {isEditorMode ? (
                <>
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span className="hidden sm:inline">Preview Publik</span>
                  <span className="sm:hidden">Preview</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4 text-yellow-400" />
                  <span className="hidden sm:inline">Mode Editor</span>
                  <span className="sm:hidden">Edit</span>
                </>
              )}
            </button>

            {/* Export as Image Button */}
            <button
              onClick={handleExportImage}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-white/10 hover:bg-white/15 transition-all disabled:opacity-50"
              title="Unduh gambar Bento Grid untuk posting LinkedIn / IG"
            >
              {isExporting ? (
                <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
              ) : (
                <Download className="w-4 h-4 text-emerald-400" />
              )}
              <span className="hidden md:inline">Download Gambar</span>
            </button>

            {/* Share / Copy Button */}
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-white/10 hover:bg-white/15 transition-all"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Disalin!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Bagikan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Editor Controls Bar (Only in Editor Mode) */}
        {isEditorMode && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* AI Copilot Bar */}
            <AICopilotBar onApplyAIChanges={handleApplyAI} />

            {/* Sub-toolbar: Themes & Add Card */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              {/* Theme Picker */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                <Palette className="w-4 h-4 text-zinc-400 shrink-0 mr-1" />
                <span className="text-xs text-zinc-400 shrink-0 mr-1">Tema:</span>
                {(Object.keys(THEMES) as ThemeId[]).map((tId) => (
                  <button
                    key={tId}
                    onClick={() => setProfile((p) => ({ ...p, theme: tId }))}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border",
                      profile.theme === tId
                        ? "bg-white text-black border-white shadow-md"
                        : "bg-white/5 hover:bg-white/10 text-zinc-300 border-white/5"
                    )}
                  >
                    {THEMES[tId].name}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleResetToDefault}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs transition-colors"
                  title="Reset ke setelan bawaan"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs sm:text-sm font-semibold transition-all border border-white/10"
                >
                  <User className="w-4 h-4 text-indigo-400" />
                  <span>Edit Profil</span>
                </button>

                <button
                  onClick={() => {
                    setEditingCard(null);
                    setIsModalOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 font-semibold text-xs sm:text-sm transition-all shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Kartu</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Exportable Area (Profile Header + Bento Grid) */}
        <div ref={canvasRef} className="space-y-8 p-1 sm:p-2 rounded-3xl">
          {/* Profile Header Card */}
          <section className="relative p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
              {/* Avatar with Glow */}
              <div className="relative group shrink-0">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600 to-cyan-500 opacity-60 blur-md group-hover:opacity-100 transition-opacity" />
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-white/20"
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {profile.name}
                  </h1>

                  {profile.availableForHire && (
                    <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Tersedia untuk Magang / Kerja
                    </span>
                  )}
                </div>

                <p className={cn("text-sm sm:text-base font-medium", currentTheme.textSecondary)}>
                  {profile.headline}
                </p>

                <p className={cn("text-xs sm:text-sm max-w-2xl leading-relaxed", currentTheme.textSecondary)}>
                  {profile.bio}
                </p>

                <div className="flex items-center gap-4 pt-2 text-xs text-zinc-400 flex-wrap">
                  {profile.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {profile.location}
                    </span>
                  )}
                  {profile.socialLinks.github && (
                    <a
                      href={profile.socialLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" /> GitHub
                    </a>
                  )}
                  {profile.socialLinks.linkedin && (
                    <a
                      href={profile.socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn
                    </a>
                  )}
                  {profile.socialLinks.email && (
                    <a
                      href={`mailto:${profile.socialLinks.email}`}
                      className="hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" /> Email
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Bento Grid Canvas */}
          <section>
            {isEditorMode ? (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={profile.cards.map((c) => c.id)}
                  strategy={rectSortingStrategy}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[minmax(170px,auto)]">
                    {profile.cards.map((card) => (
                      <SortableCard
                        key={card.id}
                        card={card}
                        theme={currentTheme}
                        onEdit={(c) => {
                          setEditingCard(c);
                          setIsModalOpen(true);
                        }}
                        onDelete={handleDeleteCard}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[minmax(170px,auto)]">
                {profile.cards.map((card) => (
                  <BentoCardView
                    key={card.id}
                    card={card}
                    theme={currentTheme}
                    isEditable={false}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-white/10 text-center text-xs text-zinc-500 space-y-2">
        <p>BentoFlow — Dibangun oleh Mahasiswa Semester 5 Teknik Informatika.</p>
        <p className="opacity-75">
          Tech Stack: Next.js 15, TypeScript, Tailwind CSS, Framer Motion, dnd-kit & AI Copilot.
        </p>
      </footer>

      {/* Card Modal */}
      <CardModal
        isOpen={isModalOpen}
        initialCard={editingCard}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCard(null);
        }}
        onSave={handleSaveCard}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        profile={profile}
        onClose={() => setIsProfileModalOpen(false)}
        onSave={handleUpdateProfile}
      />
    </div>
  );
}
