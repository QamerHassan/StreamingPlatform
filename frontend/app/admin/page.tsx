"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { BarChart3, Users, Film, DollarSign, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../lib/api';

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(API_ENDPOINTS.ADMIN.DASHBOARD, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDashboardData(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  const stats = dashboardData?.statistics || {};

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      
      <div className="pt-24 px-4 md:px-16 pb-12">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold">{stats.totalUsers || 0}</span>
            </div>
            <p className="text-gray-400">Total Users</p>
            <p className="text-sm text-green-500 mt-2">{stats.activeUsers || 0} active</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Film className="w-8 h-8 text-red-500" />
              <span className="text-2xl font-bold">{stats.totalContent || 0}</span>
            </div>
            <p className="text-gray-400">Total Content</p>
            <p className="text-sm text-green-500 mt-2">{stats.activeContent || 0} active</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold">{stats.totalSubscriptions || 0}</span>
            </div>
            <p className="text-gray-400">Active Subscriptions</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold">${(stats.totalRevenue || 0).toFixed(2)}</span>
            </div>
            <p className="text-gray-400">Total Revenue</p>
          </div>
        </div>

        {/* Top Content */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Top Content</h2>
          <div className="space-y-3">
            {dashboardData?.topContent?.map((content: any, index: number) => (
              <div key={content.contentId} className="flex items-center justify-between p-3 bg-gray-800 rounded">
                <div className="flex items-center gap-4">
                  <span className="text-gray-400">#{index + 1}</span>
                  <div>
                    <p className="font-semibold">{content.content.title}</p>
                    <p className="text-sm text-gray-400">{content.content.type}</p>
                  </div>
                </div>
                <span className="text-red-500 font-semibold">{content.watchCount} views</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Users</h2>
          <div className="space-y-3">
            {dashboardData?.recentUsers?.map((user: any) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-800 rounded">
                <div>
                  <p className="font-semibold">{user.firstName} {user.lastName}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
                <span className={`px-3 py-1 rounded text-sm ${user.isActive ? 'bg-green-600' : 'bg-red-600'}`}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

