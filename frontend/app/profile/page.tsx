"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import { User, CreditCard, Settings, Bell, HelpCircle, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const [autoplayNext, setAutoplayNext] = useState(true);
  const [autoplayPreviews, setAutoplayPreviews] = useState(false);

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      
      <div className="pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Account Settings</h1>
          
          {/* Profile Section */}
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-4 mb-6">
              <User className="w-12 h-12" />
              <h2 className="text-2xl font-semibold">Profile</h2>
            </div>
            <div className="flex items-center space-x-6 mb-6">
              <div className="w-24 h-24 bg-red-600 rounded flex items-center justify-center text-3xl font-bold">
                JD
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1">John Doe</h3>
                <p className="text-gray-400">john.doe@example.com</p>
                <p className="text-gray-400 text-sm mt-1">Member since January 2024</p>
              </div>
              <button className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded font-semibold transition">
                Edit Profile
              </button>
            </div>
          </div>
          
          {/* Membership & Billing */}
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-4 mb-6">
              <CreditCard className="w-12 h-12" />
              <h2 className="text-2xl font-semibold">Membership & Billing</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-800">
                <div>
                  <p className="text-gray-400 text-sm">Current Plan</p>
                  <p className="font-semibold text-lg">Standard Plan</p>
                </div>
                <p className="text-xl font-bold">$9.99/mo</p>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-800">
                <div>
                  <p className="text-gray-400 text-sm">Payment Method</p>
                  <p className="font-semibold">•••• •••• •••• 4242</p>
                </div>
                <button className="text-red-600 hover:underline font-semibold">Update</button>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-800">
                <div>
                  <p className="text-gray-400 text-sm">Next Billing Date</p>
                  <p className="font-semibold">December 18, 2025</p>
                </div>
                <button className="text-red-600 hover:underline font-semibold">View History</button>
              </div>
              
              <div className="pt-4 flex gap-4">
                <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold transition">
                  Change Plan
                </button>
                <button className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded font-semibold transition">
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>
          
          {/* Playback Settings */}
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-4 mb-6">
              <Settings className="w-12 h-12" />
              <h2 className="text-2xl font-semibold">Playback Settings</h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between py-3 cursor-pointer">
                <div>
                  <p className="font-semibold">Autoplay next episode</p>
                  <p className="text-sm text-gray-400">Automatically play the next episode</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={autoplayNext}
                  onChange={(e) => setAutoplayNext(e.target.checked)}
                  className="w-12 h-6 appearance-none bg-gray-700 rounded-full relative cursor-pointer transition-colors checked:bg-red-600 
                  before:content-[''] before:absolute before:w-5 before:h-5 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 
                  before:transition-transform checked:before:translate-x-6"
                />
              </label>
              
              <label className="flex items-center justify-between py-3 cursor-pointer border-t border-gray-800">
                <div>
                  <p className="font-semibold">Autoplay previews</p>
                  <p className="text-sm text-gray-400">Play previews while browsing</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={autoplayPreviews}
                  onChange={(e) => setAutoplayPreviews(e.target.checked)}
                  className="w-12 h-6 appearance-none bg-gray-700 rounded-full relative cursor-pointer transition-colors checked:bg-red-600 
                  before:content-[''] before:absolute before:w-5 before:h-5 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 
                  before:transition-transform checked:before:translate-x-6"
                />
              </label>
              
              <div className="py-3 border-t border-gray-800">
                <p className="font-semibold mb-2">Video Quality</p>
                <select className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 outline-none focus:border-red-600">
                  <option>Auto (Recommended)</option>
                  <option>Low (Save Data)</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Ultra HD (Premium only)</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Notifications */}
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-4 mb-6">
              <Bell className="w-12 h-12" />
              <h2 className="text-2xl font-semibold">Notifications</h2>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between py-2 cursor-pointer">
                <span>Email notifications</span>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </label>
              <label className="flex items-center justify-between py-2 cursor-pointer">
                <span>New content alerts</span>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </label>
              <label className="flex items-center justify-between py-2 cursor-pointer">
                <span>Promotional offers</span>
                <input type="checkbox" className="w-5 h-5" />
              </label>
            </div>
          </div>
          
          {/* Help & Support */}
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-4 mb-6">
              <HelpCircle className="w-12 h-12" />
              <h2 className="text-2xl font-semibold">Help & Support</h2>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left py-3 px-4 bg-gray-800 hover:bg-gray-700 rounded transition">
                Help Center
              </button>
              <button className="w-full text-left py-3 px-4 bg-gray-800 hover:bg-gray-700 rounded transition">
                Contact Support
              </button>
              <button className="w-full text-left py-3 px-4 bg-gray-800 hover:bg-gray-700 rounded transition">
                Terms of Service
              </button>
              <button className="w-full text-left py-3 px-4 bg-gray-800 hover:bg-gray-700 rounded transition">
                Privacy Policy
              </button>
            </div>
          </div>
          
          {/* Sign Out */}
          <button className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-lg font-semibold transition flex items-center justify-center space-x-2">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}