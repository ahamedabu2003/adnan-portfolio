'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Stats {
  projects: number;
  skills: number;
  experiences: number;
  messages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#00abf0]"></div>
      </div>
    );
  }

  const statCards = [
    { title: 'Projects', value: stats?.projects || 0, href: '/admin/projects', icon: 'bx-folder', color: '#00abf0' },
    { title: 'Skills', value: stats?.skills || 0, href: '/admin/skills', icon: 'bx-bar-chart-alt-2', color: '#a78bfa' },
    { title: 'Experiences', value: stats?.experiences || 0, href: '/admin/experiences', icon: 'bx-briefcase', color: '#34d399' },
    { title: 'New Messages', value: stats?.messages || 0, href: '/admin/messages', icon: 'bx-envelope', color: '#f43f5e', alert: (stats?.messages || 0) > 0 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="admin-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Welcome Back, Adnan!</h2>
          <p className="text-slate-400 text-sm">Manage your portfolio details, update skills, view messages, and track project metrics.</p>
        </div>
        <Link href="/" target="_blank" className="px-5 py-2.5 rounded-lg btn-primary-theme text-sm flex items-center gap-2">
          <i className="bx bx-link-external"></i> View Live Site
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <Link href={card.href} key={idx} className="admin-card p-6 block hover:border-[#00abf0]/30 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">{card.title}</p>
                <h3 className="text-3xl font-extrabold text-white mt-2 flex items-center gap-2">
                  {card.value}
                  {card.alert && (
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                    </span>
                  )}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${card.color}15`, color: card.color }}>
                <i className={`bx ${card.icon}`}></i>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
