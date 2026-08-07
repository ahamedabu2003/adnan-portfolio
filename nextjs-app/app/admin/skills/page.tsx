'use client';

import { useState, useEffect } from 'react';

interface Skill {
  _id: string;
  name: string;
  percentage: number;
}

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const [name, setName] = useState('');
  const [percentage, setPercentage] = useState(80);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = () => {
    fetch('/api/admin/skills')
      .then((res) => res.json())
      .then((data) => {
        setSkills(data || []);
        setLoading(false);
      });
  };

  const openAddModal = () => {
    setEditingSkill(null);
    setName('');
    setPercentage(80);
    setModalOpen(true);
  };

  const openEditModal = (skill: Skill) => {
    setEditingSkill(skill);
    setName(skill.name);
    setPercentage(skill.percentage);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingSkill ? `/api/admin/skills/${editingSkill._id}` : '/api/admin/skills';
      const method = editingSkill ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, percentage }),
      });

      const data = await res.json();
      if (data.success) {
        fetchSkills();
        setModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    const res = await fetch(`/api/admin/skills/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      fetchSkills();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Skills Metrics</h2>
        <button onClick={openAddModal} className="px-4 py-2 rounded-lg btn-primary-theme text-sm flex items-center gap-2">
          <i className="bx bx-plus"></i> Add Skill
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#00abf0]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <div key={skill._id} className="admin-card p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-white tracking-wide">{skill.name}</span>
                <span className="text-sm font-bold text-[#00abf0]">{skill.percentage}%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2.5 mb-6">
                <div className="bg-[#00abf0] h-2.5 rounded-full" style={{ width: `${skill.percentage}%` }}></div>
              </div>
              <div className="flex justify-end gap-2 border-t border-white/5 pt-4">
                <button onClick={() => openEditModal(skill)} className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg"><i className="bx bx-edit text-lg"></i></button>
                <button onClick={() => handleDelete(skill._id)} className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg"><i className="bx bx-trash text-lg"></i></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="admin-card w-full max-w-md p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-lg font-bold text-white">{editingSkill ? 'Edit Skill' : 'Add Skill'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white text-xl"><i className="bx bx-x"></i></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Skill Name</label>
                <input
                  type="text" value={name} onChange={(e) => setName(e.target.value)} required
                  className="w-full px-4 py-3 rounded-lg text-sm border border-white/10 bg-[#112e42] text-white focus:outline-none focus:border-[#00abf0]"
                  placeholder="E.g. Laravel / React / TypeScript"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Proficiency Percentage</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range" min="0" max="100" value={percentage} onChange={(e) => setPercentage(Number(e.target.value))}
                    className="w-full accent-[#00abf0]"
                  />
                  <span className="text-sm font-bold text-white min-w-[3ch]">{percentage}%</span>
                </div>
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
