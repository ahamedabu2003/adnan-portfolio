'use client';

import { useState, useEffect } from 'react';

interface Cv {
  _id: string;
  file_path: string;
  original_name: string;
  createdAt: string;
}

export default function AdminCvs() {
  const [cv, setCv] = useState<Cv | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchCv();
  }, []);

  const fetchCv = () => {
    fetch('/api/admin/cvs')
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setCv(data);
        } else {
          setCv(null);
        }
        setLoading(false);
      });
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setMsg({ type: '', text: '' });

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'cvs');

      // Upload file to storage
      const uploadRes = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        throw new Error(uploadData.error || 'Upload failed');
      }

      // Save CV details to database
      const res = await fetch('/api/admin/cvs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file_path: uploadData.url,
          original_name: uploadData.original_name,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMsg({ type: 'success', text: 'CV uploaded and updated successfully.' });
        fetchCv();
        setFile(null);
      } else {
        setMsg({ type: 'error', text: data.error || 'Failed to update CV record' });
      }
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Error uploading file' });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete the current CV?')) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/cvs', { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setMsg({ type: 'success', text: 'CV deleted successfully.' });
        setCv(null);
      }
    } catch {
      setMsg({ type: 'error', text: 'Failed to delete CV.' });
    } finally {
      setLoading(false);
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
    <div className="admin-card p-6 md:p-8 max-w-2xl">
      <h2 className="text-xl font-bold text-white mb-6">Manage CV / Resume</h2>

      {msg.text && (
        <div className={`mb-6 p-4 rounded-lg text-sm ${msg.type === 'success' ? 'bg-emerald-950/50 border border-emerald-800 text-emerald-400' : 'bg-rose-950/50 border border-rose-800 text-rose-400'}`}>
          {msg.text}
        </div>
      )}

      {cv ? (
        <div className="bg-[#112e42] border border-white/5 rounded-xl p-6 mb-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center text-3xl">
                <i className="bx bxs-file-pdf"></i>
              </div>
              <div>
                <p className="font-semibold text-white truncate max-w-md">{cv.original_name}</p>
                <p className="text-xs text-slate-400 mt-1">Uploaded on: {new Date(cv.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href={cv.file_path} download={cv.original_name}
                className="p-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors flex items-center justify-center"
                title="Download file"
              >
                <i className="bx bx-download text-lg"></i>
              </a>
              <button
                onClick={handleDelete}
                className="p-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg transition-colors flex items-center justify-center"
                title="Delete CV"
              >
                <i className="bx bx-trash text-lg"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-white/10 rounded-xl p-8 text-center text-slate-400 mb-8 bg-slate-900/10">
          <i className="bx bxs-file-pdf text-5xl text-slate-600 mb-3"></i>
          <p className="text-sm">No CV uploaded yet. Upload a PDF/Document to let visitors download it.</p>
        </div>
      )}

      <form onSubmit={handleUpload} className="space-y-4 pt-6 border-t border-white/5">
        <div>
          <label className="block text-xs uppercase tracking-widest text-slate-400 mb-3">Upload New CV (PDF / DOCX)</label>
          <input
            type="file" accept=".pdf,.doc,.docx" required onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/10 file:text-[#00abf0] hover:file:bg-cyan-500/20"
          />
        </div>
        <button
          type="submit" disabled={uploading || !file}
          className="w-full py-3 rounded-lg btn-primary-theme text-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload CV'}
        </button>
      </form>
    </div>
  );
}
