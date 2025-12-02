"use client";

import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import ContentCard from '@/components/ContentCard';
import ContentModal from '@/components/ContentModal';
import { API_ENDPOINTS } from '@/lib/api';

type Content = {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  rating: number;
  year: number;
  genre: string;
  description: string;
  type: 'movie' | 'series';
};

const categories = [
  { id: 'all', name: 'All' },
  { id: 'action', name: 'Action' },
  { id: 'comedy', name: 'Comedy' },
  { id: 'drama', name: 'Drama' },
  { id: 'thriller', name: 'Thriller' },
  { id: 'sci-fi', name: 'Sci-Fi' },
  { id: 'romance', name: 'Romance' },
];

const formatDuration = (minutes?: number | null) => {
  if (!minutes) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

export default function BrowsePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.CONTENT.GET_ALL);
        const mapped: Content[] = response.data.map((item: any) => ({
          id: item.id.toString(),
          title: item.title,
          thumbnail: item.thumbnailUrl || 'https://via.placeholder.com/300x450',
          duration: formatDuration(item.duration),
          rating: item.rating || 0,
          year: item.releaseYear || 2024,
          genre: item.genre || 'Unknown',
          description: item.description || '',
          type: (item.type?.toLowerCase() === 'series' ? 'series' : 'movie') as 'movie' | 'series',
        }));

        setContent(mapped);
      } catch (err) {
        console.error('Failed to load content', err);
        setError('Unable to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const filteredContent = useMemo(() => {
    if (selectedCategory === 'all') return content;
    return content.filter((item) => item.genre.toLowerCase() === selectedCategory);
  }, [content, selectedCategory]);

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      {loading && (
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-xl text-gray-400">Loading...</p>
        </div>
      )}

      {!loading && error && (
        <div className="flex justify-center items-center min-h-[60vh] px-4 text-center">
          <p className="text-xl text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {selectedContent && (
            <ContentModal
              content={selectedContent}
              onClose={() => setSelectedContent(null)}
            />
          )}

          <div className="pt-24 px-4 md:px-16 pb-12">
            <h1 className="text-4xl font-bold mb-8">Browse</h1>

            {/* Category Filter */}
            <div className="flex overflow-x-auto space-x-3 mb-8 pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition ${
                    selectedCategory === category.id
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredContent.map((item) => (
                <ContentCard
                  key={item.id}
                  content={item}
                  onClick={() => setSelectedContent(item)}
                />
              ))}
            </div>

            {filteredContent.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <p className="text-xl">No content found in this category.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}