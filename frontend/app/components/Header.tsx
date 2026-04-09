"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Bell, User, Menu, X, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black to-transparent">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center space-x-8">
          <Link href="/">
            <h1 className="text-2xl md:text-3xl font-bold text-red-600 cursor-pointer">STREAMFLIX</h1>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className={`hover:text-gray-300 transition ${isActive('/') ? 'text-white font-semibold' : 'text-gray-400'}`}>
              Home
            </Link>
            <Link href="/browse" className={`hover:text-gray-300 transition ${isActive('/browse') ? 'text-white font-semibold' : 'text-gray-400'}`}>
              Browse
            </Link>
            <Link href="/my-list" className={`hover:text-gray-300 transition ${isActive('/my-list') ? 'text-white font-semibold' : 'text-gray-400'}`}>
              My List
            </Link>
            <Link href="/plans" className={`hover:text-gray-300 transition ${isActive('/plans') ? 'text-white font-semibold' : 'text-gray-400'}`}>
              Plans
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center bg-black bg-opacity-50 rounded px-3 py-2">
            <Search className="w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-48 text-white placeholder-gray-400"
            />
          </div>
          <Bell className="w-6 h-6 cursor-pointer hover:text-gray-300 transition" />
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-8 h-8 bg-red-600 rounded flex items-center justify-center hover:bg-red-700 cursor-pointer transition"
            >
              <User className="w-5 h-5" />
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-xl border border-gray-800 overflow-hidden z-50">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-3 hover:bg-gray-800 transition"
                    >
                      <div className="font-semibold">{user?.firstName || 'Profile'}</div>
                      <div className="text-sm text-gray-400">{user?.email}</div>
                    </Link>
                    <div className="border-t border-gray-800">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-800 transition text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-4">
                    <Link
                      href="/login"
                      onClick={() => setShowUserMenu(false)}
                      className="block w-full text-center bg-red-600 hover:bg-red-700 py-2 rounded transition"
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-95 px-4 py-4 border-t border-gray-800">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="block py-3 hover:text-gray-300">
            Home
          </Link>
          <Link href="/browse" onClick={() => setIsMenuOpen(false)} className="block py-3 hover:text-gray-300">
            Browse
          </Link>
          <Link href="/my-list" onClick={() => setIsMenuOpen(false)} className="block py-3 hover:text-gray-300">
            My List
          </Link>
          <Link href="/plans" onClick={() => setIsMenuOpen(false)} className="block py-3 hover:text-gray-300">
            Plans
          </Link>
          <div className="mt-4 pt-4 border-t border-gray-800">
            <div className="flex items-center bg-gray-800 rounded px-3 py-2">
              <Search className="w-5 h-5 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}