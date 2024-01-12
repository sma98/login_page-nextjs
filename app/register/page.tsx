"use client"
import React, { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:4000/api/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!res.ok) {

        const errorText = await res.text();
        throw new Error(`Registration failed: ${errorText}`);
      }


      alert('User registered successfully');
      await router.push('/');
    } catch (error) {
      console.error('Error during registration:', error);
      alert(error);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white w-full sm:w-max sm:mx-auto p-8 rounded-md shadow-md">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Register your account</h2>
          </div>

          <form className="space-y-6" onSubmit={submit}>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  autoComplete="name"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md border py-2 px-3 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                  Email
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border py-2 px-3 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"

                />
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border py-2 px-3 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                className="w-full bg-indigo-600 py-2 text-sm font-semibold text-white rounded-md hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 focus:outline-none"

                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          <p className="mt-8 text-center text-sm text-gray-600">
            Member?{' '}
            <Link href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
