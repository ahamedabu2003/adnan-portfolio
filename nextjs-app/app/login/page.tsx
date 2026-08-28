'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' && (session?.user as { is_admin?: boolean })?.is_admin) {
      router.push('/admin');
    }
  }, [status, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await signIn('credentials', { email, password, redirect: false });
    if (result?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        body { background: #0B0B0B; color: #F5F5F7; font-family: 'Space Grotesk', sans-serif; margin: 0; }
        .gradient-animate { background: linear-gradient(270deg, #7C5CFC, #22D3EE, #A78BFA, #7C5CFC); background-size: 300% 300%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: gradShift 6s ease infinite; }
        @keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        .mesh { position: absolute; border-radius: 40% 60% 70% 30%/40% 50% 60% 50%; filter: blur(80px); opacity: 0.12; animation: morph 12s ease-in-out infinite alternate; pointer-events: none; }
        @keyframes morph { 0%{border-radius:40% 60% 70% 30%/40% 50% 60% 50%;transform:rotate(0)} 100%{border-radius:30% 70% 60% 40%/50% 30% 50% 70%;transform:rotate(180deg)} }
      `}</style>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0B0B] px-4">
        <div className="mesh" style={{ width: 400, height: 400, background: 'linear-gradient(135deg,#7C5CFC,#22D3EE)', top: '-10%', right: '-5%' }}></div>
        <div className="mesh" style={{ width: 300, height: 300, background: 'linear-gradient(225deg,#A78BFA,#7C5CFC)', bottom: '-10%', left: '-5%', animationDelay: '-4s' }}></div>

        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-10">
            <Link href="/" className="inline-block font-bold text-3xl tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              AA<span className="gradient-animate">.</span>dev
            </Link>
            <p className="text-[#8A8A93] text-sm mt-3 tracking-wide">Admin Portal</p>
          </div>

          <div className="backdrop-blur-sm border border-white/10 rounded-2xl p-8 bg-white/[0.03]">
            <h1 className="text-xl font-semibold mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Sign In</h1>
            {error && <div className="mb-4 px-4 py-3 rounded-lg bg-red-950/50 border border-red-800/50 text-red-400 text-sm">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#8A8A93] mb-2">Email</label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  className="w-full px-4 py-3 rounded-lg text-sm border border-white/10 bg-white/[0.04] text-white placeholder:text-[#8A8A93] focus:outline-none focus:border-[#7C5CFC] focus:ring-1 focus:ring-[#7C5CFC]/30 transition-all"
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#8A8A93] mb-2">Password</label>
                <input
                  type="password" value={password} onChange={e => setPassword(e.target.value)} required
                  className="w-full px-4 py-3 rounded-lg text-sm border border-white/10 bg-white/[0.04] text-white placeholder:text-[#8A8A93] focus:outline-none focus:border-[#7C5CFC] focus:ring-1 focus:ring-[#7C5CFC]/30 transition-all"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit" disabled={loading}
                className="w-full py-3 rounded-full text-sm font-medium transition-all disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #7C5CFC, #22D3EE)', color: '#0B0B0B', fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {loading ? 'Signing in...' : 'Sign In →'}
              </button>
            </form>
          </div>
          <p className="text-center text-xs text-[#8A8A93] mt-6">
            <Link href="/" className="hover:text-white transition-colors">← Back to Portfolio</Link>
          </p>
        </div>
      </div>
    </>
  );
}
