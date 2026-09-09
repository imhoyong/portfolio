'use client';

import React, { useState, useEffect } from 'react';
import { Project, CATEGORIES } from '@/data/projects';
import { Plus, Edit2, Trash2, ArrowLeft, Search, Save, X, ExternalLink, Image as ImageIcon, Sparkles, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'web-design' as 'web-design' | 'web-dev' | 'dtp' | 'wordpress',
    categoryLabel: 'Webデザイン',
    subtitle: '',
    description: '',
    longDescription: '',
    role: '',
    period: '',
    toolsInput: '',
    featuresInput: '',
    thumbnail: '',
    demoUrl: '',
    githubUrl: '',
    pdfUrl: '',
  });

  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load Projects from API Route
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const getCategoryLabel = (catId: string) => {
    switch (catId) {
      case 'web-design':
        return 'Webデザイン';
      case 'web-dev':
        return 'Web開発';
      case 'dtp':
        return 'DTP / 印刷編集';
      case 'wordpress':
        return 'WordPressテーマ';
      default:
        return 'Webデザイン';
    }
  };

  const handleOpenAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      category: 'web-design',
      categoryLabel: 'Webデザイン',
      subtitle: '',
      description: '',
      longDescription: '',
      role: 'UI/UXデザイン 100%',
      period: '2024.01 - 2024.03',
      toolsInput: 'Figma, HTML5, CSS3',
      featuresInput: 'レスポンシブWebデザイン対応\nデザインシステム構築',
      thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      demoUrl: '',
      githubUrl: '',
      pdfUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      categoryLabel: project.categoryLabel || getCategoryLabel(project.category),
      subtitle: project.subtitle || '',
      description: project.description || '',
      longDescription: project.longDescription || '',
      role: project.role || '',
      period: project.period || '',
      toolsInput: project.tools ? project.tools.join(', ') : '',
      featuresInput: project.features ? project.features.join('\n') : '',
      thumbnail: project.thumbnail || '',
      demoUrl: project.demoUrl || '',
      githubUrl: project.githubUrl || '',
      pdfUrl: project.pdfUrl || '',
    });
    setIsModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const tools = formData.toolsInput.split(',').map((t) => t.trim()).filter(Boolean);
    const features = formData.featuresInput.split('\n').map((f) => f.trim()).filter(Boolean);

    const projectPayload = {
      title: formData.title,
      category: formData.category,
      categoryLabel: getCategoryLabel(formData.category),
      subtitle: formData.subtitle,
      description: formData.description,
      longDescription: formData.longDescription,
      role: formData.role,
      period: formData.period,
      tools,
      features,
      thumbnail: formData.thumbnail || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      demoUrl: formData.demoUrl.trim(),
      githubUrl: formData.githubUrl.trim(),
      pdfUrl: formData.pdfUrl.trim(),
    };

    try {
      if (editingProject) {
        // Update existing project
        const res = await fetch('/api/projects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingProject.id, ...projectPayload }),
        });
        if (res.ok) {
          setStatusMessage({ type: 'success', text: 'プロジェクトが更新されました。' });
        } else {
          setStatusMessage({ type: 'error', text: '更新に失敗しました。' });
        }
      } else {
        // Add new project
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectPayload),
        });
        if (res.ok) {
          setStatusMessage({ type: 'success', text: '新規プロジェクトを追加しました。' });
        } else {
          setStatusMessage({ type: 'error', text: '追加に失敗しました。' });
        }
      }
      setIsModalOpen(false);
      fetchProjects();
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: 'error', text: '通信エラーが発生しました。' });
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`「${title}」を削除してもよろしいですか？`)) return;

    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setStatusMessage({ type: 'success', text: 'プロジェクトを削除しました。' });
        fetchProjects();
      } else {
        setStatusMessage({ type: 'error', text: '削除に失敗しました。' });
      }
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-semibold mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> ポートフォリオサイトへ戻る
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              ポートフォリオ実績管理画面 <Sparkles className="w-5 h-5 text-purple-400" />
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Webデザイン、Web開発、DTP、WordPressなどの実績データの追加・編集・削除を行えます。
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold text-xs text-white shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" /> 新規実績を登録
          </button>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div
            className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            {statusMessage.text}
          </div>
        )}

        {/* Search Bar */}
        <div className="flex items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="プロジェクトタイトル検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            登録件数: <strong className="text-purple-300">{filteredProjects.length}</strong> 件
          </span>
        </div>

        {/* Projects List */}
        {loading ? (
          <div className="text-center py-16 text-slate-400 text-sm">データを読み込み中...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-400 text-sm">
            該当するプロジェクトがありません。
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all space-y-4"
              >
                <div>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800 mb-3 border border-slate-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 text-purple-300 border border-slate-700">
                      {project.categoryLabel}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-100 line-clamp-1">{project.title}</h3>
                  <p className="text-xs text-purple-300 mt-0.5 line-clamp-1 font-medium">{project.subtitle}</p>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">{project.description}</p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.tools?.slice(0, 3).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Active Link Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-3 text-[10px]">
                    {project.demoUrl && project.demoUrl.trim() !== '' && (
                      <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        Web/Demo
                      </span>
                    )}
                    {project.githubUrl && project.githubUrl.trim() !== '' && (
                      <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        GitHub
                      </span>
                    )}
                    {project.pdfUrl && project.pdfUrl.trim() !== '' && (
                      <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
                        PDF
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                    <button
                      onClick={() => handleOpenEditModal(project)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-indigo-400" /> 編集
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id, project.title)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-xs font-semibold text-rose-300 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> 削除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Dialog for Add / Edit */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-y-auto z-10 text-white scrollbar-thin">
              <div className="sticky top-0 bg-slate-900/90 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between z-20">
                <h3 className="text-lg font-bold text-slate-100">
                  {editingProject ? '実績の編集 (Edit Project)' : '新規実績の追加 (Add Project)'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">プロジェクトタイトル *</label>
                  <input
                    type="text"
                    required
                    placeholder="例: ECサイト レスポンシブWeb UI/UXデザイン"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">カテゴリー選択 *</label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as any,
                          categoryLabel: getCategoryLabel(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="web-design">Webデザイン (Web Design)</option>
                      <option value="web-dev">Web開発 (Web Dev)</option>
                      <option value="dtp">DTP / 印刷編集</option>
                      <option value="wordpress">WordPressテーマ</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">作業期間 (Period)</label>
                    <input
                      type="text"
                      placeholder="例: 2024.03 - 2024.05"
                      value={formData.period}
                      onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">サブタイトル (キャッチコピー)</label>
                  <input
                    type="text"
                    placeholder="例: ユーザービリティを重視したモダンなUI設計"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">概要説明 (Short Description)</label>
                  <textarea
                    rows={2}
                    placeholder="カード一覧で表示される簡潔な概要説明"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">詳細説明 (Long Description)</label>
                  <textarea
                    rows={4}
                    placeholder="ポップアップ詳細モーダルで表示される詳しい背景および制作内容"
                    value={formData.longDescription}
                    onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">担当役割 (Role)</label>
                    <input
                      type="text"
                      placeholder="例: UI/UXデザイン 100%"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">使用技術・ツール (カンマ区切り)</label>
                    <input
                      type="text"
                      placeholder="Figma, Next.js, TypeScript, InDesign"
                      value={formData.toolsInput}
                      onChange={(e) => setFormData({ ...formData, toolsInput: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">主要成果・特徴 (改行区切り)</label>
                  <textarea
                    rows={3}
                    placeholder="例: コンポーネントベースのデザインシステム作成&#10;Lighthouse Performance 98点達成"
                    value={formData.featuresInput}
                    onChange={(e) => setFormData({ ...formData, featuresInput: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">サムネイル画像 URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Web/デモURL (任意)</label>
                    <input
                      type="text"
                      placeholder="https://example.com"
                      value={formData.demoUrl}
                      onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">GitHub URL (任意)</label>
                    <input
                      type="text"
                      placeholder="https://github.com/..."
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">PDF URL (DTP任意)</label>
                    <input
                      type="text"
                      placeholder="https://example.com/sample.pdf"
                      value={formData.pdfUrl}
                      onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                  >
                    キャンセル
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white shadow-md"
                  >
                    <Save className="w-4 h-4" /> 保存する
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
