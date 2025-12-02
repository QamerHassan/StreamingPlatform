"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import VideoPlayer from '@/components/VideoPlayer';
import Header from '@/components/Header';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../lib/api';

export default function WatchPage() {
  const params = useParams();
  const router = useRouter();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedEpisode, setSelectedEpisode] = useState<any>(null);

  useEffect(() => {
    fetchContent();
  }, [params.id]);

  const fetchContent = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.CONTENT.GET_BY_ID(params.id as string));
      setContent(response.data);
      
      // If it's a series, select first episode of first season
      if (response.data.type === 'Series' && response.data.seasons?.length > 0) {
        const firstSeason = response.data.seasons[0];
        if (firstSeason.episodes?.length > 0) {
          setSelectedEpisode(firstSeason.episodes[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching content:', error);
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

  if (!content) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Content not found</h1>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-red-600 rounded hover:bg-red-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const videoUrl = content.type === 'Series' && selectedEpisode
    ? selectedEpisode.videoUrl || content.videoUrl
    : content.videoUrl;

  if (!videoUrl) {
    return (
      <div className="bg-black text-white min-h-screen">
        <Header />
        <div className="pt-24 px-4 md:px-16">
          <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
          <p className="text-gray-400 mb-8">{content.description}</p>
          
          {content.type === 'Series' && content.seasons && (
            <div className="space-y-6">
              {content.seasons.map((season: any) => (
                <div key={season.id} className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">
                    Season {season.seasonNumber}: {season.title}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {season.episodes.map((episode: any) => (
                      <div
                        key={episode.id}
                        onClick={() => setSelectedEpisode(episode)}
                        className={`cursor-pointer rounded-lg overflow-hidden transition ${
                          selectedEpisode?.id === episode.id
                            ? 'ring-2 ring-red-600'
                            : 'hover:scale-105'
                        }`}
                      >
                        <div className="aspect-video bg-gray-800 flex items-center justify-center">
                          {episode.thumbnailUrl ? (
                            <img
                              src={episode.thumbnailUrl}
                              alt={episode.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-gray-500">Episode {episode.episodeNumber}</span>
                          )}
                        </div>
                        <div className="p-3 bg-gray-900">
                          <h3 className="font-semibold text-sm truncate">{episode.title}</h3>
                          <p className="text-xs text-gray-400 mt-1">
                            {episode.duration} min
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <VideoPlayer
      videoUrl={videoUrl}
      title={content.type === 'Series' && selectedEpisode 
        ? `${content.title} - ${selectedEpisode.title}`
        : content.title}
      onClose={() => router.push('/')}
    />
  );
}

