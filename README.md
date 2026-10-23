# 🍱 BentoFlow — AI-Powered Bento Grid Portfolio Builder

> **A modern, aesthetic, and dynamic Bento Grid portfolio builder crafted with Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion, and AI Copilot.**

Designed and developed by **Aflah Athallah** — a **Semester 5 Computer Science (Teknik Informatika) student** exploring the intersection of **Design Engineering**, **Full-Stack Development**, and **AI-augmented ("vibe") coding**.

---

## ✨ Key Features & Capabilities

- **🍱 Modular Bento Grid System**: Flexible layout supporting `1x1`, `2x1`, `1x2`, and `2x2` card dimensions.
- **🔄 Drag-and-Drop Spasial**: Smooth real-time sorting and reordering powered by `@dnd-kit/core` and `@dnd-kit/sortable`.
- **⚡ AI Copilot Vibe Generator**: Natural-language prompt bar that dynamically generates personas (Backend Architect, AI Engineer, Mobile Flutter Specialist, Cyberpunk Hacker, Warm Minimalist) and synthesizes matching color themes and recommended cards.
- **🎨 5 Curated Aesthetic Themes**:
  - `Dark Minimal` (Vercel / Apple clean aesthetic)
  - `Midnight Violet` (Linear / Raycast obsidian glow)
  - `Cyber Neon` (High-contrast tech cyberpunk)
  - `Warm Amber` (Warm editorial retro tones)
  - `Clean Light` (Airy high-contrast light mode)
- **⚡ Quick Card Presets & Duplication**: Instant 1-click presets for Projects, GitHub Live Stats, Spotify animated waveform cards, Academic GPA stats, Quotes, and Location. Instant 1-click card duplication for rapid building.
- **🐙 Live GitHub REST API Integration**: Pulls real-time public repositories and follower metrics dynamically for any GitHub username.
- **💾 Auto-Save & JSON Backup / Restore**: Auto-persists layout into `localStorage`, with one-click JSON configuration export and import.
- **📸 Theme-Aware PNG Image Export**: Exports high-resolution 95% quality PNG screenshots matching the exact active theme background for sharing to LinkedIn, Twitter/X, or Instagram.
- **👁️ Public Preview Mode**: Instant toggle between interactive drag-and-drop editor mode and clean public showcase view with a floating quick-return helper.
- **🔗 Share & Copy**: Instant clipboard sharing for recruiters and collaborators.

---

## 🛠️ Tech Stack & Engineering Highlights

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) + React 19 |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict mode, zero `any`) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) + Custom Glassmorphism, Geist Sans font & Micro-animations |
| **Interactions** | `@dnd-kit` (Drag & drop) + `framer-motion` |
| **Export Engine** | `html-to-image` (Canvas PNG rendering) |
| **Icons** | `lucide-react` + Custom SVG brand icons (GitHub, LinkedIn, Spotify, Instagram, Twitter/X) |
| **AI Integration** | Generative Persona & Theme Assistant |

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/Abcdeflahhh/bentoflow.git
cd bentoflow
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🎓 Academic & Portfolio Relevance

This project demonstrates core competencies taught in Computer Science degrees and expected in modern tech internships (MSIB / Software Engineer Intern):
1. **Human-Computer Interaction (HCI / UI-UX)**: Bento UI paradigm, accessible drag-and-drop mechanics, contrast-verified color palettes, tactile sound bar animations.
2. **Software Architecture**: Component-driven architecture, modular state flow, separation of concerns, serialization/deserialization for backup.
3. **Advanced Web Engineering**: Next.js App Router, Client vs Server component optimization, TypeScript interfaces, Next.js Turbopack compiler.

---

## 📝 License
MIT © 2026 Aflah Athallah. Built with passion, code, and curiosity.
