"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Star, Play, Plus } from 'lucide-react';

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

type ContentCardProps = {
  content: Content;
  onClick: () => void;
};

export default function ContentCard({ content, onClick }: ContentCardProps) {
  const router = useRouter();

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/watch/${content.id}`);
  };

  return (
    <div 
      className="cursor-pointer group relative"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-lg">
        <img 
          src={content.thumbnail} 
          alt={content.title} 
          className="w-full h-[280px] object-cover transform transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center space-x-2 mb-2">
            <button 
              onClick={handlePlay}
              className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition"
            >
              <Play className="w-4 h-4 fill-current" />
            </button>
            <button className="bg-gray-800 bg-opacity-80 text-white p-2 rounded-full hover:bg-gray-700 transition">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Type Badge */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded text-xs font-semibold">
          {content.type === 'movie' ? 'Movie' : 'Series'}
        </div>
      </div>
      
      <div className="mt-2">
        <h3 className="font-semibold truncate text-sm group-hover:text-gray-300 transition">
          {content.title}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <span className="flex items-center text-yellow-400 text-xs">
            <Star className="w-3 h-3 fill-current mr-1" />
            {content.rating.toFixed(1)}
          </span>
          <span className="text-gray-400 text-xs">{content.duration}</span>
        </div>
      </div>
    </div>
  );
}