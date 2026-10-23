"use client";

import React, { useState } from "react";
import { Sparkles, Loader2, Wand2, Lightbulb } from "lucide-react";
import { BentoCard, BentoProfile, ThemeId } from "@/types/bento";

interface AICopilotBarProps {
  onApplyAIChanges: (data: Partial<BentoProfile> & { newCards?: BentoCard[] }) => void;
}

export function AICopilotBar({ onApplyAIChanges }: AICopilotBarProps) {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestionActive, setSuggestionActive] = useState(false);

  const quickPrompts = [
    "Mahasiswa TI Semester 5 fokus Backend Go & DB",
    "Frontend & UI Engineer dengan tema Cyber Neon",
    "AI & Data Science Engineer tema Midnight Violet",
    "Mobile Flutter Developer dengan tema Warm Amber",
    "Clean Minimalist Portfolio Builder",
  ];

  const handleGenerate = async (targetPrompt?: string) => {
    const textToProcess = targetPrompt || prompt;
    if (!textToProcess.trim()) return;

    setIsLoading(true);

    // Simulate intelligent AI parsing & generative layout
    await new Promise((resolve) => setTimeout(resolve, 800));

    const lower = textToProcess.toLowerCase();
    let theme: ThemeId = "dark-minimal";
    let headline = "Software Engineer & Builder";
    let bio = "Membangun sistem scalable dengan teknologi web mutakhir.";
    let projectTitle = "Interactive SaaS Experience";
    let projectDesc = "Dibangun dengan arsitektur modern, state management bersih, dan performa tinggi.";
    let statTitle = "Focus Area";
    let statDesc = "Next.js, TypeScript, Tailwind";
    let statMetric = { label: "Readiness", value: "100%" };

    if (lower.includes("cyber") || lower.includes("cyberpunk") || lower.includes("neon")) {
      theme = "cyberpunk";
      headline = "Full-Stack Cyber Engineer";
      bio = "Merancang antarmuka berkecepatan tinggi, high-throughput microservices, dan sistem real-time.";
      projectTitle = "Neural Mesh Dashboard & Telemetry";
      projectDesc = "Real-time analytics engine dengan WebSockets, Next.js Turbopack, dan visualisasi canvas.";
      statTitle = "Cyber Stack";
      statDesc = "TypeScript, Rust, WebGL";
      statMetric = { label: "Performance Score", value: "99" };
    } else if (lower.includes("warm") || lower.includes("retro") || lower.includes("amber")) {
      theme = "retro-warm";
      headline = "Creative Technologist & UI Engineer";
      bio = "Menghubungkan estetika visual yang hangat dengan performa kode tanpa kompromi.";
      projectTitle = "Editorial Craft & CMS Studio";
      projectDesc = "Desain tipografi berbasis grid Swiss, transisi mikro halus, dan render statis optimal.";
      statTitle = "Design System";
      statDesc = "Figma, Tailwind, Framer";
      statMetric = { label: "Aesthetic Index", value: "10/10" };
    } else if (lower.includes("mobile") || lower.includes("flutter")) {
      theme = "midnight-violet";
      headline = "Mobile Application Specialist";
      bio = "Membangun aplikasi multiplatform Flutter yang responsif, fluid, dan offline-first.";
      projectTitle = "Smart Habit & Cashflow Mobile App";
      projectDesc = "Aplikasi keuangan pribadi dengan integrasi SQLite lokal dan sinkronisasi cloud real-time.";
      statTitle = "Mobile Stack";
      statDesc = "Flutter, Dart, Riverpod, Firebase";
      statMetric = { label: "Active Users", value: "5K+" };
    } else if (lower.includes("backend") || lower.includes("database") || lower.includes("db") || lower.includes("go")) {
      theme = "dark-minimal";
      headline = "Backend & Systems Architect (Sem 5)";
      bio = "Fokus pada RESTful API, PostgreSQL query optimization, dan microservice resilience.";
      projectTitle = "Distributed Booking & Queue API";
      projectDesc = "High-concurrency ticket reservation engine menggunakan Redis pub/sub dan PostgreSQL transactions.";
      statTitle = "Backend Stack";
      statDesc = "Go, PostgreSQL, Redis, Docker";
      statMetric = { label: "TPS Capacity", value: "10K" };
    } else if (lower.includes("ai") || lower.includes("data") || lower.includes("ml") || lower.includes("machine learning")) {
      theme = "midnight-violet";
      headline = "AI & Machine Learning Engineer";
      bio = "Mengeksplorasi LLM agentic workflow, pipeline RAG, dan model NLP untuk otomasi cerdas.";
      projectTitle = "Autonomous RAG Knowledge Agent";
      projectDesc = "Sistem pencarian semantik cerdas berbasis vektor embedding dan reasoning LLM adaptif.";
      statTitle = "AI Drivers";
      statDesc = "Python, PyTorch, LangChain, Pinecone";
      statMetric = { label: "Benchmark Acc", value: "96.4%" };
    } else if (lower.includes("clean") || lower.includes("light")) {
      theme = "clean-light";
      headline = "Product Designer & Frontend Architect";
      bio = "Menyederhanakan pengalaman digital yang kompleks menjadi alur bento yang intuitif dan minimalis.";
      projectTitle = "Minimalist Design System Kit";
      projectDesc = "Komponen UI modular berstandar WCAG AAA dengan kontras tajam dan arsitektur rapi.";
      statTitle = "Design Metrics";
      statDesc = "React 19, Accessibility, Tailwind";
      statMetric = { label: "Accessibility", value: "100%" };
    }

    const generatedCards: BentoCard[] = [
      {
        id: `ai-card-${Date.now()}-1`,
        type: "project",
        size: "2x1",
        title: projectTitle,
        subtitle: "Generated by BentoFlow AI",
        description: projectDesc,
        badge: "AI Suggested",
      },
      {
        id: `ai-card-${Date.now()}-2`,
        type: "stats",
        size: "1x1",
        title: statTitle,
        subtitle: "Focus",
        description: statDesc,
        metrics: statMetric,
      },
    ];

    onApplyAIChanges({
      theme,
      headline,
      bio,
      newCards: generatedCards,
    });

    setIsLoading(false);
    setPrompt("");
  };

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-blue-900/30 border border-purple-500/30 p-4 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex items-center gap-2 text-purple-300 font-semibold text-sm">
          <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
          <span>BentoFlow AI Copilot</span>
        </div>

        <div className="relative flex-1">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleGenerate();
              }
            }}
            placeholder="Ketik vibe Anda (contoh: 'Mahasiswa TI fokus Backend Go & PostgreSQL')..."
            className="w-full px-4 py-2.5 text-sm bg-black/50 border border-purple-400/30 rounded-xl text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          onClick={() => handleGenerate()}
          disabled={isLoading || !prompt.trim()}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-medium text-sm transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Generate Vibe</span>
            </>
          )}
        </button>
      </div>

      {/* Quick Prompt Suggestions */}
      <div className="flex items-center gap-2 mt-3 flex-wrap text-xs">
        <span className="text-zinc-400 flex items-center gap-1">
          <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
          Coba prompt cepat:
        </span>
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleGenerate(p)}
            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5 transition-colors"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
