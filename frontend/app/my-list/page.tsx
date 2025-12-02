"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ContentCard from '@/components/ContentCard';
import { Trash2, Play } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../lib/api';

type WatchlistItem = {
  id: number;
  contentId: number;
  contentTitle: string;
  contentDescription: string;
  contentThumbnail: string;
  contentType: string;
  contentGenre: string;
  contentRating: number;
  contentReleaseYear: number;
  addedAt: string;
};

export default function MyListPage() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view your watchlist');
        setLoading(false);
        return;
      }

      const response = await axios.get(API_ENDPOINTS.WATCHLIST.GET_ALL, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setWatchlist(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load watchlist');
    } finally {
      setLoading(false);
    }
  };

  const removeFromWatchlist = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(API_ENDPOINTS.WATCHLIST.REMOVE(id), {
        headers: { Authorization: `Bearer ${token}` }
      });

      setWatchlist(watchlist.filter(item => item.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to remove from watchlist');
    }
  };

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black text-white min-h-screen">
        <Header />
        <div className="pt-24 px-4 md:px-16 text-center">
          <p className="text-xl text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      
      <div className="pt-24 px-4 md:px-16 pb-12">
        <h1 className="text-4xl font-bold mb-8">My List</h1>

        {watchlist.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl mb-4">Your watchlist is empty</p>
            <p className="text-gray-500">Add movies and shows to your list to watch them later</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {watchlist.map((item) => (
              <div key={item.id} className="group relative">
                <ContentCard
                  content={{
                    id: item.contentId.toString(),
                    title: item.contentTitle,
                    thumbnail: item.contentThumbnail || 'https://via.placeholder.com/300x450',
                    duration: '',
                    rating: item.contentRating || 0,
                    year: item.contentReleaseYear || 2024,
                    genre: item.contentGenre || 'Unknown',
                    description: item.contentDescription || '',
                    type: item.contentType.toLowerCase() as 'movie' | 'series'
                  }}
                  onClick={() => {}}
                />
                <button
                  onClick={() => removeFromWatchlist(item.id)}
                  className="absolute top-2 right-2 bg-black bg-opacity-70 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
