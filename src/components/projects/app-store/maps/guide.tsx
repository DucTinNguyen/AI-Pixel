'use client';

import React, { useState } from 'react';

// interface MagicalPathFinderProps {
//   apiKey: string;
// }

const MagicalPathFinder: React.FC = () => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [travelMode, setTravelMode] = useState<'walking' | 'transit' | 'driving'>('walking');
  const [mapUrl, setMapUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_EMBED_KEY;

  const handleSearch = () => {
    if (origin && destination) {
      setIsLoading(true);
      const embedUrl = `https://www.google.com/maps/embed/v1/directions` +
        `?key=${apiKey}` +
        `&origin=${encodeURIComponent(origin)}` +
        `&destination=${encodeURIComponent(destination)}` +
        `&mode=${travelMode}`;
      setMapUrl(embedUrl);
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-[#1a1c2e] text-[#e2c7ff] rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-3xl">⚡</span>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#9f6ef5] to-[#c77dff] text-transparent bg-clip-text">
          Mystical Path Finder
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-[#252847] rounded-lg p-4">
            <div className="mb-4">
              <label className="block text-sm mb-2">🏰 Starting Point</label>
              <input
                type="text"
                placeholder="Enter origin..."
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full px-4 py-2 bg-[#1a1c2e] border-2 border-[#4a3b89] rounded-lg text-[#e2c7ff] placeholder-[#8e7bb0] focus:outline-none focus:border-[#9f6ef5]"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">🌟 Destination</label>
              <input
                type="text"
                placeholder="Enter destination..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-2 bg-[#1a1c2e] border-2 border-[#4a3b89] rounded-lg text-[#e2c7ff] placeholder-[#8e7bb0] focus:outline-none focus:border-[#9f6ef5]"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">✨ Choose Your Method</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setTravelMode('walking')}
                  className={`p-2 rounded-lg transition-colors ${
                    travelMode === 'walking'
                      ? 'bg-[#4a3b89] text-white'
                      : 'bg-[#1a1c2e] hover:bg-[#2a2d50]'
                  }`}
                >
                  🚶‍♂️ Walk
                </button>
                <button
                  onClick={() => setTravelMode('transit')}
                  className={`p-2 rounded-lg transition-colors ${
                    travelMode === 'transit'
                      ? 'bg-[#4a3b89] text-white'
                      : 'bg-[#1a1c2e] hover:bg-[#2a2d50]'
                  }`}
                >
                  🚇 Transit
                </button>
                <button
                  onClick={() => setTravelMode('driving')}
                  className={`p-2 rounded-lg transition-colors ${
                    travelMode === 'driving'
                      ? 'bg-[#4a3b89] text-white'
                      : 'bg-[#1a1c2e] hover:bg-[#2a2d50]'
                  }`}
                >
                  🚗 Drive
                </button>
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="w-full py-2 bg-[#4a3b89] hover:bg-[#5a4a99] rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>🔮</span>
              Chart Your Course
            </button>
          </div>

          <div className="bg-[#252847] rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <span>🌙</span> Traveler&apos;s Tips
            </h3>
            <ul className="text-sm text-[#e2c7ff]/80 space-y-2">
              <li>🌟 Type specific addresses for precise paths</li>
              <li>🎯 Use landmarks or place names</li>
              <li>⚡ Choose the travel method that suits your journey</li>
            </ul>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="relative w-full h-[500px] bg-[#252847] rounded-lg overflow-hidden">
            {mapUrl ? (
              <>
                <iframe
                  title="Magical Path Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={mapUrl}
                  allowFullScreen
                  className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                />
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#252847]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9f6ef5]"></div>
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#9f6ef5] p-6">
                <span className="text-6xl mb-4">🗺️</span>
                <p className="text-center">Enter your journey&apos;s start and end points to reveal the magical path...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagicalPathFinder;