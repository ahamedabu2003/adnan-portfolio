'use client';

import { useState, useEffect } from 'react';

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    fetch('/api/admin/messages')
      .then((res) => res.json())
      .then((data) => {
        setMessages(data || []);
        setLoading(false);
      });
  };

  const handleOpenMessage = async (msg: ContactMessage) => {
    setSelectedMsg(msg);
    setModalOpen(true);

    // Mark as read in list UI immediately
    if (!msg.read) {
      setMessages((prev) =>
        prev.map((m) => (m._id === msg._id ? { ...m, read: true } : m))
      );
      // Call endpoint to update DB read status
      await fetch(`/api/admin/messages/${msg._id}`);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering row click to open message
    if (!confirm('Are you sure you want to delete this message?')) return;

    const res = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      fetchMessages();
      if (selectedMsg?._id === id) {
        setModalOpen(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Contact Messages</h2>
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
                  <th className="px-6 py-4 font-semibold text-slate-400">Status</th>
                  <th className="px-6 py-4 font-semibold text-slate-400">From</th>
                  <th className="px-6 py-4 font-semibold text-slate-400">Email & Mobile</th>
                  <th className="px-6 py-4 font-semibold text-slate-400">Snippet</th>
                  <th className="px-6 py-4 font-semibold text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {messages.length > 0 ? (
                  messages.map((msg) => (
                    <tr
                      key={msg._id}
                      onClick={() => handleOpenMessage(msg)}
                      className={`cursor-pointer hover:bg-white/[0.02] transition-colors ${!msg.read ? 'font-semibold text-white' : 'text-slate-300'}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {!msg.read ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400">
                            Unread
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-500/10 text-slate-400">
                            Read
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{msg.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400">
                        <div>{msg.email}</div>
                        <div className="mt-0.5">{msg.mobile}</div>
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate">{msg.message}</td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => handleDelete(msg._id, e)}
                          className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                          title="Delete message"
                        >
                          <i className="bx bx-trash text-lg"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      No messages received yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Message View Modal */}
      {modalOpen && selectedMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="admin-card w-full max-w-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-lg font-bold text-white">Message Details</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white text-xl"><i className="bx bx-x"></i></button>
            </div>
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4 bg-[#112e42] p-4 rounded-xl border border-white/5">
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400">Sender</p>
                  <p className="font-semibold text-white mt-1">{selectedMsg.name}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400">Date Received</p>
                  <p className="font-semibold text-white mt-1">{new Date(selectedMsg.createdAt).toLocaleString()}</p>
                </div>
                <div className="mt-2">
                  <p className="text-xs uppercase tracking-widest text-slate-400">Email Address</p>
                  <a href={`mailto:${selectedMsg.email}`} className="text-cyan-400 hover:underline mt-1 block">{selectedMsg.email}</a>
                </div>
                <div className="mt-2">
                  <p className="text-xs uppercase tracking-widest text-slate-400">Mobile Number</p>
                  <p className="font-semibold text-white mt-1">{selectedMsg.mobile}</p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Message</p>
                <div className="bg-[#112e42] p-4 rounded-xl border border-white/5 text-slate-200 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                  {selectedMsg.message}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-white/5">
              <button
                onClick={(e) => handleDelete(selectedMsg._id, e)}
                className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <i className="bx bx-trash"></i> Delete
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-5 py-2 rounded-lg bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 text-xs font-semibold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
