'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, Layout, Code, BookOpen, Globe, Server } from 'lucide-react';
import { PROFILE } from '@/data/projects';

export default function HeroSection() {
  const highlights = [
    { label: 'Webデザイン (UI/UX)', icon: Layout, color: 'from-pink-500 to-rose-500' },
    { label: 'Web開発 (Frontend)', icon: Code, color: 'from-indigo-500 to-cyan-500' },
    { label: 'Web開発 (Backend)', icon: Server, color: 'from-emerald-500 to-teal-500' },
    { label: 'DTP / 印刷編集', icon: BookOpen, color: 'from-purple-500 to-indigo-500' },
    { label: 'WordPressテーマ', icon: Globe, color: 'from-blue-500 to-cyan-500' },
  ];

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-950 text-white">
      {/* Background Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-purple-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            イムのポートフォリオ / Web & DTP & WordPress
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            デザインから開発・印刷・ <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              WordPress構築まで
            </span> 一貫対応！
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {PROFILE.subTitle}
          </p>

          {/* Discipline Badges - 5 Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2 max-w-4xl mx-auto">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-left hover:border-slate-700 transition-all"
                >
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${h.color} flex items-center justify-center text-white shrink-0`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-200 truncate">{h.label}</span>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold text-white shadow-lg shadow-purple-500/25 hover:from-indigo-600 hover:to-purple-700 transition-all hover:scale-[1.02]"
            >
              制作実績を見る
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 font-semibold text-slate-200 transition-all hover:scale-[1.02]"
            >
              お問い合わせ
            </a>
          </div>

          {/* Quick Features checklist */}
          <div className="flex flex-wrap justify-center items-center gap-6 pt-6 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Frontend & Backend 開発
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> ADOBE & Illustrator DTP編集
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> WordPressオリジナルテーマ制作
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
