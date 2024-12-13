'use client';

import React, { useState, useEffect } from 'react';

interface HistoricalEvent {
  year: number;
  description: string;
}

interface CityPeriod {
  name: string;
  coords: string;
  year: number;
  events: HistoricalEvent[];
  generalHints: string[];
  modernView?: string;
}

const CityTimePortal: React.FC = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_EMBED_KEY;
  const [currentPeriod, setCurrentPeriod] = useState<CityPeriod | null>(null);
  const [yearGuess, setYearGuess] = useState<string>('');
  const [gameState, setGameState] = useState<'guessing' | 'result'>('guessing');
  const [score, setScore] = useState<number>(0);
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [showModernView, setShowModernView] = useState<boolean>(false);
  const [totalRounds, setTotalRounds] = useState<number>(0);

  const cityPeriods: CityPeriod[] = [
    {
      name: "Dubai",
      coords: "25.2048,55.2708",
      year: 1990,
      events: [
        { year: 1985, description: "The Dubai World Trade Centre stands almost alone in the desert 🏢" },
        { year: 1988, description: "First major residential developments begin to appear 🏗️" },
        { year: 1992, description: "Construction of major highways connecting the city 🛣️" }
      ],
      generalHints: [
        "The desert begins its transformation 🌅",
        "Before the great towers rose 🏙️",
        "When camels still roamed where skyscrapers now stand 🐪"
      ],
      modernView: "25.2048,55.2708"
    },
    {
      name: "Shanghai",
      coords: "31.2304,121.4737",
      year: 1987,
      events: [
        { year: 1984, description: "Early stages of Pudong development zone planning 📋" },
        { year: 1990, description: "Before the Pearl Tower changed the skyline 🗼" },
        { year: 1992, description: "The beginning of modern financial district 💹" }
      ],
      generalHints: [
        "Before the city touched the clouds ☁️",
        "When the river bank was still low 🌊",
        "The calm before the economic storm 🌅"
      ],
      modernView: "31.2304,121.4737"
    },
    {
      name: "Las Vegas",
      coords: "36.1699,-115.1398",
      year: 1975,
      events: [
        { year: 1973, description: "The original MGM Grand opens its doors 🎰" },
        { year: 1976, description: "Before the mega-resorts era began ✨" },
        { year: 1978, description: "When the Strip was still growing 🎲" }
      ],
      generalHints: [
        "When the desert oasis was smaller 🌵",
        "Before the neon city reached its peak 💫",
        "The early days of the Entertainment Capital 🎭"
      ],
      modernView: "36.1699,-115.1398"
    }
  ];

  const startNewRound = () => {
    const newPeriod = cityPeriods[Math.floor(Math.random() * cityPeriods.length)];
    setCurrentPeriod(newPeriod);
    setGameState('guessing');
    setYearGuess('');
    setRevealedHints(0);
    setShowModernView(false);
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const calculateScore = (actual: number, guessed: number): number => {
    const difference = Math.abs(actual - guessed);
    if (difference <= 2) return 100;
    if (difference <= 5) return 80;
    if (difference <= 10) return 60;
    if (difference <= 15) return 40;
    if (difference <= 20) return 20;
    return 10;
  };

  const handleGuess = () => {
    if (!currentPeriod || !yearGuess) return;
    
    const guessNum = parseInt(yearGuess);
    const roundScore = calculateScore(currentPeriod.year, guessNum);
    setScore(prev => prev + roundScore);
    setGameState('result');
    setTotalRounds(prev => prev + 1);
  };

  const getMapUrl = (coords: string, isModern: boolean = false) => {
    return `https://www.google.com/maps/embed/v1/place` +
      `?key=${apiKey}` +
      `&q=${coords}` +
      `&zoom=14` +
      `&maptype=satellite`;
  };

  return (
    <div className="w-full max-w-4xl bg-[#1a1c2e] text-[#e2c7ff] rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="text-3xl">⌛</span>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#9f6ef5] to-[#c77dff] text-transparent bg-clip-text">
            City Time Portal
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            Portal Jumps: {totalRounds}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <span className="text-xl font-bold">{score}</span>
          </div>
        </div>
      </div>

      {currentPeriod && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="bg-[#252847] rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">🌟 Mystical City</h3>
              <p className="text-xl font-bold">{currentPeriod.name}</p>
              
              {gameState === 'guessing' && (
                <div className="mt-4">
                  <label className="block text-sm mb-2">📅 What year is this vision from?</label>
                  <input
                    type="number"
                    min="1900"
                    max="2024"
                    placeholder="Enter year..."
                    value={yearGuess}
                    onChange={(e) => setYearGuess(e.target.value)}
                    className="w-full px-4 py-2 bg-[#1a1c2e] border-2 border-[#4a3b89] rounded-lg text-[#e2c7ff] placeholder-[#8e7bb0] focus:outline-none focus:border-[#9f6ef5]"
                    onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
                  />
                  <button
                    onClick={handleGuess}
                    className="w-full mt-2 py-2 bg-[#4a3b89] hover:bg-[#5a4a99] rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <span>🔮</span>
                    Divine the Year
                  </button>
                </div>
              )}
            </div>

            <div className="bg-[#252847] rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">📜 Mystical Hints</h3>
              <div className="space-y-2">
                {currentPeriod.generalHints.map((hint, index) => (
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
              {gameState === 'guessing' && revealedHints < 3 && (
                <button
                  onClick={() => setRevealedHints(prev => prev + 1)}
                  className="w-full mt-2 py-2 bg-[#1a1c2e] hover:bg-[#2a2d50] rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>✨</span>
                  Reveal Hint ({3 - revealedHints} remaining)
                </button>
              )}
            </div>

            {gameState === 'result' && (
              <div className="bg-[#252847] rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">📖 Historical Events</h3>
                <div className="space-y-2">
                  {currentPeriod.events.map((event, index) => (
                    <div key={index} className="p-2 rounded bg-[#1a1c2e]">
                      <span className="text-[#9f6ef5]">{event.year}: </span>
                      {event.description}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="relative w-full h-[500px] bg-[#252847] rounded-lg overflow-hidden">
              {showModernView && currentPeriod.modernView ? (
                <iframe
                  title="Modern City View"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={getMapUrl(currentPeriod.modernView, true)}
                  allowFullScreen
                  className="transition-opacity duration-500"
                />
              ) : (
                <iframe
                  title="Historical City View"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={getMapUrl(currentPeriod.coords)}
                  allowFullScreen
                  className="transition-opacity duration-500"
                />
              )}
            </div>

            {gameState === 'result' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#252847] rounded-lg p-4 text-center">
                  <h3 className="text-lg font-semibold mb-2">🎯 Time Portal Results</h3>
                  <p className="text-3xl font-bold text-[#9f6ef5]">{currentPeriod.year}</p>
                  <p className="text-sm text-[#e2c7ff]/70">Your guess: {yearGuess}</p>
                </div>
                <div className="bg-[#252847] rounded-lg p-4 flex flex-col justify-center items-center gap-2">
                  <button
                    onClick={() => setShowModernView(!showModernView)}
                    className="w-full py-2 bg-[#4a3b89] hover:bg-[#5a4a99] rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{showModernView ? '🕰️' : '🌆'}</span>
                    {showModernView ? 'View Historical' : 'View Modern'}
                  </button>
                  <button
                    onClick={startNewRound}
                    className="w-full py-2 bg-[#4a3b89] hover:bg-[#5a4a99] rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <span>🌟</span>
                    Next Time Jump
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CityTimePortal;