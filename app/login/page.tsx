'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Leaf } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [view, setView] = useState<'sign-in' | 'sign-up' | 'check-email'>('sign-in');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      setView('check-email');
      setMessage('');
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <Leaf className="text-green-600 h-12 w-12" />
        </div>

        {view === 'check-email' ? (
          <p className="text-center text-gray-700">
            {"Ungalukku oru verification link anuppiyullom. Unga email-a check seiyavum."}
          </p>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              {view === 'sign-in' ? 'உள்ளே நுழை' : 'Pudhu Kanakku'}
            </h2>

            <form onSubmit={view === 'sign-in' ? handleSignIn : handleSignUp}>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white p-3 rounded-md mt-6 hover:bg-green-700 transition-colors"
              >
                {view === 'sign-in' ? 'Login' : 'Sign Up'}
              </button>
            </form>

            <div className="text-center mt-4">
              {view === 'sign-in' ? (
                <p className="text-sm text-gray-600">
                  Pudhu kanaku thodanga?&nbsp;
                  <button
                    onClick={() => setView('sign-up')}
                    className="text-green-600 hover:underline font-semibold"
                  >
                    Sign Up
                  </button>
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Already kanaku iruka?&nbsp;
                  <button
                    onClick={() => setView('sign-in')}
                    className="text-green-600 hover:underline font-semibold"
                  >
                    Login
                  </button>
                </p>
              )}
            </div>

            {message && (
              <p className="mt-4 text-center text-sm text-red-500">{message}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
