'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate email domain (Chulalongkorn University logic)
    if (!email.endsWith('@student.chula.ac.th')) {
      setError('Emails must be issued from Chulalongkorn University.');
      return;
    }

    setError(''); // Clear any previous errors

    // Perform the sign-in
    const result = await signIn('credentials', {
      email,
      password,
      callbackUrl: '/', // Redirect to home after successful login
    });

    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-tinder-orange">Please Sign in</h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-tinder-pink focus:border-tinder-pink sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-tinder-pink focus:border-tinder-pink sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Sign-in Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-tinder-orange border border-transparent rounded-md shadow-sm hover:bg-tinder-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tinder-pink"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}