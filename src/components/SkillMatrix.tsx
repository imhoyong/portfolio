'use client';

import React from 'react';
import { SKILL_CATEGORIES } from '@/data/projects';
import { Layout, Code, BookOpen, Globe, Server, Check } from 'lucide-react';

export default function SkillMatrix() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-6 h-6 text-pink-400" />;
      case 'Code':
        return <Code className="w-6 h-6 text-indigo-400" />;
      case 'Server':
        return <Server className="w-6 h-6 text-emerald-400" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-purple-400" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-cyan-400" />;
      default:
        return <Code className="w-6 h-6 text-indigo-400" />;
    }
  };

  const getGradient = (index: number) => {
    const gradients = [
      'from-pink-500/10 to-rose-500/5 border-pink-500/20 hover:border-pink-500/40',
      'from-indigo-500/10 to-cyan-500/5 border-indigo-500/20 hover:border-indigo-500/40',
      'from-emerald-500/10 to-teal-500/5 border-emerald-500/20 hover:border-emerald-500/40',
      'from-purple-500/10 to-indigo-500/5 border-purple-500/20 hover:border-purple-500/40',
      'from-cyan-500/10 to-blue-500/5 border-cyan-500/20 hover:border-cyan-500/40',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section id="skills" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-bold text-purple-400 mb-2">Core Competencies</h2>
          <p className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            5つのコアスキルセット
          </p>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            デザイン企画からフロント・バックエンド開発、DTP印刷出版物制作、WordPressテーマ開発まで幅広く対応可能です。
          </p>
        </div>

        {/* 5-Column Matrix Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SKILL_CATEGORIES.map((category, idx) => (
            <div
              key={category.name}
              className={`rounded-2xl bg-gradient-to-b ${getGradient(idx)} p-5 border transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between`}
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center mb-4">
                  {getIcon(category.icon || (idx === 2 ? 'Server' : 'Code'))}
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-2 leading-snug">{category.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-5">
                  {category.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">主な使用ツール & 技術</h4>
                <ul className="space-y-1.5">
                  {category.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="w-3.5 h-3.5 rounded-full bg-slate-800 flex items-center justify-center text-purple-400 shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                      <span className="truncate">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
