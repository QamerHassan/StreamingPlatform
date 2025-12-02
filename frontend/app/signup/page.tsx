"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function SignUpPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const nameParts = formData.name.split(' ');
      await register({
        email: formData.email,
        password: formData.password,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || ''
      });
      router.push('/plans');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, text: '', color: '' };
    if (password.length < 6) return { strength: 33, text: 'Weak', color: 'bg-red-600' };
    if (password.length < 10) return { strength: 66, text: 'Medium', color: 'bg-yellow-600' };
    return { strength: 100, text: 'Strong', color: 'bg-green-600' };
  };

  const strength = passwordStrength(formData.password);

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
          <h2 className="text-3xl font-bold mb-2 text-white">Create Account</h2>
          <p className="text-gray-400 mb-6">Join millions of subscribers worldwide</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-900/50 border border-red-600 text-red-200 px-4 py-3 rounded">
                {error}
              </div>
            )}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

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

            <div>
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
              
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-400">Password strength</span>
                    <span className={`font-semibold ${strength.text === 'Weak' ? 'text-red-500' : strength.text === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                      {strength.text}
                    </span>
                  </div>
                  <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${strength.color} transition-all duration-300`}
                      style={{ width: `${strength.strength}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-900 rounded p-4 space-y-2">
              <p className="text-sm font-semibold text-gray-300 mb-2">Benefits include:</p>
              <div className="flex items-start space-x-2 text-sm text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Unlimited streaming on all devices</span>
              </div>
              <div className="flex items-start space-x-2 text-sm text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Download and watch offline</span>
              </div>
              <div className="flex items-start space-x-2 text-sm text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Cancel anytime, no commitment</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Get Started'}
            </button>

            <label className="flex items-start text-xs text-gray-400 cursor-pointer">
              <input type="checkbox" className="mr-2 mt-0.5" required />
              <span>
                I agree to the{' '}
                <a href="#" className="text-white hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-white hover:underline">Privacy Policy</a>
              </span>
            </label>
          </form>

          <div className="mt-6 text-gray-400 text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-white hover:underline font-semibold">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}