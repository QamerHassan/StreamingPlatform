"use client";

import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center py-6 px-8 bg-gray-900 text-white">
      <Link href="/" className="text-2xl font-bold text-indigo-500">StreamingPlatform</Link>
      <div className="space-x-4">
        <Link href="/login" className="hover:text-indigo-400">Login</Link>
        <Link href="/register" className="hover:text-indigo-400">Register</Link>
        <Link href="/plans" className="hover:text-indigo-400">Plans</Link>
      </div>
    </nav>
  );
}
