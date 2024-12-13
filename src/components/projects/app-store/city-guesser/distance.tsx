'use client';

import React, { useState, useEffect } from 'react';

interface City {
  name: string;
  coords: string;
  region: string;
  magicalLore: string;
  historicRoute?: string;
}

interface GameRound {
  cityFrom: City;
  cityTo: City;
  actualDistance: number;
}

const RealmDistanceDiviner: React.FC = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_EMBED_KEY;
  const [guess, setGuess] = useState<string>('');
  const [currentRound, setCurrentRound] = useState<GameRound | null>(null);
  const [gameState, setGameState] = useState<'guessing' | 'result'>('guessing');
  const [score, setScore] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [mapUrl, setMapUrl] = useState<string>('');
  const [totalRounds, setTotalRounds] = useState<number>(0);

  const cities: City[] = [
    {
      name: "Alexandria",
      coords: "31.2001,29.9187",
      region: "Ancient Mediterranean",
      magicalLore: "Home of the great lighthouse, one of the Seven Wonders ✨",
      historicRoute: "The Silk Road's western terminus"
    },
    {
      name: "Constantinople",
      coords: "41.0082,28.9784",
      region: "Byzantine Empire",
      magicalLore: "Where the gates between East and West stand eternal 🏰",
      historicRoute: "The Royal Road's end point"
    },
    {
      name: "Samarkand",
      coords: "39.6270,66.9750",
      region: "Central Asia",
      magicalLore: "Crossroads of mystic traders and ancient wisdom 🐫",
      historicRoute: "Heart of the Silk Road"
    },
    {
      name: "Timbuktu",
      coords: "16.7666,-3.0026",
      region: "West Africa",
      magicalLore: "City of 333 saints and countless scrolls 📜",
      historicRoute: "Trans-Saharan trade route hub"
    },
    {
      name: "Cusco",
      coords: "-13.5319,-71.9675",
      region: "Inca Empire",
      magicalLore: "The navel of the world, center of the four quarters 🌞",
      historicRoute: "Qhapaq Ñan royal road system"
    },
    {
      name: "Kyoto",
      coords: "35.0116,135.7681",
      region: "Ancient Japan",
      magicalLore: "Where dragons guard the imperial gates 🐉",
      historicRoute: "Tōkaidō road endpoint"
    },
    {
      name: "Venice",
      coords: "45.4408,12.3155",
      region: "Medieval Europe",
      magicalLore: "Where merchants trade in dreams and possibilities 🎭",
      historicRoute: "Maritime Silk Road terminus"
    },
    {
      name: "Petra",
      coords: "30.3285,35.4444",
      region: "Ancient Arabia",
      magicalLore: "The rose-red city, half as old as time 🏛️",
      historicRoute: "Incense Route hub"
    }
  ];

  const calculateDistance = (from: string, to: string): number => {
    const [lat1, lon1] = from.split(',').map(Number);
    const [lat2, lon2] = to.split(',').map(Number);
    
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
  };

  const startNewRound = () => {
    const cityFrom = cities[Math.floor(Math.random() * cities.length)];
    let cityTo;
    do {
      cityTo = cities[Math.floor(Math.random() * cities.length)];
    } while (cityFrom === cityTo);

    const distance = calculateDistance(cityFrom.coords, cityTo.coords);
    
    setCurrentRound({
      cityFrom,
      cityTo,
      actualDistance: distance
    });

    const embedUrl = `https://www.google.com/maps/embed/v1/directions` +
      `?key=${apiKey}` +
      `&origin=${cityFrom.coords}` +
      `&destination=${cityTo.coords}` +
      '&maptype=satellite' +
      `&zoom=5`;

    setMapUrl(embedUrl);
    setGameState('guessing');
    setGuess('');
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const calculateScore = (actual: number, guessed: number): number => {
    const difference = Math.abs(actual - guessed);
    const percentageOff = (difference / actual) * 100;
    
    if (percentageOff <= 5) return 100;
    if (percentageOff <= 10) return 80;
    if (percentageOff <= 20) return 60;
    if (percentageOff <= 30) return 40;
    if (percentageOff <= 40) return 20;
    return 10;
  };

  const handleGuess = () => {
    if (!currentRound || !guess) return;

    const guessNum = parseInt(guess);
    const roundScore = calculateScore(currentRound.actualDistance, guessNum);
    const guessAccuracy = Math.round((1 - Math.abs(currentRound.actualDistance - guessNum) / currentRound.actualDistance) * 100);

    setScore(prev => prev + roundScore);
    setAccuracy(guessAccuracy);
    setGameState('result');
    setTotalRounds(prev => prev + 1);
  };

  return (
    <div className="w-full max-w-4xl bg-[#1a1c2e] text-[#e2c7ff] rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="text-3xl">📏</span>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#9f6ef5] to-[#c77dff] text-transparent bg-clip-text">
            Realm Distance Diviner
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            Round: {totalRounds}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <span className="text-xl font-bold">{score}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          {currentRound && (
            <>
              <div className="bg-[#252847] rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">🗺️ The Journey</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-[#1a1c2e] rounded-lg">
                    <p className="text-sm text-[#9f6ef5] mb-1">From:</p>
                    <p className="font-semibold">{currentRound.cityFrom.name}</p>
                    <p className="text-sm italic text-[#e2c7ff]/70">
                      {currentRound.cityFrom.magicalLore}
                    </p>
                  </div>
                  <div className="p-3 bg-[#1a1c2e] rounded-lg">
                    <p className="text-sm text-[#9f6ef5] mb-1">To:</p>
                    <p className="font-semibold">{currentRound.cityTo.name}</p>
                    <p className="text-sm italic text-[#e2c7ff]/70">
                      {currentRound.cityTo.magicalLore}
                    </p>
                  </div>
                </div>
              </div>

              {gameState === 'guessing' && (
                <div className="bg-[#252847] rounded-lg p-4">
                  <div className="mb-4">
                    <label className="block text-sm mb-2">🎯 Your Guess (in kilometers)</label>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      placeholder="Enter distance..."
                      value={guess}
                      onChange={(e) => setGuess(e.target.value)}
                      className="w-full px-4 py-2 bg-[#1a1c2e] border-2 border-[#4a3b89] rounded-lg text-[#e2c7ff] placeholder-[#8e7bb0] focus:outline-none focus:border-[#9f6ef5]"
                      onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
                    />
                  </div>
                  <button
                    onClick={handleGuess}
                    className="w-full py-2 bg-[#4a3b89] hover:bg-[#5a4a99] rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <span>🔮</span>
                    Cast Measuring Spell
                  </button>
                </div>
              )}

              {gameState === 'result' && (
                <div className="bg-[#252847] rounded-lg p-4 space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">✨ Spell Results</h3>
                    <p className="text-3xl font-bold text-[#9f6ef5]">
                      {currentRound.actualDistance} km
                    </p>
                    <p className="text-sm text-[#e2c7ff]/70">
                      Your guess: {guess} km
                    </p>
                    <p className="text-sm mt-2">
                      Accuracy: {accuracy}%
                    </p>
                  </div>
                  <button
                    onClick={startNewRound}
                    className="w-full py-2 bg-[#4a3b89] hover:bg-[#5a4a99] rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <span>🌟</span>
                    Next Journey
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <div className="md:col-span-2">
          <div className="relative w-full h-[500px] bg-[#252847] rounded-lg overflow-hidden">
            {mapUrl ? (
              <iframe
                title="Magical Journey Map"
                width="100%"
                height="100%"
                frameBorder="0"
                src={mapUrl}
                allowFullScreen
                className="transition-opacity duration-500"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#9f6ef5] p-6">
                <span className="text-6xl mb-4">🗺️</span>
                <p className="text-center">Calculating mystical distances...</p>
              </div>
            )}
          </div>

          {gameState === 'result' && currentRound?.cityFrom.historicRoute && currentRound?.cityTo.historicRoute && (
            <div className="mt-4 bg-[#252847] rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">📜 Historical Routes</h3>
              <p className="text-sm text-[#e2c7ff]/80">
                These cities were once connected through: {currentRound.cityFrom.historicRoute} and {currentRound.cityTo.historicRoute}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealmDistanceDiviner;