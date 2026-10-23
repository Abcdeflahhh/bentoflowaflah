"use client";

import React, { useState, useEffect } from "react";
import { BentoProfile } from "@/types/bento";
import { X, User, MapPin, Mail, Sparkles, Globe } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterXIcon, InstagramIcon, GlobeIcon } from "./icons";

interface ProfileModalProps {
  isOpen: boolean;
  profile: BentoProfile;
  onClose: () => void;
  onSave: (updated: Partial<BentoProfile>) => void;
}

export function ProfileModal({
  isOpen,
  profile,
  onClose,
  onSave,
}: ProfileModalProps) {
  const [name, setName] = useState(profile.name);
  const [headline, setHeadline] = useState(profile.headline);
  const [bio, setBio] = useState(profile.bio);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [location, setLocation] = useState(profile.location);
  const [availableForHire, setAvailableForHire] = useState(profile.availableForHire);
  const [github, setGithub] = useState(profile.socialLinks.github || "");
  const [linkedin, setLinkedin] = useState(profile.socialLinks.linkedin || "");
  const [twitter, setTwitter] = useState(profile.socialLinks.twitter || "");
  const [instagram, setInstagram] = useState(profile.socialLinks.instagram || "");
  const [website, setWebsite] = useState(profile.socialLinks.website || "");
  const [email, setEmail] = useState(profile.socialLinks.email || "");

  useEffect(() => {
    if (isOpen) {
      setName(profile.name);
      setHeadline(profile.headline);
      setBio(profile.bio);
      setAvatarUrl(profile.avatarUrl);
      setLocation(profile.location);
      setAvailableForHire(profile.availableForHire);
      setGithub(profile.socialLinks.github || "");
      setLinkedin(profile.socialLinks.linkedin || "");
      setTwitter(profile.socialLinks.twitter || "");
      setInstagram(profile.socialLinks.instagram || "");
      setWebsite(profile.socialLinks.website || "");
      setEmail(profile.socialLinks.email || "");
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      headline,
      bio,
      avatarUrl,
      location,
      availableForHire,
      socialLinks: {
        github,
        linkedin,
        twitter,
        instagram,
        website,
        email,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#121216] border border-white/10 p-6 sm:p-8 shadow-2xl text-zinc-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-400" />
            <h3 className="text-xl font-bold tracking-tight">Edit Profil Pribadi</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">
              Headline / Jabatan
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Contoh: Full-Stack Developer & CS Undergrad"
              className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">
              Bio Singkat
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tuliskan latar belakang dan minat Anda..."
              className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Lokasi
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Indonesia"
                  className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                URL Foto Profil (Avatar)
              </label>
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-white/10">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Sosial Media & Kontak
            </h4>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1 flex items-center gap-1.5">
                <GithubIcon className="w-3.5 h-3.5" /> URL GitHub
              </label>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/Abcdeflahhh"
                className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1 flex items-center gap-1.5">
                <LinkedinIcon className="w-3.5 h-3.5" /> URL LinkedIn
              </label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1 flex items-center gap-1.5">
                <InstagramIcon className="w-3.5 h-3.5" /> URL Instagram
              </label>
              <input
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="https://instagram.com/username"
                className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1 flex items-center gap-1.5">
                <TwitterXIcon className="w-3.5 h-3.5" /> URL Twitter / X
              </label>
              <input
                type="url"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="https://x.com/username"
                className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1 flex items-center gap-1.5">
                <GlobeIcon className="w-3.5 h-3.5" /> Website Portofolio Pribadi
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://bentoflowaflah.vercel.app"
                className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@anda.com"
                className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-2xl bg-white/5 border border-white/10">
              <input
                type="checkbox"
                checked={availableForHire}
                onChange={(e) => setAvailableForHire(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-xs font-medium">
                Tampilkan badge status &quot;Tersedia untuk Magang / Kerja&quot;
              </span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
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
              Simpan Profil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
