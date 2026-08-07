'use client';

import { useState, useEffect } from 'react';

interface Experience {
  _id: string;
  company: string;
  designation: string;
  duration: string;
  description: string;
}

export default function AdminExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);

  const [company, setCompany] = useState('');
  const [designation, setDesignation] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = () => {
    fetch('/api/admin/experiences')
      .then((res) => res.json())
      .then((data) => {
        setExperiences(data || []);
        setLoading(false);
      });
  };

  const openAddModal = () => {
    setEditingExp(null);
    setCompany('');
    setDesignation('');
    setDuration('');
    setDescription('');
    setModalOpen(true);
  };

  const openEditModal = (exp: Experience) => {
    setEditingExp(exp);
    setCompany(exp.company);
    setDesignation(exp.designation);
    setDuration(exp.duration);
    setDescription(exp.description);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingExp ? `/api/admin/experiences/${editingExp._id}` : '/api/admin/experiences';
      const method = editingExp ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, designation, duration, description }),
      });

      const data = await res.json();
      if (data.success) {
        fetchExperiences();
        setModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    const res = await fetch(`/api/admin/experiences/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      fetchExperiences();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Work History</h2>
        <button onClick={openAddModal} className="px-4 py-2 rounded-lg btn-primary-theme text-sm flex items-center gap-2">
          <i className="bx bx-plus"></i> Add Experience
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
                  <th className="px-6 py-4 font-semibold text-slate-400">Duration</th>
                  <th className="px-6 py-4 font-semibold text-slate-400">Role & Company</th>
                  <th className="px-6 py-4 font-semibold text-slate-400">Description</th>
                  <th className="px-6 py-4 font-semibold text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {experiences.map((exp) => (
                  <tr key={exp._id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-4 text-cyan-400 whitespace-nowrap">{exp.duration}</td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-white">{exp.designation}</p>
                      <p className="text-xs text-slate-400">{exp.company}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-300 max-w-xs truncate">{exp.description}</td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      <button onClick={() => openEditModal(exp)} className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg"><i className="bx bx-edit text-lg"></i></button>
                      <button onClick={() => handleDelete(exp._id)} className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg"><i className="bx bx-trash text-lg"></i></button>
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
          <div className="admin-card w-full max-w-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-lg font-bold text-white">{editingExp ? 'Edit Experience' : 'Add Experience'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white text-xl"><i className="bx bx-x"></i></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Company Name</label>
                  <input
                    type="text" value={company} onChange={(e) => setCompany(e.target.value)} required
                    className="w-full px-4 py-3 rounded-lg text-sm border border-white/10 bg-[#112e42] text-white focus:outline-none focus:border-[#00abf0]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Role/Designation</label>
                  <input
                    type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} required
                    className="w-full px-4 py-3 rounded-lg text-sm border border-white/10 bg-[#112e42] text-white focus:outline-none focus:border-[#00abf0]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Duration (e.g. 2022 - Present)</label>
                <input
                  type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required
                  className="w-full px-4 py-3 rounded-lg text-sm border border-white/10 bg-[#112e42] text-white focus:outline-none focus:border-[#00abf0]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Description</label>
                <textarea
                  value={description} onChange={(e) => setDescription(e.target.value)} required rows={4}
                  className="w-full px-4 py-3 rounded-lg text-sm border border-white/10 bg-[#112e42] text-white focus:outline-none focus:border-[#00abf0] resize-none"
                ></textarea>
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
