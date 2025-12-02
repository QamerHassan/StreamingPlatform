"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { X, Play, Plus, Star, ThumbsUp, Volume2 } from 'lucide-react';

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

type ContentModalProps = {
  content: Content;
  onClose: () => void;
};

export default function ContentModal({ content, onClose }: ContentModalProps) {
  const router = useRouter();

  const handlePlay = () => {
    router.push(`/watch/${content.id}`);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 animate-fadeIn" 
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slideUp" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Section */}
        <div className="relative">
          <img 
            src={content.thumbnail} 
            alt={content.title} 
            className="w-full h-[400px] object-cover rounded-t-lg" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
          
          {/* Close Button */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Title and Actions */}
          <div className="absolute bottom-8 left-8 right-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h2>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={handlePlay}
                className="flex items-center bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition"
              >
                <Play className="w-5 h-5 mr-2 fill-current" />
                Play
              </button>
              <button className="bg-gray-600 bg-opacity-70 p-3 rounded-full hover:bg-opacity-50 transition">
                <Plus className="w-6 h-6" />
              </button>
              <button className="bg-gray-600 bg-opacity-70 p-3 rounded-full hover:bg-opacity-50 transition">
                <ThumbsUp className="w-6 h-6" />
              </button>
              <button className="bg-gray-600 bg-opacity-70 p-3 rounded-full hover:bg-opacity-50 transition ml-auto">
                <Volume2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Content Details */}
        <div className="p-8">
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
            <span className="text-green-500 font-semibold text-base">98% Match</span>
            <span className="font-semibold">{content.year}</span>
            <span className="font-semibold">{content.duration}</span>
            <span className="border border-gray-400 px-2 py-0.5 text-xs font-semibold">HD</span>
            <span className="border border-gray-400 px-2 py-0.5 text-xs font-semibold">
              {content.type === 'movie' ? 'Movie' : 'Series'}
            </span>
          </div>
          
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            {content.description}
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              <div>
                <span className="text-gray-400 text-sm">Genre: </span>
                <span className="text-white font-semibold">{content.genre}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 text-sm mr-2">Rating: </span>
                <span className="flex items-center text-yellow-400 font-semibold">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  {content.rating.toFixed(1)}
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-gray-400 text-sm">Cast: </span>
                <span className="text-white">John Doe, Jane Smith, Mike Johnson</span>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Director: </span>
                <span className="text-white">Christopher Nolan</span>
              </div>
            </div>
          </div>
          
          {/* Similar Content */}
          <div className="border-t border-gray-800 pt-6">
            <h3 className="text-xl font-bold mb-4">More Like This</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition">
                  <img 
                    src={`https://images.unsplash.com/photo-${1478720568477 + i * 100}?w=300&h=200&fit=crop`}
                    alt={`Similar ${i}`}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="font-semibold text-sm truncate">Similar Title {i}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="flex items-center text-yellow-400 text-xs">
                        <Star className="w-3 h-3 fill-current mr-1" />
                        4.{i + 5}
                      </span>
                      <span className="text-gray-400 text-xs">{content.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}