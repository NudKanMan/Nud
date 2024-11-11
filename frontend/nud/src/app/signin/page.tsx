// /src/app/signin/page.tsx

'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from "@mui/material";
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.endsWith('@student.chula.ac.th')) {
      setError('Emails must be issued from Chulalongkorn University.');
      return;
    }

    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
    });

    if (result?.error) {
      setError(result.error);
    }
  };

  const handleRedirectToSignup = () => {
    router.replace("/signup");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-tinder-grey">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-tinder-grey">
          Welcome to <span className="text-tinder-orange">Nud</span>
        </h2>
        <p className="text-center text-tinder-grey text-2xl font-bold">Please Sign in</p>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-tinder-grey">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-tinder-pink focus:border-tinder-pink sm:text-sm text-tinder-grey"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-tinder-grey">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-tinder-pink focus:border-tinder-pink sm:text-sm text-tinder-grey"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#fd5564",
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem", 
              padding: "10px 28px", 
              borderRadius: "50px",
              transition: "transform 0.3s ease", 
              "&:hover": {
                backgroundColor: "#424242",
                color: "white",
                transform: "scale(1.05)", 
              },
            }}
            fullWidth
          >
            Sign In
          </Button>
        </form>

        <p className="text-center text-tinder-grey mt-4">
          Don’t have an account?{" "}
          <span
            onClick={handleRedirectToSignup}
            className="text-[#fd5564] underline font-bold cursor-pointer"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}