"use client";

import React, { useState, useEffect } from "react";
import { BentoCard, ThemeConfig } from "@/types/bento";
import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/icons";
import {
  ExternalLink,
  Sparkles,
  Music,
  Quote,
  Layers,
  GraduationCap,
  Briefcase,
  Code2,
  GitBranch,
  Users,
} from "lucide-react";

interface BentoCardViewProps {
  card: BentoCard;
  theme: ThemeConfig;
  isEditable?: boolean;
  onEdit?: (card: BentoCard) => void;
  onDelete?: (id: string) => void;
}

interface GithubStats {
  repos: number;
  followers: number;
  bio?: string;
  avatar?: string;
}

export function BentoCardView({
  card,
  theme,
  isEditable = false,
  onEdit,
  onDelete,
}: BentoCardViewProps) {
  const [ghStats, setGhStats] = useState<GithubStats | null>(null);

  useEffect(() => {
    if (card.type === "github") {
      let username = "Abcdeflahhh";
      if (card.url) {
        const parts = card.url.split("/").filter(Boolean);
        if (parts.length > 0) {
          username = parts[parts.length - 1];
        }
      }
      fetch(`https://api.github.com/users/${username}`)
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Failed to fetch");
        })
        .then((data) => {
          setGhStats({
            repos: data.public_repos ?? 0,
            followers: data.followers ?? 0,
            bio: data.bio,
            avatar: data.avatar_url,
          });
        })
        .catch(() => {
          // Gracefully fallback
        });
    }
  }, [card.type, card.url]);

  const sizeClasses = {
    "1x1": "col-span-1 row-span-1 min-h-[170px]",
    "2x1": "col-span-1 sm:col-span-2 row-span-1 min-h-[170px]",
    "1x2": "col-span-1 row-span-2 min-h-[360px]",
    "2x2": "col-span-1 sm:col-span-2 row-span-2 min-h-[360px]",
  }[card.size];

  const getCardIcon = () => {
    switch (card.type) {
      case "github":
        return <GithubIcon className="w-5 h-5 text-zinc-100" />;
      case "spotify":
        return <Music className="w-5 h-5 text-emerald-400" />;
      case "quote":
        return <Quote className="w-5 h-5 text-amber-400" />;
      case "project":
        return <Briefcase className="w-5 h-5 text-indigo-400" />;
      case "stats":
        return <GraduationCap className="w-5 h-5 text-blue-400" />;
      case "profile":
        return <Sparkles className="w-5 h-5 text-yellow-400" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  const cardContent = (
    <div
      className={cn(
        "group relative flex flex-col justify-between p-5 sm:p-6 rounded-3xl border transition-all duration-300 backdrop-blur-md overflow-hidden select-none",
        sizeClasses,
        theme.cardBg,
        theme.accentGlow
      )}
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none blur-2xl group-hover:scale-125 transition-transform duration-500" />

      {/* Card Header */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-current flex items-center justify-center">
            {getCardIcon()}
          </div>
          {card.badge && (
            <span className="text-[11px] font-medium tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-white/10 border border-white/10 flex items-center gap-1.5">
              {card.type === "github" && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              )}
              {card.badge}
            </span>
          )}
        </div>

        {card.url && !isEditable && (
          <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
            <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
          </div>
        )}

        {isEditable && (
          <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(card);
                }}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs transition-colors"
                title="Edit card"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(card.id);
                }}
                className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 text-xs transition-colors"
                title="Hapus card"
              >
                Hapus
              </button>
            )}
          </div>
        )}
      </div>

      {/* Card Body & Metrics */}
      <div className="relative z-10 my-3">
        {card.subtitle && (
          <p className={cn("text-xs font-medium tracking-wide mb-1", theme.textSecondary)}>
            {card.subtitle}
          </p>
        )}
        <h3 className={cn("font-bold tracking-tight text-lg sm:text-xl", theme.textPrimary)}>
          {card.title}
        </h3>

        {card.description && (
          <p className={cn("text-xs sm:text-sm mt-1.5 line-clamp-3 leading-relaxed", theme.textSecondary)}>
            {card.description}
          </p>
        )}

        {/* Live GitHub Stats Metrics */}
        {card.type === "github" && ghStats && (
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/10">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5">
              <GitBranch className="w-4 h-4 text-purple-400" />
              <div>
                <p className="text-sm sm:text-base font-bold leading-none">{ghStats.repos}</p>
                <p className={cn("text-[10px] mt-0.5", theme.textSecondary)}>Public Repos</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5">
              <Users className="w-4 h-4 text-cyan-400" />
              <div>
                <p className="text-sm sm:text-base font-bold leading-none">{ghStats.followers}</p>
                <p className={cn("text-[10px] mt-0.5", theme.textSecondary)}>Followers</p>
              </div>
            </div>
          </div>
        )}

        {/* Standard Metrics */}
        {card.metrics && card.type !== "github" && (
          <div className="mt-4 pt-3 border-t border-white/5 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {card.metrics.value}
            </span>
            <span className={cn("text-xs", theme.textSecondary)}>
              {card.metrics.label}
            </span>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="relative z-10 flex items-center justify-between text-xs pt-2">
        {card.type === "profile" && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className={cn("text-xs font-medium", theme.textSecondary)}>
              Active in Semester 5
            </span>
          </div>
        )}

        {card.type === "project" && (
          <span className="font-semibold text-xs tracking-wider opacity-90 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            Lihat Project &rarr;
          </span>
        )}

        {card.type === "github" && (
          <span className="font-semibold text-xs tracking-wider opacity-90 flex items-center gap-1 text-emerald-400">
            <Code2 className="w-3.5 h-3.5" /> Buka GitHub Profile
          </span>
        )}
      </div>
    </div>
  );

  if (card.url && !isEditable) {
    return (
      <a
        href={card.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/20 rounded-3xl"
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
