'use client';

import React, { useState, useEffect } from 'react';

interface AncientSite {
  name: string;
  coords: string;
  hints: string[];
  civilization: string;
  period: string;
  facts: string[];
  viewConfig: {
    heading: number;
    pitch: number;
    zoom: number;
  };
}

const AncientRuinsExplorer: React.FC = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_EMBED_KEY;
  const [currentSite, setCurrentSite] = useState<AncientSite | null>(null);
  const [guess, setGuess] = useState<string>('');
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [score, setScore] = useState<number>(0);
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'street' | 'satellite'>('street');

  const ancientSites: AncientSite[] = [
    {
      name: "Petra",
      coords: "30.3285,35.4444",
      hints: [
        "Rose-colored walls hide ancient secrets 🌹",
        "Carved directly into the rock face 🏛️",
        "Indiana Jones found the Holy Grail here 🏺"
      ],
      civilization: "Nabataean",
      period: "312 BCE - 106 CE",
      facts: [
        "Known as the 'Rose City' due to the color of the stone",
        "Hidden from the Western world until 1812",
        "Water conduit system was ahead of its time"
      ],
      viewConfig: {
        heading: 180,
        pitch: 0,
        zoom: 1
      }
    },
    {
      name: "Angkor Wat",
      coords: "13.4125,103.8670",
      hints: [
        "The largest religious monument in the world 🗿",
        "Hidden in the Cambodian jungle 🌿",
        "Five towers represent Mount Meru ⛰️"
      ],
      civilization: "Khmer Empire",
      period: "12th Century CE",
      facts: [
        "Originally built as a Hindu temple",
        "Appears on Cambodia's national flag",
        "Perfectly aligned with the spring equinox"
      ],
      viewConfig: {
        heading: 270,
        pitch: 0,
        zoom: 1
      }
    },
    {
      name: "Abu Simbel",
      coords: "22.3372,31.6258",
      hints: [
        "Four colossal guardians watch the Nile 👑",
        "Moved piece by piece to escape the waters 💫",
        "Built by the greatest of pharaohs 🐪"
      ],
      civilization: "Ancient Egypt",
      period: "13th Century BCE",
      facts: [
        "Relocated due to the Aswan Dam project",
        "Aligned to illuminate the inner sanctuary twice a year",
        "Dedicated to Ramesses II and Queen Nefertari"
      ],
      viewConfig: {
        heading: 45,
        pitch: 0,
        zoom: 1
      }
    },
    {
      name: "Newgrange",
      coords: "53.6947,-6.4755",
      hints: [
        "Older than the pyramids and Stonehenge 🌟",
        "Winter solstice illuminates its chamber ☀️",
        "White quartz walls shine in the Irish mist 💎"
      ],
      civilization: "Neolithic Ireland",
      period: "3200 BCE",
      facts: [
        "Perfectly aligned with the winter solstice sunrise",
        "The roof box is an ancient astronomical device",
        "Contains the world's oldest known solar observatory"
      ],
      viewConfig: {
        heading: 135,
        pitch: 0,
        zoom: 1
      }
    },
    {
      name: "Chichen Itza",
      coords: "20.6843,-88.5678",
      hints: [
        "Serpent shadows dance on equinox days 🐍",
        "The great ball court echoes ancient games �球",
        "Temple of the Warriors guards its secrets 🗡️"
      ],
      civilization: "Maya",
      period: "600-1200 CE",
      facts: [
        "The pyramid has 365 steps, one for each day",
        "Clap at the base creates an echo like a bird call",
        "Contains sophisticated astronomical alignments"
      ],
      viewConfig: {
        heading: 300,
        pitch: 0,
        zoom: 1
      }
    }
  ];

  const startNewSite = () => {
    const newSite = ancientSites[Math.floor(Math.random() * ancientSites.length)];
    setCurrentSite(newSite);
    setGameState('playing');
    setRevealedHints(0);
    setGuess('');
    setAttempts(0);
    updateMapUrl(newSite, 'street');
  };

  const updateMapUrl = (site: AncientSite, mode: 'street' | 'satellite') => {
    setViewMode(mode);
  };

  useEffect(() => {
    startNewSite();
  }, []);

  const checkGuess = () => {
    if (!currentSite) return;
    
    setAttempts(prev => prev + 1);
    
    if (guess.toLowerCase() === currentSite.name.toLowerCase()) {
      setGameState('won');
      setScore(prev => prev + Math.max(10 - revealedHints * 2 - attempts * 2, 1));
    } else if (attempts >= 2) {
      setGameState('lost');
    }
  };

  const getMapUrl = () => {
    if (!currentSite) return undefined;
    
    if (viewMode === 'street') {
      return `https://www.google.com/maps/embed/v1/streetview` +
        `?key=${apiKey}` +
        `&location=${currentSite.coords}` +
        `&heading=${currentSite.viewConfig.heading}` +
        `&pitch=${currentSite.viewConfig.pitch}` +
        `&fov=${90 / currentSite.viewConfig.zoom}` 
    } else {
      return `https://www.google.com/maps/embed/v1/place` +
        `?key=${apiKey}` +
        `&q=${currentSite.coords}` +
        `&zoom=18` +
        `&maptype=satellite`;
    }
  };

  return (
    <div className="w-[800px] max-w-4xl bg-[#1a1c2e] text-[#e2c7ff] rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="text-3xl">🏛️</span>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#9f6ef5] to-[#c77dff] text-transparent bg-clip-text">
            Ancient Ruins Explorer
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">✨</span>
          <span className="text-xl font-bold">{score}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Controls */}
        <div className="space-y-4">
          <div className="bg-[#252847] rounded-lg p-4">
            <div className="mb-4">
              <label className="block text-sm mb-2">🗿 Name this Ancient Wonder</label>
              <input
                type="text"
                placeholder="Enter the name..."
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
                className="w-full py-2 bg-[#4a3b89] hover:bg-[#5a4a99] rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>🔮</span>
                Reveal Your Knowledge
              </button>
              
              <button
                onClick={() => setRevealedHints(prev => Math.min(prev + 1, 3))}
                disabled={gameState !== 'playing' || revealedHints >= 3}
                className="w-full py-2 bg-[#1a1c2e] hover:bg-[#2a2d50] rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>📜</span>
                Ancient Wisdom ({3 - revealedHints} remaining)
              </button>
            </div>
          </div>

          {currentSite && (
            <div className="bg-[#252847] rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <span>🏺</span> Sacred Knowledge
              </h3>
              <div className="space-y-2">
                {currentSite.hints.map((hint, index) => (
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
          )}

          {gameState !== 'playing' && currentSite && (
            <div className="bg-[#252847] rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">📚 Ancient Records</h3>
              <p className="font-bold text-[#9f6ef5] mb-2">{currentSite.name}</p>
              <div className="space-y-2 text-sm">
                <p>🏛️ Civilization: {currentSite.civilization}</p>
                <p>⌛ Period: {currentSite.period}</p>
                {currentSite.facts.map((fact, index) => (
                  <p key={index} className="italic text-[#e2c7ff]/70">• {fact}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Map Display */}
        <div className="md:col-span-2">
          <div className="relative w-full h-[500px] bg-[#252847] rounded-lg overflow-hidden">
            <iframe
              title="Ancient Site View"
              width="100%"
              height="100%"
              frameBorder="0"
              src={getMapUrl()}
              allowFullScreen
              className="transition-opacity duration-500"
            />
          </div>

          <div className="mt-4 flex gap-4">
            <button
              onClick={() => updateMapUrl(currentSite!, 'street')}
              className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center gap-2
                ${viewMode === 'street' ? 'bg-[#4a3b89] text-white' : 'bg-[#252847] hover:bg-[#2a2d50]'}`}
            >
              <span>🏛️</span>
              Ground View
            </button>
            <button
              onClick={() => updateMapUrl(currentSite!, 'satellite')}
              className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center gap-2
                ${viewMode === 'satellite' ? 'bg-[#4a3b89] text-white' : 'bg-[#252847] hover:bg-[#2a2d50]'}`}
            >
              <span>🛰️</span>
              Aerial View
            </button>
          </div>

          {gameState !== 'playing' && (
            <button
              onClick={startNewSite}
              className="w-full mt-4 py-2 bg-[#4a3b89] hover:bg-[#5a4a99] rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>🧭</span>
              Next Ancient Wonder
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AncientRuinsExplorer;