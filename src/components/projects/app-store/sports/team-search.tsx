'use client';
import { useState } from 'react';

import "./team-search.css";

interface Team {
  strTeam: string;
  intFormedYear: string;
  strStadium: string;
  strDescriptionEN: string;
  intStadiumCapacity: string;
  strLeague: string;
  strTeamBadge: string;
  strCountry: string;
  strLeague2?: string;
  strLeague3?: string;
  strLeague4?: string;
}

const AlchemicalTeamSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teamData, setTeamData] = useState<Team | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const searchTeam = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
      
      if (data.teams && data.teams.length > 0) {
        setTeamData(data.teams[0]);
      } else {
        setError('⚠️ No team found in the ancient scrolls');
      }
    } catch (err) {
      setError('⚠️ The magical connection failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[700px] h-[700px] bg-gray-900 overflow-auto p-6 font-mono relative">
      {/* Magical Border */}
      <div className="absolute inset-0 border-4 border-indigo-500/30 pointer-events-none animate-pulse" />
      
      {/* Search Section */}
      <div className="mb-8 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
        <div className="text-center mb-4">
          <h1 className="text-3xl text-indigo-400">⚗️ Alchemical Team Search ⚗️</h1>
          <div className="text-indigo-300 text-sm">✦ Ancient Records Repository ✦</div>
        </div>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter team name..."
            className="flex-1 bg-gray-800 border border-indigo-500/30 text-indigo-100 px-4 py-2 rounded-md focus:outline-none focus:border-indigo-400"
          />
          <button
            onClick={searchTeam}
            disabled={isLoading}
            className="px-4 py-2 bg-indigo-600 text-indigo-100 rounded-md hover:bg-indigo-500 transition-colors disabled:bg-gray-600"
          >
            {isLoading ? '✨ Casting...' : '🔮 Search'}
          </button>
        </div>

        {error && (
          <div className="text-red-400 text-center text-sm mt-2 animate-[fadeIn_0.3s_ease-out]">{error}</div>
        )}
      </div>

      {teamData && (
        <>
          {/* Team Identity Crystal */}
          <div className="bg-gray-800/50 p-6 rounded-lg mb-6 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards] border border-indigo-500/30">
            <div className="text-2xl text-center text-indigo-400 mb-2">
              ⭐ {teamData.strTeam} ⭐
            </div>
            <div className="text-center text-indigo-300 text-sm">
              『 {teamData.strCountry} • Est. {teamData.intFormedYear} 』
            </div>
          </div>

          {/* Statistics Crystals */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800/50 p-4 rounded-lg animate-[float_3s_ease-in-out_infinite] border border-indigo-500/30">
              <div className="text-center">
                <div className="text-indigo-400">🏰 Sanctum</div>
                <div className="text-indigo-300 text-sm">{teamData.strStadium}</div>
              </div>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg animate-[float_3s_ease-in-out_infinite] border border-indigo-500/30">
              <div className="text-center">
                <div className="text-indigo-400">👥 Capacity</div>
                <div className="text-indigo-300 text-sm">{teamData.intStadiumCapacity} souls</div>
              </div>
            </div>
          </div>

          {/* Leagues Participation */}
          <div className="bg-gray-800/50 p-4 rounded-lg mb-6 animate-[float_3s_ease-in-out_infinite] border border-indigo-500/30">
            <div className="text-center">
              <div className="text-indigo-400">⚔️ Active Realms</div>
              <div className="text-indigo-300 text-sm grid gap-1 mt-2">
                <div>✧ {teamData.strLeague}</div>
                {teamData.strLeague2 && <div>✧ {teamData.strLeague2}</div>}
                {teamData.strLeague3 && <div>✧ {teamData.strLeague3}</div>}
                {teamData.strLeague4 && <div>✧ {teamData.strLeague4}</div>}
              </div>
            </div>
          </div>

          {/* Team Lore Scroll */}
          <div 
            className="bg-gray-800/50 p-6 rounded-lg cursor-pointer mb-6 border border-indigo-500/30"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="text-center text-indigo-400 mb-2">
              📜 Forbidden Knowledge 📜
            </div>
            <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96' : 'max-h-20'}`}>
              <div className="text-indigo-300 text-sm leading-relaxed">
                {teamData.strDescriptionEN || "The ancient scrolls are silent on this matter..."}
              </div>
            </div>
            <div className="text-center text-indigo-400 mt-2 text-sm">
              {isOpen ? '▲ Seal Scroll ▲' : '▼ Unfurl Scroll ▼'}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AlchemicalTeamSearch;