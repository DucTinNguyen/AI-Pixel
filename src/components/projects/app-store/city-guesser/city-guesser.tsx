'use client';

import React, { useState, useEffect } from 'react';

interface City {
  name: string;
  coords: string;
  hints: string[];
  streetViewConfig: {
    heading: number;
    pitch: number;
    zoom: number;
  };
  continent: string;
  population: string;
  landmark: string;
}

const MysticalCityGuesser: React.FC = () => {
  const [guess, setGuess] = useState<string>('');
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [mapUrl, setMapUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_EMBED_KEY;

  const cities: City[] = [
    {
      name: "Paris",
      coords: "48.8584,2.2945",
      hints: [
        "City of Lights ✨",
        "Famous for its iron tower 🗼",
        "Capital of romance 💕"
      ],
      streetViewConfig: {
        heading: 165,
        pitch: 0,
        zoom: 1
      },
      continent: "Europe",
      population: "2.2 million",
      landmark: "Eiffel Tower"
    },
    {
      name: "Tokyo",
      coords: "35.6595,139.7004",
      hints: [
        "Largest metropolitan area in the world 🌆",
        "Home of anime culture 🎎",
        "Famous for its cherry blossoms 🌸"
      ],
      streetViewConfig: {
        heading: 215,
        pitch: 0,
        zoom: 1
      },
      continent: "Asia",
      population: "37 million",
      landmark: "Shibuya Crossing"
    },
    {
      name: "New York",
      coords: "40.7580,-73.9855",
      hints: [
        "The Big Apple 🍎",
        "City that never sleeps 🌃",
        "Home to Lady Liberty 🗽"
      ],
      streetViewConfig: {
        heading: 250,
        pitch: 0,
        zoom: 1
      },
      continent: "North America",
      population: "8.4 million",
      landmark: "Times Square"
    },
    {
      name: "Venice",
      coords: "45.4371,12.3326",
      hints: [
        "City of canals and masks 🎭",
        "No cars allowed in this ancient realm 🚶‍♂️",
        "Famous for glass-making and gondolas ⛵"
      ],
      streetViewConfig: {
        heading: 30,
        pitch: 0,
        zoom: 1
      },
      continent: "Europe",
      population: "260,000",
      landmark: "St. Mark's Square"
    },
    {
      name: "Dubai",
      coords: "25.1972,55.2744",
      hints: [
        "City of gold and modern miracles ✨",
        "Where desert meets futuristic dreams 🏜️",
        "Home to the world's tallest building 🌆"
      ],
      streetViewConfig: {
        heading: 75,
        pitch: 10,
        zoom: 1
      },
      continent: "Asia",
      population: "3.3 million",
      landmark: "Burj Khalifa"
    },
    {
      name: "Rio de Janeiro",
      coords: "-22.9519,-43.2105",
      hints: [
        "City of carnival and samba 💃",
        "Blessed by a famous mountain statue 🗿",
        "Known for spectacular beaches 🏖️"
      ],
      streetViewConfig: {
        heading: 180,
        pitch: 0,
        zoom: 1
      },
      continent: "South America",
      population: "6.7 million",
      landmark: "Christ the Redeemer"
    },
    {
      name: "Amsterdam",
      coords: "52.3675,4.9041",
      hints: [
        "City of canals and bicycles 🚲",
        "Famous for narrow houses and bridges 🌉",
        "Capital of tulips and windmills 🌷"
      ],
      streetViewConfig: {
        heading: 290,
        pitch: 0,
        zoom: 1
      },
      continent: "Europe",
      population: "870,000",
      landmark: "Canal Ring"
    },
    {
      name: "Istanbul",
      coords: "41.0082,28.9784",
      hints: [
        "Where East meets West 🌅",
        "City of domes and minarets 🕌",
        "Ancient capital of three empires 👑"
      ],
      streetViewConfig: {
        heading: 135,
        pitch: 0,
        zoom: 1
      },
      continent: "Europe/Asia",
      population: "15.5 million",
      landmark: "Hagia Sophia"
    },
    {
      name: "Kyoto",
      coords: "35.0116,135.7681",
      hints: [
        "City of ancient temples and gardens 🍁",
        "Former imperial capital 👘",
        "Famous for geishas and tea ceremonies 🍵"
      ],
      streetViewConfig: {
        heading: 0,
        pitch: 0,
        zoom: 1
      },
      continent: "Asia",
      population: "1.5 million",
      landmark: "Kinkaku-ji (Golden Pavilion)"
    },
    {
      name: "Rome",
      coords: "41.8902,12.4922",
      hints: [
        "Eternal City of ancient ruins 🏛️",
        "Where all roads lead to 🛣️",
        "City of seven hills and fountains ⛲"
      ],
      streetViewConfig: {
        heading: 45,
        pitch: 0,
        zoom: 1
      },
      continent: "Europe",
      population: "4.3 million",
      landmark: "Colosseum"
    },
    {
      name: "San Francisco",
      coords: "37.8099,-122.4103",
      hints: [
        "City by the bay 🌉",
        "Famous for steep hills and cable cars 🚃",
        "Where fog meets technology 🌫️"
      ],
      streetViewConfig: {
        heading: 300,
        pitch: 0,
        zoom: 1
      },
      continent: "North America",
      population: "870,000",
      landmark: "Golden Gate Bridge"
    },
    {
      name: "Prague",
      coords: "50.0755,14.4378",
      hints: [
        "City of a hundred spires 🏰",
        "Famous for astronomical clocks ⏰",
        "Capital of bohemian culture 🎭"
      ],
      streetViewConfig: {
        heading: 90,
        pitch: 0,
        zoom: 1
      },
      continent: "Europe",
      population: "1.3 million",
      landmark: "Charles Bridge"
    }
  ];
  const selectNewCity = () => {
    setIsLoading(true);
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    setCurrentCity(randomCity);
    
    const embedUrl = `https://www.google.com/maps/embed/v1/streetview` +
      `?key=${apiKey}` +
      `&location=${randomCity.coords}` +
      `&heading=${randomCity.streetViewConfig.heading}` +
      `&pitch=${randomCity.streetViewConfig.pitch}` +
      `&fov=${90 / randomCity.streetViewConfig.zoom}`
    
    setMapUrl(embedUrl);
    setGameState('playing');
    setRevealedHints(0);
    setGuess('');
    setAttempts(0);
    
    setTimeout(() => setIsLoading(false), 1000);
  };

  useEffect(() => {
    selectNewCity();
  }, []);

  const checkGuess = () => {
    if (!currentCity) return;
    
    setAttempts(prev => prev + 1);
    
    if (guess.toLowerCase() === currentCity.name.toLowerCase()) {
      setGameState('won');
      setScore(prev => prev + Math.max(10 - revealedHints * 2 - attempts * 2, 1));
    } else if (attempts >= 2) {
      setGameState('lost');
    }
  };

  const revealHint = () => {
    if (revealedHints < 3) {
      setRevealedHints(prev => prev + 1);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-[#1a1c2e] text-[#e2c7ff] rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="text-3xl">🔮</span>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#9f6ef5] to-[#c77dff] text-transparent bg-clip-text">
            Mystical Street Scene Guesser
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">✨</span>
          <span className="text-xl font-bold">{score}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Map Display - Moved to First Column for Better UX */}
        <div className="md:col-span-2">
          <div className="relative w-full h-[500px] bg-[#252847] rounded-lg overflow-hidden">
            {mapUrl ? (
              <>
                <iframe
                  title="Mystical Street View"
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
                <p className="text-center">Preparing the mystical realm...</p>
              </div>
            )}
          </div>

          <div className="mt-4 bg-[#252847] rounded-lg p-4">
            <p className="text-sm text-[#e2c7ff]/80">
              🖱️ Use your mouse to look around and explore the street scene
            </p>
          </div>
        </div>

        {/* Controls Column */}
        <div className="space-y-4">
          <div className="bg-[#252847] rounded-lg p-4">
            <div className="mb-4">
              <label className="block text-sm mb-2">🎯 Your Guess</label>
              <input
                type="text"
                placeholder="Name this mystical realm..."
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                className="w-full px-4 py-2 bg-[#1a1c2e] border-2 border-[#4a3b89] rounded-lg text-[#e2c7ff] placeholder-[#8e7bb0] focus:outline-none focus:border-[#9f6ef5]"
                onKeyPress={(e) => e.key === 'Enter' && checkGuess()}
                disabled={gameState !== 'playing'}
              />
            </div>

            <div className="space-y-2">
              <button
                onClick={checkGuess}
                disabled={gameState !== 'playing'}
                className="w-full py-2 bg-[#4a3b89] hover:bg-[#5a4a99] rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>🎯</span>
                Make Your Guess
              </button>
              
              <button
                onClick={revealHint}
                disabled={gameState !== 'playing' || revealedHints >= 3}
                className="w-full py-2 bg-[#1a1c2e] hover:bg-[#2a2d50] rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>✨</span>
                Reveal Hint ({3 - revealedHints} remaining)
              </button>
            </div>
          </div>

          <div className="bg-[#252847] rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <span>📜</span> Mystical Hints
            </h3>
            <div className="space-y-2">
              {currentCity?.hints.map((hint, index) => (
                <div
                  key={index}
                  className={`p-2 rounded bg-[#1a1c2e] transition-opacity ${
                    index < revealedHints ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  {index < revealedHints ? hint : '???'}
                </div>
              ))}
            </div>
          </div>

          {gameState !== 'playing' && (
            <>
              <div className="bg-[#252847] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">
                    {gameState === 'won' ? '🎉' : '💫'}
                  </span>
                  <h3 className="text-lg font-semibold">
                    {gameState === 'won' ? 'Magical Victory!' : 'The City Reveals Itself!'}
                  </h3>
                </div>
                <p className="text-lg font-bold text-[#9f6ef5] mb-2">
                  {currentCity?.name}
                </p>
                <div className="text-sm space-y-1">
                  <p>📍 {currentCity?.continent}</p>
                  <p>👥 Population: {currentCity?.population}</p>
                  <p>🏛️ Famous for: {currentCity?.landmark}</p>
                </div>
              </div>

              <button
                onClick={selectNewCity}
                className="w-full py-2 bg-[#4a3b89] hover:bg-[#5a4a99] rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>🌟</span>
                Next City
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MysticalCityGuesser;