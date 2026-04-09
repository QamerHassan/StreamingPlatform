"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Home, Play } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);

  useEffect(() => {
    const subId = searchParams.get('subscription');
    if (subId) {
      setSubscriptionId(subId);
    }
  }, [searchParams]);

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to StreamFlix!
          </h1>
          <p className="text-xl text-gray-400 mb-2">
            Your subscription has been activated successfully.
          </p>
          {subscriptionId && (
            <p className="text-sm text-gray-500">
              Subscription ID: {subscriptionId}
            </p>
          )}
        </div>

        <div className="bg-gray-900 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">What's Next?</h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Start Watching</h3>
                <p className="text-gray-400 text-sm">
                  Browse our extensive library of movies and TV shows. Start streaming instantly!
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Create Profiles</h3>
                <p className="text-gray-400 text-sm">
                  Set up profiles for family members. Each profile gets personalized recommendations.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Download & Watch Offline</h3>
                <p className="text-gray-400 text-sm">
                  Download your favorite shows and movies to watch anywhere, anytime.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded transition"
          >
            <Play className="w-5 h-5" />
            Start Watching
          </Link>
          <Link
            href="/profile"
            className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded transition"
          >
            <Home className="w-5 h-5" />
            Go to Profile
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Need help? <Link href="/profile" className="text-red-600 hover:underline">Contact Support</Link>
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-black text-white min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xl text-gray-400">Loading...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}