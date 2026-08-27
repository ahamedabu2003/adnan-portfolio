'use client';

import { useState, useEffect } from 'react';

interface About {
  name?: string;
  title: string;
  description: string;
  image?: string;
}

export default function AdminAbout() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    fetch('/api/admin/about')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setAbout(data);
          setName(data.name || '');
          setTitle(data.title || '');
          setDescription(data.description || '');
          setImage(data.image || '');
        }
        setLoading(false);
      });
  }, []);

  const handleUpload = async () => {
    if (!file) return image;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'about');
    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
    const data = await res.json();
    return data.url;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg({ type: '', text: '' });

    try {
      const imageUrl = await handleUpload();
      const res = await fetch('/api/admin/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, title, description, image: imageUrl }),
      });
      const data = await res.json();
      if (data.success) {
        setMsg({ type: 'success', text: 'About section updated successfully.' });
        setAbout({ name, title, description, image: imageUrl });
        setImage(imageUrl);
      } else {
        setMsg({ type: 'error', text: data.error || 'Failed to update' });
      }
    } catch {
      setMsg({ type: 'error', text: 'Error saving changes' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#00abf0]"></div>
      </div>
    );
  }

  return (
    <div className="admin-card p-6 md:p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-white">About Section Details</h2>
      </div>

      {msg.text && (
        <div className={`mb-6 p-4 rounded-lg text-sm ${msg.type === 'success' ? 'bg-emerald-950/50 border border-emerald-800 text-emerald-400' : 'bg-rose-950/50 border border-rose-800 text-rose-400'}`}>
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Image preview & Upload */}
          <div className="space-y-4">
            <label className="block text-xs uppercase tracking-widest text-slate-400">Section Image</label>
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-white/10 flex items-center justify-center">
              {file ? (
                <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
              ) : image ? (
                <img src={image} alt="Current About" className="w-full h-full object-cover" />
              ) : (
                <i className="bx bx-image text-5xl text-slate-600"></i>
              )}
            </div>
            <input
              type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/10 file:text-[#00abf0] hover:file:bg-cyan-500/20"
            />
          </div>

          {/* Right: Inputs */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Your Full Name</label>
              <input
                type="text" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-sm border border-white/10 bg-[#112e42] text-white focus:outline-none focus:border-[#00abf0] focus:ring-1 focus:ring-[#00abf0]/30 transition-all"
                placeholder="E.g. Ahamed Aboo Adnan"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Display Title</label>
              <input
                type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
                className="w-full px-4 py-3 rounded-lg text-sm border border-white/10 bg-[#112e42] text-white focus:outline-none focus:border-[#00abf0] focus:ring-1 focus:ring-[#00abf0]/30 transition-all"
                placeholder="E.g. Backend Developer & Solutions Architect"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Description</label>
              <textarea
                value={description} onChange={(e) => setDescription(e.target.value)} required rows={8}
                className="w-full px-4 py-3 rounded-lg text-sm border border-white/10 bg-[#112e42] text-white focus:outline-none focus:border-[#00abf0] focus:ring-1 focus:ring-[#00abf0]/30 transition-all resize-none"
                placeholder="Write your professional bio..."
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-white/5">
          <button
            type="submit" disabled={saving}
            className="px-6 py-3 rounded-lg btn-primary-theme text-sm flex items-center gap-2 disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
