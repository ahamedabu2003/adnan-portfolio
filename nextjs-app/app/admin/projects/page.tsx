'use client';

import { useState, useEffect } from 'react';

interface Project {
  _id: string;
  title: string;
  description: string;
  technology: string;
  image?: string;
  github_link?: string;
  live_link?: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technology, setTechnology] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  function fetchProjects() {
    fetch('/api/admin/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data || []);
        setLoading(false);
      });
  }

  const openAddModal = () => {
    setEditingProject(null);
    setTitle('');
    setDescription('');
    setTechnology('');
    setGithubLink('');
    setLiveLink('');
    setFile(null);
    setModalOpen(true);
  };

  const openEditModal = (proj: Project) => {
    setEditingProject(proj);
    setTitle(proj.title);
    setDescription(proj.description);
    setTechnology(proj.technology);
    setGithubLink(proj.github_link || '');
    setLiveLink(proj.live_link || '');
    setFile(null);
    setModalOpen(true);
  };

  const handleUpload = async () => {
    if (!file) return editingProject?.image || '';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'projects');
    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
    const data = await res.json();
    return data.url;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const imageUrl = await handleUpload();
      const payload = {
        title,
        description,
        technology,
        github_link: githubLink,
        live_link: liveLink,
        image: imageUrl,
      };

      const url = editingProject ? `/api/admin/projects/${editingProject._id}` : '/api/admin/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        fetchProjects();
        setModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      fetchProjects();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Projects List</h2>
        <button onClick={openAddModal} className="px-4 py-2 rounded-lg btn-primary-theme text-sm flex items-center gap-2">
          <i className="bx bx-plus"></i> Add Project
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#00abf0]"></div>
        </div>
      ) : (
        <div className="admin-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-900/40">
                  <th className="px-6 py-4 font-semibold text-slate-400">Thumbnail</th>
                  <th className="px-6 py-4 font-semibold text-slate-400">Title</th>
                  <th className="px-6 py-4 font-semibold text-slate-400">Technologies</th>
                  <th className="px-6 py-4 font-semibold text-slate-400">Links</th>
                  <th className="px-6 py-4 font-semibold text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projects.map((proj) => (
                  <tr key={proj._id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-4">
                      {proj.image ? (
                        <img src={proj.image} alt={proj.title} className="w-16 h-10 object-cover rounded-lg border border-white/10" />
                      ) : (
                        <div className="w-16 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-600"><i className="bx bx-image"></i></div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">{proj.title}</td>
                    <td className="px-6 py-4 text-cyan-400">{proj.technology}</td>
                    <td className="px-6 py-4 space-x-3">
                      {proj.github_link && <a href={proj.github_link} target="_blank" className="text-slate-400 hover:text-white"><i className="bx bxl-github text-lg"></i></a>}
                      {proj.live_link && <a href={proj.live_link} target="_blank" className="text-[#00abf0] hover:underline"><i className="bx bx-link-external text-lg"></i></a>}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => openEditModal(proj)} className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg"><i className="bx bx-edit text-lg"></i></button>
                      <button onClick={() => handleDelete(proj._id)} className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg"><i className="bx bx-trash text-lg"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="admin-card w-full max-w-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-lg font-bold text-white">{editingProject ? 'Edit Project' : 'Add Project'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white text-xl"><i className="bx bx-x"></i></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Title</label>
                  <input
                    type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
                    className="w-full px-4 py-3 rounded-lg text-sm border border-white/10 bg-[#112e42] text-white focus:outline-none focus:border-[#00abf0]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Technologies (comma separated)</label>
                  <input
                    type="text" value={technology} onChange={(e) => setTechnology(e.target.value)} required
                    placeholder="E.g. Laravel, React, Tailwind"
                    className="w-full px-4 py-3 rounded-lg text-sm border border-white/10 bg-[#112e42] text-white focus:outline-none focus:border-[#00abf0]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Description</label>
                <textarea
                  value={description} onChange={(e) => setDescription(e.target.value)} required rows={4}
                  className="w-full px-4 py-3 rounded-lg text-sm border border-white/10 bg-[#112e42] text-white focus:outline-none focus:border-[#00abf0] resize-none"
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Github Link</label>
                  <input
                    type="url" value={githubLink} onChange={(e) => setGithubLink(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg text-sm border border-white/10 bg-[#112e42] text-white focus:outline-none focus:border-[#00abf0]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Live Demo Link</label>
                  <input
                    type="url" value={liveLink} onChange={(e) => setLiveLink(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg text-sm border border-white/10 bg-[#112e42] text-white focus:outline-none focus:border-[#00abf0]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Project Image</label>
                <input
                  type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-slate-400 mt-2"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 text-sm">Cancel</button>
                <button type="submit" disabled={saving} className="px-5 py-2.5 rounded-lg btn-primary-theme text-sm disabled:opacity-60">{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
