'use client';

import React, { useState } from 'react';

interface PlaceInfo {
  name: string;
  address: string;
  rating?: number;
  timezone?: string;
  weather?: {
    temp: number;
    condition: string;
  };
}


const MagicalMapSearch: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [mapUrl, setMapUrl] = useState<string>('');
  const [placeInfo, setPlaceInfo] = useState<PlaceInfo | null>(null);

  const handleSearch = async () => {
    if (location) {
      const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_EMBED_KEY}&q=${encodeURIComponent(location)}`;
      setMapUrl(embedUrl);
      
      // In a real application, you would fetch place details here
      // This is a mockup of what data could look like
      setPlaceInfo({
        name: location,
        address: "Mystical Realm Location",
        rating: 4.7,
        timezone: "GMT+Magic",
        weather: {
          temp: 22,
          condition: "Mystically Clear"
        }
      });
    }
  };

  return (
    <div className="w-full max-w-2xl bg-[#1a1c2e] text-[#e2c7ff] rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-4 mb-6">
        {/* Mystical Crystal Ball Icon */}
        <svg className="w-8 h-8 text-[#9f6ef5]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#9f6ef5] to-[#c77dff] text-transparent bg-clip-text">
          Mystical Realm Finder
        </h2>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Seek a mystical location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-12 py-3 bg-[#252847] border-2 border-[#4a3b89] rounded-lg text-[#e2c7ff] placeholder-[#8e7bb0] focus:outline-none focus:border-[#9f6ef5] transition-colors"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          {/* Magical Search Icon */}
          <svg 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9f6ef5]"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
          >
            <path d="M10.5 21.5C4.5 21.5 1.5 18.5 1.5 12.5S4.5 3.5 10.5 3.5s9 3 9 9-3 9-9 9z" strokeWidth="1.5"/>
            <path d="M22.5 22.5l-3-3" strokeWidth="1.5"/>
            <path d="M10.5 8.5v8M6.5 12.5h8" strokeWidth="1.5"/>
          </svg>
        </div>
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-[#4a3b89] hover:bg-[#5a4a99] rounded-lg flex items-center gap-2 transition-colors"
        >
          {/* Magical Compass Icon */}
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="9" strokeWidth="1.5"/>
            <path d="M12 3v2M12 19v2M3 12h2M19 12h2" strokeWidth="1.5"/>
            <path d="M12 12L8 8M12 12l4 4" strokeWidth="1.5"/>
          </svg>
          Reveal
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 relative w-full h-80 bg-[#252847] rounded-lg overflow-hidden">
          {mapUrl ? (
            <iframe
              title="Magical Map View"
              width="100%"
              height="100%"
              frameBorder="0"
              src={mapUrl}
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-[#9f6ef5]">
              <p className="text-center">Cast your search to reveal the mysteries...</p>
            </div>
          )}
        </div>

        {placeInfo && (
          <div className="bg-[#252847] rounded-lg p-4 space-y-4">
            <h3 className="text-xl font-semibold text-[#c77dff]">{placeInfo.name}</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#9f6ef5]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span className="text-sm">{placeInfo.address}</span>
              </div>
              
              {placeInfo.rating && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#ffd700]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  <span className="text-sm">{placeInfo.rating} / 5.0</span>
                </div>
              )}
              
              {placeInfo.timezone && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#9f6ef5]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
                  </svg>
                  <span className="text-sm">{placeInfo.timezone}</span>
                </div>
              )}

              {placeInfo.weather && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#9f6ef5]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/>
                  </svg>
                  <span className="text-sm">
                    {placeInfo.weather.temp}°C • {placeInfo.weather.condition}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MagicalMapSearch;