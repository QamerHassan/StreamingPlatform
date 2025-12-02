"use client";

import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';

type AdaptiveVideoPlayerProps = {
  videoUrl: string;
  hlsUrl?: string;
  dashUrl?: string;
  title: string;
  onClose: () => void;
  onProgress?: (progress: number, duration: number) => void;
};

export default function AdaptiveVideoPlayer({
  videoUrl,
  hlsUrl,
  dashUrl,
  title,
  onClose,
  onProgress
}: AdaptiveVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hls, setHls] = useState<Hls | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check if HLS is supported
    if (Hls.isSupported() && hlsUrl) {
      const hlsInstance = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 90
      });

      hlsInstance.loadSource(hlsUrl);
      hlsInstance.attachMedia(video);

      hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(console.error);
      });

      hlsInstance.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hlsInstance.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hlsInstance.recoverMediaError();
              break;
            default:
              hlsInstance.destroy();
              setError('Video playback error');
              break;
          }
        }
      });

      setHls(hlsInstance);

      return () => {
        hlsInstance.destroy();
      };
    } 
    // Check for native HLS support (Safari)
    else if (video.canPlayType('application/vnd.apple.mpegurl') && hlsUrl) {
      video.src = hlsUrl;
      video.play().catch(console.error);
    }
    // Fallback to regular video
    else {
      video.src = videoUrl;
      video.play().catch(console.error);
    }

    // Progress tracking
    const updateProgress = () => {
      if (onProgress && video.duration) {
        onProgress(video.currentTime, video.duration);
      }
    };

    video.addEventListener('timeupdate', updateProgress);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
    };
  }, [videoUrl, hlsUrl, dashUrl, onProgress]);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        controls
        autoPlay
      />
      {error && (
        <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded">
          {error}
        </div>
      )}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
      >
        ✕
      </button>
    </div>
  );
}

