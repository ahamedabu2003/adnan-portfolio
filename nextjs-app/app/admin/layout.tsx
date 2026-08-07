'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#112e42] flex items-center justify-center text-[#ededed]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#00abf0]"></div>
      </div>
    );
  }

  if (status === 'unauthenticated' || !(session?.user as any)?.is_admin) {
    router.push('/login');
    return null;
  }

  const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: 'bx-grid-alt' },
    { href: '/admin/about', label: 'About', icon: 'bx-user' },
    { href: '/admin/experiences', label: 'Experience', icon: 'bx-briefcase' },
    { href: '/admin/projects', label: 'Projects', icon: 'bx-folder' },
    { href: '/admin/skills', label: 'Skills', icon: 'bx-bar-chart-alt-2' },
    { href: '/admin/cvs', label: 'CV / Resume', icon: 'bx-file' },
    { href: '/admin/messages', label: 'Messages', icon: 'bx-envelope' },
  ];

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" />
      <style>{`
        body { background-color: #112e42; color: #ededed; }
        .sidebar { width: 260px; min-height: 100vh; background: #081b29; border-right: 1px solid rgba(255, 255, 255, 0.05); }
        .sidebar .nav-link { display: flex; align-items: center; gap: 12px; padding: 12px 20px; color: #94a3b8; font-size: 14px; font-weight: 500; border-radius: 8px; margin: 2px 12px; transition: all 0.2s; text-decoration: none; }
        .sidebar .nav-link:hover, .sidebar .nav-link.active { background: rgba(0, 171, 240, 0.1); color: #00abf0; }
        .sidebar .nav-link.active { background: rgba(0, 171, 240, 0.15); border-left: 3px solid #00abf0; border-radius: 0 8px 8px 0; margin-left: 0; }
        .sidebar .nav-link i { font-size: 20px; }
        .content-area { flex: 1; min-height: 100vh; margin-left: 260px; }
        .admin-header { background: #081b29; border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding: 16px 32px; display: flex; align-items: center; justify-content: space-between; }
        .admin-card { background: #081b29; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
        .btn-primary-theme { background-color: #00abf0; color: #081b29; transition: all 0.3s; font-weight: 500; }
        .btn-primary-theme:hover { background-color: transparent; color: #00abf0; box-shadow: 0 0 15px #00abf0; border: 1px solid #00abf0; }
      `}</style>
      <div className="flex">
        {/* Sidebar */}
        <aside className="sidebar fixed top-0 left-0 z-40 flex flex-col">
          <div className="px-6 py-6 border-b border-white/5">
            <Link href="/admin" className="text-white text-xl font-bold tracking-tight flex items-center gap-2">
              <i className="bx bx-code-alt text-2xl" style={{ color: '#00abf0' }}></i>
              Admin Panel
            </Link>
          </div>

          <nav className="flex-1 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className={`nav-link ${isActive ? 'active' : ''}`}>
                  <i className={`bx ${link.icon}`}></i> {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 px-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-sm uppercase">
                {session?.user?.name ? session.user.name.charAt(0) : 'A'}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-200">{session?.user?.name}</p>
                <p className="text-xs text-slate-400">Administrator</p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="nav-link w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-red-500/15 hover:text-red-400 transition-all"
            >
              <i className="bx bx-log-out text-lg"></i> Logout
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <div className="content-area">
          <header className="admin-header">
            <div>
              <h1 className="text-lg font-semibold text-gray-200">
                {navLinks.find((l) => l.href === pathname)?.label || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" target="_blank" className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                <i className="bx bx-link-external"></i> View Site
              </Link>
            </div>
          </header>

          <main className="p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </>
  );
}
