'use client';

import React from 'react';
import { Project } from '@/data/projects';
import { X, ExternalLink, FileText, Calendar, UserCheck, Wrench, CheckCircle2 } from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      {/* Overlay backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-y-auto z-10 text-white scrollbar-thin">
        {/* Header bar */}
        <div className="sticky top-0 bg-slate-900/90 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between z-20">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-1">
              {project.categoryLabel}
            </span>
            <h3 className="text-xl font-bold text-slate-100">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Image Thumbnail */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800 border border-slate-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Meta Info Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-800/80 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
              <span><strong>作業期間:</strong> {project.period}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <UserCheck className="w-4 h-4 text-indigo-400 shrink-0" />
              <span><strong>担当役割:</strong> {project.role}</span>
            </div>
          </div>

          {/* Subtitle & Description */}
          <div>
            <h4 className="text-sm font-semibold text-purple-300 mb-2">{project.subtitle}</h4>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Tools & Technologies */}
          {project.tools && project.tools.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3 flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-purple-400" /> 使用技術・ツール
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3">主な実績・特徴</h4>
              <ul className="space-y-2">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* External Links */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800">
            {project.demoUrl && project.demoUrl.trim() !== '' && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                ライブデモ・サイトを見る
              </a>
            )}
            {project.githubUrl && project.githubUrl.trim() !== '' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                GitHubソースコード
              </a>
            )}
            {project.pdfUrl && project.pdfUrl.trim() !== '' && (
              <a
                href={project.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-xs font-semibold text-white transition-colors"
              >
                <FileText className="w-4 h-4" />
                DTPサンプルPDFを見る
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
