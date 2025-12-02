"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(formData.email, formData.password);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1574267432644-f610a74bc8b9?w=1920&h=1080&fit=crop"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
      </div>

      <div className="relative w-full max-w-md">
        <Link href="/">
          <h1 className="text-4xl font-bold text-red-600 mb-8 cursor-pointer text-center">STREAMFLIX</h1>
        </Link>

        <div className="bg-black bg-opacity-80 rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-white">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-900/50 border border-red-600 text-red-200 px-4 py-3 rounded">
                {error}
              </div>
            )}
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="mr-2" />
                <span className="text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-gray-400 hover:text-white hover:underline">
                Forgot password?
              </a>
            </div>
          </form>

          <div className="mt-8 text-gray-400">
            New to StreamFlix?{' '}
            <Link href="/signup" className="text-white hover:underline font-semibold">
              Sign up now
            </Link>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
            <a href="#" className="text-blue-500 hover:underline">Learn more</a>
          </p>
        </div>
      </div>
    </div>
  );
}