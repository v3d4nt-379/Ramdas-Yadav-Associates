"use client";

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const tokenResult = await credential.user.getIdTokenResult();
      const hasAdminClaim = tokenResult.claims.isAdmin === true;

      if (!hasAdminClaim) {
        await signOut(auth);
        setError('Access denied. You do not have admin privileges.');
        setLoading(false);
        return;
      }

      router.push('/admin');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      if (message.includes('auth/invalid-credential') || message.includes('auth/wrong-password') || message.includes('auth/user-not-found')) {
        setError('Invalid email or password.');
      } else if (message.includes('auth/too-many-requests')) {
        setError('Too many failed attempts. Please try again later.');
      } else {
        setError('Something went wrong. Please try again.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(250,204,21,0.08),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(250,204,21,0.05),transparent_50%)]"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo / Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6">
            <span className="text-xl font-black tracking-tighter text-white uppercase">
              Ramdas Yadav Associates
            </span>
          </Link>
          <div className="w-12 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">
            Admin Panel
          </h1>
          <p className="text-zinc-500 text-sm mt-2 font-medium">
            Authorized personnel only
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-10 shadow-2xl">
          {error && (
            <div className="bg-red-900/30 border border-red-800/50 text-red-400 px-4 py-3 mb-6 text-sm font-medium flex items-start gap-2">
              <span className="material-symbols-outlined text-lg mt-0.5 shrink-0">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 text-lg">
                  mail
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 pl-12 pr-4 py-3.5 text-white text-sm font-medium focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-zinc-600"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 text-lg">
                  lock
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 pl-12 pr-4 py-3.5 text-white text-sm font-medium focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-zinc-600"
                  placeholder="••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 ${
                loading
                  ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                  : 'bg-yellow-400 text-black hover:bg-yellow-300 shadow-lg hover:shadow-yellow-400/20'
              }`}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-zinc-500/30 border-t-zinc-500 rounded-full animate-spin"></span>
                  Authenticating...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">login</span>
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back to site */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-zinc-600 hover:text-zinc-400 text-xs font-bold uppercase tracking-widest transition-colors inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
