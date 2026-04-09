"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ContentCard from "./components/ContentCard";
import ContentModal from "./components/ContentModal";
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { API_ENDPOINTS } from "../lib/api";

type Content = {
  id: number;
  title: string;
  description: string;
  type: string;
  genre: string;
  releaseYear: number;
  rating: number;
  duration: number;
  thumbnailUrl: string;
  trailerUrl: string;
  videoUrl: string;
};

export default function Home() {
  const [featuredContent, setFeaturedContent] = useState<Content | null>(null);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [trending, setTrending] = useState<Content[]>([]);
  const [topRated, setTopRated] = useState<Content[]>([]);
  const [actionMovies, setActionMovies] = useState<Content[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Content[]>([]);
  const [dramaMovies, setDramaMovies] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.CONTENT.GET_ALL);
      const allContent: Content[] = response.data;

      if (allContent.length > 0) {
        // Set featured content (first item)
        setFeaturedContent(allContent[0]);
        
        // Set trending (first 10)
        setTrending(allContent.slice(0, 10));
        
        // Set top rated (sorted by rating)
        const sortedByRating = [...allContent].sort((a, b) => (b.rating || 0) - (a.rating || 0));
        setTopRated(sortedByRating.slice(0, 10));
        
        // Filter by genre
        setActionMovies(allContent.filter(c => c.genre?.toLowerCase().includes("action")).slice(0, 10));
        setComedyMovies(allContent.filter(c => c.genre?.toLowerCase().includes("comedy")).slice(0, 10));
        setDramaMovies(allContent.filter(c => c.genre?.toLowerCase().includes("drama")).slice(0, 10));
      } else {
        // Fallback mock data if no content from API
        const mockContent: Content = {
          id: 1,
          title: "The Dark Knight",
          description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
          type: "Movie",
          genre: "Action",
          releaseYear: 2008,
          rating: 9.0,
          duration: 152,
          thumbnailUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop",
          trailerUrl: "",
          videoUrl: ""
        };
        setFeaturedContent(mockContent);
        setTrending([mockContent]);
        setTopRated([mockContent]);
        setActionMovies([mockContent]);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      // Use mock data on error
      const mockContent: Content = {
        id: 1,
        title: "The Dark Knight",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        type: "Movie",
        genre: "Action",
        releaseYear: 2008,
        rating: 9.0,
        duration: 152,
        thumbnailUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop",
        trailerUrl: "",
        videoUrl: ""
      };
      setFeaturedContent(mockContent);
      setTrending([mockContent]);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const ContentRow = ({ title, contents }: { title: string; contents: Content[] }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const rowRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
      if (rowRef.current) {
        const scrollAmount = 1200;
        const newPosition = direction === "left" 
          ? scrollPosition - scrollAmount 
          : scrollPosition + scrollAmount;
        rowRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
        setScrollPosition(newPosition);
      }
    };

    if (contents.length === 0) return null;

    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 px-4 md:px-16">{title}</h2>
        <div className="relative group">
          <div
            ref={rowRef}
            className="flex overflow-x-auto scrollbar-hide space-x-4 px-4 md:px-16 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {contents.map((item) => (
              <div key={item.id} className="flex-shrink-0 w-[300px]">
                <ContentCard
                  content={{
                    id: item.id.toString(),
                    title: item.title,
                    thumbnail: item.thumbnailUrl || "https://via.placeholder.com/300x450",
                    duration: formatDuration(item.duration || 0),
                    rating: item.rating || 0,
                    year: item.releaseYear || 2024,
                    genre: item.genre || "Unknown",
                    description: item.description || "",
                    type: item.type.toLowerCase() as "movie" | "series"
                  }}
                  onClick={() => setSelectedContent(item)}
                />
              </div>
            ))}
          </div>
          
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-start pl-4 z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end pr-4 z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      
      {selectedContent && (
        <ContentModal
          content={{
            id: selectedContent.id.toString(),
            title: selectedContent.title,
            thumbnail: selectedContent.thumbnailUrl || "https://via.placeholder.com/1920x1080",
            duration: formatDuration(selectedContent.duration || 0),
            rating: selectedContent.rating || 0,
            year: selectedContent.releaseYear || 2024,
            genre: selectedContent.genre || "Unknown",
            description: selectedContent.description || "",
            type: selectedContent.type.toLowerCase() as "movie" | "series"
          }}
          onClose={() => setSelectedContent(null)}
        />
      )}

      {/* Hero Section */}
      {featuredContent && (
        <div className="relative h-[80vh] md:h-[90vh] w-full mb-8">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${featuredContent.thumbnailUrl || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop"})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
          
          <div className="relative h-full flex items-center px-4 md:px-16">
            <div className="max-w-2xl z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
                {featuredContent.title}
              </h1>
              <div className="flex items-center gap-4 mb-6 text-lg">
                <span className="text-green-500 font-semibold">98% Match</span>
                <span>{featuredContent.releaseYear}</span>
                <span>{formatDuration(featuredContent.duration || 0)}</span>
                <span className="border border-gray-400 px-2 py-0.5 text-sm">HD</span>
              </div>
              <p className="text-lg md:text-xl mb-8 text-gray-300 line-clamp-3">
                {featuredContent.description}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedContent(featuredContent)}
                  className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition text-lg"
                >
                  <Play className="w-6 h-6 fill-current" />
                  Play
                </button>
                <button
                  onClick={() => setSelectedContent(featuredContent)}
                  className="flex items-center gap-2 bg-gray-600 bg-opacity-70 text-white px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition text-lg"
                >
                  <Info className="w-6 h-6" />
                  More Info
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Rows */}
      <div className="pb-16">
        {trending.length > 0 && <ContentRow title="Trending Now" contents={trending} />}
        {topRated.length > 0 && <ContentRow title="Top Rated" contents={topRated} />}
        {actionMovies.length > 0 && <ContentRow title="Action Movies" contents={actionMovies} />}
        {comedyMovies.length > 0 && <ContentRow title="Comedy Movies" contents={comedyMovies} />}
        {dramaMovies.length > 0 && <ContentRow title="Drama Series" contents={dramaMovies} />}
      </div>
    </div>
  );
}
