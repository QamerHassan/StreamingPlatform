"use client";

import React from 'react';
import { User, Plus, Edit } from 'lucide-react';

type Profile = {
  id: number;
  name: string;
  avatarUrl?: string;
  isKidsProfile: boolean;
};

type ProfileSelectorProps = {
  profiles: Profile[];
  currentProfileId?: number;
  onSelectProfile: (profileId: number) => void;
  onCreateProfile: () => void;
  onEditProfile: (profileId: number) => void;
};

export default function ProfileSelector({
  profiles,
  currentProfileId,
  onSelectProfile,
  onCreateProfile,
  onEditProfile
}: ProfileSelectorProps) {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-16">
          Who's watching?
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => onSelectProfile(profile.id)}
            >
              <div className="relative mb-4">
                <div
                  className={`w-32 h-32 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${
                    currentProfileId === profile.id
                      ? 'ring-4 ring-white'
                      : 'ring-4 ring-transparent group-hover:ring-gray-600'
                  }`}
                  style={{
                    backgroundColor: profile.avatarUrl 
                      ? 'transparent' 
                      : profile.isKidsProfile 
                        ? '#3b82f6' 
                        : '#ef4444'
                  }}
                >
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <User className="w-16 h-16 text-white" />
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditProfile(profile.id);
                  }}
                  className="absolute top-0 right-0 bg-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-400 group-hover:text-white transition">
                {profile.name}
              </p>
            </div>
          ))}
          
          {/* Add Profile */}
          <div
            className="flex flex-col items-center cursor-pointer group"
            onClick={onCreateProfile}
          >
            <div className="w-32 h-32 rounded-lg border-2 border-gray-600 border-dashed flex items-center justify-center mb-4 transition-colors group-hover:border-gray-400">
              <Plus className="w-12 h-12 text-gray-600 group-hover:text-gray-400" />
            </div>
            <p className="text-gray-400 group-hover:text-white transition">
              Add Profile
            </p>
          </div>
        </div>

        <div className="text-center">
          <button className="px-8 py-3 border-2 border-gray-600 text-gray-400 hover:border-white hover:text-white transition">
            Manage Profiles
          </button>
        </div>
      </div>
    </div>
  );
}

