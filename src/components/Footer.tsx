'use client';

import React from 'react';
import { ArrowUp, Code2 } from 'lucide-react';
import { PROFILE } from '@/data/projects';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 py-10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Code2 className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-200">{PROFILE.name} Portfolio</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Web Design, Dev, DTP & WordPress</span>
        </div>

        {/* Copyright */}
        <p className="text-center sm:text-left text-slate-500">
          © {new Date().getFullYear()} {PROFILE.name}. All rights reserved. Built with Next.js & Tailwind CSS.
        </p>

        {/* Scroll Top Button */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all flex items-center gap-1.5"
          aria-label="ページ上部へ戻る"
        >
          <span>Top</span>
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
