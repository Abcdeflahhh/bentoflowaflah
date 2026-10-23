export type CardSize = "1x1" | "2x1" | "1x2" | "2x2";

export type CardType =
  | "profile"
  | "link"
  | "social"
  | "github"
  | "project"
  | "map"
  | "spotify"
  | "quote"
  | "stats";

export type ThemeId =
  | "dark-minimal"
  | "cyberpunk"
  | "retro-warm"
  | "clean-light"
  | "midnight-violet";

export interface BentoCard {
  id: string;
  type: CardType;
  size: CardSize;
  title: string;
  subtitle?: string;
  description?: string;
  url?: string;
  icon?: string;
  imageUrl?: string;
  badge?: string;
  metrics?: {
    label: string;
    value: string | number;
  };
  styles?: {
    gradient?: string;
    bgOpacity?: string;
  };
}

export interface BentoProfile {
  username: string;
  name: string;
  headline: string;
  bio: string;
  avatarUrl: string;
  location: string;
  availableForHire: boolean;
  theme: ThemeId;
  cards: BentoCard[];
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    website?: string;
    email?: string;
  };
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  background: string;
  cardBg: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentGlow: string;
  bgHex: string;
}
