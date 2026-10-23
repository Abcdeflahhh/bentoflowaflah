"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BentoCard, ThemeConfig } from "@/types/bento";
import { BentoCardView } from "./bento-card-view";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortableCardProps {
  card: BentoCard;
  theme: ThemeConfig;
  onEdit: (card: BentoCard) => void;
  onDelete: (id: string) => void;
}

export function SortableCard({
  card,
  theme,
  onEdit,
  onDelete,
}: SortableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.75 : 1,
  };

  const spanClasses = {
    "1x1": "col-span-1 row-span-1",
    "2x1": "col-span-1 sm:col-span-2 row-span-1",
    "1x2": "col-span-1 row-span-2",
    "2x2": "col-span-1 sm:col-span-2 row-span-2",
  }[card.size];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("relative group/sortable", spanClasses)}
    >
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        type="button"
        className="absolute top-3 left-3 z-30 p-1.5 rounded-lg bg-black/40 hover:bg-black/80 text-white/70 hover:text-white backdrop-blur-md cursor-grab active:cursor-grabbing opacity-0 group-hover/sortable:opacity-100 transition-opacity"
        title="Geser posisi kartu"
      >
        <GripVertical className="w-4 h-4" />
      </button>

      <BentoCardView
        card={card}
        theme={theme}
        isEditable={true}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}
