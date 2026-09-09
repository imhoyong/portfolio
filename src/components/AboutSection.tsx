'use client';

import React from 'react';
import { PROFILE } from '@/data/projects';
import { Award, MapPin, Mail, Sparkles, Layers, Phone } from 'lucide-react';

export default function AboutSection() {
  const workflowSteps = [
    { step: '01', title: '企画 & リサーチ', desc: '課題分析およびターゲット層に合わせた制作戦略立案' },
    { step: '02', title: 'UI/UX & DTPデザイン', desc: 'FigmaプロトタイプおよびInDesign組版システム構築' },
    { step: '03', title: 'コーディング & 構築', desc: 'Next.js / React / Vue.js開発およびWordPress PHP独自構築' },
    { step: '04', title: '検証 & 入稿/公開', desc: 'Lighthouse SEO最適化およびCMYK校正・本番公開' },
  ];

  return (
    <section id="about" className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" /> About Me
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-100">
            プロフィール概要 (Profile)
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {PROFILE.bio}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-800 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-purple-400 shrink-0" />
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">居住地 / 勤務地</span>
              <span className="text-xs font-semibold text-slate-200">{PROFILE.location}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-800 flex items-center gap-3">
            <Mail className="w-5 h-5 text-indigo-400 shrink-0" />
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">メール</span>
              <span className="text-xs font-semibold text-slate-200 truncate block max-w-[160px]" title={PROFILE.email}>
                {PROFILE.email}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-800 flex items-center gap-3">
            <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">電話番号</span>
              <span className="text-xs font-semibold text-slate-200">{PROFILE.phone}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-800 flex items-center gap-3">
            <Award className="w-5 h-5 text-pink-400 shrink-0" />
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">実務経験</span>
              <span className="text-xs font-semibold text-slate-200">{PROFILE.yearsOfExperience}</span>
            </div>
          </div>
        </div>

        {/* Workflow Process */}
        <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-800">
          <h3 className="text-base font-bold text-slate-100 mb-6 flex items-center justify-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" /> 制作プロセス (Design to Development Process)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflowSteps.map((w) => (
              <div key={w.step} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <span className="text-xs font-bold text-purple-400 block mb-1">{w.step}</span>
                <h4 className="text-sm font-semibold text-slate-200 mb-1">{w.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
